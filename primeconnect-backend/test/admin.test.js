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
