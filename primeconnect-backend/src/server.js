import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { requireAdminKey } from './middleware/adminAuth.js';
import { publicFormLimiter } from './middleware/rateLimit.js';
import { createAdminRouter } from './routes/admin.js';
import { createPublicRouter } from './routes/public.js';

export function createApp(store) {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/api', publicFormLimiter, createPublicRouter(store));
  app.use('/admin', requireAdminKey, createAdminRouter(store));

  return app;
}
