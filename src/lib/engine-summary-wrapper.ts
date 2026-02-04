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

