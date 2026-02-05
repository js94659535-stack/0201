-- D1 migration: FALSE Bucket - 요약 검증 실패/품질 실패 결과 보관
-- Purpose: 디버깅, 모델 개선, 재시도 분석을 위한 실패 케이스 저장

CREATE TABLE IF NOT EXISTS ms_false_bucket (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  source TEXT NOT NULL,              -- "summary_v4" | "matrix_v4" | "quality_gate"
  reason TEXT NOT NULL,              -- "DETAIL_VALIDATION_FAIL" | "MODEL_JSON_PARSE_FAIL" | "RATIO_OUT_OF_RANGE" | "FORTRESS_FAIL" | ...
  errors TEXT NOT NULL,              -- JSON string array: ["error1", "error2", ...]
  input_hash TEXT NOT NULL,          -- SHA256 hash of input_text for deduplication
  input_text TEXT NOT NULL,          -- Original input text
  model TEXT,                        -- Model name: "gemini-2.0-flash" | "local-fallback" | null
  payload_json TEXT,                 -- Raw result (JSON string). 실패여도 최대한 저장
  retry_count INTEGER DEFAULT 0,     -- Number of retry attempts
  meta_json TEXT                     -- Additional metadata: {"phase": "phase1", "elapsedMs": 123, ...}
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_false_bucket_input_hash ON ms_false_bucket(input_hash);
CREATE INDEX IF NOT EXISTS idx_false_bucket_created_at ON ms_false_bucket(created_at);
CREATE INDEX IF NOT EXISTS idx_false_bucket_reason ON ms_false_bucket(reason);
CREATE INDEX IF NOT EXISTS idx_false_bucket_source ON ms_false_bucket(source);

-- Example queries:
-- 1. Get all failures by reason: SELECT * FROM ms_false_bucket WHERE reason = 'RATIO_OUT_OF_RANGE' ORDER BY created_at DESC LIMIT 10;
-- 2. Get duplicate failures: SELECT input_hash, COUNT(*) as count FROM ms_false_bucket GROUP BY input_hash HAVING count > 1;
-- 3. Get recent failures: SELECT * FROM ms_false_bucket ORDER BY created_at DESC LIMIT 20;
-- 4. Get failures by model: SELECT * FROM ms_false_bucket WHERE model = 'gemini-2.0-flash' AND reason = 'DETAIL_VALIDATION_FAIL';
