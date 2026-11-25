function tzOffsetMinutes(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const map = {};
  for (const part of dtf.formatToParts(date)) map[part.type] = part.value;
  const asUtc = Date.UTC(+map.year, +map.month - 1, +map.day, +map.hour, +map.minute, +map.second);
  return (asUtc - date.getTime()) / 60000;
}

function zonedTimeToUtc(year, month, day, hour, minute, timeZone) {
  let guess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  for (let i = 0; i < 2; i++) {
    const offsetMinutes = tzOffsetMinutes(guess, timeZone);
    guess = new Date(Date.UTC(year, month - 1, day, hour, minute) - offsetMinutes * 60000);
  }
  return guess;
}

function localDateParts(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
  const map = {};
  for (const part of dtf.formatToParts(date)) map[part.type] = part.value;
  return { year: +map.year, month: +map.month, day: +map.day };
}

function weekdayFromYMD(year, month, day) {
  const dow = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return dow === 0 ? 7 : dow;
}

/**
 * @param {import('./store/store.js').AvailabilityTemplate} template
 * @param {string[]} takenStartTimes
 * @param {{now?: Date, daysAhead?: number}} [options]
 * @returns {string[]}
 */
export function computeFreeSlots(template, takenStartTimes = [], { now = new Date(), daysAhead = 14 } = {}) {
  const taken = new Set(takenStartTimes);
  const start = localDateParts(now, template.timezone);
  const results = [];

  for (let i = 0; i < daysAhead; i++) {
    const base = new Date(Date.UTC(start.year, start.month - 1, start.day + i));
    const year = base.getUTCFullYear();
    const month = base.getUTCMonth() + 1;
    const day = base.getUTCDate();
    const weekday = weekdayFromYMD(year, month, day);

    for (const slot of template.slots.filter((s) => s.weekday === weekday)) {
      const [startHour, startMinute] = slot.start.split(':').map(Number);
      const [endHour, endMinute] = slot.end.split(':').map(Number);
      const endMinutesOfDay = endHour * 60 + endMinute;
      let minutesOfDay = startHour * 60 + startMinute;

      while (minutesOfDay + template.slotDurationMinutes <= endMinutesOfDay) {
        const hour = Math.floor(minutesOfDay / 60);
        const minute = minutesOfDay % 60;
        const utcDate = zonedTimeToUtc(year, month, day, hour, minute, template.timezone);
        if (utcDate.getTime() > now.getTime()) {
          const iso = utcDate.toISOString();
          if (!taken.has(iso)) results.push(iso);
        }
        minutesOfDay += template.slotDurationMinutes;
      }
    }
  }

  return results;
}
