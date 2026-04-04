CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  country TEXT,
  arrival_date TEXT,
  plan_slug TEXT NOT NULL,
  notes TEXT,
  source TEXT NOT NULL DEFAULT 'landing-page',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_plan_slug_idx ON orders(plan_slug);
