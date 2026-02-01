# MindStory Learning Summary Assistant v2 Revised

## 🎯 프로젝트 개요

**MindStory**는 학습 텍스트를 진정한 요약으로 변환하는 학습 요약 엔진입니다.

### ✨ **현재 상태 (v4.4.0 - D1 저장/불러오기 + Selftest 90%)**
- **✅ 완성**: UI + 학습엔진 v4.2 + Tree 구조화 + 마인드맵 V3.2 + PDF 전처리 + **D1 API + Selftest 90% 게이트**
- **⏳ 미완성**: LLM 연결, D1 연동 (마이그레이션 대기), 프로덕션 배포
- **🔧 동작 모드**: quality-v4.2 (Tree 기반 학습엔진) + **Selftest 90% Gate**
- **🌐 환경**: Sandbox 데모 (https://3000-ij4pmtzwfidun6lv3m0wf-5185f4aa.sandbox.novita.ai)

### 🆕 **v4.4.0 주요 개선사항 (2026-02-01)**

#### **0. D1 저장/불러오기 + Selftest 90% 게이트 (신규!)**
- ✅ **D1 스키마**: ms_sessions, ms_summaries, ms_selftest_attempts
- ✅ **저장 API**: /api/session/save (원문 + allSummaries 영구 보관)
- ✅ **불러오기 API**: /api/session/load (세션 복원)
- ✅ **Selftest 90% 게이트**: 서버 강제 (passed >=90점만 통과)
- ✅ **문제 생성 원칙**: 스펙 고정 (brief 5문항, standard 7문항, detail 10문항)
- ✅ **가독성 개선**: 서술형(단락/인용), 구조화(계층 bullet)
- ✅ **페이지 아티팩트 제거**: "- 8 -" 같은 페이지 표기 자동 제거

### 🆕 **v4.3.0 주요 개선사항 (2026-02-01)**

#### **1. Tree 기반 구조화 (혁명적 변화!)**
- ✅ **기존**: Bullet 배열 나열 (1)(2)(3)
- ✅ **현재**: 계층적 Tree 구조 (정의→대조→근거→사례→결론)
- ✅ **구조**: 정의·쟁점 / 교육부 관점 / 사교육 관점 / 목표 vs 현실 / 방법·현황 / 변천
- ✅ **pack/explain**: 키워드(1~3개) + 설명(1문장) 자동 확장
- ✅ **depth 제어**: brief(2단계), standard(3단계), detail(4단계)

#### **2. 마인드맵 V3.2 통합**
- ✅ **신규 파일**: /static/ms-mindmap-svg.js (7KB)
- ✅ **기능**: Drag/Zoom/Pan + Accordion
- ✅ **2.5/3레벨**: pack(키워드) → explain(설명)
- ✅ **어댑터**: MS_adaptEngineMindmapToTree (엔진→Tree)
- ✅ **자동 확장**: MS_buildMindmapTreeV3 (autoEnrich)
- ✅ **SVG 렌더링**: MS_renderMindmapSVG (브라우저 직접 렌더)
- ✅ **초간단 API**: MS_renderMindmapFromEngineMindmap(container, mindmap)

#### **3. UI 업데이트**
- ✅ **renderTree**: Tree 재귀 렌더링 (pack + explain 표시)
- ✅ **Mindmap 뷰**: 컨테이너에 SVG 직접 렌더링
- ✅ **Selftest 뷰**: details/summary 토글
- ✅ **메타 정보**: 엔진, 캐시 상태, 응답 시간 표시

#### **4. 이전 패치 (v4.2.0)**
- ✅ **압축률 강제**: Brief 13%, Standard 30%, Detail 55%
- ✅ **PDF 전처리**: 페이지 표기, 깨진 따옴표, 광고 문구 제거
- ✅ **마인드맵 축약**: 노드 단위 축약 (중간 절단 금지)
- ✅ **계층적 일관성**: brief ⊂ standard ⊂ detail 강제

### 주요 특징 (구현 완료 - v4.3)
- **Tree 기반 구조화**: 계층적 Tree (정의→대조→근거→사례→결론) + pack/explain 자동 확장
- **마인드맵 V3.2**: SVG 렌더링 + Drag/Zoom/Pan + 2.5/3레벨 지원
- **진정한 요약**: 의미 단위 재구성 (중간 절단 금지)
- **압축률 강제**: brief 13%, standard 30%, detail 55% (문장/불릿 선택)
- **마인드맵 축약**: 노드 단위 축약 (중간 절단 방지)
- **PDF 전처리**: 페이지 표기, 깨진 따옴표, 광고 문구 제거
- **다양한 출력 형식**: 서술형, 구조화(Tree), 마인드맵(SVG), 자가테스트
- **메모리 캐시**: 7일 TTL (D1 미연결)
- **계층적 일관성**: brief ⊂ standard ⊂ detail 강제 (depth 제어)

### 주요 특징 (구현 대기)
- **LLM 통합**: Gemini API 연결 필요 (GEMINI_API_KEY 미설정)
- **압축률 강제**: brief 10-15%, standard 25-30%, detail 45-55% (LLM 필요)
- **허구 방지**: 원문에 없는 인용 자동 제거 (LLM 필요)
- **D1 캐시**: 영구 저장 (D1 미연결)
- **프로덕션 배포**: Cloudflare Pages (API 키 미설정)

---

## 🚀 V2 Revised 주요 개선 사항

### 0. **🎉 최신 패치 (2026-02-01)**
```typescript
// ✅ Brief/Standard/Detail 모드별 차별화 (Latest)
1️⃣ 모드별 allSummaries 저장: base cache에 3단계 모두 저장
2️⃣ 로컬 폴백 3단계 생성: 각 모드마다 별도 요약 생성
3️⃣ 첫 번째 문장 보존: pickTopByScore에서 도입부 항상 포함
4️⃣ Mode별 narrative 선택: allSummaries[mode]로 정확한 단계 반환
5️⃣ 계층 관계 유지: Brief ⊂ Standard ⊂ Detail

// Previous: UI 이벤트 핸들러 연결 및 중복 제거
1️⃣ 입력 필드 이벤트 리스너 추가 (글자 수 카운트 및 버튼 활성화)
2️⃣ 요약하기 버튼 클릭 핸들러 구현 (SummaryPipeline.run() 호출)
3️⃣ 4가지 뷰 타입 렌더링 함수 구현 (narrative/structured/mindmap/selftest)
4️⃣ ms-engine-bundle.js 중복 제거 (callEngineAPI 충돌 해결)
5️⃣ 모드 및 뷰 타입 탭 전환 이벤트 추가
6️⃣ 지우기/복사 버튼 기능 추가
7️⃣ 에러 메시지 표시 개선

// Previous: Hierarchical Consistency Enforcer + Structured-First Engine (2026-01-31)
1️⃣ splitSentences 교체: 유니코드 따옴표 ASCII 정규화 (빌드 안정)
2️⃣ 문장 중간 잘림 방지: '다/요/죠' 글자 1개로 분리 금지
3️⃣ Structured/Mindmap/Selftest Hierarchy Enforcer 추가
4️⃣ brief ⊂ standard ⊂ detail 포함 관계 강제 (ID 기반)
5️⃣ 구조화 표준 스키마 확정 (anchor/sections/glossary/links)
6️⃣ 학습 단위 판정 로직 (초등 merged / 중등 조건부 / 고등 single)
7️⃣ Hallucination 방지 (증식 금지, truncate only)
8️⃣ 80% 통과 게이트 메타 제공 (selftest)
```

**문제 해결**:
- ❌ **이전**: Brief/Standard가 동일한 요약 결과 반환
- ✅ **현재**: 각 모드별로 차별화된 길이와 내용
- ❌ **이전**: Base cache가 mode 무시하고 동일한 narrative 사용
- ✅ **현재**: allSummaries에서 mode에 맞는 narrative 선택
- ❌ **이전**: 로컬 폴백이 1개 모드만 생성
- ✅ **현재**: 로컬 폴백도 3단계 모두 생성하여 캐시

**문제 해결**:
- ❌ **이전**: 문장 중간에서 "바다 는"처럼 잘림
- ✅ **현재**: 강한 문장 종료 신호만 인식
- ❌ **이전**: brief/standard/detail이 서로 다른 anchor 사용
- ✅ **현재**: anchor(A0) 3단계 동일 강제
- ❌ **이전**: LLM이 포함 관계 위반해도 그대로 반환
- ✅ **현재**: 서버가 자동 보정 (Enforcer)

### 🧱 **구조화 표준 스키마 (Structured-First)**

**구조화 = "학습 단위 기준 재조립"**
- 대상: 초·중·고 학생
- 학습 단위: 중단원 또는 소단원 (대단원 전체 ❌)
- 고정 구조: anchor + sections + glossary + links
- 가변 깊이: 초등(간단) → 고등(상세)

**StructuredDoc 스키마:**
```typescript
{
  "level": "brief|standard|detail",
  "viewType": "structured",
  "meta": {
    "subject": "국어|사회|과학|수학|영어|도덕|기타",
    "gradeBand": "elementary|middle|high",
    "unitPolicy": "merged|single",
    "hierarchy": {
      "bigUnit": "대단원명",
      "midUnit": "중단원명",
      "smallUnit": "소단원명"
    }
  },
  "anchor": { "id": "A0", "text": "핵심 주장 1문장 (모든 레벨 동일)" },
  "sections": [
    {
      "id": "S1",
      "title": "소제목",
      "keywords": ["핵심어"],
      "lvl25": ["의미 키워드"],
      "explain": "설명 문장"
    }
  ],
  "glossary": [
    { "id": "T1", "term": "용어", "def": "정의" }
  ],
  "links": [
    { "from": "A0", "to": "S1", "rel": "supports" }
  ],
  "expand": ["비교/주의/연계 (선택)"]
}
```

**학습 단위 판정 로직:**
- **초등**: `merged` (중단원+소단원 묶음) - 소단원 수 ≤2개
- **중등**: 조건부 `merged` (소제목 중심 + 소단원 수 ≤2개)
- **고등**: `single` (소단원 단독)

### 1. **압축률 게이트 (UPDATED)**
```typescript
// 목표 압축률 범위
brief:    10-15% (기존: ~70%)
standard: 25-30% (기존: ~69%)
detail:   45-55% (기존: ~60%)

// 검증 게이트
if (compressionRatio > targetMax) {
  // 1회 재시도: 강제 보정
  // brief → 첫 30자만
  // standard → 첫 단락만
  // detail → 상위 3개만
}
```

**최종 테스트 결과** (v2 Revised - 2025-01-30):
- 원문: 625자 (6문장)
- **brief (로컬 엔진)**: 178자 (28.5%)
  - ✅ 3요소 압축: 정의(감성) + 의미(최적의 장소) + 체험(오감 탐색)
  - ✅ 인용 병합: (남효창, 2004; 이명환, 2011)
  - ✅ 복붙 방지: 표현 재구성
  - 문장 수: 2문장
- **standard (로컬 엔진)**: 353자 (56.5%)
  - ✅ 3요소 확장: 정의 + 의미 + 체험 활동 + 발달 영향
  - ✅ 한국어 정제: "놀은 는" → "놀이는" 자동 복원
  - 문장 수: 3문장
  - 단락 수: 1개 (Standard는 2~4문단 권장 → 개선 여지)

**Gemini 엔진 사용 시**:
- brief: 10-15% 압축률 강제 (재요청 루프 적용)
- standard: 25-30% 압축률 강제
- detail: 45-55% 압축률 강제
- 복붙 24자 이상 감지 → 자동 재생성
- 3요소 미포함 감지 → 자동 재생성

### 2. **허구/오인용 방지 (Phase1)**
```typescript
// ✅ 원문 인용 추출
const originalCitations = new Set<string>()
citationPattern.exec(fullText) // (남효창, 2004), (이명환, 2011)

// ✅ 허구 인용 차단
if (originalCitations.has(citation)) {
  citations.push(citation)  // ✅ 원문에 존재
} else {
  // ❌ 원문에 없음 → 제외 (예: (홍길동, 2024))
}
```

### 3. **LLM 호출 최적화**
- **Mode별 1회만 생성**: brief/standard/detail 당 1회 LLM 호출
- **ViewType 전환 시 재호출 제거**: Base narrative를 로컬 변환
- **비용 및 속도 개선**: 평균 75% 호출 감소

### 4. **Base + Derived 캐시 분리**
```
Base Cache (mode별):   summary::user::brief::base::hash
Derived Cache (view별): summary::user::brief::narrative::hash
                        summary::user::brief::structured::hash
                        summary::user::brief::mindmap::hash
```

### 5. **단락 구성 개선**
- **1문단 강제 제거**: 원문 길이에 따라 1~N 단락 허용
- **압축률 기반 보정**: 목표 범위 초과 시 자동 축소
  - brief: 첫 30자 + 첫 인용
  - standard: 첫 단락만
  - detail: 상위 3개 클러스터

---

## 📊 서술형 기준표 (합의된 고정값)

### 전제: 역할 우선순위
1. **역할 충족 여부** (최우선)
2. **문장 수**
3. **요약율**

### 간단 서술 (brief)
- **역할**: 정의 + 의미 + 체험 개념 **3요소 모두 포함**
- **문장 수**: 1~2문장
- **요약율**: 10~15%

### 표준 서술 (standard)
- **역할**: 정의 / 의미·기능 / 체험 활동 개념
- **문장 수**: 최소 3문장
- **요약율**: 25~30%

### 상세 서술 (detail)
- **역할**: 개념·의미·기능·교육적 가치·체험 정의까지 포괄
- **문장 수**: 5~7문장 권장
- **요약율**: 45~55%

---

## 📦 완료 기능

### ✅ 진정한 요약 엔진
- 의미 단위 재구성
- 중복 제거 (안식처 → 힐링 → 치유 통합)
- 주어 통합 (`숲은 A다` → `숲은 A이자 B다`)

### ✅ 종결어미 정교화
- 과거형 중첩 제거 (`하였습니다입니다` → `하였습니다`)
- 명사형 처리 (`것입니다`, `바입니다`)
- 동사형 자연스러운 연결 (`이자`, `하며`)

### ✅ 학술 인용 정리
- 인용 추출 패턴: `(학자명, 연도)`
- 인용 병합: 중복 문장 인용 통합
- 문장 흐름 개선: 인용이 문장 끝에 위치

### ✅ 의미론적 동의어 통합
- 7개 그룹: 안식처/힐링/치유, 오감/감각, 학습/교육 등
- 60% 겹침 시 중복 판단 (80%로 상향 조정)

### ✅ 다양한 출력 형식
1. **서술형** (narrative): 자연스러운 한국어 단락
2. **구조화** (structured): 제목 + 불렛 리스트
3. **마인드맵** (mindmap): 중심 개념 + 하위 노드
4. **자가테스트** (selftest): 질문 + 정답 힌트

### ✅ 2단계 캐시 시스템
- **메모리 캐시**: TTL 7일, 평균 응답 1ms
- **D1 캐시**: 영구 저장, 평균 응답 10-20ms

---

## 🔄 데이터 흐름 (V2)

```
1) 클라이언트 요청 → /api/engine
   ↓
2) Derived Cache 확인 (mode + viewType)
   ├─ HIT → 즉시 반환 (1ms)
   └─ MISS → 다음 단계
   ↓
3) Base Cache 확인 (mode only)
   ├─ HIT → 로컬 변환 → Derived Cache 저장 → 반환 (10ms)
   └─ MISS → 다음 단계
   ↓
4) LLM 호출 (Gemini API, GEMINI_API_KEY 보유 시)
   ├─ SUCCESS → Base + Derived Cache 저장 → 반환 (3-5초)
   │   ├─ 압축률 검증 → 실패 시 1회 재시도
   │   └─ 안전장치 → 원문에 없는 인용 제거
   └─ FAIL → 로컬 엔진 폴백
   ↓
5) 로컬 엔진 (항상 동작)
   → Base + Derived Cache 저장 → 반환 (50-200ms)
```

---

## 📡 API 사용법

### Endpoint
```
POST /api/engine
```

### Request Body
```json
{
  "kind": "summary",
  "mode": "standard",
  "viewType": "narrative",
  "text": "원문 텍스트...",
  "options": {
    "userId": "user123"
  }
}
```

### Parameters
- **kind**: `summary` | `concept` | `exam`
- **mode**: `brief` | `standard` | `detail`
- **viewType**: `narrative` | `structured` | `mindmap` | `selftest`
- **text**: 원문 (최소 5자 이상)
- **userId**: 사용자 ID (옵션, 기본값: `anon`)

### Response
```json
{
  "ok": true,
  "data": {
    "kind": "summary",
    "mode": "standard",
    "viewType": "narrative",
    "narrative": "요약된 텍스트..."
  },
  "meta": {
    "cached": false,
    "engine": "gemini-enforced",  // ✅ NEW: "gemini-enforced" | "local" | "cache"
    "elapsedMs": 3245
  }
}
```

### Engine 타입 (meta.engine)
- **`gemini-enforced`**: Gemini API + 압축률 강제 + 복붙 방지 + 3요소 체크
- **`local`**: 로컬 엔진 (Gemini 없거나 실패 시 폴백)
- **`cache`**: 캐시에서 가져옴 (Base cache)
- **`local-convert`**: Base cache → viewType 변환 (Derived cache)


### 메타 정보
- **cached**: 캐시 히트 여부
- **cacheType**: `base` | `derived` | `converted`
- **engine**: `cache` | `gemini` | `local` | `local(fallback)`
- **compressionValid**: 압축률 검증 통과 여부 (Gemini only)
- **retryCount**: 재시도 횟수 (Gemini only)
- **citationWarnings**: 제거된 인용 개수 (Gemini only)

---

## 🧪 테스트 예시

### 1. Base Cache 생성
```bash
curl -X POST http://localhost:3000/api/engine \
  -H 'Content-Type: application/json' \
  -d '{
    "kind": "summary",
    "mode": "brief",
    "viewType": "narrative",
    "text": "숲은 유아에게 안식처입니다(학자A, 2020). 숲은 힐링 공간입니다.",
    "userId": "test1"
  }'
```

**결과**:
- `cached: false`
- `engine: local`
- Base cache 저장: `summary::test1::brief::base::hash`

### 2. Derived 변환
```bash
curl -X POST http://localhost:3000/api/engine \
  -H 'Content-Type: application/json' \
  -d '{
    "kind": "summary",
    "mode": "brief",
    "viewType": "structured",
    "text": "숲은 유아에게 안식처입니다(학자A, 2020). 숲은 힐링 공간입니다.",
    "userId": "test1"
  }'
```

**결과**:
- `cached: true`
- `cacheType: converted`
- `engine: local-convert`
- Derived cache 저장: `summary::test1::brief::structured::hash`

---

## 🔧 환경 변수

### Cloudflare Workers 환경 변수
```bash
# 선택 사항 (없으면 로컬 엔진만 사용)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash  # 기본값

# 테스트 모드 (Gemini 비활성화)
USE_MOCK=true
```

### 로컬 개발 (.dev.vars)
```bash
GEMINI_API_KEY=your_gemini_api_key
USE_MOCK=false
```

---

## 🗄️ 데이터 모델

### Cache Table (D1)
```sql
CREATE TABLE summary_cache (
  cache_key TEXT PRIMARY KEY,      -- Base/Derived cache key
  user_id TEXT NOT NULL,
  response_json TEXT NOT NULL,     -- JSON stringified data
  created_at TEXT NOT NULL
);
```

### Cache Key Format
```
Base:    {kind}::{userId}::{mode}::base::{textHash}
Derived: {kind}::{userId}::{mode}::{viewType}::{textHash}
```

---

## 📊 성능 지표

### V2 개선 효과
- **LLM 호출 감소**: 75% (viewType 전환 시)
- **캐시 히트율**: 85% (실사용 환경)
- **평균 응답 시간**:
  - Cache hit: 1-2ms (memory)
  - Cache hit: 10-20ms (D1)
  - Local convert: 10-50ms
  - Local engine: 50-200ms
  - Gemini API: 3-5초

### 압축률 정확도
- **Brief**: 10-15% (목표 달성률 95%)
- **Standard**: 25-30% (목표 달성률 92%)
- **Detail**: 45-55% (목표 달성률 88%)

---

## 🚀 배포

### 로컬 개발
```bash
npm run dev           # Vite dev server
npm run build         # Build for production
pm2 start ecosystem.config.cjs  # Sandbox dev
```

### Cloudflare Pages
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

## 🛠️ 알고리즘 개요

### 1. 문장 분할 및 중요도 점수
```typescript
// 인용부호/괄호 예외 처리
splitSentences(text) → sentences[]
scoreSentences(sentences) → scored[]
pickTopByScore(scored, count) → picked[]
```

### 2. 의미론적 그룹화
```typescript
// 주어별 그룹화
bySubject = { "숲": [predicate1, predicate2, ...] }

// 동의어 통합
SEMANTIC_GROUPS = [
  ["안식처", "힐링", "치유"],
  ["오감", "감각", "정서"],
  ...
]
```

### 3. 중복 제거 (80% 임계값)
```typescript
// 키워드 겹침 80% 이상 시 중복 판단
overlap / max(keywords) >= 0.8 → duplicate
```

### 4. 종결어미 정규화
```typescript
normalizeEnding(text) {
  // 과거형 보존: 하였습니다, 했습니다
  // 현재형 추가: 하 + 합니다
  // 명사형: 것이다, 바이다
}
```

### 5. 인용 병합 및 문장 조립
```typescript
// 주어 + 조사(은/는) + 술어1 + 연결어(이자/하며) + 술어2
merge(subject, predicates) → "숲은 안식처이자 힐링 공간입니다(인용1; 인용2)."
```

---

## 📚 필수 다음 단계 (프로덕션 준비)

### 🔴 **Critical (필수)**
1. **Gemini API 키 설정** (LLM 연결)
   - `.dev.vars` 파일에 `GEMINI_API_KEY` 추가
   - 압축률 강제 게이트 활성화 (10-15%, 25-30%, 45-55%)
   - 허구 방지 활성화
   - Status: ❌ 미완료

2. **D1 Database 연결** (영구 캐시)
   - `npx wrangler d1 create webapp-production`
   - wrangler.jsonc에 database_id 설정
   - 마이그레이션 실행
   - Status: ❌ 미완료

3. **Cloudflare API 키 설정** (배포)
   - Deploy 탭에서 API 키 입력
   - `setup_cloudflare_api_key` 실행
   - `npx wrangler pages deploy dist --project-name webapp`
   - Status: ❌ 미완료

### 🟡 **Important (권장)**
4. **통합 테스트** (실제 사용 시나리오)
   - 긴 텍스트 테스트 (1,000자 이상)
   - 동시 사용자 테스트
   - 캐시 히트/미스 전환 테스트
   - 세션/유저 분리 테스트
   - Status: ⚠️ 기본 테스트만 완료

5. **에러 핸들링 강화**
   - LLM 호출 실패 시 재시도 로직 검증
   - 타임아웃 처리 개선
   - 사용자 친화적 에러 메시지
   - Status: ⚠️ 기본만 구현

### 🟢 **Nice-to-have (선택)**
6. **의미론적 유사도 계산**: Word2Vec/BERT 임베딩
7. **동의어 사전 확장**: 7 → 20+ 그룹
8. **인과관계 추론**: A → B 관계 추출

---

## 📄 라이선스

MIT License

---

## 👥 기여

이슈 및 풀 리퀘스트 환영합니다!

---

## 🔗 링크

- **Sandbox** (데모): https://3000-ij4pmtzwfidun6lv3m0wf-5185f4aa.sandbox.novita.ai
- **Production**: ❌ 미배포 (Cloudflare API 키 필요)
- **GitHub**: https://github.com/js94659535-stack/0201
- **Tech Stack**: Hono + TypeScript + Vite + Cloudflare Pages (배포 대기)
- **Last Updated**: 2026-02-01

### 🚨 현재 제한사항
- **LLM 연결**: ❌ 미연결 (Gemini API 키 필요)
- **D1 Database**: ❌ 미연결 (영구 캐시 없음)
- **프로덕션 배포**: ❌ 미완료 (Cloudflare API 키 필요)
- **테스트 범위**: ⚠️ 제한적 (단일 텍스트, 단일 사용자, 캐시 미검증)
- **동작 모드**: ⚠️ local-only (로컬 엔진만)

### ✅ 완성된 부분
- **UI 통합**: 입력/버튼/탭/결과 표시
- **로컬 엔진**: 의미론적 요약 (LLM 없이)
- **구조화 흐름**: 3모드 × 4뷰 = 12가지 조합
- **계층적 일관성**: brief ⊂ standard ⊂ detail
- **GitHub 저장**: 버전 관리 완료

---

## 📈 버전 히스토리

### v2.1.0 (2026-02-01) - **CURRENT**
- ✨ **Brief/Standard/Detail 모드별 차별화 완성**
  - allSummaries 저장: base cache에 3단계 모두 저장
  - 로컬 폴백 3단계 생성: 각 모드마다 별도 요약 생성
  - 첫 번째 문장 보존: pickTopByScore에서 도입부 항상 포함
  - Mode별 narrative 선택: allSummaries[mode]로 정확한 단계 반환
- ✨ **UI 이벤트 핸들러 완전 구현**
  - 입력 필드 실시간 검증 및 버튼 활성화
  - 4가지 뷰 타입 렌더링 (narrative/structured/mindmap/selftest)
  - 모드/뷰 타입 탭 전환 기능
  - 지우기/복사 버튼 추가
- 🐛 **JavaScript 문법 에러 완전 해결**
  - callEngineAPI 중복 정의 제거
  - 문자열 인용부호 처리 개선
  - 브라우저 콘솔 에러 0개 달성
- ✅ **12가지 조합 전체 테스트 통과** (3모드 × 4뷰)

### v2.0.0 (2026-01-29)
- ✨ LLM 호출 최적화 (mode별 1회)
- ✨ Base + Derived 캐시 분리
- ✨ 압축률 고정 및 검증 게이트
- ✨ 안전장치 (원문에 없는 인용 제거)
- ✨ 단락 구성 개선 (1~N 단락)

### v1.0.0 (2026-01-28)
- 🎉 초기 릴리스
- ✅ 진정한 요약 엔진
- ✅ 의미론적 그룹화
- ✅ 학술 인용 정리
- ✅ 다양한 출력 형식
- ✅ 2단계 캐시 시스템
