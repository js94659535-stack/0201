/**
 * genre-classifier.ts
 * 텍스트 장르(Genre) 분류 모듈
 * - FINAL 3축 규칙: 장르별 요약 전략 차별화
 */

export type Genre = 'academic' | 'report' | 'article' | 'general';

export interface GenreResult {
  genre: Genre;
  confidence: number;
  features: string[];
}

/**
 * 장르 분류 키워드 매핑
 */
const GENRE_PATTERNS = {
  academic: [
    /연구|조사|분석|실증|가설|변인|측정|도구/,
    /표\s*\d+|그림\s*\d+|<표|<그림/,
    /선행연구|문헌고찰|이론적 배경/,
    /p\s*[<>=]\s*\.?\d+|유의미|유의수준/,
    /결론적으로|본 연구|연구결과|시사점/,
  ],
  report: [
    /보고서|현황|실태|통계|지표/,
    /년도|연도|\d{4}년/,
    /비율|비중|점유율|증감률/,
    /표\s*\d+|그림\s*\d+/,
    /요약|개요|배경|목적|결론/,
  ],
  article: [
    /기사|뉴스|취재|인터뷰|보도/,
    /\d+일|오늘|어제|최근/,
    /관계자|전문가|업계|당국/,
    /밝혔다|전했다|말했다|설명했다/,
  ],
} as const;

/**
 * 텍스트 장르 자동 분류
 */
export function classifyGenre(text: string): GenreResult {
  const features: string[] = [];
  const scores = { academic: 0, report: 0, article: 0, general: 0 };

  // 학술논문 패턴 검사
  for (const pattern of GENRE_PATTERNS.academic) {
    if (pattern.test(text)) {
      scores.academic += 1;
      features.push(`academic:${pattern.source.slice(0, 20)}`);
    }
  }

  // 보고서 패턴 검사
  for (const pattern of GENRE_PATTERNS.report) {
    if (pattern.test(text)) {
      scores.report += 1;
      features.push(`report:${pattern.source.slice(0, 20)}`);
    }
  }

  // 기사 패턴 검사
  for (const pattern of GENRE_PATTERNS.article) {
    if (pattern.test(text)) {
      scores.article += 1;
      features.push(`article:${pattern.source.slice(0, 20)}`);
    }
  }

  // 최고 점수 장르 결정
  const maxScore = Math.max(scores.academic, scores.report, scores.article);
  let genre: Genre = 'general';

  if (maxScore === 0) {
    genre = 'general';
  } else if (scores.academic === maxScore) {
    genre = 'academic';
  } else if (scores.report === maxScore) {
    genre = 'report';
  } else if (scores.article === maxScore) {
    genre = 'article';
  }

  const confidence = maxScore / (GENRE_PATTERNS.academic.length + GENRE_PATTERNS.report.length + GENRE_PATTERNS.article.length);

  return { genre, confidence, features: features.slice(0, 5) };
}

/**
 * 장르별 최소 요약 문장 수
 */
export function getMinSentencesByGenre(genre: Genre, level: 'brief' | 'standard' | 'detail'): number {
  const map: Record<Genre, Record<string, number>> = {
    academic: { brief: 3, standard: 5, detail: 8 },
    report: { brief: 2, standard: 4, detail: 6 },
    article: { brief: 2, standard: 3, detail: 5 },
    general: { brief: 2, standard: 4, detail: 6 },
  };
  return map[genre][level] || 2;
}

/**
 * 장르별 필수 키워드 추출 전략
 */
export function getGenreKeywordStrategy(genre: Genre): string[] {
  const strategies: Record<Genre, string[]> = {
    academic: ['연구목적', '방법론', '주요결과', '결론/시사점'],
    report: ['현황/배경', '핵심수치', '추세/변화', '결론'],
    article: ['사건/이슈', '주요인물', '발언/의견', '영향/전망'],
    general: ['주제', '핵심내용', '맥락', '결론'],
  };
  return strategies[genre];
}
