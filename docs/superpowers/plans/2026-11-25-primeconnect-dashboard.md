# PRIMECONNECT — Backend formulaires & Dashboard Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every PRIMECONNECT site form actually save its submission, and give the administrator a private, minimalist dashboard to view, manage and export them.

**Architecture:** A small Node.js/Express backend on Render (with a Render Postgres database) receives the site's form POSTs at absolute URLs and stores them; the public site Artifact changes only the URL each form calls; a second, private Claude Artifact dashboard reads/writes the same backend through an admin API key.

**Tech Stack:** Node.js, Express, `pg` (node-postgres), Zod, Multer (file uploads), `express-rate-limit`, Helmet, CORS, ExcelJS (XLSX export), Vitest + Supertest (tests). Dashboard: a single static HTML/CSS/vanilla-JS Artifact page (no framework, to keep it light and broadly browser-compatible).

**Spec:** Claude Doc "Dashboard Admin PRIMECONNECT — Conception" — https://claude.ai/artifact/8KtpaAX68eum7J7MN4HifZ

## Global Constraints

- Pas de CRM, ERP, ni outil de pilotage BPO. Pas de gestion des missions/agents/KPI opérationnels/factures/marges. Pas de portail partenaire ou client.
- Jamais de faux succès affiché au visiteur si l'enregistrement échoue côté serveur.
- Jamais de donnée fabriquée dans les statistiques — un compteur sans donnée réelle affiche un état vide, pas un chiffre inventé.
- Ne jamais implémenter `/api/simulateur/` avec des données de benchmark inventées (aucune donnée de coût réelle disponible) : le site s'en passe déjà proprement (message "indisponible"/"en cours de consolidation").
- Render : palier gratuit pour le service web et la base de données (risque de cold-start accepté par le client).
- Région Europe pour la base de données et le stockage des pièces jointes.
- Conservation des données personnelles : 24 mois, puis suppression ou anonymisation automatique.
- Dashboard = Artifact privé ; accès réservé aux comptes Claude explicitement invités ; pas d'écran de connexion séparé.
- Dashboard en dégradation progressive : pas d'API JavaScript ou CSS expérimentale, les compteurs et listes s'affichent même sur un navigateur ancien.
- RDV en V1 : validation manuelle par l'administrateur, aucune création automatique d'événement Google Agenda.
- Statut des soumissions (`nouveau`/`lu`/`traite`/`archive`) partagé entre tous les comptes admin — pas de suivi par administrateur individuel.
- Les candidatures partenaires utilisent le même statut générique que les autres soumissions (pas de pipeline de gestion de partenaires en production, conformément aux anti-goals).
- Secrets uniquement en variables d'environnement, jamais en dur dans le code.

## Review Focus

