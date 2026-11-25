import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import multer from 'multer';
import { contactSchema, careerSchema, partnerApplicationSchema, projectSchema } from '../validation/schemas.js';
import { saveUploadedFile } from '../files.js';

const ARRAY_FIELDS = new Set(['langues', 'missions', 'jours', 'activites']);
const CV_MAX_BYTES = 1363148.8;
const PARTNER_MAX_FILES = 3;
const PARTNER_MAX_BYTES_EACH = 1363148.8;
const PARTNER_MAX_BYTES_TOTAL = 3984588.8;
const ALLOWED_FILE_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);

function formToObject(body) {
  const result = {};
  for (const [key, value] of Object.entries(body)) {
    if (ARRAY_FIELDS.has(key)) {
      result[key] = Array.isArray(value) ? value : [value];
    } else if (key === 'consentement') {
      result[key] = value === true || value === 'true' || value === 'on';
    } else {
      result[key] = value;
    }
  }
  for (const key of ARRAY_FIELDS) {
    if (!(key in result)) result[key] = [];
  }
  return result;
}

function fieldErrorsFrom(zodError) {
  const errors = {};
  for (const issue of zodError.issues) {
    const field = String(issue.path[0] ?? '_');
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}

function newReference() {
  return `PC-${Date.now().toString(36).toUpperCase()}`;
}

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export function createPublicRouter(store) {
  const router = Router();

  router.post('/contact/', async (req, res) => {
    const parsed = contactSchema.safeParse(formToObject(req.body));
    if (!parsed.success) {
      return res.status(400).json({ ok: false, errors: fieldErrorsFrom(parsed.error) });
    }
    const reference = newReference();
    await store.createSubmission({ type: 'contact', pays: parsed.data.pays, source: '/contact/', reference, data: parsed.data });
    res.json({ ok: true, redirect: '/merci/contact/' });
  });

  router.post('/carrieres/', upload.single('cv'), async (req, res) => {
    const parsed = careerSchema.safeParse(formToObject(req.body));
    const errors = parsed.success ? {} : fieldErrorsFrom(parsed.error);

    const cv = req.file;
    if (cv) {
      if (!ALLOWED_FILE_TYPES.has(cv.mimetype)) {
        errors.cv = 'Le CV doit être un PDF, JPG ou PNG.';
      } else if (cv.size > CV_MAX_BYTES) {
        errors.cv = 'Le CV doit faire 1,3 Mo au maximum.';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ ok: false, errors });
    }

    const reference = newReference();
    const data = { ...parsed.data };
    if (cv) data.cv = saveUploadedFile(cv);
    await store.createSubmission({ type: 'carriere', pays: null, source: '/carrieres/', reference, data });
    res.json({ ok: true, redirect: '/merci/carrieres/' });
  });

  router.post('/partenaire/', upload.array('documents', PARTNER_MAX_FILES + 1), async (req, res) => {
    const parsed = partnerApplicationSchema.safeParse(formToObject(req.body));
    const errors = parsed.success ? {} : fieldErrorsFrom(parsed.error);

    const documents = req.files ?? [];
    if (documents.length > PARTNER_MAX_FILES) {
      errors.documents = `${PARTNER_MAX_FILES} fichiers au maximum.`;
    } else {
      const badType = documents.find((f) => !ALLOWED_FILE_TYPES.has(f.mimetype));
      const tooBig = documents.find((f) => f.size > PARTNER_MAX_BYTES_EACH);
      const total = documents.reduce((sum, f) => sum + f.size, 0);
      if (badType) {
        errors.documents = `« ${badType.originalname} » n'est pas un PDF, JPG ou PNG.`;
      } else if (tooBig) {
        errors.documents = 'Chaque fichier doit faire 1,3 Mo au maximum.';
      } else if (total > PARTNER_MAX_BYTES_TOTAL) {
        errors.documents = 'Les fichiers dépassent 3,8 Mo au total.';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ ok: false, errors });
    }

    const reference = newReference();
    const data = { ...parsed.data, documents: documents.map((f) => saveUploadedFile(f)) };
    await store.createSubmission({ type: 'partenaire', pays: parsed.data.pays_centre, source: '/devenir-partenaire/', reference, data });
    res.json({ ok: true, redirect: '/merci/partenaire/' });
  });

  router.post('/projet/', async (req, res) => {
    const parsed = projectSchema.safeParse(formToObject(req.body));
    if (!parsed.success) {
      return res.status(400).json({ ok: false, errors: fieldErrorsFrom(parsed.error) });
    }
    const reference = newReference();
    await store.createSubmission({ type: 'projet', pays: parsed.data.pays, source: '/configurer-mon-projet/', reference, data: parsed.data });
    res.json({ ok: true, reference, email: { prospect: false }, bookingToken: reference });
  });

  return router;
}

export { formToObject, fieldErrorsFrom, newReference };
