function rowToSubmission(row) {
  return {
    id: row.id,
    type: row.type,
    status: row.status,
    pays: row.pays,
    source: row.source,
    reference: row.reference,
    data: row.data,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  };
}

function rowToAppointment(row) {
  return {
    id: row.id,
    nom: row.nom,
    email: row.email,
    societe: row.societe,
    startAt: row.start_at instanceof Date ? row.start_at.toISOString() : row.start_at,
    fuseau: row.fuseau,
    demande: row.demande,
    report: row.report,
    projectReference: row.project_reference,
    status: row.status,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  };
}

/**
 * @param {import('pg').Pool} pool
 * @returns {import('./store.js').Store}
 */
export function createStore(pool) {
  async function createSubmission({ type, pays = null, source = null, reference = null, data }) {
    const { rows } = await pool.query(
      `INSERT INTO submissions (type, pays, source, reference, data)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [type, pays, source, reference, data]
    );
    return rowToSubmission(rows[0]);
  }

  async function listSubmissions({ type, status, pays, q, from, to, limit = 50, offset = 0 } = {}) {
    const conditions = [];
    const params = [];
    const add = (sql, value) => {
      params.push(value);
      conditions.push(sql.replace('?', `$${params.length}`));
    };
    if (type) add('type = ?', type);
    if (status) add('status = ?', status);
    if (pays) add('pays = ?', pays);
    if (from) add('created_at >= ?', from);
    if (to) add('created_at <= ?', to);
    if (q) add("data::text ILIKE ?", `%${q}%`);
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const totalResult = await pool.query(`SELECT count(*)::int AS total FROM submissions ${where}`, params);
    const rowsResult = await pool.query(
      `SELECT * FROM submissions ${where} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    );
    return { rows: rowsResult.rows.map(rowToSubmission), total: totalResult.rows[0].total };
  }

  async function getSubmission(id) {
    const { rows } = await pool.query('SELECT * FROM submissions WHERE id = $1', [id]);
    return rows[0] ? rowToSubmission(rows[0]) : null;
  }

  async function updateSubmissionStatus(id, status) {
    const { rows } = await pool.query('UPDATE submissions SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    return rows[0] ? rowToSubmission(rows[0]) : null;
  }

  async function createAppointment({ nom, email, societe = null, startAt, fuseau, demande = null, report = null, projectReference = null }) {
    const { rows } = await pool.query(
      `INSERT INTO appointments (nom, email, societe, start_at, fuseau, demande, report, project_reference)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [nom, email, societe, startAt, fuseau, demande, report, projectReference]
    );
    return rowToAppointment(rows[0]);
  }

  async function listAppointments({ status, from, to } = {}) {
    const conditions = [];
    const params = [];
    const add = (sql, value) => {
      params.push(value);
      conditions.push(sql.replace('?', `$${params.length}`));
    };
    if (status) add('status = ?', status);
    if (from) add('start_at >= ?', from);
    if (to) add('start_at <= ?', to);
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const { rows } = await pool.query(`SELECT * FROM appointments ${where} ORDER BY start_at ASC`, params);
    return rows.map(rowToAppointment);
  }

  async function updateAppointmentStatus(id, status) {
    const { rows } = await pool.query('UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    return rows[0] ? rowToAppointment(rows[0]) : null;
  }

  async function isSlotTaken(startAt) {
    const { rows } = await pool.query(
      `SELECT 1 FROM appointments WHERE start_at = $1 AND status IN ('en_attente', 'confirme') LIMIT 1`,
      [startAt]
    );
    return rows.length > 0;
  }

  async function getAvailabilityTemplate() {
    const { rows } = await pool.query('SELECT * FROM availability_template WHERE id = 1');
    const row = rows[0];
    return { slots: row.slots, slotDurationMinutes: row.slot_duration_minutes, timezone: row.timezone };
  }

  async function setAvailabilityTemplate(template) {
    await pool.query(
      `UPDATE availability_template SET slots = $1, slot_duration_minutes = $2, timezone = $3 WHERE id = 1`,
      [JSON.stringify(template.slots), template.slotDurationMinutes, template.timezone]
    );
  }

  async function getStats() {
    const [byType, byCountry, byDay, byApptStatus] = await Promise.all([
      pool.query('SELECT type, count(*)::int AS count FROM submissions GROUP BY type'),
      pool.query('SELECT pays, count(*)::int AS count FROM submissions WHERE pays IS NOT NULL GROUP BY pays'),
      pool.query(
        `SELECT to_char(created_at, 'YYYY-MM-DD') AS date, count(*)::int AS count
         FROM submissions GROUP BY date ORDER BY date ASC`
      ),
      pool.query('SELECT status, count(*)::int AS count FROM appointments GROUP BY status'),
    ]);
    return {
      submissionsByType: Object.fromEntries(byType.rows.map((r) => [r.type, r.count])),
      submissionsByCountry: Object.fromEntries(byCountry.rows.map((r) => [r.pays, r.count])),
      submissionsByDay: byDay.rows,
      appointmentsByStatus: Object.fromEntries(byApptStatus.rows.map((r) => [r.status, r.count])),
    };
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