1. Fichier joint trop gros ou de mauvais type (CV > 1 363 148,8 octets ; documents partenaire > 3 fichiers, > 1 363 148,8 octets chacun, ou > 3 984 588,8 octets au total ; types hors PDF/JPG/PNG) → rejeté avec le même message que la validation côté site, jamais un crash serveur.
2. Deux visiteurs réservent le même créneau de rendez-vous en même temps (concurrence) → le second reçoit une erreur "créneau déjà pris", jamais un double rendez-vous silencieux.
3. Le service Render est en cold-start pendant qu'un visiteur soumet un formulaire → le visiteur voit un message d'erreur clair, jamais un succès affiché sans écriture réelle en base.
4. Un champ requis manquant, un enum invalide, ou une requête qui contourne entièrement le JavaScript du site (appel direct à l'API) → rejeté en 400 avec les messages de champ (`fieldErrors`), jamais une exception non gérée (500).
5. Clé API admin absente, vide ou incorrecte sur une route d'administration → 401 clair, jamais un accès, même partiel, aux données des visiteurs.

---

## File Structure

```
primeconnect-backend/
  package.json
  .env.example
  src/
    server.js            # Express app factory + health check
    db.js                 # pg Pool, runs schema.sql on boot
    schema.sql             # DDL: submissions, appointments, availability_template
    store/
      store.js            # JSDoc interface shared by both implementations
      postgresStore.js     # real implementation (pg)
      memoryStore.js       # in-memory implementation, used by tests
    validation/
      schemas.js           # Zod schemas mirroring the site's forms.js
    availability.js        # weekly template -> concrete free slots
    files.js               # saves uploaded CV/documents to disk, returns {id, path, mimeType, sizeBytes}
    export.js              # submissions[] -> CSV string / XLSX buffer
    middleware/
      adminAuth.js
      rateLimit.js
    routes/
      public.js            # the 6 visitor-facing routes
      admin.js              # the dashboard-facing routes
  test/
    availability.test.js
    schemas.test.js
    public.test.js
    admin.test.js
```

The dashboard has no repo file of its own: it is built as a local HTML file (in the session's scratchpad) and published with the Artifact tool once the backend is live, since it needs the backend's real URL to call.

---

### Task 1: Data layer (schema + store interface + in-memory implementation)

**Files:**
- Create: `primeconnect-backend/src/schema.sql`
- Create: `primeconnect-backend/src/store/store.js`
- Create: `primeconnect-backend/src/store/memoryStore.js`
- Create: `primeconnect-backend/src/store/postgresStore.js`
- Create: `primeconnect-backend/src/db.js`
- Test: `primeconnect-backend/test/store.test.js`

**Interfaces:**
- Produces: `createStore(kind: 'memory'|'postgres', pool?) -> Store`, where `Store` has:
  - `createSubmission({type, pays, source, reference, data}) -> Submission` (`type` one of `contact|carriere|partenaire|projet`; sets `status:'nouveau'`, `createdAt`)
  - `listSubmissions({type?, status?, pays?, q?, from?, to?, limit, offset}) -> {rows: Submission[], total: number}`
  - `getSubmission(id) -> Submission|null`
  - `updateSubmissionStatus(id, status: 'nouveau'|'lu'|'traite'|'archive') -> Submission|null`
  - `createAppointment({nom, email, societe, startAt, fuseau, demande, report, projectReference}) -> Appointment` (sets `status:'en_attente'`)
  - `listAppointments({status?, from?, to?}) -> Appointment[]`
  - `updateAppointmentStatus(id, status: 'en_attente'|'confirme'|'annule'|'reporte') -> Appointment|null`
  - `isSlotTaken(startAt) -> boolean` (true if an appointment with status `en_attente` or `confirme` already has that exact `startAt`)
  - `getAvailabilityTemplate() -> {slots: {weekday:1-7, start:'HH:MM', end:'HH:MM'}[], slotDurationMinutes: number, timezone: string}`
  - `setAvailabilityTemplate(template) -> void`
  - `getStats() -> {submissionsByType: Record<string,number>, submissionsByCountry: Record<string,number>, submissionsByDay: {date:string,count:number}[], appointmentsByStatus: Record<string,number>}`

**Steps:**

- [ ] **Step 1: Write `primeconnect-backend/src/schema.sql`**

  Four tables: `submissions` (`id uuid primary key default gen_random_uuid()`, `type text not null`, `status text not null default 'nouveau'`, `pays text`, `source text`, `reference text unique`, `data jsonb not null`, `created_at timestamptz not null default now()`), `appointments` (`id uuid primary key default gen_random_uuid()`, `nom text not null`, `email text not null`, `societe text`, `start_at timestamptz not null`, `fuseau text not null`, `demande text`, `report text`, `project_reference text`, `status text not null default 'en_attente'`, `created_at timestamptz not null default now()`, unique constraint on `start_at` where status in `('en_attente','confirme')` — use a partial unique index), `availability_template` (single row, `id int primary key default 1`, `slots jsonb not null default '[]'`, `slot_duration_minutes int not null default 30`, `timezone text not null default 'Europe/Paris'`), and a `check` constraint on `submissions.type` and both status columns matching the enums above.

- [ ] **Step 2: Write `primeconnect-backend/src/store/store.js`**

  JSDoc `@typedef` for `Submission`, `Appointment`, `AvailabilityTemplate`, and the `Store` interface above. No implementation — this file only documents the contract both implementations satisfy.

- [ ] **Step 3: Write `primeconnect-backend/src/store/memoryStore.js` implementing `Store` over plain JS arrays/Maps**

  `createStore('memory')` returns a fresh store with an empty default `availability_template` row (Mon–Fri 09:00–18:00, 30 min, `Europe/Paris`).

- [ ] **Step 4: Write the failing tests in `primeconnect-backend/test/store.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { createStore } from '../src/store/memoryStore.js';

describe('memoryStore', () => {
  it('creates and lists submissions filtered by type', () => {
    const store = createStore();
    store.createSubmission({ type: 'contact', pays: 'FR', source: '/contact/', reference: 'REF-1', data: { nom: 'Ada' } });
    store.createSubmission({ type: 'carriere', pays: 'CM', source: '/carrieres/', reference: 'REF-2', data: { nom: 'Bo' } });
    const { rows, total } = store.listSubmissions({ type: 'contact' });
    expect(total).toBe(1);
    expect(rows[0].data.nom).toBe('Ada');
  });

  it('rejects a second appointment at the same already-taken slot', () => {
    const store = createStore();
    const startAt = '2026-12-01T10:00:00.000Z';
    store.createAppointment({ nom: 'Ada', email: 'a@x.com', startAt, fuseau: 'Europe/Paris' });
    expect(store.isSlotTaken(startAt)).toBe(true);
  });

  it('updateSubmissionStatus returns null for an unknown id', () => {
    const store = createStore();
    expect(store.updateSubmissionStatus('does-not-exist', 'lu')).toBeNull();
  });
});
```

- [ ] **Step 5: Run `npx vitest run test/store.test.js` — expect FAIL (module not found)**

- [ ] **Step 6: Implement `memoryStore.js` to pass Step 4's tests**

- [ ] **Step 7: Run `npx vitest run test/store.test.js` — expect PASS**

- [ ] **Step 8: Write `primeconnect-backend/src/db.js`** — exports `createPool()` (a `pg.Pool` built from `process.env.DATABASE_URL`) and `runMigrations(pool)` (executes `schema.sql` with `CREATE TABLE IF NOT EXISTS`, idempotent).

- [ ] **Step 9: Write `primeconnect-backend/src/store/postgresStore.js` implementing the same `Store` interface against a `pg.Pool`**, matching every method's signature and return shape from Step 1–3 exactly (no new tests here — Task 7's live deploy is this implementation's real-world test, since no Postgres instance exists in this sandbox to test against locally).

- [ ] **Step 10: Commit**

```bash
git add primeconnect-backend/src/schema.sql primeconnect-backend/src/store primeconnect-backend/src/db.js primeconnect-backend/test/store.test.js primeconnect-backend/package.json
git commit -m "feat(primeconnect-backend): add submission/appointment data store"
```

---

### Task 2: Validation schemas

**Files:**
- Create: `primeconnect-backend/src/validation/schemas.js`
- Test: `primeconnect-backend/test/schemas.test.js`

**Interfaces:**
- Produces: `contactSchema`, `careerSchema`, `partnerApplicationSchema`, `projectSchema`, `bookingSchema` — Zod objects, field-for-field matches to the site's own `forms.js` (already extracted):
  - `contactSchema`: `nom`, `societe` (optional, max 120), `fonction` (optional, max 80), `email`, `pays` (enum `FR|BE|CH|LU|CA|XX`), `sujet` (enum `projet|devis|debordement|partenariat|donnees|autre`), `message` (20–3000 chars), `consentement` (must be `true`).
  - `careerSchema`: `prenom`, `nom`, `email`, `telephone` (9–20 chars, transformed to `+237` E.164 when it matches a Cameroonian mobile number, else kept as-is), `ville` (enum `Douala|Yaoundé|Autre`), `poste` (enum `teleconseiller|superviseur|back-office|autre`), `experience` (enum `aucune|moins-1-an|1-3-ans|plus-3-ans`), `langues` (array, min 1, of `français|anglais|allemand|espagnol`), `message` (optional, max 1500), `consentement` (`true`). CV handled separately (Step 3 of Task 3).
  - `partnerApplicationSchema`: `centre`, `pays_centre`, `ville`, `contact`, `email`, `telephone`, `positions_dispo` (int 0–5000), `langues` (array, min 1), `activites` (array, min 1, of `relation-client|teleprospection|leads|back-office`), `horaires`, `equipements`, `description` (optional, max 2000), `consentement` (`true`). Documents handled separately (Task 3).
  - `projectSchema`: union of five step objects exactly as named in the site bundle — mission (`missions` array min 1, `mission_autre` optional, `description` optional), organisation (`pays`, `pays_autre` optional, `secteur`, `langues` array min 1, `clientele`, `horaires`, `fuseau_mission`, `jours` array min 1, `demarrage` optional date, `volume`/`volume_unite`/`volume_periode` optional, `outils`/`contraintes` optional), effectif (`pilote` oui/non, `positions` int 1–1000, `duree_pilote`, `objectifs`/`criteres` optional), primes (`primes` oui/non, `prime_type`/`prime_montant`/`prime_unite`/`prime_resultats`/`prime_periodicite`/`prime_criteres`, all optional unless `primes==='oui'`), coordonnées (`nom`, `fonction`, `societe`, `email`, `pays_contact`, `telephone`, `site` URL, `consentement` `true`). Cross-field rule: if `missions` includes `autre`, `mission_autre` is required; if `pays==='XX'`, `pays_autre` is required; if `primes==='oui'`, `prime_type`/`prime_unite`/`prime_montant` are required.
  - `bookingSchema`: `start` (ISO datetime string), `fuseau`, `nom`, `email`, `societe` (optional, max 120), `demande` (optional, max 600 — carries the `bookingToken`/project reference when chained from the configurator), `report` (optional, max 200), `consentement` (`true`).
- Consumes: nothing (pure validation module).

**Steps:**

- [ ] **Step 1: Write the failing tests in `primeconnect-backend/test/schemas.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { contactSchema, careerSchema, partnerApplicationSchema, projectSchema, bookingSchema } from '../src/validation/schemas.js';

describe('contactSchema', () => {
  it('accepts a valid contact submission', () => {
    const r = contactSchema.safeParse({ nom: 'Ada', email: 'ada@example.com', pays: 'FR', sujet: 'devis', message: 'A'.repeat(25), consentement: true });
    expect(r.success).toBe(true);
  });
  it('rejects a message under 20 characters', () => {
    const r = contactSchema.safeParse({ nom: 'Ada', email: 'ada@example.com', pays: 'FR', sujet: 'devis', message: 'trop court', consentement: true });
    expect(r.success).toBe(false);
  });
});

describe('projectSchema', () => {
  it('requires mission_autre when missions includes "autre"', () => {
    const base = { missions: ['autre'], secteur: 'SaaS', pays: 'FR', langues: ['français'], clientele: 'b2b', horaires: '9-18h', fuseau_mission: 'Europe/Paris', jours: ['lun'], pilote: 'non', positions: 5, primes: 'non', nom: 'Ada', fonction: 'CEO', societe: 'Acme', email: 'a@x.com', pays_contact: 'FR', consentement: true };
    expect(projectSchema.safeParse(base).success).toBe(false);
    expect(projectSchema.safeParse({ ...base, mission_autre: 'Support technique' }).success).toBe(true);
  });
});

describe('bookingSchema', () => {
  it('requires an ISO start datetime and acceptance of consent', () => {
    const r = bookingSchema.safeParse({ start: '2026-12-01T10:00:00.000Z', fuseau: 'Europe/Paris', nom: 'Ada', email: 'a@x.com', consentement: true });
    expect(r.success).toBe(true);
    expect(bookingSchema.safeParse({ start: 'not-a-date', fuseau: 'Europe/Paris', nom: 'Ada', email: 'a@x.com', consentement: true }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run `npx vitest run test/schemas.test.js` — expect FAIL**

- [ ] **Step 3: Implement `schemas.js`** with the five schemas above, using Zod's `.refine()`/`.superRefine()` for the cross-field `projectSchema` rules.

- [ ] **Step 4: Run `npx vitest run test/schemas.test.js` — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add primeconnect-backend/src/validation/schemas.js primeconnect-backend/test/schemas.test.js
git commit -m "feat(primeconnect-backend): add Zod validation schemas matching the site's forms"
```

---

### Task 3: Public submission routes (contact, carrières, partenaire, projet)

**Files:**
- Create: `primeconnect-backend/src/files.js`
- Create: `primeconnect-backend/src/middleware/rateLimit.js`
- Create: `primeconnect-backend/src/routes/public.js`
- Create: `primeconnect-backend/src/server.js`
- Test: `primeconnect-backend/test/public.test.js`

**Interfaces:**
- Consumes: `createStore` (Task 1), `contactSchema`/`careerSchema`/`partnerApplicationSchema`/`projectSchema` (Task 2).
- Produces: `saveUploadedFile(file: Express.Multer.File) -> {id, path, mimeType, sizeBytes}` (`files.js`); `createApp(store) -> express.Application` (`server.js`, used by every test file in this plan via `request(createApp(store))`); mounts `public.js`'s router at `/api`.
- Routes (all reply JSON in the exact shape the site's JS already expects — see Task 1's spec section "Backend"):
  - `POST /api/contact/` — on success `{ok:true, redirect:'/merci/contact/'}`; on validation failure `{ok:false, errors:{field:message}}`; on unexpected error `{ok:false, message:'...'}`.
  - `POST /api/carrieres/` (multipart) — same shape, `fallbackRedirect` `/merci/carrieres/`; rejects a `cv` file over 1 363 148.8 bytes or outside `application/pdf|image/jpeg|image/png` with `errors.cv`, exactly as `CareerForm`'s own client check already does.
  - `POST /api/partenaire/` (multipart) — `/merci/partenaire/`; rejects `documents` beyond 3 files, 1 363 148.8 bytes each, or 3 984 588.8 bytes total, or outside pdf/jpg/png, with `errors.documents`.
  - `POST /api/projet/` — on success `{ok:true, reference, email:{prospect:true|false}, bookingToken}` (`bookingToken` = the created submission's `reference`, so the chained booking widget can link back to it); on failure same `{ok:false, errors|message}` shape.

**Steps:**

- [ ] **Step 1: Write `primeconnect-backend/src/files.js`** — `saveUploadedFile(file)` writes the buffer to `process.env.UPLOADS_DIR` under a random filename, returns `{id: randomUUID(), path, mimeType: file.mimetype, sizeBytes: file.size}`.

- [ ] **Step 2: Write `primeconnect-backend/src/middleware/rateLimit.js`** — `publicFormLimiter` from `express-rate-limit`: 10 requests / 10 minutes per IP, JSON response `{ok:false, message:'Trop de tentatives, réessayez plus tard.'}` on limit.

- [ ] **Step 3: Write the failing tests in `primeconnect-backend/test/public.test.js`**

```js
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/server.js';
import { createStore } from '../src/store/memoryStore.js';

describe('POST /api/contact/', () => {
  it('saves a valid submission and returns the site-expected redirect', async () => {
    const store = createStore();
    const app = createApp(store);
    const res = await request(app).post('/api/contact/').send({ nom: 'Ada', email: 'ada@example.com', pays: 'FR', sujet: 'devis', message: 'A'.repeat(25), consentement: 'true' });
    expect(res.body).toEqual({ ok: true, redirect: '/merci/contact/' });
    expect(store.listSubmissions({ type: 'contact' }).total).toBe(1);
  });

  it('returns field errors and saves nothing when the message is too short', async () => {
    const store = createStore();
    const app = createApp(store);
    const res = await request(app).post('/api/contact/').send({ nom: 'Ada', email: 'ada@example.com', pays: 'FR', sujet: 'devis', message: 'trop court', consentement: 'true' });
    expect(res.body.ok).toBe(false);
    expect(res.body.errors.message).toBeTruthy();
    expect(store.listSubmissions({ type: 'contact' }).total).toBe(0);
  });
});

describe('POST /api/carrieres/', () => {
  it('rejects a CV over the size limit without saving a submission', async () => {
    const store = createStore();
    const app = createApp(store);
    const bigFile = Buffer.alloc(1_400_000, 1);
    const res = await request(app).post('/api/carrieres/')
      .field('prenom', 'Ada').field('nom', 'Lovelace').field('email', 'ada@example.com')
      .field('telephone', '677123456').field('ville', 'Douala').field('poste', 'teleconseiller')
      .field('experience', 'aucune').field('langues', 'français').field('consentement', 'true')
      .attach('cv', bigFile, { filename: 'cv.pdf', contentType: 'application/pdf' });
    expect(res.body.ok).toBe(false);
    expect(res.body.errors.cv).toBeTruthy();
    expect(store.listSubmissions({ type: 'carriere' }).total).toBe(0);
  });
});

describe('POST /api/projet/', () => {
  it('saves a complete 6-step submission and returns a bookingToken', async () => {
    const store = createStore();
    const app = createApp(store);
    const res = await request(app).post('/api/projet/').send({
      missions: 'teleprospection-rdv', secteur: 'SaaS', pays: 'FR', langues: 'français', clientele: 'b2b',
      horaires: '9h-18h', fuseau_mission: 'Europe/Paris', jours: 'lun', pilote: 'non', positions: '5',
      primes: 'non', nom: 'Ada', fonction: 'CEO', societe: 'Acme', email: 'ada@example.com',
      pays_contact: 'FR', consentement: 'true'
    });
    expect(res.body.ok).toBe(true);
    expect(typeof res.body.bookingToken).toBe('string');
    expect(store.listSubmissions({ type: 'projet' }).rows[0].reference).toBe(res.body.bookingToken);
  });
});
```

- [ ] **Step 4: Run `npx vitest run test/public.test.js` — expect FAIL**

- [ ] **Step 5: Implement `primeconnect-backend/src/routes/public.js`** — an Express `Router` with the four routes, each: parse body (`multer` for the two multipart routes), run the matching Zod schema (`formToObject`-style collapsing of repeated keys for arrays, matching the site's own `formToObject` for `langues`/`jours`/`missions`/`activites`), on failure map `safeParse(...).error` to `{field: firstMessage}` and respond `400 {ok:false, errors}`, on success generate `reference` as `` `PC-${Date.now().toString(36).toUpperCase()}` ``, call the matching `store.create*`, respond per the shapes in Interfaces.

- [ ] **Step 6: Write `primeconnect-backend/src/server.js`** — `createApp(store)`: Express app with `helmet()`, `cors()`, `express.json()`, `express.urlencoded({extended:true})`, mounts `publicFormLimiter` + `public.js`'s router at `/api`, and a `GET /health` returning `{ok:true}`.

- [ ] **Step 7: Run `npx vitest run test/public.test.js` — expect PASS**

- [ ] **Step 8: Commit**

```bash
git add primeconnect-backend/src/files.js primeconnect-backend/src/middleware/rateLimit.js primeconnect-backend/src/routes/public.js primeconnect-backend/src/server.js primeconnect-backend/test/public.test.js
git commit -m "feat(primeconnect-backend): add public form submission routes"
```

---

### Task 4: Rendez-vous routes

**Files:**
- Create: `primeconnect-backend/src/availability.js`
- Modify: `primeconnect-backend/src/routes/public.js` (add the two routes)
- Test: `primeconnect-backend/test/availability.test.js`
- Test: `primeconnect-backend/test/booking.test.js`

**Interfaces:**
- Produces: `computeFreeSlots(template, takenStartTimes: string[], { now, daysAhead = 14 }) -> string[]` (ISO datetime strings, one per free slot, in the next `daysAhead` days, honoring the template's weekday/start/end/duration and excluding any time in `takenStartTimes`).
- Routes:
  - `GET /api/rendez-vous/creneaux/` → `{available:true, slots:[...ISO], durationMin}` or `{available:false, reason:'...'}` (matches the Reservation widget's own error handling exactly).
  - `POST /api/rendez-vous/reserver/` → on success `{ok:true, kind:'creation', meeting:{start}, emailSent:boolean}` (note: no `meetStatus`/`meetUrl` — this plan deliberately does not promise an automatic Google Calendar invite; see Task 8 for the matching site-copy fix); on a slot already taken `{ok:false, code:'conflit', message:'Ce créneau vient d'être réservé par quelqu'un d'autre.'}`; on validation failure `{ok:false, errors}`.

**Steps:**

- [ ] **Step 1: Write the failing tests in `primeconnect-backend/test/availability.test.js`**

```js
import { describe, it, expect } from 'vitest';
import { computeFreeSlots } from '../src/availability.js';

describe('computeFreeSlots', () => {
  const template = { slots: [{ weekday: 1, start: '09:00', end: '11:00' }], slotDurationMinutes: 60, timezone: 'Europe/Paris' };

  it('generates one slot per hour within the weekly window', () => {
    const now = new Date('2026-11-23T00:00:00Z'); // a Monday
    const result = computeFreeSlots(template, [], { now, daysAhead: 7 });
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toContain(undefined);
  });

  it('excludes a slot already taken', () => {
    const now = new Date('2026-11-23T00:00:00Z');
    const all = computeFreeSlots(template, [], { now, daysAhead: 7 });
    const withoutFirst = computeFreeSlots(template, [all[0]], { now, daysAhead: 7 });
    expect(withoutFirst).not.toContain(all[0]);
    expect(withoutFirst.length).toBe(all.length - 1);
  });
});
```

- [ ] **Step 2: Run `npx vitest run test/availability.test.js` — expect FAIL**

- [ ] **Step 3: Implement `computeFreeSlots`** in `primeconnect-backend/src/availability.js` using the IANA `timezone` (via `Intl.DateTimeFormat` or a small manual offset table — no new dependency needed for a fixed, known set of timezones) to place each weekday's start/end correctly, stepping by `slotDurationMinutes`.

- [ ] **Step 4: Run `npx vitest run test/availability.test.js` — expect PASS**

- [ ] **Step 5: Write the failing tests in `primeconnect-backend/test/booking.test.js`**

```js
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/server.js';
import { createStore } from '../src/store/memoryStore.js';

describe('rendez-vous', () => {
  it('GET creneaux returns available slots from the configured template', async () => {
    const store = createStore();
    const res = await request(createApp(store)).get('/api/rendez-vous/creneaux/');
    expect(res.body.available).toBe(true);
    expect(Array.isArray(res.body.slots)).toBe(true);
  });

  it('POST reserver twice for the same slot: second call returns a conflict, first a success', async () => {
    const store = createStore();
    const app = createApp(store);
    const slots = (await request(app).get('/api/rendez-vous/creneaux/')).body.slots;
    const start = slots[0];
    const first = await request(app).post('/api/rendez-vous/reserver/').send({ start, fuseau: 'Europe/Paris', nom: 'Ada', email: 'a@x.com', consentement: 'true' });
    expect(first.body.ok).toBe(true);
    const second = await request(app).post('/api/rendez-vous/reserver/').send({ start, fuseau: 'Europe/Paris', nom: 'Bo', email: 'b@x.com', consentement: 'true' });
    expect(second.body.ok).toBe(false);
    expect(second.body.code).toBe('conflit');
  });
});
```

- [ ] **Step 6: Run `npx vitest run test/booking.test.js` — expect FAIL**

- [ ] **Step 7: Add the two routes to `primeconnect-backend/src/routes/public.js`**, using `store.getAvailabilityTemplate()` + `computeFreeSlots` + `store.isSlotTaken` for the conflict check, and `store.createAppointment` on success.

- [ ] **Step 8: Run `npx vitest run test/booking.test.js` — expect PASS**

- [ ] **Step 9: Commit**

```bash
git add primeconnect-backend/src/availability.js primeconnect-backend/src/routes/public.js primeconnect-backend/test/availability.test.js primeconnect-backend/test/booking.test.js
git commit -m "feat(primeconnect-backend): add rendez-vous availability and booking routes"
```

---

### Task 5: Admin routes (list, detail, status, availability config, export)

**Files:**
- Create: `primeconnect-backend/src/middleware/adminAuth.js`
- Create: `primeconnect-backend/src/export.js`
- Create: `primeconnect-backend/src/routes/admin.js`
- Modify: `primeconnect-backend/src/server.js` (mount the admin router)
- Test: `primeconnect-backend/test/admin.test.js`

**Interfaces:**
- Produces: `submissionsToCsv(rows: Submission[]) -> string`; `submissionsToXlsx(rows: Submission[]) -> Buffer` (`export.js`); Express middleware `requireAdminKey(req,res,next)` checking header `x-admin-key` against `process.env.ADMIN_API_KEY`, else `401 {ok:false, message:'Clé administrateur invalide.'}`.
- Routes (all behind `requireAdminKey`, mounted at `/admin`):
  - `GET /admin/submissions?type=&status=&pays=&q=&from=&to=&limit=&offset=` → `{rows, total}`
  - `GET /admin/submissions/:id` → `Submission` or `404`
  - `PATCH /admin/submissions/:id` body `{status}` → updated `Submission` or `404`
  - `GET /admin/appointments?status=&from=&to=` → `Appointment[]`
  - `PATCH /admin/appointments/:id` body `{status}` → updated `Appointment` or `404`
  - `GET /admin/availability` / `PUT /admin/availability` body `AvailabilityTemplate`
  - `GET /admin/stats` → the shape from Task 1's `getStats()`
  - `GET /admin/export.csv?type=&status=` / `GET /admin/export.xlsx?type=&status=` → file download of the filtered submissions

**Steps:**

- [ ] **Step 1: Write the failing tests in `primeconnect-backend/test/admin.test.js`**

```js
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/server.js';
import { createStore } from '../src/store/memoryStore.js';

const KEY = 'test-admin-key';
beforeEach(() => { process.env.ADMIN_API_KEY = KEY; });

describe('admin routes', () => {
  it('rejects requests without the admin key', async () => {
    const res = await request(createApp(createStore())).get('/admin/submissions');
    expect(res.status).toBe(401);
  });

  it('lists and updates a submission with the correct key', async () => {
    const store = createStore();
    const s = store.createSubmission({ type: 'contact', pays: 'FR', reference: 'REF-1', data: { nom: 'Ada' } });
    const app = createApp(store);
    const list = await request(app).get('/admin/submissions').set('x-admin-key', KEY);
    expect(list.body.total).toBe(1);
    const patch = await request(app).patch(`/admin/submissions/${s.id}`).set('x-admin-key', KEY).send({ status: 'lu' });
    expect(patch.body.status).toBe('lu');
  });

  it('exports submissions as CSV', async () => {
    const store = createStore();
    store.createSubmission({ type: 'contact', pays: 'FR', reference: 'REF-1', data: { nom: 'Ada' } });
    const res = await request(createApp(store)).get('/admin/export.csv').set('x-admin-key', KEY);
    expect(res.headers['content-type']).toMatch(/csv/);
    expect(res.text).toContain('REF-1');
  });
});
```

- [ ] **Step 2: Run `npx vitest run test/admin.test.js` — expect FAIL**

- [ ] **Step 3: Implement `adminAuth.js`, `export.js`, `routes/admin.js`**, mount in `server.js`.

- [ ] **Step 4: Run `npx vitest run test/admin.test.js` — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add primeconnect-backend/src/middleware/adminAuth.js primeconnect-backend/src/export.js primeconnect-backend/src/routes/admin.js primeconnect-backend/src/server.js primeconnect-backend/test/admin.test.js
git commit -m "feat(primeconnect-backend): add admin API for the dashboard"
```

---

### Task 6: Provision and deploy on Render

**Files:** none (infrastructure only); Modify: `primeconnect-backend/package.json` (`start`/`build` scripts), `primeconnect-backend/.env.example`.

- [ ] **Step 1:** Call `mcp__Render__list_workspaces`; confirm the workspace to use with the user if more than one exists.
- [ ] **Step 2:** Call `mcp__Render__create_postgres` — `name: "primeconnect-db"`, `plan: "free"`, `region: "frankfurt"`.
- [ ] **Step 3:** Call `mcp__Render__create_web_service` — `name: "primeconnect-backend"`, `runtime: "node"`, `repo` = this GitHub repo's URL, `branch: "claude/jolly-ptolemy-4httqk"`, `buildCommand: "cd primeconnect-backend && npm install"`, `startCommand: "cd primeconnect-backend && npm start"`, `region: "frankfurt"`, `plan: "free"`, `envVars`: `DATABASE_URL` (from Step 2's connection string), `ADMIN_API_KEY` (a freshly generated random secret), `UPLOADS_DIR` (`/var/data/uploads` — note: the free plan has no persistent disk, so uploaded files survive only until the next deploy/restart; flag this plainly to the user as a consequence of the free-tier choice already made).
- [ ] **Step 4:** Wait for the deploy to finish; `curl` the service's `/health` endpoint; expect `{"ok":true}`.
- [ ] **Step 5:** Record the service's public URL and the generated `ADMIN_API_KEY` for Tasks 8–11 (never commit the key to the repo).

---

### Task 7: Push the backend to the repo

- [ ] **Step 1:** `git status` to confirm no unrelated changes are staged.
- [ ] **Step 2:** `git add primeconnect-backend/` and commit (if not already committed task-by-task above).
- [ ] **Step 3:** `git push -u origin claude/jolly-ptolemy-4httqk`.
- [ ] **Step 4:** Confirm Render's auto-deploy picked up the push (new deploy in Render's dashboard/API for the service created in Task 6) and `/health` still responds after it finishes.

---

### Task 8: Patch the public site Artifact

**Files:** none in this repo — edits apply to the published Artifact's files (`https://claude.ai/artifact/GrMJgTpeaC3qGMKy7t5FUA`), via the Artifact tool's `edits`/`Edit` mechanism on the saved local copies already in the scratchpad, republished with the same `file_path`s.

- [ ] **Step 1:** In `ContactForm...js`, `CareerForm...js`, `PartnerForm...js`, `Reservation...js`, and the configurateur's `index.astro...js`, replace every literal `` `/api/...` `` path with `` `${BACKEND_BASE}/api/...` `` where `BACKEND_BASE` is a single exported constant (new tiny module `_astro/backendBase.js`) set to Task 6's deployed URL.
- [ ] **Step 2:** In `Reservation...js`, change the confirmation copy so it never promises an automatic Google Calendar invite: the `data-done-title` is always "Demande de rendez-vous reçue" (drop the `kind==='modification'` branch's "Rendez-vous déplacé" title), and the `data-done-mail`/Meet-link branch (currently keyed on `meeting.meetStatus==='success'`) is replaced with one message: "Nous avons bien reçu votre demande ; nous vous recontacterons pour confirmer le rendez-vous." plus, keyed on `emailSent`, either "Un e-mail confirmant la réception de votre demande vous a été envoyé." or "...n'a pas pu partir : notez votre créneau souhaité.".
- [ ] **Step 3:** Publish the artifact again with `file_path`/`edits` for each changed file, same paths as today, so the live URL is unchanged.
- [ ] **Step 4:** Open the republished site and visually confirm the Contact and Rendez-vous pages still render (no console errors) before moving on.

---

### Task 9: Dashboard — shell, overview, submissions list & detail

**Files:** local scratch file `dashboard/index.html`, published via the Artifact tool once built.

- [ ] **Step 1:** Build a single static HTML page: header with the PRIMECONNECT name, a settings-free "enter admin key once, stored in `localStorage`" prompt (per-viewer convenience only, never relied on for actual authorization — the real gate is the Artifact's own privacy), and five nav tabs: Vue d'ensemble, Soumissions, Rendez-vous, Partenaires, Disponibilités, Statistiques.
- [ ] **Step 2:** Vue d'ensemble: on load, `fetch(BACKEND_BASE + '/admin/stats', {headers:{'x-admin-key':key}})`; render counters (nouvelles soumissions = count with `status==='nouveau'`, RDV en attente, candidatures partenaires en attente) using the exact field names Task 5's `getStats()` returns — never a hardcoded number.
- [ ] **Step 3:** Soumissions: table backed by `/admin/submissions` with query params for type/status/pays/q/from/to, pagination (limit/offset), a "nouveau" badge per row, and a detail panel (opened per row) showing the full `data` JSON rendered as a labeled field list.
- [ ] **Step 4:** Mark-as-read: opening a submission's detail calls `PATCH /admin/submissions/:id {status:'lu'}` once.
- [ ] **Step 5:** Open the published artifact, confirm the overview counters and the submissions list reflect whatever test data Task 3/4's own test runs or a manual curl created on the live backend (not fabricated placeholder rows).

---

### Task 10: Dashboard — rendez-vous & disponibilités

- [ ] **Step 1:** Rendez-vous tab: table from `/admin/appointments`, with per-row buttons "Confirmer" / "Annuler" / "Reporter" calling `PATCH /admin/appointments/:id {status}`.
- [ ] **Step 2:** Disponibilités tab: a simple weekly form (per weekday: start/end time, plus a shared slot duration) reading/writing `/admin/availability`.
- [ ] **Step 3:** Open the artifact, confirm both tabs load and a status change persists on reload (re-fetch).

---

### Task 11: Dashboard — partenaires, statistiques, export

- [ ] **Step 1:** Partenaires tab: the same Soumissions table component from Task 9, pre-filtered to `type=partenaire`, with each row's uploaded document(s) shown as download links (`GET` to a small `/admin/submissions/:id/files/:fileId` route — add this one route to `admin.js`, streaming the file saved by Task 3's `files.js`).
- [ ] **Step 2:** Statistiques tab: soumissions by type/pays/day from `/admin/stats` rendered as simple tables (per the design doc's own constraint: no fabricated traffic numbers — if a count is zero or absent, show "Aucune donnée" rather than a chart implying volume).
- [ ] **Step 3:** Add "Exporter en CSV" / "Exporter en XLSX" buttons on the Soumissions tab calling `/admin/export.csv` / `/admin/export.xlsx` and triggering a browser download of the response.
- [ ] **Step 4:** Publish the complete dashboard artifact (private, not shared via public link).

---

### Task 12: End-to-end verification

- [ ] **Step 1:** Submit the real Contact, Carrières (with a small valid PDF), Devenir partenaire (with 1–2 small files), and Configurer mon projet (all 6 steps) forms on the live, republished site.
- [ ] **Step 2:** Confirm each appears in the dashboard's Soumissions list within a few seconds, with the correct type and full data.
- [ ] **Step 3:** Book a rendez-vous on the live site; confirm it appears in the dashboard's Rendez-vous tab as `en_attente`; confirm the on-site confirmation message matches Task 8 Step 2's reworded copy (no Google Calendar promise).
- [ ] **Step 4:** Attempt a CV upload over the size limit on the live site; confirm the visitor sees the same error message as before (unchanged validation copy) and nothing appears in the dashboard.
- [ ] **Step 5:** Export the Soumissions list as both CSV and XLSX; open each and confirm the rows match what's in the dashboard.
- [ ] **Step 6:** Review the dashboard's HTML/CSS/JS once for any API used only in very recent browser versions (per the Global Constraints' compatibility requirement); replace any found with a broadly-supported equivalent.
- [ ] **Step 7:** Report back to the user with the dashboard's URL, the backend's admin key (via a secure channel, never in a committed file), and this checklist's results.
