# FALSE Bucket 설정 가이드

FALSE Bucket은 요약 검증 실패 및 품질 실패 결과를 추적하기 위한 시스템입니다.

## 📋 목차
1. [개요](#개요)
2. [D1 데이터베이스 설정](#d1-데이터베이스-설정)
3. [마이그레이션 적용](#마이그레이션-적용)
4. [실패 케이스 확인](#실패-케이스-확인)
5. [분석 쿼리](#분석-쿼리)

---

## 개요

### 목적
- 디버깅: 실패한 요약 케이스 분석
- 모델 개선: 반복 실패 패턴 파악
- 재시도 분석: retry_count 기반 성공률 추적

### 기록되는 실패 유형
1. **DETAIL_JSON_PARSE_FAIL**: Gemini 응답 JSON 파싱 실패
2. **DETAIL_VALIDATION_FAIL**: detail 스키마 검증 실패
3. **NARRATIVE_FORTRESS_FAIL**: 생략부호/금칙어 발견 (phase2만)
4. **LEVEL_SEPARATION_FAIL**: brief ⊂ standard ⊂ detail 규칙 위반 (phase2만)

---

## D1 데이터베이스 설정

### 1. Cloudflare 대시보드에서 D1 생성

```bash
# Wrangler CLI 사용
wrangler d1 create webapp-db
```

**출력 예시:**
```
✅ Successfully created DB 'webapp-db'
Database ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 2. wrangler.jsonc에 바인딩 추가

`wrangler.jsonc` 파일에 다음 섹션을 추가:

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "webapp",
  "compatibility_date": "2024-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  
  // D1 바인딩 추가
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "webapp-db",
      "database_id": "YOUR-DATABASE-ID-HERE"
    }
  ]
}
```

⚠️ **주의**: `database_id`를 실제 생성된 ID로 교체하세요.

### 3. 로컬 개발 설정 (선택사항)

로컬 개발 시 로컬 D1 사용:

```bash
# 로컬 D1 자동 생성
npx wrangler dev
```

또는 `.dev.vars` 파일에 환경 변수 추가:

```
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
```

---

## 마이그레이션 적용

### 프로덕션 D1에 적용

```bash
wrangler d1 execute webapp-db --file=migrations/0003_false_bucket.sql
```

**성공 출력:**
```
🌀 Mapping SQL input into an array of statements
🌀 Executing on webapp-db (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx):
🚣 Executed 5 commands in 0.123s
```

### 로컬 D1에 적용

```bash
wrangler d1 execute webapp-db --local --file=migrations/0003_false_bucket.sql
```

### 마이그레이션 확인

테이블이 생성되었는지 확인:

```bash
wrangler d1 execute webapp-db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

**예상 출력:**
```
┌──────────────────┐
│ name             │
├──────────────────┤
│ summaries        │
│ learning_items   │
│ ms_false_bucket  │
└──────────────────┘
```

---

## 실패 케이스 확인

### 최근 실패 20건 조회

```bash
wrangler d1 execute webapp-db --command="
  SELECT id, created_at, source, reason, input_text 
  FROM ms_false_bucket 
  ORDER BY created_at DESC 
  LIMIT 20
"
```

### 특정 사유별 실패 조회

```bash
# DETAIL_JSON_PARSE_FAIL 케이스
wrangler d1 execute webapp-db --command="
  SELECT * FROM ms_false_bucket 
  WHERE reason = 'DETAIL_JSON_PARSE_FAIL'
  ORDER BY created_at DESC 
  LIMIT 10
"
```

### 중복 실패 확인

```bash
wrangler d1 execute webapp-db --command="
  SELECT input_hash, COUNT(*) as count 
  FROM ms_false_bucket 
  GROUP BY input_hash 
  HAVING count > 1 
  ORDER BY count DESC
"
```

---

## 분석 쿼리

### 1. 사유별 실패 건수

```sql
SELECT reason, COUNT(*) as count, 
       MAX(created_at) as last_failure
FROM ms_false_bucket
GROUP BY reason
ORDER BY count DESC;
```

### 2. 모델별 실패율

```sql
SELECT model, reason, COUNT(*) as count
FROM ms_false_bucket
GROUP BY model, reason
ORDER BY count DESC;
```

### 3. 시간대별 실패 추이 (최근 24시간)

```sql
SELECT strftime('%H', created_at) as hour,
       reason, COUNT(*) as count
FROM ms_false_bucket
WHERE created_at >= datetime('now', '-24 hours')
GROUP BY hour, reason
ORDER BY hour, count DESC;
```

### 4. 재시도 횟수 분포

```sql
SELECT retry_count, COUNT(*) as count
FROM ms_false_bucket
GROUP BY retry_count
ORDER BY retry_count;
```

### 5. 특정 입력 텍스트의 실패 이력

```sql
SELECT id, created_at, reason, model, retry_count
FROM ms_false_bucket
WHERE input_hash = 'YOUR-INPUT-HASH'
ORDER BY created_at DESC;
```

---

## 프로그래매틱 접근

### TypeScript 예제

```typescript
import { insertFalseBucket, queryRecentFailures } from './lib/false-bucket';

// 실패 기록
await insertFalseBucket(env.DB, {
  source: 'matrix_v4',
  reason: 'DETAIL_JSON_PARSE_FAIL',
  errors: ['Invalid JSON', 'Unexpected token'],
  input_text: rawText,
  model: 'gemini-2.0-flash',
  retry_count: 1,
  meta: { reqId, phase: 'phase2' }
});

// 최근 실패 조회
const failures = await queryRecentFailures(env.DB, 20);
console.log('Recent failures:', failures);
```

---

## 데이터베이스 스키마

```sql
CREATE TABLE IF NOT EXISTS ms_false_bucket (
  id TEXT PRIMARY KEY,              -- fb_TIMESTAMP_RANDOM
  created_at TEXT NOT NULL,         -- ISO 8601 timestamp
  source TEXT NOT NULL,             -- "matrix_v4" | "quality_gate"
  reason TEXT NOT NULL,             -- 실패 사유 코드
  errors TEXT NOT NULL,             -- JSON array: ["error1", "error2"]
  input_hash TEXT NOT NULL,         -- SHA256 hash of input_text
  input_text TEXT NOT NULL,         -- 원본 입력 텍스트
  model TEXT,                       -- "gemini-2.0-flash" | "local-fallback"
  payload_json TEXT,                -- 실패한 결과 (JSON string)
  retry_count INTEGER DEFAULT 0,    -- 재시도 횟수
  meta_json TEXT                    -- 추가 메타데이터 (JSON)
);

-- 인덱스
CREATE INDEX idx_false_bucket_input_hash ON ms_false_bucket(input_hash);
CREATE INDEX idx_false_bucket_created_at ON ms_false_bucket(created_at);
CREATE INDEX idx_false_bucket_reason ON ms_false_bucket(reason);
CREATE INDEX idx_false_bucket_source ON ms_false_bucket(source);
```

---

## 트러블슈팅

### 문제: "table ms_false_bucket already exists"

**원인**: 마이그레이션이 이미 적용됨
**해결**: 정상 상태입니다. 무시하거나 `IF NOT EXISTS` 확인

### 문제: "D1 database not available"

**원인**: wrangler.jsonc에 D1 바인딩이 없음
**해결**: [D1 데이터베이스 설정](#d1-데이터베이스-설정) 섹션 참고

### 문제: "Authentication failed"

**원인**: Cloudflare API 토큰 누락
**해결**: `wrangler login` 실행 또는 `.dev.vars`에 토큰 추가

---

## 참고 자료

- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Wrangler D1 명령](https://developers.cloudflare.com/workers/wrangler/commands/#d1)
- [FALSE Bucket 소스 코드](../src/lib/false-bucket.ts)
- [마이그레이션 파일](../migrations/0003_false_bucket.sql)

---

**마지막 업데이트**: 2026-02-05  
**버전**: 1.0.0
