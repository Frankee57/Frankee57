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
