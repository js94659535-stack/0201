-- D1 migration: summaries 저장/불러오기
CREATE TABLE IF NOT EXISTS summaries (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  textHash TEXT NOT NULL,
  originalText TEXT NOT NULL,
  allSummariesJson TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_summaries_user ON summaries(userId);
CREATE INDEX IF NOT EXISTS idx_summaries_hash ON summaries(textHash);
