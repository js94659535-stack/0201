/**
 * engine-summary-wrapper.ts
 *
 * SUMMARY ENGINE V4
 * 단일 진입점 (Single Entry Point)
 *
 * 역할:
 * - 요약은 반드시 이 파일을 통해서만 실행된다
 * - detail 요약은 1회만 생성
 * - standard / brief 는 detail 기반 downsample
 */

export type SummaryLevel = 'detail' | 'standard' | 'brief'

export type SummaryRequest = {
  text: string
  options?: Record<string, any>
}

export type SummaryResult = {
  meta: {
    engine: 'SUMMARY_V4'
    createdAt: string
  }
  detail: any
  standard: any | null
  brief: any | null
}

export async function runSummaryEngineV4(
  req: SummaryRequest
): Promise<SummaryResult> {
  const { text, options } = req

  if (!text || !text.trim()) {
    throw new Error('SUMMARY_INPUT_EMPTY')
  }

  const now = new Date().toISOString()

  // TODO:
  // 1. detail 요약 생성 (단 1회)
  // 2. standard / brief downsample
  // 3. summary-guard 검사 연결

  return {
    meta: {
      engine: 'SUMMARY_V4',
      createdAt: now,
    },
    detail: null,
    standard: null,
    brief: null,
  }
}
