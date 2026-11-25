import { randomUUID } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export function saveUploadedFile(file) {
  const dir = process.env.UPLOADS_DIR ?? './uploads';
  mkdirSync(dir, { recursive: true });
  const id = randomUUID();
  const path = join(dir, id);
  writeFileSync(path, file.buffer);
  return { id, path, mimeType: file.mimetype, sizeBytes: file.size };
}
