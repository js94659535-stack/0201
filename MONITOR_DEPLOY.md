# 🔍 Cloudflare 배포 모니터링 가이드

## 현재 상황
- ✅ GitHub 최신 커밋: `90b3529`
- ✅ D1 설정 제거: wrangler.jsonc 수정 완료
- ⏳ Cloudflare 배포: 진행 중 (1-2분)

---

## 배포 로그에서 확인할 핵심 항목

### ✅ 성공 지표

#### 1. 올바른 커밋 체크아웃
```
HEAD is now at 90b3529 chore: Force Cloudflare redeploy
```
또는
```
HEAD is now at fe568b2 fix: Remove D1 database config
```

**❌ 실패 지표:**
```
HEAD is now at 2880f60 docs: Add Cloudflare auto-deploy setup guide
```
→ 이전 커밋을 배포하고 있음!

#### 2. Wrangler 설정 읽기 성공
```
Successfully read wrangler.toml file.
```

**❌ D1 에러가 없어야 함:**
```
Error 8000022: Invalid database UUID (local-dev)
```

#### 3. 빌드 성공
```
✓ 43 modules transformed.
dist/_worker.js  90.41 kB
✓ built in 400ms
```

#### 4. 업로드 성공
```
✨ Success! Uploaded 12 files
```

#### 5. 배포 완료
```
Success: Assets published!
```

**❌ 에러 없음:**
```
Error: Failed to publish your Function.
```

---

## Dashboard에서 확인

### 1. Deployments 탭
- URL: https://dash.cloudflare.com/
- Workers & Pages → Your Project → Deployments

### 2. 최신 배포 상태 확인
- **Status**: 
  - ⏳ Building / Deploying
  - ✅ Success
  - ❌ Failed

### 3. Build 로그 확인
- 실패 시: "View build" → 로그 전체 확인
- 성공 시: Deployment URL 복사

---

## 배포 성공 후 테스트

### Test 1: Health API
```bash
curl https://your-url.pages.dev/api/health
```

**예상 응답:**
```json
{
  "ok": true,
  "ts": "2026-02-07T08:30:00.000Z",
  "hasDB": false,
  "hasGeminiKey": true,
  "engineMode": "llm"
}
```

### Test 2: Matrix V4
```bash
curl -X POST "https://your-url.pages.dev/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "교육 시스템의 변화는 단순히 기술 도입을 넘어 학습자의 사고방식과 교사의 역할 재정립을 요구한다.",
    "level": "standard",
    "viewType": "narrative"
  }'
```

**예상 응답 (GEMINI_API_KEY 있을 때):**
```json
{
  "ok": true,
  "degraded": false,
  "engine": "matrix-v4",
  "mode": "standard",
  "view": "narrative",
  "data": { ... }
}
```

**예상 응답 (GEMINI_API_KEY 없을 때):**
```json
{
  "ok": false,
  "degraded": true,
  "engine": "fallback-extractive",
  "error": {
    "code": "LLM_TOTAL_FAILURE",
    "message": "All LLM attempts failed. NO FAKE ENGINE FALLBACK."
  }
}
```

---

## 문제 해결

### Q: 여전히 2880f60 커밋을 배포함
**A:** Cloudflare 캐시 문제
1. Settings → Builds & deployments
2. Clear build cache
3. Retry deployment

### Q: 여전히 D1 에러
**A:** wrangler.jsonc 확인
```bash
cd /path/to/your/webapp
cat wrangler.jsonc
# d1_databases 섹션이 없어야 함!
```

### Q: 빌드는 성공하는데 배포 실패
**A:** 환경 변수 문제
1. Settings → Environment variables
2. GEMINI_API_KEY 확인 (없어도 배포는 성공해야 함)

---

## 타임라인

| 시간 | 이벤트 |
|------|--------|
| 08:20 | 첫 배포 시도 (2880f60) - D1 에러 |
| 08:23 | wrangler.jsonc 수정 (fe568b2) |
| 08:24 | 푸시 완료 |
| 08:26 | 두 번째 배포 시도 (2880f60) - 여전히 구버전! |
| 08:29 | 더미 커밋 (90b3529) - 강제 재배포 |
| 08:30 | 세 번째 배포 진행 중... ⏳ |

---

## 예상 결과

### ✅ 성공 시나리오
1. 빌드 로그: `HEAD is now at 90b3529` 또는 `fe568b2`
2. 빌드: 성공 (90.41 kB)
3. 업로드: 성공
4. 배포: 성공
5. **에러 없음!**

### ✅ 테스트 성공
- `/api/health`: 200 OK
- `/api/matrix`: 200 OK (또는 503 LLM 에러, 정상)
- `/api/engine`: 200 OK

---

## 다음 단계

1. ⏳ 1-2분 대기
2. 🔍 Cloudflare Dashboard 확인
3. ✅ 배포 성공 확인
4. 🧪 API 테스트
5. 🎉 완료!

**배포가 완료되면 URL을 알려주세요!**
