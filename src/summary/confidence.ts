/**
 * confidence.ts
 * Confidence/QA 점수 계산 및 Phase2 재검토 로직 (FINAL 3축 ③)
 * - Confidence < 70이면 Phase2 재검토 1회 강제
 * - 재검토 실패 시 Phase1 결과 내보내고 qa.notice에 경고 기록
 */

import type { Genre } from './genre-classifier';
import type { TableData } from './table-preprocess';
import { validateTableFrame } from './table-preprocess';
import { calculateBridgeQuality, containsForbiddenMetaPhrases, hasEllipsis } from './bridge-lib';

export interface ConfidenceResult {
  score: number; // 0~100
  passed: boolean; // >= 70
  breakdown: {
    extraction: number; // 복제율 (0~30점)
    keywordCoverage: number; // 키워드 커버리지 (0~20점)
    tableFrame: number; // 표 프레임 (0~20점)
    bridgeQuality: number; // 연결사 품질 (0~15점)
    crossConsistency: number; // 교차 일관성 (0~15점)
  };
  warnings: string[];
  notice?: string; // qa.notice
}

/**
 * 복제율(Extraction) 계산 (0~30점)
 * - 요약문이 원문과 너무 비슷하면 감점
 */
function calculateExtractionScore(originalText: string, summaryText: string, level: 'brief' | 'standard' | 'detail'): number {
  const originalChars = originalText.replace(/\s+/g, '').length;
  const summaryChars = summaryText.replace(/\s+/g, '').length;
  const ratio = summaryChars / originalChars;

  // 레벨별 목표 비율
  const targetRatios = { brief: 0.125, standard: 0.275, detail: 0.465 };
  const target = targetRatios[level];

  // 목표 비율과의 차이
  const diff = Math.abs(ratio - target);

  // 차이가 작을수록 높은 점수
  if (diff < 0.03) return 30; // 목표 비율 ±3% 이내
  if (diff < 0.05) return 25; // 목표 비율 ±5% 이내
  if (diff < 0.10) return 20; // 목표 비율 ±10% 이내
  if (diff < 0.15) return 15; // 목표 비율 ±15% 이내
  return 10; // 목표 비율에서 많이 벗어남
}

/**
 * 키워드 커버리지 계산 (0~20점)
 * - 원문의 핵심 키워드가 요약문에 포함되는지 확인
 */
function calculateKeywordCoverageScore(originalText: string, summaryText: string, tableData: TableData): number {
  const keywords = [
    ...tableData.keywords,
    ...tableData.numericValues,
  ];

  if (keywords.length === 0) return 20; // 키워드 없으면 만점

  const coveredCount = keywords.filter((kw) => summaryText.includes(kw)).length;
  const coverage = coveredCount / keywords.length;

  if (coverage >= 0.8) return 20; // 80% 이상
  if (coverage >= 0.6) return 15; // 60% 이상
  if (coverage >= 0.4) return 10; // 40% 이상
  return 5; // 40% 미만
}

/**
 * 표 프레임 점수 (0~20점)
 * - FINAL 3축 ②: 수치 → 해석 → 변화 → 결론 구조 확인
 */
function calculateTableFrameScore(summaryText: string, tableData: TableData): number {
  const validation = validateTableFrame(summaryText, tableData);

  if (!tableData.hasTable) return 20; // 표 없으면 만점
  if (validation.ok) return 20; // 완벽

  // 누락된 요소 수에 따라 감점
  const missingCount = validation.missing.length;
  if (missingCount === 0) return 20;
  if (missingCount === 1) return 15;
  if (missingCount === 2) return 10;
  return 5; // 3~4개 누락
}

/**
 * 교차 일관성 점수 (0~15점)
 * - brief/standard/detail 간 일관성 확인
 */
function calculateCrossConsistencyScore(brief: string, standard: string, detail: string): number {
  // brief의 핵심 키워드가 standard/detail에 모두 포함되는지 확인
  const briefKeywords = brief.split(/\s+/).filter((w) => w.length >= 3).slice(0, 10);
  const standardCoverage = briefKeywords.filter((kw) => standard.includes(kw)).length / briefKeywords.length;
  const detailCoverage = briefKeywords.filter((kw) => detail.includes(kw)).length / briefKeywords.length;

  const avgCoverage = (standardCoverage + detailCoverage) / 2;

  if (avgCoverage >= 0.8) return 15;
  if (avgCoverage >= 0.6) return 10;
  return 5;
}

