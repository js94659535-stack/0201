/**
 * table-preprocess.ts
 * 표/수치 전처리 및 정규화 모듈
 * - FINAL 3축 ②: 표/수치 서술 프레임 강제
 */

export interface TableData {
  hasTable: boolean;
  tableNumbers: string[]; // 표 번호 (예: 표3, 표8, 표17)
  numericValues: string[]; // 수치 (예: 7.6%, 2.8%, 6.5%, 0.2%)
  keywords: string[]; // 표 관련 키워드
  cleanedText: string; // 정리된 텍스트 (페이지 번호, 찌꺼기 제거)
}

/**
 * 표/페이지 찌꺼기 패턴
 */
const JUNK_PATTERNS = [
  /^-\s*\d+\s*-$/gm, // 페이지 번호 (예: - 40 -)
  /^=+$/gm, // 구분선
  /^\*+$/gm, // 별표 구분선
  /^─+$/gm, // 표 선
  /^┌[─┬┐]+$/gm, // 표 테두리 상단
  /^├[─┼┤]+$/gm, // 표 테두리 중간
  /^└[─┴┘]+$/gm, // 표 테두리 하단
];

/**
 * 수치 패턴 (백분율, 소수점, 정수)
 */
const NUMERIC_PATTERNS = [
  /\d+\.\d+%/g, // 7.6%, 2.8%
  /\d+%/g, // 50%, 80%
  /\d+\.\d+/g, // 3.14, 2.5
  /\d{1,3}(?:,\d{3})+/g, // 1,000, 10,000
];

/**
 * 표 번호 패턴
 */
const TABLE_NUMBER_PATTERN = /(?:표|Table)\s*\d+/gi;

/**
 * 표/수치 키워드
 */
const TABLE_KEYWORDS = [
  '공교육비',
  '사교육비',
  '민간 부담',
  '학년별',
  '비교',
  '차이',
  '증감',
  '추세',
  '비율',
  '점유율',
];

/**
 * 원문에서 표/수치 데이터 추출 및 전처리
 */
export function preprocessTableData(rawText: string): TableData {
  // 1) 찌꺼기 제거
  let cleanedText = rawText;
  for (const pattern of JUNK_PATTERNS) {
    cleanedText = cleanedText.replace(pattern, '');
  }

  // 2) 표 번호 추출
  const tableNumbers = Array.from(new Set(cleanedText.match(TABLE_NUMBER_PATTERN) || []));

  // 3) 수치 추출
  const numericValues: string[] = [];
  for (const pattern of NUMERIC_PATTERNS) {
    const matches = cleanedText.match(pattern) || [];
    numericValues.push(...matches);
  }
  const uniqueNumericValues = Array.from(new Set(numericValues));

  // 4) 키워드 추출
  const keywords = TABLE_KEYWORDS.filter((kw) => cleanedText.includes(kw));

  // 5) 표 존재 여부
  const hasTable = tableNumbers.length > 0 || uniqueNumericValues.length >= 3;

  return {
    hasTable,
    tableNumbers,
    numericValues: uniqueNumericValues,
    keywords,
    cleanedText: cleanedText.trim(),
  };
}

/**
 * 표/수치 서술 프레임 강제 (FINAL 3축 ②)
 * - 수치(무엇이 얼마나?) → 해석(무엇을 뜻하나?) → 변화(학년/집단/조건별 차이) → 결론(한 문장)
 */
export interface TableFrame {
  numericDescription: string; // 수치(무엇이 얼마나?)
  interpretation: string; // 해석(무엇을 뜻하나?)
  variation: string; // 변화(학년/집단/조건별 차이)
  conclusion: string; // 결론(한 문장)
}

/**
 * 표 프레임 검증
 */
export function validateTableFrame(summaryText: string, tableData: TableData): {
  ok: boolean;
  missing: string[];
  found: string[];
} {
  if (!tableData.hasTable) {
    return { ok: true, missing: [], found: [] };
  }

  const missing: string[] = [];
  const found: string[] = [];

  // 1) 수치 포함 여부
  const hasNumeric = tableData.numericValues.some((num) => summaryText.includes(num));
  if (hasNumeric) {
    found.push('수치');
  } else {
    missing.push('수치(무엇이 얼마나?)');
  }

  // 2) 해석 키워드
  const interpretKeywords = ['의미', '뜻', '나타', '보여', '시사'];
  const hasInterpret = interpretKeywords.some((kw) => summaryText.includes(kw));
  if (hasInterpret) {
    found.push('해석');
  } else {
    missing.push('해석(무엇을 뜻하나?)');
  }

  // 3) 변화 키워드
  const variationKeywords = ['차이', '변화', '증가', '감소', '학년별', '집단별', '비교', '대조'];
  const hasVariation = variationKeywords.some((kw) => summaryText.includes(kw));
  if (hasVariation) {
    found.push('변화');
  } else {
    missing.push('변화(학년/집단/조건별 차이)');
  }

  // 4) 결론 문장
  const conclusionKeywords = ['따라서', '결과적으로', '결론', '정리하면', '요약하면'];
  const hasConclusion = conclusionKeywords.some((kw) => summaryText.includes(kw));
  if (hasConclusion) {
    found.push('결론');
  } else {
    missing.push('결론(한 문장)');
  }

  return { ok: missing.length === 0, missing, found };
}

/**
 * 표 프레임 자동 생성 (fallback)
 */
export function buildTableFrameFallback(tableData: TableData): string {
  if (!tableData.hasTable) return '';

  const parts: string[] = [];

  // 수치
  if (tableData.numericValues.length > 0) {
    parts.push(`주요 수치는 ${tableData.numericValues.slice(0, 3).join(', ')}이다.`);
  }

  // 해석
  if (tableData.keywords.length > 0) {
    parts.push(`이는 ${tableData.keywords[0]} 측면에서 의미가 있다.`);
  }

  // 변화
  if (tableData.keywords.includes('학년별') || tableData.keywords.includes('비교')) {
    parts.push('집단 간 차이가 관찰되었다.');
  }

  // 결론
  parts.push('따라서 이러한 수치는 중요한 시사점을 제공한다.');

  return parts.join(' ');
}
