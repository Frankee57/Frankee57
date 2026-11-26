import { Router } from 'express';
import { submissionsToCsv, submissionsToXlsx } from '../export.js';

export function createAdminRouter(store) {
  const router = Router();

  router.get('/submissions', async (req, res) => {
    const { type, status, pays, q, from, to, limit, offset } = req.query;
    const result = await store.listSubmissions({
      type,
      status,
      pays,
      q,
      from,
      to,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    res.json(result);
  });

  router.get('/submissions/:id', async (req, res) => {
    const submission = await store.getSubmission(req.params.id);
    if (!submission) return res.status(404).json({ ok: false, message: 'Introuvable.' });
    res.json(submission);
  });

  router.patch('/submissions/:id', async (req, res) => {
    const submission = await store.updateSubmissionStatus(req.params.id, req.body.status);
    if (!submission) return res.status(404).json({ ok: false, message: 'Introuvable.' });
    res.json(submission);
  });

  router.get('/appointments', async (req, res) => {
    const { status, from, to } = req.query;
    res.json(await store.listAppointments({ status, from, to }));
  });

  router.patch('/appointments/:id', async (req, res) => {
    const appointment = await store.updateAppointmentStatus(req.params.id, req.body.status);
    if (!appointment) return res.status(404).json({ ok: false, message: 'Introuvable.' });
    res.json(appointment);
  });

  router.get('/availability', async (_req, res) => {
    res.json(await store.getAvailabilityTemplate());
  });

  router.put('/availability', async (req, res) => {
    await store.setAvailabilityTemplate(req.body);
    res.json(await store.getAvailabilityTemplate());
  });

  router.get('/stats', async (_req, res) => {
    res.json(await store.getStats());
  });

  router.get('/export.csv', async (req, res) => {
    const { rows } = await store.listSubmissions({ type: req.query.type, status: req.query.status, limit: 10000, offset: 0 });
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="soumissions.csv"');
    res.send(submissionsToCsv(rows));
  });

  router.get('/export.xlsx', async (req, res) => {
    const { rows } = await store.listSubmissions({ type: req.query.type, status: req.query.status, limit: 10000, offset: 0 });
    const buffer = await submissionsToXlsx(rows);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="soumissions.xlsx"');
    res.send(buffer);
  });

  return router;
}
