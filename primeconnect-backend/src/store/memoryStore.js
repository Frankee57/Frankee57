import { randomUUID } from 'node:crypto';

const DEFAULT_TEMPLATE = {
  slots: [
    { weekday: 1, start: '09:00', end: '18:00' },
    { weekday: 2, start: '09:00', end: '18:00' },
    { weekday: 3, start: '09:00', end: '18:00' },
    { weekday: 4, start: '09:00', end: '18:00' },
    { weekday: 5, start: '09:00', end: '18:00' },
  ],
  slotDurationMinutes: 30,
  timezone: 'Europe/Paris',
};

/** @returns {import('./store.js').Store} */
export function createStore() {
  /** @type {import('./store.js').Submission[]} */
  const submissions = [];
  /** @type {import('./store.js').Appointment[]} */
  const appointments = [];
  let template = { ...DEFAULT_TEMPLATE, slots: DEFAULT_TEMPLATE.slots.map((s) => ({ ...s })) };

  function createSubmission({ type, pays = null, source = null, reference = null, data }) {
    const submission = {
      id: randomUUID(),
      type,
      status: 'nouveau',
      pays,
      source,
      reference,
      data,
      createdAt: new Date().toISOString(),
    };
    submissions.push(submission);
    return submission;
  }

  function listSubmissions({ type, status, pays, q, from, to, limit = 50, offset = 0 } = {}) {
    let rows = submissions;
    if (type) rows = rows.filter((s) => s.type === type);
    if (status) rows = rows.filter((s) => s.status === status);
    if (pays) rows = rows.filter((s) => s.pays === pays);
    if (from) rows = rows.filter((s) => s.createdAt >= from);
    if (to) rows = rows.filter((s) => s.createdAt <= to);
    if (q) {
      const needle = q.toLowerCase();
      rows = rows.filter((s) => JSON.stringify(s.data).toLowerCase().includes(needle));
    }
    rows = [...rows].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    const total = rows.length;
    return { rows: rows.slice(offset, offset + limit), total };
  }

  function getSubmission(id) {
    return submissions.find((s) => s.id === id) ?? null;
  }

  function updateSubmissionStatus(id, status) {
    const submission = getSubmission(id);
    if (!submission) return null;
    submission.status = status;
    return submission;
  }

  function createAppointment({ nom, email, societe = null, startAt, fuseau, demande = null, report = null, projectReference = null }) {
    const appointment = {
      id: randomUUID(),
      nom,
      email,
      societe,
      startAt,
      fuseau,
      demande,
      report,
      projectReference,
      status: 'en_attente',
      createdAt: new Date().toISOString(),
    };
    appointments.push(appointment);
    return appointment;
  }

  function listAppointments({ status, from, to } = {}) {
    let rows = appointments;
    if (status) rows = rows.filter((a) => a.status === status);
    if (from) rows = rows.filter((a) => a.startAt >= from);
    if (to) rows = rows.filter((a) => a.startAt <= to);
    return [...rows].sort((a, b) => (a.startAt > b.startAt ? 1 : -1));
  }

  function updateAppointmentStatus(id, status) {
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) return null;
    appointment.status = status;
    return appointment;
  }

  function isSlotTaken(startAt) {
    return appointments.some((a) => a.startAt === startAt && (a.status === 'en_attente' || a.status === 'confirme'));
  }

  function getAvailabilityTemplate() {
    return { ...template, slots: template.slots.map((s) => ({ ...s })) };
  }

  function setAvailabilityTemplate(next) {
    template = { ...next, slots: next.slots.map((s) => ({ ...s })) };
  }

  function getStats() {
    const submissionsByType = {};
    const submissionsByCountry = {};
    const byDay = {};
    for (const s of submissions) {
      submissionsByType[s.type] = (submissionsByType[s.type] ?? 0) + 1;
      if (s.pays) submissionsByCountry[s.pays] = (submissionsByCountry[s.pays] ?? 0) + 1;
      const day = s.createdAt.slice(0, 10);
      byDay[day] = (byDay[day] ?? 0) + 1;
    }
    const submissionsByDay = Object.entries(byDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
    const appointmentsByStatus = {};
    for (const a of appointments) {
      appointmentsByStatus[a.status] = (appointmentsByStatus[a.status] ?? 0) + 1;
    }
    return { submissionsByType, submissionsByCountry, submissionsByDay, appointmentsByStatus };
  }

  return {
    createSubmission,
    listSubmissions,
    getSubmission,
    updateSubmissionStatus,
    createAppointment,
    listAppointments,
    updateAppointmentStatus,
    isSlotTaken,
    getAvailabilityTemplate,
    setAvailabilityTemplate,
    getStats,
  };
}
