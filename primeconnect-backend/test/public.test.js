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
