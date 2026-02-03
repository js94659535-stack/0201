# MindStory Matrix v4 - 환각 방지 패치 진행 중

## 🎯 프로젝트 개요

**MindStory Matrix v4**는 원문 기반 동적 요약 시스템으로, 하드코딩된 예제 제거 및 환각(Hallucination) 방지를 목표로 합니다.

### ✨ **현재 상태 (v4.6.0-wip - 환각 방지 패치 진행 중)**
- **⏳ 진행 중**: 하드코딩 제거, 동적 검증 시스템 구현
- **✅ 완료**: 동적 앵커 추출, 동적 수치 검출, 동적 비교 검증, 의미 모순 검출
- **❌ 런타임 에러**: "Cannot access 'U' before initialization" (초기화 순서 문제)
- **🔧 동작 모드**: Phase1 로컬 fallback (LLM 미연결)
- **🌐 환경**: Sandbox 데모 (https://3000-ij4pmtzwfidun6lv3m0wf-5185f4aa.sandbox.novita.ai)

---

## 🔥 **v4.6.0 주요 작업 (2026-02-03) - 환각 방지 패치**

### ❌ **문제: 하드코딩된 한국/스웨덴 예제가 모든 원문에 적용됨**

**증상**:
- 사용자가 **영어 선행학습 효과** 원문을 입력
- 시스템이 **한국/스웨덴 교육비 비교** 내용을 반환 (완전히 다른 주제!)
- 요약에 **7.6%, 2.8%, 6.5%, 0.2%** 같은 원문에 없는 수치 포함
- 요약에 **공교육, 사교육, GDP** 같은 원문에 없는 키워드 포함

**근본 원인**:
1. **금칙어 시스템**: `generateNarrativeFallback`이 "선행학습", "사교육" 등을 **금칙어**로 처리하여 제거
2. **하드코딩된 검증**: `REQUIRED_NUMBERS = ['7.6%', '2.8%', '6.5%', '0.2%']` 모든 원문에 요구
3. **하드코딩된 비교**: `mustIncludeComparison: true` → 모든 원문에 한국/스웨덴 비교 요구
4. **하드코딩된 보강 문장**: `buildFallbackSentences()`가 한국/스웨덴 내용을 자동 삽입

---

## ✅ **완료된 작업**

### 1. **하드코딩 제거**
- ✅ **금칙어 목록 정리** (line 239): 스웨덴/한국/공교육/사교육/선행학습 제거
- ✅ **비교 요소 검증 완화** (line 662): `mustIncludeComparison: false`로 변경
- ✅ **더미 grounds 제거** (line 279): "원문의 추가 근거를 포함한다" 문장 제거
- ✅ **하드코딩 수치 검증 제거** (line 312): 7.6%, 2.8% 등 특정 수치 요구 제거

### 2. **동적 검증 시스템 구현**
- ✅ **동적 앵커 추출** (ms-summary-guard-v1.ts): detail.narrative 슬롯에서 키워드 추출
- ✅ **동적 수치 검출**: 원문에서 패턴 기반 수치 추출 (%, 억/만, 년도, 배/회 등)
- ✅ **동적 비교 검증**: 원문에서 개체명 추출 (2-4글자 한글)
- ✅ **의미 모순 검출**: 4가지 패턴 (없다+필요, 부족+풍부, 낮다+높다, 열악+우수)
- ✅ **문장 중복 검출**: uniqueSentences.size vs sentences.length 비교

### 3. **메타 표현 확장**
- ✅ **BANNED_PHRASES 확장**: 6 → 15개 (제시된다, 나타낸다, 드러낸다, 살펴본다, 논의한다 등)

### 4. **Import 경로 정리**
- ✅ **matrix-v4.ts → ms-summary-guard-v1.ts**: 검증 함수 통합
- ✅ **matrix-v4.ts → local-fallback-generators.ts**: 생성 함수 통합
- ✅ **summary-guard.ts 백업**: 더 이상 사용 안 함 (중복 파일)

---

## ❌ **현재 문제: 런타임 에러**

### 에러 메시지
```
"Cannot access 'U' before initialization"
```

### 원인 분석
- **초기화 순서 문제** 또는 **순환 참조**
- **enforceSummaryRatio** 함수 호출 시 발생
- TypeScript 컴파일은 성공하지만 런타임에서 실패

### 시도한 해결 방안
1. ✅ **summary-guard.ts 백업**: 중복 파일 제거
2. ✅ **enforceSummaryRatio export 추가**: local-fallback-generators.ts에서 export
3. ✅ **Import 경로 변경**: matrix-v4.ts에서 올바른 경로로 import
4. ❌ **여전히 실패**: 'V' → 'K' → 'U' 에러로 변화 (진전은 있음)

---

## 📊 **검증 결과 (현재 상태)**

### GOLDEN 원문 테스트 (686자)
- **Brief**: 88자 (12.98%) ✅ 목표 범위 내 (12-18%)
- **Standard**: 174자 (25.28%) ✅ 목표 범위 내 (22-30%)
- **Detail**: 271자 (41.16%) ✅ 목표 범위 내 (35-48%)

### 교차 검증 결과
- **cross_ok**: false (4개 에러 항목)
  1. 마인드맵: 논점 앵커 약함
  2. 마인드맵: 한국/스웨덴 비교 누락
  3. 서술요약: 핵심 수치 근거 부족
  4. 마인드맵: 핵심 수치 근거 부족

### 에러 원인
- **generateMindmapFallback**: 비교 요소/수치를 제대로 포함하지 못함
- **mindmapFlattenLabels**: L2 노드의 pack/explain을 제대로 추출하지 못함

---

## 🔧 **다음 단계 (우선순위)**

### 🔴 **Critical (긴급)**
1. **런타임 초기화 에러 해결** ⚠️ 진행 중
   - "Cannot access 'U' before initialization" 문제 해결
   - 함수 호출 순서 재배치 또는 순환 참조 제거
   - Status: ❌ 미완료

### 🟡 **Important (필요)**
2. **로컬 Fallback 생성기 개선**
   - `generateNarrativeFallback`: coreClaim 1문장 + grounds 2-3개 (수치 포함)
   - `extractComparisons`: 원문 기반 비교 문장 추출
   - `extractImplications`: 원문 기반 시사점 추출
   - Status: ⚠️ 함수만 정의, 제대로 작동 안 함

3. **마인드맵 생성 로직 개선**
   - `generateMindmapFallback`: L2 노드에 비교 요소/수치 강제 삽입
   - `mindmapFlattenLabels`: L2 노드의 pack/explain 필드 추출
   - Status: ❌ 미완료

4. **Phase2 Gemini API 통합**
   - `qualityGateAll()` 실행 검증
   - LLM 기반 교정 테스트
   - Status: ❌ 미완료 (Gemini API 키 필요)

### 🟢 **Nice-to-have (선택)**
5. **통합 테스트**
   - 다양한 원문으로 테스트 (교육, 과학, 역사 등)
   - 긴 텍스트 테스트 (1,000자 이상)
   - 동시 사용자 테스트
   - Status: ❌ 미완료

---

## 📡 API 사용법

### Endpoint
```
POST /api/matrix
```

### Request Body
```json
{
  "text": "원문 텍스트 (최소 20자 권장)..."
}
```

### Response (성공 시)
```json
{
  "ok": true,
  "data": {
    "schemaVersion": "ms-v4",
    "lang": "ko",
    "source": {
      "charCount": 686,
      "checksum": "abc123"
    },
    "levels": {
      "brief": {
        "narrative": {
          "coreClaim": "핵심 주장",
          "grounds": ["근거1", "근거2"],
          "comparisons": ["비교1"],
          "implications": ["시사점1"],
          "summaryText": "간단 요약",
          "ratio": 0.13
        },
        "structured": { ... },
        "mindmap": { ... },
        "selftest": { ... }
      },
      "standard": { ... },
      "detail": { ... }
    }
  },
  "meta": {
    "reqId": "matrix-123-abc",
    "elapsedMs": 150,
    "phase": "phase1",
    "qa": {
      "cross_ok": false,
      "cross_errors": [ ... ],
      "ratios": { ... }
    }
  }
}
```

### Response (실패 시)
```json
{
  "ok": false,
  "error": {
    "code": "MATRIX_V4_ERROR",
    "message": "Cannot access 'U' before initialization"
  },
  "meta": {
    "reqId": "matrix-123-abc",
    "elapsedMs": 5,
    "phase": "phase1",
    "qa": null
  }
}
```

---

## 🗄️ 프로젝트 구조

```
webapp/
├── src/
│   ├── routes/
│   │   └── matrix-v4.ts           # 메인 Matrix v4 API
│   ├── lib/
│   │   ├── local-fallback-generators.ts  # 로컬 생성기 (Phase1)
│   │   └── ms-summary-guard-v1.ts        # 검증 시스템 (동적)
│   └── summary/
│       └── summary-guard.ts.bak   # 백업 (사용 안 함)
├── public/
│   └── static/
│       ├── app.js                 # 프론트엔드 JavaScript
│       └── styles.css             # 커스텀 스타일
├── ecosystem.config.cjs           # PM2 설정
├── wrangler.jsonc                 # Cloudflare 설정
├── package.json                   # 의존성 및 스크립트
└── README.md                      # 이 문서
```

---

## 🚀 배포

### 로컬 개발
```bash
npm run build         # 빌드
pm2 start ecosystem.config.cjs  # Sandbox dev 시작
```

### Cloudflare Pages (배포 대기)
```bash
# 프로젝트 생성 (최초 1회)
npx wrangler pages project create webapp --production-branch main

# 배포
npm run build
npx wrangler pages deploy dist --project-name webapp

# 환경 변수 설정
npx wrangler pages secret put GEMINI_API_KEY --project-name webapp
```

---

## 🔗 링크

- **Sandbox** (데모): https://3000-ij4pmtzwfidun6lv3m0wf-5185f4aa.sandbox.novita.ai/api/matrix
- **Production**: ❌ 미배포 (런타임 에러 해결 필요)
- **GitHub**: https://github.com/js94659535-stack/0201
- **Latest Commit**: wip: 환각 방지 패치 진행 중 - import 경로 정리 및 하드코딩 제거
- **Tech Stack**: Hono + TypeScript + Vite + Cloudflare Pages (배포 대기)
- **Last Updated**: 2026-02-03

---

## 🚨 현재 제한사항

- **런타임 에러**: ❌ "Cannot access 'U' before initialization" (초기화 순서 문제)
- **LLM 연결**: ❌ 미연결 (Gemini API 키 필요)
- **D1 Database**: ❌ 미연결 (영구 캐시 없음)
- **프로덕션 배포**: ❌ 미완료 (런타임 에러 해결 필요)
- **동작 모드**: ⚠️ Phase1 local-only (로컬 fallback만)

---

## ✅ 완성된 부분

- **동적 검증 시스템**: 앵커/수치/비교 모두 원문 기반 동적 추출
- **의미 모순 검출**: 4가지 패턴 검출 (없다+필요, 부족+풍부 등)
- **문장 중복 검출**: uniqueSentences.size 비교
- **메타 표현 확장**: 15개 금지 표현 목록
- **하드코딩 제거**: 한국/스웨덴 예제 완전 제거
- **Import 경로 정리**: ms-summary-guard-v1.ts 통합
- **GitHub 저장**: 버전 관리 완료

---

## 📈 버전 히스토리

### v4.6.0-wip (2026-02-03) - **CURRENT (작업 중)**
- ⏳ **환각 방지 패치 진행 중**
  - 하드코딩된 한국/스웨덴 예제 완전 제거
  - 동적 앵커/수치/비교 검증 시스템 구현
  - 의미 모순 검출 및 문장 중복 검출 추가
  - 메타 표현 목록 확장 (6 → 15개)
- ❌ **런타임 에러**: "Cannot access 'U' before initialization" 해결 중
- ✅ **Import 경로 정리**: ms-summary-guard-v1.ts 통합
- ✅ **GitHub 커밋**: 진행 상황 저장

### v4.5.0 (2026-02-02)
- ✨ **요약율 강제 패치 완성**
  - SUMMARY_RATIO_TABLE 하드코딩
  - enforceSummaryRatio() 문장 단위 자동 조정
  - ratioEnforcement 메타 정보 API 응답 추가

### v4.4.0 (2026-02-01)
- ✨ **Tree 기반 구조화**
- ✨ **마인드맵 V3.2 통합**
- ✨ **D1 저장/불러오기 + Selftest 90% 게이트**

---

## 📄 라이선스

MIT License
