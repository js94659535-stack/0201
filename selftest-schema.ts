// =======================================================
// Selftest Schema Definition
// - 80% 통과 게이트
// - questions JSON 스키마
// =======================================================

interface SelftestQuestion {
  id: string;
  type: 'reorder' | 'blank' | 'choice';
  prompt: string;
  choices?: string[];
  answer: string | string[];
}

interface SelftestResult {
  questions: SelftestQuestion[];
  passingScore: number; // 0.8 (80%)
}

interface SelftestAttempt {
  attemptId: string;
  timestamp: string;
  answers: Record<string, string | string[]>;
  score: number;
  passed: boolean;
}

function norm(s: string): string {
  return (s || '')
    .replace(/\s+/g, ' ')
    .replace(/["""]/g, '"')
    .replace(/[''']/g, "'")
    .trim()
    .toLowerCase();
}

function gradeQuestion(question: SelftestQuestion, userAnswer: string | string[]): boolean {
  if (question.type === 'reorder') {
    // 배열 순서 비교
    const correctOrder = Array.isArray(question.answer) ? question.answer : [question.answer];
    const userOrder = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
    
    if (correctOrder.length !== userOrder.length) return false;
    
    return correctOrder.every((item, idx) => norm(item) === norm(userOrder[idx]));
  }

  if (question.type === 'blank') {
    // 빈칸 채우기 (정규화 비교)
    const correct = Array.isArray(question.answer) ? question.answer[0] : question.answer;
    const user = Array.isArray(userAnswer) ? userAnswer[0] : userAnswer;
    
    return norm(correct) === norm(user);
  }

  if (question.type === 'choice') {
    // 선택형 (정확 일치)
    const correct = Array.isArray(question.answer) ? question.answer[0] : question.answer;
    const user = Array.isArray(userAnswer) ? userAnswer[0] : userAnswer;
    
    return correct === user;
  }

  return false;
}

export function gradeAttempt(
  test: SelftestResult,
  answers: Record<string, string | string[]>
): SelftestAttempt {
  let correctCount = 0;
  const totalQuestions = test.questions.length;

  for (const question of test.questions) {
    const userAnswer = answers[question.id];
    if (userAnswer && gradeQuestion(question, userAnswer)) {
      correctCount++;
    }
  }

  const score = totalQuestions > 0 ? correctCount / totalQuestions : 0;
  const passed = score >= test.passingScore;

  return {
    attemptId: `attempt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString(),
    answers,
    score,
    passed,
  };
}

export function validateSelftestSchema(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Selftest data must be an object');
    return { valid: false, errors };
  }

  if (!Array.isArray(data.questions)) {
    errors.push('questions must be an array');
  } else {
    data.questions.forEach((q: any, idx: number) => {
      if (!q.id) errors.push(`Question ${idx}: missing id`);
      if (!q.type || !['reorder', 'blank', 'choice'].includes(q.type)) {
        errors.push(`Question ${idx}: invalid type "${q.type}"`);
      }
      if (!q.prompt) errors.push(`Question ${idx}: missing prompt`);
      if (q.type === 'choice' && !Array.isArray(q.choices)) {
        errors.push(`Question ${idx}: choice type requires choices array`);
      }
      if (q.answer === undefined) errors.push(`Question ${idx}: missing answer`);
    });
  }

  if (typeof data.passingScore !== 'number' || data.passingScore < 0 || data.passingScore > 1) {
    errors.push('passingScore must be a number between 0 and 1');
  }

  return { valid: errors.length === 0, errors };
}

// =======================================================
// LLM Prompt for Selftest
// =======================================================
export function buildSelftestPrompt(
  originalText: string,
  mode: 'brief' | 'standard' | 'detail'
): string {
  const questionCounts = {
    brief: 3,
    standard: 5,
    detail: 8,
  };

  const count = questionCounts[mode] || 5;

  return `
당신은 학술 문장 셀프테스트 생성 엔진이다.
아래 원문을 바탕으로 "${mode}" 난이도의 셀프테스트를 JSON으로만 출력하라.

[절대 규칙]
- 문항 수: ${count}개
- 문항 타입:
  - reorder: 순서 재배열 (정답은 배열)
  - blank: 빈칸 채우기 (정답은 문자열)
  - choice: 선택형 (choices 배열 필수, 정답은 문자열)
- 합격 점수(passingScore): 0.8 (80%)
- 출력은 JSON 단독(설명/마크다운/코드블록 금지).

[난이도 가이드]
- brief: 핵심 개념 확인 (쉬운 문제)
- standard: 배경/근거 이해 (중간 난이도)
- detail: 논거/예시/한계 분석 (어려운 문제)

[출력 JSON 스키마]
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

[원문]
${originalText}
`.trim();
}
