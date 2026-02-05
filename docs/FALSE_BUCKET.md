# FALSE Bucket - 실패 추적 및 디버깅 시스템

## 📖 개요

FALSE Bucket은 Matrix V4 요약 엔진에서 발생하는 모든 검증 실패 및 품질 실패를 자동으로 기록하는 시스템입니다.

### 주요 목적
1. **디버깅**: 실패 원인 분석 및 재현
2. **모델 개선**: 반복적인 실패 패턴 식별
3. **재시도 분석**: 재시도 횟수 및 성공률 추적
4. **품질 모니터링**: 시간대별/모델별 실패율 추이

---

## 🗄️ 데이터베이스 스키마

### 테이블: `ms_false_bucket`

```sql
CREATE TABLE IF NOT EXISTS ms_false_bucket (
  id TEXT PRIMARY KEY,               -- 고유 ID: fb_${timestamp}_${random}
  created_at TEXT NOT NULL,          -- ISO 8601 timestamp
  source TEXT NOT NULL,              -- "matrix_v4" | "quality_gate"
  reason TEXT NOT NULL,              -- 실패 사유 코드
  errors TEXT NOT NULL,              -- JSON array: ["error1", "error2"]
  input_hash TEXT NOT NULL,          -- SHA256(input_text) for deduplication
  input_text TEXT NOT NULL,          -- 원본 입력 텍스트
  model TEXT,                        -- "gemini-2.0-flash" | "local-fallback" | null
  payload_json TEXT,                 -- 실패한 결과 (JSON string)
  retry_count INTEGER DEFAULT 0,     -- 재시도 횟수
  meta_json TEXT                     -- 추가 메타데이터
);
```

### 인덱스 (4개)
```sql
CREATE INDEX idx_false_bucket_input_hash ON ms_false_bucket(input_hash);
CREATE INDEX idx_false_bucket_created_at ON ms_false_bucket(created_at);
CREATE INDEX idx_false_bucket_reason ON ms_false_bucket(reason);
CREATE INDEX idx_false_bucket_source ON ms_false_bucket(source);
```

---

## 📝 기록되는 실패 유형

### 1. DETAIL_JSON_PARSE_FAIL
**발생 시점**: Gemini 응답이 유효한 JSON이 아닐 때

**예시**:
```javascript
{
  source: "matrix_v4",
  reason: "DETAIL_JSON_PARSE_FAIL",
  errors: ["detail JSON 파싱 실패", "Gemini 응답이 유효한 JSON이 아님"],
  model: "gemini-2.0-flash",
  payload_json: null  // 파싱 실패로 null
}
```

### 2. DETAIL_VALIDATION_FAIL
**발생 시점**: detail 스키마 검증 실패 시

**예시**:
```javascript
{
  source: "matrix_v4",
  reason: "DETAIL_VALIDATION_FAIL",
  errors: [
    "narrative.coreClaim missing",
    "structured.hierarchy must be array"
  ],
  payload_json: "{...}"  // 실패한 detail 객체 저장
}
```

### 3. NARRATIVE_FORTRESS_FAIL
**발생 시점**: 생략부호(`...`, `…`) 또는 금칙어 발견 시 (phase2만)

**예시**:
```javascript
{
  source: "matrix_v4",
  reason: "NARRATIVE_FORTRESS_FAIL",
  errors: [
    "ELLIPSIS_OR_TRUNCATION_FOUND",
    "FORBIDDEN_TOPIC_TOKEN_FOUND"
  ],
  payload_json: "{...}"  // brief/standard/detail 포함
}
```

### 4. LEVEL_SEPARATION_FAIL
**발생 시점**: brief ⊂ standard ⊂ detail 계층 규칙 위반 시 (phase2만)

**예시**:
```javascript
{
  source: "matrix_v4",
  reason: "LEVEL_SEPARATION_FAIL",
  errors: [
    "brief와 standard가 동일",
    "detail이 standard보다 짧음"
  ],
  payload_json: "{...}"
}
```

---

## 🔧 사용법

### TypeScript/JavaScript에서 사용

```typescript
import { insertFalseBucket } from './lib/false-bucket';

// 실패 기록 삽입
await insertFalseBucket(db, {
  source: 'matrix_v4',
  reason: 'CUSTOM_ERROR',
  errors: ['에러 메시지 1', '에러 메시지 2'],
  input_text: '원본 텍스트',
  model: 'gemini-2.0-flash',
  payload: { /* 실패한 결과 객체 */ },
  retry_count: 1,
  meta: { reqId: '...', phase: 'phase2', elapsedMs: 1234 }
});
```

---

## 📊 분석 쿼리 예시

### 1. 최근 실패 20건 조회
```sql
SELECT * FROM ms_false_bucket
ORDER BY created_at DESC
LIMIT 20;
```

### 2. 반복 실패 케이스 찾기 (동일 입력)
```sql
SELECT input_hash, COUNT(*) as count, 
       MAX(created_at) as last_fail,
       MIN(created_at) as first_fail
FROM ms_false_bucket
GROUP BY input_hash
HAVING count > 2
ORDER BY count DESC;
```

