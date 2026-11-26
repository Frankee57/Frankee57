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
