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
