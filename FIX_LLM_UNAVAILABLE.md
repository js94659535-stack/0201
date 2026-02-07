# 🚨 LLM_UNAVAILABLE 해결 가이드

## 현재 문제
```
phase: S1_FAIL
cross_errors: LLM_UNAVAILABLE
ratios: all 0.000
```

**원인:** Gemini API 키가 설정되지 않았거나 잘못됨

---

## 즉시 해결 방법

### 방법 1: Cloudflare Dashboard에서 환경 변수 추가

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com/

2. **프로젝트 선택**
   - Workers & Pages → Your Project

3. **환경 변수 추가**
   - Settings → Environment variables
   - Add variable 클릭

4. **변수 설정**
   ```
   Variable name: GEMINI_API_KEY
   Value: [당신의 실제 Gemini API 키]
   Environment: Production
   ```

5. **저장 및 재배포**
   - Save 클릭
   - Deployments → Retry deployment

---

## Gemini API 키 발급 방법

### 1단계: Google AI Studio 접속
- URL: https://makersuite.google.com/app/apikey
- 또는: https://aistudio.google.com/app/apikey

### 2단계: API 키 생성
1. "Get API key" 또는 "Create API key" 클릭
2. 프로젝트 선택 (또는 새 프로젝트 생성)
3. API 키 복사

### 3단계: 키 형식 확인
```
AIzaSy...  (길이: 약 39자)
```

---

## 환경 변수 없이 테스트 (로컬 전용)

### Local Development Server
```bash
cd /path/to/your/webapp

# .env 파일 생성
cat > .env << 'EOF'
GEMINI_API_KEY=AIzaSy_your_actual_key_here
EOF

# 로컬 실행
npm run dev
```

---

## 예상 결과

### ❌ API 키 없을 때
```json
{
  "ok": false,
  "degraded": true,
  "engine": "fallback-extractive",
  "error": {
    "code": "LLM_TOTAL_FAILURE",
    "message": "All LLM attempts failed. NO FAKE ENGINE FALLBACK."
  },
  "meta": {
    "phase": "S1_FAIL",
    "cross_errors": ["LLM_UNAVAILABLE"]
  }
}
```

### ✅ API 키 있을 때
```json
{
  "ok": true,
  "degraded": false,
  "engine": "matrix-v4",
  "mode": "standard",
  "view": "narrative",
  "data": {
    "schemaVersion": "ms-v4",
    "views": {
      "narrative": {
        "brief": "...",
        "standard": "...",
        "detail": "..."
      }
    }
  },
  "meta": {
    "phase": "S3_ASSEMBLY",
    "engineMeta": "matrix-v4",
    "strictMetrics": { ... }
  }
}
```

---

## UI 수정 (에러 메시지 개선)

### 수정 전
```
오류: [object Object]
```

### 수정 후
```
LLM_UNAVAILABLE: All LLM attempts failed. NO FAKE ENGINE FALLBACK.
```

또는
```
LLM_TOTAL_FAILURE: Gemini API 키가 설정되지 않았습니다.
```

---

## 문제 해결 체크리스트

- [ ] Cloudflare Dashboard에 GEMINI_API_KEY 추가
- [ ] API 키 형식 확인 (AIzaSy로 시작)
- [ ] 환경: Production 선택
- [ ] 저장 후 재배포
- [ ] 배포 완료 대기 (1-2분)
- [ ] 테스트: 요약 재실행
- [ ] 결과: engine: "matrix-v4" 확인

---

## 다음 단계

1. ✅ UI 수정 (에러 메시지 개선) - 완료
2. ⏳ GEMINI_API_KEY 설정 - 필요
3. ⏳ 재배포 - 자동
4. ⏳ 테스트 - 필요

**GEMINI_API_KEY를 설정하면 정상 작동합니다!**
