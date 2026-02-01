-- MindStory v2: saved sessions + items (allSummaries + selftest attempts)
-- Run:
--   npx wrangler d1 execute DB --file=./migrations/0002_learning_items.sql --local
--   npx wrangler d1 execute DB --file=./migrations/0002_learning_items.sql

PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS ms_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT DEFAULT '',
  source_text TEXT NOT NULL,
  source_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ms_sessions_user ON ms_sessions(user_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_ms_sessions_hash ON ms_sessions(source_hash);

CREATE TABLE IF NOT EXISTS ms_summaries (
  session_id TEXT PRIMARY KEY,
  all_summaries_json TEXT NOT NULL,  -- includes: brief/standard/detail with 4 views each
  engine_meta_json TEXT NOT NULL,    -- prompt/version, ratios, anchors, etc.
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(session_id) REFERENCES ms_sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ms_selftest_attempts (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  mode TEXT NOT NULL,         -- brief|standard|detail
  view_type TEXT NOT NULL,    -- selftest
  spec_json TEXT NOT NULL,    -- generation principles + scoring method
  questions_json TEXT NOT NULL,
  answers_json TEXT NOT NULL, -- user answers
  score INTEGER NOT NULL,     -- 0..100
  passed INTEGER NOT NULL,    -- 0/1 (>=90)
  created_at TEXT NOT NULL,
  FOREIGN KEY(session_id) REFERENCES ms_sessions(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_ms_attempts_session ON ms_selftest_attempts(session_id, created_at);
