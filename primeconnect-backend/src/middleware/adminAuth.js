export function requireAdminKey(req, res, next) {
  const provided = req.header('x-admin-key');
  if (!provided || provided !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ ok: false, message: 'Clé administrateur invalide.' });
  }
  next();
}
