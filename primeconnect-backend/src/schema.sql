CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('contact', 'carriere', 'partenaire', 'projet')),
  status text NOT NULL DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'lu', 'traite', 'archive')),
  pays text,
  source text,
  reference text UNIQUE,
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  email text NOT NULL,
  societe text,
  start_at timestamptz NOT NULL,
  fuseau text NOT NULL,
  demande text,
  report text,
  project_reference text,
  status text NOT NULL DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'confirme', 'annule', 'reporte')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS appointments_active_slot_idx
  ON appointments (start_at)
  WHERE status IN ('en_attente', 'confirme');

CREATE TABLE IF NOT EXISTS availability_template (
  id int PRIMARY KEY DEFAULT 1,
  slots jsonb NOT NULL DEFAULT '[]',
  slot_duration_minutes int NOT NULL DEFAULT 30,
  timezone text NOT NULL DEFAULT 'Europe/Paris',
  CONSTRAINT availability_template_single_row CHECK (id = 1)
);

INSERT INTO availability_template (id, slots, slot_duration_minutes, timezone)
VALUES (
  1,
  '[{"weekday":1,"start":"09:00","end":"18:00"},{"weekday":2,"start":"09:00","end":"18:00"},{"weekday":3,"start":"09:00","end":"18:00"},{"weekday":4,"start":"09:00","end":"18:00"},{"weekday":5,"start":"09:00","end":"18:00"}]',
  30,
  'Europe/Paris'
)
ON CONFLICT (id) DO NOTHING;
