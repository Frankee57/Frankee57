import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Pool } = pg;

export function createPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL });
}

export async function runMigrations(pool) {
  const schemaPath = fileURLToPath(new URL('./schema.sql', import.meta.url));
  const schema = readFileSync(schemaPath, 'utf8');
  await pool.query(schema);
}
