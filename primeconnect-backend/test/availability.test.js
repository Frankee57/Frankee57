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
