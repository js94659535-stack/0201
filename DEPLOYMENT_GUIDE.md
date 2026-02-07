# 🚀 MINDSTORY MATRIX - Cloudflare Pages 배포 가이드

## 📋 프로젝트 정보

- **프로젝트 이름**: `mindstory-matrix`
- **GitHub 저장소**: https://github.com/js94659535-stack/0201
- **Cloudflare Pages URL**: https://mindstory-matrix.pages.dev
- **최신 커밋**: 350017f

---

## ✅ STEP 1: Cloudflare Pages 프로젝트 생성

### 1-1. Cloudflare Dashboard 접속
```
https://dash.cloudflare.com
```

### 1-2. Workers & Pages 섹션
- 좌측 메뉴에서 **Workers & Pages** 클릭
- **Create application** 버튼 클릭
- **Pages** 탭 선택
- **Connect to Git** 클릭

### 1-3. GitHub 연동
- **GitHub** 선택
- 저장소 선택: `js94659535-stack/0201`
- 브랜치: `main`

### 1-4. 빌드 설정
```
Project name: mindstory-matrix
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: (leave empty)
```

### 1-5. Environment Variables (중요!)
**Production 탭에서 환경 변수 추가:**

| Variable name | Value | 비고 |
|--------------|-------|------|
| `GEMINI_API_KEY` | `AIzaSy...` (실제 키) | **필수** 39자 이상 |
| `GEMINI_MODEL` | `gemini-2.0-flash-exp` | 선택 (기본값 있음) |
| `NODE_ENV` | `production` | 자동 설정됨 |

### 1-6. 배포 시작
- **Save and Deploy** 클릭
- 배포 완료 대기 (1-2분)

---

## ✅ STEP 2: Health Check 테스트

### 2-1. Health Check 엔드포인트 접속
```
https://mindstory-matrix.pages.dev/api/health
```

### 2-2. 응답 확인

#### ✅ 성공 시 (API 키 정상):
```json
{
  "ok": true,
  "status": "READY",
  "message": "✅ Gemini API Key Detected - Ready to serve!",
  "env_debug": {
    "all_env_keys": ["GEMINI_API_KEY", "NODE_ENV"],
    "gemini": {
      "detected": true,
      "key_length": 39,
      "key_preview": "AIzaSy..."
    }
  }
}
```

#### ❌ 실패 시 (API 키 미등록):
```json
{
  "ok": false,
  "status": "NOT_READY",
  "message": "❌ No valid API keys found",
  "env_debug": {
    "gemini": {
      "detected": false,
      "key_length": 0,
      "key_preview": "NOT_SET"
    }
  }
}
```

**실패 시 조치:**
1. Dashboard → Workers & Pages → mindstory-matrix → Settings
2. Environment variables → Production 탭
3. GEMINI_API_KEY 추가/수정
4. Save and Deploy
5. 1-2분 대기 후 재테스트

---

## ✅ STEP 3: 메인 기능 테스트

### 3-1. 메인 페이지 접속
```
https://mindstory-matrix.pages.dev
```

### 3-2. 요약 기능 테스트
1. 텍스트 입력 (100자 이상 권장)
2. 레벨 선택 (Brief/Standard/Detail)
3. **요약** 버튼 클릭
4. 결과 확인

### 3-3. 브라우저 콘솔 디버깅 (F12)
```javascript
// RAW_RESPONSE 확인
console.log('RAW_RESPONSE:', RAW_RESPONSE);

// 환경 변수 상태 확인
console.log('ENV Debug:', RAW_RESPONSE.meta.envDebug);

// API 키 감지 여부
console.log('Has Gemini:', RAW_RESPONSE.meta.envDebug.hasGemini);
```

---

## 🔧 트러블슈팅

### 문제 1: LLM_UNAVAILABLE 에러
**원인**: GEMINI_API_KEY가 런타임에 전달되지 않음

