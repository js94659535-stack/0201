# 🚨 CRITICAL: Cloudflare Pages 환경 변수 설정 가이드

## 문제 상황
- ❌ `LLM_UNAVAILABLE` 에러 지속
- ❌ `GEMINI_API_KEY`가 런타임에 전달되지 않음
- ❌ 터미널에서 `wrangler pages secret` 명령 실행 불가 (API 토큰 없음)

## 해결 방법

### ✅ Cloudflare Dashboard에서 환경 변수 설정 (필수!)

1. **접속**: https://dash.cloudflare.com/
2. **경로**: `Workers & Pages` → `webapp` → `Settings` → `Environment variables`
3. **Production 탭**에서:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSy...` (실제 Gemini API 키)
   - **Save and Deploy** 클릭

4. **배포 대기**: 1-2분 후 자동 재배포 완료
5. **테스트**: https://webapp.pages.dev 접속 후 요약 버튼 클릭

---

## 확인 방법

### 1. Console 로그 확인 (F12)
```
[ENV_KEYS] ['GEMINI_API_KEY']
[ENV] GEMINI_API_KEY exists? true
[ENV] GEMINI_API_KEY length: 39
```

### 2. Network 탭에서 Response Headers 확인
```
X-MS-Build: V4-FORTRESS-2026-02-07T09-35-47
X-MS-Phase: phase2
X-MS-Engine: matrix-v4
```

### 3. API 응답 확인
```json
{
  "ok": true,
  "data": {
    "narrative": {
      "brief": "...",
      "standard": "...",
      "detail": "..."
    }
  },
  "meta": {
    "engine": "matrix-v4",
    "level": "standard",
    "viewType": "narrative"
  }
}
```

---

## 대체 방법 (로컬 개발)

로컬에서 테스트하려면:

```bash
# 1. .dev.vars 파일 생성
echo "GEMINI_API_KEY=AIzaSy..." > .dev.vars

# 2. 로컬 서버 시작
npm run dev

# 3. 브라우저에서 http://localhost:3000 접속
```

---

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| `LLM_UNAVAILABLE` | Dashboard에서 환경 변수 미설정 | 위 Step 1-3 수행 |
| `[ENV_KEYS] []` | c.env 비어 있음 | 배포 재시도 (1-2분 대기) |
| `엔진: undefined` | 프론트엔드 캐시 | 하드 새로고침 (Ctrl+Shift+R) |
| `buildId: 날짜만` | 구버전 배포 | 강제 재배포 필요 |

---

## 현재 상태

- ✅ 코드 수정 완료 (커밋 `7805d47`)
- ✅ GitHub 푸시 완료
- ✅ Cloudflare 자동 배포 트리거됨
- ❌ **GEMINI_API_KEY Dashboard 설정 대기 중** ← **🚨 필수!**

---

**지금 바로 Dashboard에서 GEMINI_API_KEY를 설정해주세요!** 🚀
