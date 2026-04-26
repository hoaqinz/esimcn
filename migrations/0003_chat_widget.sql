CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  visitor_name TEXT,
  visitor_phone TEXT,
  visitor_email TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  page_url TEXT,
  status TEXT NOT NULL DEFAULT 'bot',
  lead_stage TEXT NOT NULL DEFAULT 'new',
  handoff_requested INTEGER NOT NULL DEFAULT 0,
  handoff_reason TEXT,
  last_intent TEXT,
  last_message_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS chat_sessions_updated_at_idx ON chat_sessions(updated_at DESC);
CREATE INDEX IF NOT EXISTS chat_sessions_status_idx ON chat_sessions(status, handoff_requested, updated_at DESC);

CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  body TEXT NOT NULL,
  intent TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
);

CREATE INDEX IF NOT EXISTS chat_messages_session_idx ON chat_messages(session_id, created_at ASC);