/**
 * 전체 Confidence 점수 계산
 */
export function calculateConfidence(
  originalText: string,
  brief: string,
  standard: string,
  detail: string,
  genre: Genre,
  tableData: TableData,
  level: 'brief' | 'standard' | 'detail'
): ConfidenceResult {
  const warnings: string[] = [];

  // 1) 복제율 (0~30점)
  const extraction = calculateExtractionScore(originalText, detail, level);
  if (extraction < 15) warnings.push('복제율이 목표 범위를 벗어남');

  // 2) 키워드 커버리지 (0~20점)
  const keywordCoverage = calculateKeywordCoverageScore(originalText, detail, tableData);
  if (keywordCoverage < 10) warnings.push('핵심 키워드 누락');

  // 3) 표 프레임 (0~20점)
  const tableFrame = calculateTableFrameScore(detail, tableData);
  if (tableFrame < 10) warnings.push('표 프레임 구조 미비');

  // 4) 브릿지 품질 (0~15점)
  const bridgeQuality = calculateBridgeQuality(detail, genre) * 0.15; // 0~100 → 0~15
  if (bridgeQuality < 10) warnings.push('연결사 품질 저하');

  // 5) 교차 일관성 (0~15점)
  const crossConsistency = calculateCrossConsistencyScore(brief, standard, detail);
  if (crossConsistency < 10) warnings.push('레벨 간 일관성 부족');

  // 총점 계산
  const score = extraction + keywordCoverage + tableFrame + bridgeQuality + crossConsistency;
  const passed = score >= 70;

  // 금칙어/생략부호 체크
  if (containsForbiddenMetaPhrases(detail)) warnings.push('금칙어 포함');
  if (hasEllipsis(detail)) warnings.push('생략부호 포함');

  // notice 생성
  let notice: string | undefined;
  if (!passed) {
    notice = `복잡/불확실 (Confidence: ${score.toFixed(1)}/100)`;
  }

  return {
    score,
    passed,
    breakdown: {
      extraction,
      keywordCoverage,
      tableFrame,
      bridgeQuality,
      crossConsistency,
    },
    warnings,
    notice,
  };
}

/**
 * Phase2 재검토 필요 여부 판단
 */
export function needsPhase2Review(confidence: ConfidenceResult): boolean {
  return !confidence.passed; // Confidence < 70
}

/**
 * Phase2 재검토 프롬프트 생성
 */
export function buildPhase2ReviewPrompt(
  originalText: string,
  summaryText: string,
  confidence: ConfidenceResult,
  tableData: TableData
): string {
  const issues: string[] = [];

  // 문제점 수집
  if (confidence.breakdown.extraction < 15) {
    issues.push('요약 비율이 목표 범위를 벗어났습니다.');
  }
  if (confidence.breakdown.keywordCoverage < 10) {
    issues.push(`핵심 키워드가 누락되었습니다: ${tableData.keywords.join(', ')}`);
  }
  if (confidence.breakdown.tableFrame < 10) {
    issues.push('표 프레임 구조(수치→해석→변화→결론)가 미비합니다.');
  }
  if (confidence.breakdown.bridgeQuality < 10) {
    issues.push('연결사 품질이 낮습니다.');
  }
  if (confidence.breakdown.crossConsistency < 10) {
    issues.push('레벨 간 일관성이 부족합니다.');
  }

  const prompt = `
다음 요약을 개선하세요.

[원문]
${originalText.slice(0, 500)}...

[현재 요약]
${summaryText}

[문제점]
${issues.join('\n')}

[요구사항]
1. 요약 비율: brief 10~15%, standard 25~30%, detail 45~55%
2. 표 프레임: 수치 → 해석 → 변화 → 결론 구조 포함
3. 핵심 키워드 반드시 포함: ${tableData.keywords.slice(0, 5).join(', ')}
4. 금칙어 금지: 이 글은, 설명한다, 본 논문은 등
5. 생략부호 금지: ..., …

개선된 요약문을 작성하세요.
`.trim();

  return prompt;
}

/**
 * Phase2 재검토 실패 시 fallback 처리
 */
export function handlePhase2Failure(phase1Result: any, confidence: ConfidenceResult): any {
  return {
    ...phase1Result,
    qa: null, // qa를 null로 설정
    notice: confidence.notice || '복잡/불확실',
    warnings: confidence.warnings,
  };
}