### 3. 모델별 실패 통계
```sql
SELECT model, reason, COUNT(*) as count
FROM ms_false_bucket
GROUP BY model, reason
ORDER BY count DESC;
```

### 4. 시간대별 실패 추이 (최근 24시간)
```sql
SELECT strftime('%H', created_at) as hour,
       reason, COUNT(*) as count
FROM ms_false_bucket
WHERE created_at >= datetime('now', '-24 hours')
GROUP BY hour, reason
ORDER BY hour, count DESC;
```

### 5. 재시도 분포 분석
```sql
SELECT retry_count, COUNT(*) as count
FROM ms_false_bucket
GROUP BY retry_count
ORDER BY retry_count;
```

### 6. 특정 사유로 실패한 케이스 조회
```sql
SELECT id, created_at, input_text, errors
FROM ms_false_bucket
WHERE reason = 'NARRATIVE_FORTRESS_FAIL'
ORDER BY created_at DESC
LIMIT 10;
```

### 7. 입력 길이별 실패율
```sql
SELECT 
  CASE 
    WHEN length(input_text) < 100 THEN '0-100'
    WHEN length(input_text) < 500 THEN '100-500'
    WHEN length(input_text) < 1000 THEN '500-1000'
    ELSE '1000+'
  END as length_range,
  COUNT(*) as count
FROM ms_false_bucket
GROUP BY length_range
ORDER BY length_range;
```

---

## 🔍 디버깅 워크플로우

### 단계 1: 실패 케이스 식별
```sql
-- 가장 빈번한 실패 유형 파악
SELECT reason, COUNT(*) as count
FROM ms_false_bucket
GROUP BY reason
ORDER BY count DESC;
```

### 단계 2: 특정 실패 상세 분석
```sql
-- FORTRESS_FAIL 케이스 분석
SELECT id, errors, input_text, payload_json
FROM ms_false_bucket
WHERE reason = 'NARRATIVE_FORTRESS_FAIL'
LIMIT 5;
```

### 단계 3: 재현 테스트
```bash
# input_text를 복사하여 로컬에서 재현
curl -X POST http://localhost:8787/api/matrix \
  -H "Content-Type: application/json" \
  -d '{"text":"<복사한 input_text>","level":"detail"}'
```

### 단계 4: 수정 후 검증
```sql
-- 수정 후 동일 입력으로 재시도
-- 새로운 실패 기록이 생성되지 않는지 확인
SELECT * FROM ms_false_bucket
WHERE input_hash = '<해당 해시>'
ORDER BY created_at DESC;
```

---

## 🚀 D1 마이그레이션 적용

### 로컬 개발 환경
```bash
# wrangler.toml에 D1 바인딩 추가 후
wrangler d1 execute DB --file=migrations/0003_false_bucket.sql --local
```

### 프로덕션 환경
```bash
wrangler d1 execute DB --file=migrations/0003_false_bucket.sql
```

---

## 📈 모니터링 및 알림

### 실패율 임계값 모니터링
```sql
-- 최근 1시간 실패 건수 확인
SELECT COUNT(*) as failure_count
FROM ms_false_bucket
WHERE created_at >= datetime('now', '-1 hour');
```

### 특정 모델 실패율
```sql
-- Gemini 실패율
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN reason != 'OK' THEN 1 ELSE 0 END) as failures,
  ROUND(SUM(CASE WHEN reason != 'OK' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as failure_rate_pct
FROM ms_false_bucket
WHERE model LIKE 'gemini%'
  AND created_at >= datetime('now', '-1 day');
```

---

## 🛠️ 유지보수

### 오래된 실패 기록 정리 (선택적)
```sql
-- 90일 이상 된 기록 삭제
DELETE FROM ms_false_bucket
WHERE created_at < datetime('now', '-90 days');
```

### 디스크 사용량 확인
```sql
-- 테이블 크기 추정
SELECT 
  COUNT(*) as total_records,
  SUM(length(input_text)) as total_input_size,
  SUM(length(payload_json)) as total_payload_size,
  ROUND(SUM(length(input_text) + COALESCE(length(payload_json), 0)) / 1024.0 / 1024.0, 2) as total_mb
FROM ms_false_bucket;
```

---

## 📌 참고 사항

1. **input_hash**: SHA256 해시를 사용하여 동일한 입력에 대한 중복 실패를 추적
2. **payload_json**: 실패한 경우에도 최대한 결과를 저장하여 디버깅 용이
3. **retry_count**: 현재는 수동으로 설정, 향후 자동 재시도 시스템과 통합 가능
4. **meta_json**: 추가 컨텍스트 정보 (reqId, phase, elapsedMs 등)

---

## 🔗 관련 파일

- **마이그레이션**: `migrations/0003_false_bucket.sql`
- **유틸리티**: `src/lib/false-bucket.ts`
- **통합**: `src/routes/matrix-v4.ts`

---

## 📝 버전 히스토리

- **v1.0.0** (2026-02-05): 초기 FALSE Bucket 시스템 구축
  - 4가지 실패 유형 추적
  - D1 테이블 및 인덱스 생성
  - matrix-v4.ts 통합 완료