**해결**:
1. `/api/health` 접속하여 `status: NOT_READY` 확인
2. Dashboard → Environment variables → GEMINI_API_KEY 등록
3. Save and Deploy
4. 1-2분 대기 후 재테스트

---

### 문제 2: [object Object] 출력
**원인**: 이미 해결됨 (커밋 e39fdad)

**확인**:
```javascript
// 브라우저 콘솔에서
console.log(typeof RAW_RESPONSE.data.narrative); // "string"이어야 함
```

---

### 문제 3: 환경 변수가 보이지 않음
**원인**: 캐시 문제

**해결**:
1. 하드 새로고침: `Ctrl+Shift+R` (Windows/Linux) 또는 `Cmd+Shift+R` (Mac)
2. 시크릿 모드에서 재테스트
3. Cloudflare Dashboard에서 **Purge Cache** 실행

---

## 📊 주요 엔드포인트

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/api/health` | GET | 환경 변수 및 API 키 상태 확인 |
| `/api/matrix` | POST | 메인 요약 API |
| `/api/matrix/test-503` | POST | 503 에러 강제 테스트 |
| `/api/selftest/grade` | POST | Selftest 채점 |
| `/api/fail-report` | GET | 실패 리포트 조회 |

---

## 📝 API 사용 예시

### POST /api/matrix
```bash
curl -X POST https://mindstory-matrix.pages.dev/api/matrix \
  -H "Content-Type: application/json" \
  -d '{
    "text": "테스트용 텍스트입니다. 최소 100자 이상 권장합니다.",
    "level": "brief",
    "viewType": "narrative"
  }'
```

**응답 구조:**
```json
{
  "ok": true,
  "data": {
    "narrative": "요약된 텍스트",
    "views": {
      "narrative": {
        "brief": { "text": "...", "coreClaim": "..." },
        "standard": { "text": "..." },
        "detail": { "text": "..." }
      }
    }
  },
  "meta": {
    "reqId": "matrix-1234567890-abc",
    "elapsedMs": 1234,
    "phase": "S3_ASSEMBLY",
    "engineMeta": "matrix-v4",
    "buildId": "V4-FORTRESS-...",
    "envDebug": {
      "envKeys": ["GEMINI_API_KEY", "NODE_ENV"],
      "hasGemini": true,
      "geminiKeyLength": 39
    }
  }
}
```

---

## 🎯 체크리스트

- [ ] Cloudflare Pages 프로젝트 생성 (`mindstory-matrix`)
- [ ] GitHub 저장소 연동 (`js94659535-stack/0201`)
- [ ] 빌드 설정 완료 (`npm run build`, `dist`)
- [ ] **GEMINI_API_KEY 환경 변수 등록 (필수!)**
- [ ] 첫 배포 완료 (1-2분 소요)
- [ ] `/api/health` 접속하여 `status: READY` 확인
- [ ] 메인 페이지에서 요약 기능 테스트
- [ ] 브라우저 콘솔에서 `RAW_RESPONSE.meta.envDebug` 확인

---

## 📞 문제 발생 시

1. **먼저 Health Check 확인**: https://mindstory-matrix.pages.dev/api/health
2. **콘솔 로그 확인**: F12 → Console 탭
3. **네트워크 탭 확인**: F12 → Network 탭 → `/api/matrix` 요청
4. **응답 헤더 확인**: 
   - `X-MS-Build`: 빌드 ID
   - `X-MS-Phase`: 현재 상태기계 단계
   - `X-MS-Engine`: 엔진 버전

---

## 🎉 배포 성공 시

**최종 URL**: https://mindstory-matrix.pages.dev

**다음 단계:**
- 실제 사용자 테스트
- 품질 검증 (Brief/Standard/Detail 차이 확인)
- 성능 모니터링 (Cloudflare Analytics)
- 추가 기능 개발 (V5 엔진 등)

---

**작성일**: 2026-02-07  
**최신 커밋**: 350017f  
**버전**: MINDSTORY MATRIX V4
