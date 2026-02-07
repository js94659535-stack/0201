# 🚀 긴급 배포 가이드

## 현재 상황
- ✅ 코드: 최신 (GitHub Commit 35292dc)
- ✅ 빌드: 성공 (dist/_worker.js 90.41 kB)
- ❌ Cloudflare Worker: 구버전 (테스트 코드)

## 즉시 배포 (로컬 터미널)

```bash
cd /path/to/your/webapp

# 1. 최신 코드 Pull
git pull origin main

# 2. 빌드
npm run build

# 3. Wrangler 로그인 (최초 1회만)
npx wrangler login

# 4. 배포
npx wrangler deploy

# 5. 환경 변수 설정 (최초 1회만)
npx wrangler secret put GEMINI_API_KEY
# 프롬프트에서 API 키 입력
```

## 배포 확인

```bash
# Health Check
curl https://calm-fire-35e3.9535mind.workers.dev/api/health

# Matrix V4 Test
curl -X POST "https://calm-fire-35e3.9535mind.workers.dev/api/matrix" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "교육 시스템의 변화는 단순히 기술 도입을 넘어 학습자의 사고방식과 교사의 역할 재정립을 요구한다.",
    "level": "standard",
    "viewType": "narrative"
  }'
```

## 예상 결과

### Health API
```json
{
  "ok": true,
  "ts": "2026-02-07T07:45:00.000Z",
  "hasDB": false,
  "hasGeminiKey": true,
  "engineMode": "llm"
}
```

### Matrix V4 (성공 시)
```json
{
  "ok": true,
  "degraded": false,
  "engine": "matrix-v4",
  "mode": "standard",
  "view": "narrative",
  "data": { ... },
  "meta": { ... }
}
```

### Matrix V4 (LLM 없이 503)
```json
{
  "ok": false,
  "degraded": true,
  "engine": "fallback-extractive",
  "mode": "standard",
  "view": "narrative",
  "error": {
    "code": "LLM_TOTAL_FAILURE",
    "message": "All LLM attempts failed. NO FAKE ENGINE FALLBACK."
  }
}
```

## 문제 해결

### Q: "wrangler: command not found"
**A:** `npm install -g wrangler`

### Q: "Authentication failed"
**A:** `npx wrangler login` 다시 실행

### Q: 여전히 테스트 메시지가 나옴
**A:** 브라우저 캐시. Ctrl+Shift+R로 강제 새로고침

### Q: 503 에러가 계속 나옴
**A:** GEMINI_API_KEY 설정:
```bash
npx wrangler secret put GEMINI_API_KEY
```

또는 Cloudflare Dashboard:
1. https://dash.cloudflare.com/
2. Workers & Pages → calm-fire-35e3
3. Settings → Variables and Secrets
4. Add variable: GEMINI_API_KEY

---

## 📞 Support
- GitHub: https://github.com/js94659535-stack/0201
- Worker: https://calm-fire-35e3.9535mind.workers.dev/
