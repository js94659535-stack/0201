# 젠스 개발팀 요청: Phase 2 - structured/mindmap/selftest 계층 일치성 적용

## ✅ Phase 1 완료
서술형(narrative) 계층 일치성은 **anchor + snowball(enforce/repair)**로 고정 완료했습니다.

---

## 🎯 Phase 2 목표
이제 **structured, mindmap, selftest**도 동일한 **계층 일치성 규칙**을 적용합니다.

---

## 📋 **1) structured 출력 계층 일치성**

### **목표**
- `brief_structured ⊂ standard_structured ⊂ detail_structured`
- **문장 포함이 아니라 "JSON 필드/배열 원소 포함"으로 강제**

### **JSON 스키마 고정**
```json
{
  "anchor": "핵심 문장 1개",
  "brief": {
    "anchor": "핵심 문장 1개",
    "outline": {
      "purpose": ["목적 항목"],
      "background": [],
      "method_or_process": [],
      "results_or_claims": ["핵심 주장"],
      "implications": []
    }
  },
  "standard": {
    "anchor": "핵심 문장 1개",
    "outline": {
      "purpose": ["목적 항목", "..."],
      "background": ["배경 항목"],
      "method_or_process": ["방법 항목"],
      "results_or_claims": ["핵심 주장", "..."],
      "implications": []
    }
  },
  "detail": {
    "anchor": "핵심 문장 1개",
    "outline": {
      "purpose": ["목적 항목", "..."],
      "background": ["배경 항목", "..."],
      "method_or_process": ["방법 항목", "..."],
      "results_or_claims": ["핵심 주장", "..."],
      "implications": ["시사점 항목"]
    }
  }
}
```

### **Snowball 강제 규칙**
- 표준은 간단의 **모든 배열 원소를 포함** (앞에 삽입)
- 상세는 표준의 **모든 배열 원소를 포함** (앞에 삽입)
- 서버에서 `normalize + includes` 검증/수리

---

## 📋 **2) mindmap 출력 데이터 모델 고정**

### **목표**
- `brief_nodes ⊂ standard_nodes ⊂ detail_nodes`
- **SVG 이전에 데이터 모델을 고정**

### **JSON 스키마 고정**
```json
{
  "anchor": "핵심 문장 1개",
  "brief": {
    "anchorNodeId": "n0",
    "nodes": [
      { "id": "n0", "label": "핵심 주제" },
      { "id": "n1", "label": "..." }
    ],
    "edges": [
      { "from": "n0", "to": "n1", "label": "..." }
    ]
  },
  "standard": {
    "anchorNodeId": "n0",
    "nodes": [
      { "id": "n0", "label": "핵심 주제" },
      { "id": "n1", "label": "..." },
      { "id": "n2", "label": "..." }
    ],
    "edges": [
      { "from": "n0", "to": "n1", "label": "..." },
      { "from": "n0", "to": "n2", "label": "..." }
    ]
  },
  "detail": {
    "anchorNodeId": "n0",
    "nodes": [
      { "id": "n0", "label": "핵심 주제" },
      { "id": "n1", "label": "..." },
      { "id": "n2", "label": "..." },
      { "id": "n3", "label": "..." }
    ],
    "edges": [
      { "from": "n0", "to": "n1", "label": "..." },
      { "from": "n0", "to": "n2", "label": "..." },
      { "from": "n1", "to": "n3", "label": "..." }
    ]
  }
}
```

### **복잡도 목표**
- brief: 핵심 노드 **5~8개**
- standard: brief 노드 포함 + 가지 확장 (**10~15개**)
- detail: standard 포함 + 근거/예시/조건 가지 추가 (**20~30개**)

### **Snowball 강제 규칙**
- brief 노드셋을 standard/detail이 **반드시 포함**
- anchorNodeId는 모든 버전에서 동일

---

## 📋 **3) selftest 출력 스키마 고정**

### **목표**
- **80% 통과 게이트** (재도전) 로직 연결
- **questions JSON 스키마** 출력

### **JSON 스키마 고정**
```json
{
  "questions": [
    {
      "id": "q1",
      "type": "reorder",
      "prompt": "다음 단계를 올바른 순서로 배열하시오.",
      "choices": ["선택 1", "선택 2", "선택 3"],
      "answer": ["선택 2", "선택 1", "선택 3"]
    },
    {
      "id": "q2",
      "type": "blank",
      "prompt": "본 연구의 핵심 목적은 ___이다.",
      "answer": "영재 학습자의 개인차 분석"
    },
    {
      "id": "q3",
      "type": "choice",
      "prompt": "다음 중 올바른 설명은?",
      "choices": ["선택 1", "선택 2", "선택 3"],
      "answer": "선택 2"
    }
  ],
  "passingScore": 0.8
}
```

### **문항 수 (모드별)**
- brief: 3문항
- standard: 5문항
- detail: 8문항

### **80% 통과 게이트**
- `score >= 0.8` 시 합격
- 불합격 시 재도전 허용

---

## 🛠️ 구현 방식

### **1) structured**
- LLM 1회 호출로 `{anchor, brief, standard, detail}` JSON 생성
- 서버에서 `enforceStructuredHierarchy()`로 배열 원소 포함 검증/보정

### **2) mindmap**
- LLM 1회 호출로 `{anchor, brief, standard, detail}` JSON 생성
- 서버에서 `enforceMindmapHierarchy()`로 노드/엣지 포함 검증/보정

### **3) selftest**
- LLM 1회 호출로 `{questions, passingScore}` JSON 생성
- 서버에서 `gradeAttempt()`로 채점 및 통과 여부 판정

---

## ✅ Acceptance Test

### **structured**
```javascript
passes.anchorAll === true
passes.snowball === true
// standard.outline의 모든 필드가 brief.outline 포함
// detail.outline의 모든 필드가 standard.outline 포함
```

### **mindmap**
```javascript
passes.anchorAll === true
passes.snowball === true
// standard.nodes가 brief.nodes 포함
// detail.nodes가 standard.nodes 포함
```

### **selftest**
```javascript
validation.valid === true
// questions 배열 형식 올바름
// passingScore === 0.8
```

---

## 📂 제공 코드

1. **structured-enforcer.ts**: 구조화 요약 계층 강제 로직
2. **mindmap-enforcer.ts**: 마인드맵 계층 강제 로직
3. **selftest-schema.ts**: 셀프테스트 스키마 및 채점 로직

---

## 🚀 요약

**narrative만 다듬지 말고, structured/mindmap/selftest도 동일한 "버전 계층 일치성" 설계를 적용해서 3모드 × 4뷰 = 12개 산출물이 모두 "뼈대 유지" 상태로 생성되게 해주세요.**

---

**요청 완료!** 🎉
