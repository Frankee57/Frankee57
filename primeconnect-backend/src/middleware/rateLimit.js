import rateLimit from 'express-rate-limit';

export const publicFormLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({ ok: false, message: 'Trop de tentatives, réessayez plus tard.' });
  },
});
