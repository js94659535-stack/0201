# MindStory V5 기능 명세

## 🎯 핵심 기능

### 1. 📝 **서술형 요약 (Narrative)**
- **3단계 압축**: Brief (10-15%) → Standard (25-35%) → Detail (45-55%)
- **슬롯 기반 구조**: [핵심 정의] + [상세 설명] + [결론·시사점]
- **원문 복사 금지**: Copy Rate < 20%, 10-gram 중복 차단
- **누적 확장 차단**: Containment Check (Brief⊄Standard, Standard⊄Detail)
- **레벨 간 차별화**: Similarity < 0.70 (동적 임계값)

### 2. 🧱 **참고서형 구조화 (Structured)**
- **계층적 목차**: TOC (Table of Contents)
- **키워드 기반 분류**: Hierarchy with keywords
- **용어 사전**: Glossary with definitions
- **트리 구조**: Nested bullets with depth

### 3. 🧠 **마인드맵 (Mindmap)**
- **SVG 렌더링**: 대화형 시각화
- **노드/엣지 구조**: Root + Children
- **색상 구분**: 레벨별 자동 색상
- **확장/축소**: Interactive zoom

### 4. 📋 **자가 테스트 (Selftest)**
- **90% 통과 기준**: passScorePct >= 90
- **문제 유형**: 객관식, 주관식, 서술형
- **힌트 제공**: Optional hints
- **채점 기준**: Rubric (mustInclude, mustNotInclude, maxChars)

### 5. 💾 **D1 저장**
- **실패 로그**: False bucket (Quality Gate 실패)
- **성능 메트릭**: 압축률, 유사도, 복사율
- **디버깅 정보**: reqId, phase, engineMeta

---

## 🛡️ **품질 보증 (Quality Gate)**

### **Zero Tolerance Policy**
1. **원문 복사 금지**: 10-gram 연속 복사 감지 시 즉시 차단
2. **누적 확장 금지**: Brief/Standard/Detail 포함 관계 차단
3. **발췌형 차단**: Extractive fallback 완전 제거

### **3중 검증**
```
A) 압축률 (Compression Ratio)
   - Brief: 10-15% (±6%)
   - Standard: 25-35% (±6%)
   - Detail: 45-55% (±6%)

B) 레벨 간 유사도 (Inter-level Similarity)
   - Brief-Standard: < threshold (0.68-0.82)
   - Standard-Detail: < threshold

C) 원문 복사율 (Copy Rate)
   - Detail: < 20%
   - 10-gram 기반 정밀 검사

D) 포함 금지 (Containment Ban)
   - Brief→Standard: < 70%
   - Standard→Detail: < 70%
```

### **재생성 루프 (Regeneration)**
- **최대 3회**: 품질 미달 시 자동 재생성
- **설명 책임 전환**: Try1 (What/How/SoWhat) → Try2 (금지어) → Try3 (구조 변환)
- **최종 실패**: 503 Service Unavailable (정직한 실패)

---

## 🧪 **테스트 엔드포인트**

### **POST /api/matrix/test-503**
원문을 100% 복사한 가짜 요약으로 Quality Gate 테스트

**요청**:
```json
{
  "text": "테스트 원문..."
}
```

**예상 응답** (Quality Gate 작동 시):
```json
{
  "ok": false,
  "degraded": true,
  "engine": "test-extractive",
  "mode": "standard",
  "view": "narrative",
  "error": {
    "code": "QUALITY_GATE_FAIL",
    "message": "서술형 요약 품질 기준 미달 (503)"
  },
  "meta": {
    "testMode": true,
    "qualityMetrics": {
      "copyRate": 1.00,
      "containmentOK": false,
      "briefInStandard": 0.99,
      "standardInDetail": 1.00
    }
  }
}
```

HTTP Status: **503**

---

## 📊 **응답 구조**

### **성공 응답** (200 OK)
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
        "brief": { "text": "...", "ratio": 0.12 },
        "standard": { "text": "...", "ratio": 0.30 },
        "detail": { "text": "...", "ratio": 0.50 }
      },
      "structured": { ... },
      "mindmap": { ... },
      "selftest": { ... }
    }
  },
  "meta": {
    "reqId": "matrix-1234567890-abc",
    "elapsedMs": 5000,
    "phase": "S3_ASSEMBLY",
    "engineMeta": "matrix-v4",
    "buildId": "V4-FORTRESS-2026-02-07",
    "finalMetrics": {
      "briefInStandard": 0.45,
      "standardInDetail": 0.55,
      "copyRate": 0.08,
      "containmentOK": true
    }
  }
}
```

### **실패 응답** (503 Service Unavailable)
```json
{
  "ok": false,
  "degraded": true,
  "engine": "fallback-extractive",
  "mode": "standard",
  "view": "narrative",
  "error": {
    "code": "QUALITY_REGENERATE_EXHAUSTED",
    "message": "품질 기준 미달: 3회 재생성 후에도 통과 실패"
  },
  "data": null,
  "meta": {
    "reqId": "...",
    "elapsedMs": 15000,
    "phase": "S2_REGENERATE_FAIL",
    "warnings": [
      "QUALITY_REGENERATE_EXHAUSTED",
      "Attempts: 3/3"
    ],
    "finalMetrics": {
      "briefInStandard": 0.85,
      "standardInDetail": 0.92,
      "copyRate": 0.35,
      "containmentOK": false
    }
  }
}
```

---

## 🚀 **배포 정보**

- **Build ID**: `V4-FORTRESS-YYYY-MM-DD`
- **Version**: Matrix V4 (Narrative + Quality Gate)
- **Repository**: https://github.com/js94659535-stack/0201
- **Latest Commit**: f05db69

---

## 📝 **변경 이력**

### **2026-02-07: Zero Tolerance Enforcement**
- Phase1 문장 자르기 로직 완전 제거
- Containment Check 추가 (누적 확장 차단)
- 503 테스트 엔드포인트 추가
- 프론트엔드 경로 수정 (engine/mode/view)

### **이전 버전**
- Quality Gate 3단계 구현
- Regeneration Loop (최대 3회)
- Dynamic Similarity Threshold
- False Bucket 로깅
