/* =========================================================
   LOCAL SELFTEST SOLVER (PHASE 1)
   - 90% mastery
   - retry only wrong
   - 3-stage feedback
   ========================================================= */

type Purpose = 'preview' | 'exam'
type Level = 'brief' | 'standard' | 'detail'

export type SelftestQuestion = {
  id: string
  question: string
  answerType: 'short' | 'long' | 'choice'
  choices?: string[]
  // Phase1: 루브릭은 간단 규칙(키워드 포함)로 시작, 추후 LLM/고급채점으로 교체 가능
  rubric?: {
    mustIncludeAny?: string[]   // 하나라도 포함
    mustIncludeAll?: string[]   // 모두 포함
    forbid?: string[]           // 포함되면 감점
    maxChars?: number
  }
  hint1?: string
  hint2?: string
  explanation?: string         // 3차 이후 제공
  answerKey?: string           // Phase1에서는 "모범답안/키워드"로만 사용
}

export type SelftestSheet = {
  level: Level
  purpose: Purpose
  masteryScore: number // 90
  retryRule: 'only-wrong'
  questions: SelftestQuestion[]
}

export type AttemptInput = {
  // userAnswers[qid] = string (choice는 선택값)
  userAnswers: Record<string, string>
  // attemptNo: 1부터 시작 (1,2,3...)
  attemptNo: number
}

export type QuestionMark = {
  id: string
  score: number         // 0~100
  maxScore: number      // 100
  correct: boolean
  feedback: string      // 채점 이유(채점표)
  nextAction?: 'retry' | 'pass'
  hintToShow?: string   // 1차/2차 힌트 제공
  explanationToShow?: string // 3차 이후 해설
}

export type AttemptResult = {
  ok: boolean
  attemptNo: number
  totalScore: number // 0~100
  pass: boolean
  wrongIds: string[]
  marks: QuestionMark[]
  // 2차 응답에서 "요약/근거 강화" 같은 추가 정보 넣을 자리
  meta?: {
    message: string
  }
}

// ---------- utils ----------
function norm(s: string) {
  return (s || '')
    .replace(/\s+/g, ' ')
    .replace(/[''"]/g, '')
    .trim()
    .toLowerCase()
}

function includesAny(hay: string, needles: string[]) {
  const H = norm(hay)
  return needles.some(n => H.includes(norm(n)))
}

function includesAll(hay: string, needles: string[]) {
  const H = norm(hay)
  return needles.every(n => H.includes(norm(n)))
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

// ---------- core grading ----------
function gradeOne(
  q: SelftestQuestion,
  userAnswer: string,
  attemptNo: number
): QuestionMark {
  const ans = norm(userAnswer)
  const maxScore = 100

  // 빈 답
  if (!ans) {
    const hintToShow =
      attemptNo === 1 ? (q.hint1 || '힌트: 본문/요약에서 관련 문장을 찾아보세요.')
      : attemptNo === 2 ? (q.hint2 || '힌트: 핵심 수치/대조 표현을 중심으로 다시 확인하세요.')
      : undefined

    const explanationToShow =
      attemptNo >= 3 ? (q.explanation || q.answerKey || '해설: 요약의 핵심 근거를 참고하세요.')
      : undefined

    return {
      id: q.id,
      score: 0,
      maxScore,
      correct: false,
      feedback: '미응답',
      nextAction: 'retry',
      hintToShow,
      explanationToShow
    }
  }

  // Phase 1 채점 규칙(키워드 기반)
  const mustAny = q.rubric?.mustIncludeAny || []
  const mustAll = q.rubric?.mustIncludeAll || []
  const forbid = q.rubric?.forbid || []
  const maxChars = q.rubric?.maxChars

  let score = 100
  let reasons: string[] = []

  if (maxChars && ans.length > maxChars) {
    score -= 15
    reasons.push(`분량 초과(-15): ${ans.length}/${maxChars}`)
  }

  if (forbid.length && includesAny(ans, forbid)) {
    score -= 20
    reasons.push('금지 키워드 포함(-20)')
  }

  if (mustAll.length && !includesAll(ans, mustAll)) {
    score -= 40
    reasons.push('필수 요소 일부 누락(-40)')
  }

  if (mustAny.length && !includesAny(ans, mustAny)) {
    score -= 25
    reasons.push('핵심 키워드 미포함(-25)')
  }

  score = clamp(score, 0, 100)
  const correct = score >= 90 // 문항 단위 "충분 정답" 기준

  const hintToShow =
    !correct && attemptNo === 1 ? (q.hint1 || '힌트: 요약에서 핵심 주장/근거를 찾아 단어로 먼저 적어보세요.')
    : !correct && attemptNo === 2 ? (q.hint2 || '힌트: 수치·대조(반면/비해)·결론 문장을 중심으로 다시 구성하세요.')
    : undefined

  const explanationToShow =
    !correct && attemptNo >= 3 ? (q.explanation || q.answerKey || '해설: 요약의 핵심 근거와 비교 포인트를 반영해야 합니다.')
    : undefined

  return {
    id: q.id,
    score,
    maxScore,
    correct,
    feedback: reasons.length ? reasons.join(' / ') : '충분히 정확합니다.',
    nextAction: correct ? 'pass' : 'retry',
    hintToShow,
    explanationToShow
  }
}

// ---------- sheet grading (attempt) ----------
export function gradeSelftestAttempt(
  sheet: SelftestSheet,
  input: AttemptInput
): AttemptResult {
  const attemptNo = Math.max(1, Math.floor(input.attemptNo || 1))

  const marks = sheet.questions.map(q => {
    const ua = input.userAnswers?.[q.id] ?? ''
    return gradeOne(q, ua, attemptNo)
  })

  // 전체 점수: 문항 평균(Phase1 단순)
  const totalScore = Math.round(
    marks.reduce((s, m) => s + m.score, 0) / Math.max(1, marks.length)
  )

  const wrongIds = marks.filter(m => !m.correct).map(m => m.id)
  const pass = totalScore >= sheet.masteryScore

  // "틀린 문항만 재도전" 안내 메시지
  let message = ''
  if (pass) {
    message = 'PASS: 90점 이상 통과했습니다. 다음 단계로 이동합니다.'
  } else if (attemptNo === 1) {
    message = '1차: 틀린 문항만 다시 풀어주세요. (힌트 1 제공)'
  } else if (attemptNo === 2) {
    message = '2차: 틀린 문항만 다시 풀어주세요. (힌트 2 + 근거 강화)'
  } else {
    message = '3차 이상: 해설을 참고하고, 동일 문항을 다시 풀어 정답 기준(90점)을 충족하세요.'
  }

  return {
    ok: true,
    attemptNo,
    totalScore,
    pass,
    wrongIds,
    marks,
    meta: { message }
  }
}
