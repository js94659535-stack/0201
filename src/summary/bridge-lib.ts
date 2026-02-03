/**
 * bridge-lib.ts
 * 장르별 연결사 브릿지 함수 (FINAL 3축 운영 규칙)
 * - 장르에 따라 적절한 연결사를 선택하여 자연스러운 문장 연결
 */

import type { Genre } from './genre-classifier';

/**
 * 장르별 연결사 매핑
 */
const BRIDGE_CONNECTORS: Record<Genre, Record<string, string[]>> = {
  academic: {
    sequence: ['먼저', '다음으로', '이어서', '마지막으로'],
    causality: ['따라서', '그러므로', '이에 따라', '결과적으로'],
    contrast: ['반면', '이와 달리', '대조적으로', '한편'],
    addition: ['또한', '더불어', '아울러', '나아가'],
    conclusion: ['결론적으로', '종합하면', '요약하면', '정리하면'],
  },
  report: {
    sequence: ['첫째', '둘째', '셋째', '마지막으로'],
    causality: ['이에 따라', '그 결과', '따라서'],
    contrast: ['반면', '이에 반해', '대조적으로'],
    addition: ['또한', '더불어', '추가로'],
    conclusion: ['결론적으로', '종합하면', '요약하면'],
  },
  article: {
    sequence: ['먼저', '이어', '그리고', '마지막으로'],
    causality: ['이에 따라', '그래서', '결과적으로'],
    contrast: ['하지만', '그러나', '반면'],
    addition: ['또', '또한', '그리고'],
    conclusion: ['결국', '결론적으로', '종합하면'],
  },
  general: {
    sequence: ['먼저', '다음', '그리고', '마지막으로'],
    causality: ['따라서', '그래서', '그러므로'],
    contrast: ['하지만', '반면', '그러나'],
    addition: ['또한', '그리고', '더불어'],
    conclusion: ['결론적으로', '요약하면', '정리하면'],
  },
};

/**
 * 연결사 타입
 */
export type ConnectorType = 'sequence' | 'causality' | 'contrast' | 'addition' | 'conclusion';

/**
 * 장르에 맞는 연결사 선택
 */
export function getBridgeConnector(genre: Genre, type: ConnectorType, index: number = 0): string {
  const connectors = BRIDGE_CONNECTORS[genre]?.[type] || BRIDGE_CONNECTORS.general[type];
  return connectors[index % connectors.length];
}

/**
 * 문장 배열을 연결사로 연결
 */
export function bridgeSentences(sentences: string[], genre: Genre, type: ConnectorType = 'sequence'): string {
  if (sentences.length === 0) return '';
  if (sentences.length === 1) return sentences[0];

  const bridged: string[] = [];
  for (let i = 0; i < sentences.length; i++) {
    if (i === 0) {
      bridged.push(sentences[i]);
    } else {
      const connector = getBridgeConnector(genre, type, i - 1);
      bridged.push(`${connector} ${sentences[i]}`);
    }
  }

  return bridged.join(' ');
}

/**
 * 문단 연결 (요약 레벨별)
 */
export function bridgeParagraphs(paragraphs: string[], genre: Genre, level: 'brief' | 'standard' | 'detail'): string {
  if (paragraphs.length === 0) return '';
  if (paragraphs.length === 1) return paragraphs[0];

  const bridged: string[] = [];
  for (let i = 0; i < paragraphs.length; i++) {
    if (i === 0) {
      bridged.push(paragraphs[i]);
    } else if (i === paragraphs.length - 1) {
      // 마지막 문단: 결론 연결사
      const connector = getBridgeConnector(genre, 'conclusion', 0);
      bridged.push(`${connector} ${paragraphs[i]}`);
    } else if (i % 2 === 0) {
      // 짝수: 추가 연결사
      const connector = getBridgeConnector(genre, 'addition', i / 2);
      bridged.push(`${connector} ${paragraphs[i]}`);
    } else {
      // 홀수: 대조 연결사
      const connector = getBridgeConnector(genre, 'contrast', (i - 1) / 2);
      bridged.push(`${connector} ${paragraphs[i]}`);
    }
  }

  return bridged.join('\n\n');
}

/**
 * 연결사 자동 제거 (중복 방지)
 */
export function removeDuplicateConnectors(text: string): string {
  const duplicatePatterns = [
    /(\b(?:따라서|그러므로|그래서)\b)\s+\1/g,
    /(\b(?:또한|더불어|아울러)\b)\s+\1/g,
    /(\b(?:반면|대조적으로)\b)\s+\1/g,
  ];

  let cleaned = text;
  for (const pattern of duplicatePatterns) {
    cleaned = cleaned.replace(pattern, '$1');
  }

  return cleaned;
}

/**
 * 문장 끝 정규화 (마침표 통일)
 */
export function normalizeSentenceEndings(text: string): string {
  return text
    .replace(/\s*[.。]\s*$/g, '.') // 마침표 통일
    .replace(/\s*[!?]\s*$/g, '.') // 느낌표/물음표 제거
    .replace(/\s+/g, ' ') // 연속 공백 제거
    .trim();
}

/**
 * 장르별 금칙어 체크 (환각 방지)
 */
const FORBIDDEN_META_PHRASES = [
  '이 글은',
  '본 글은',
  '이 논문은',
  '이 보고서는',
  '이 기사는',
  '설명한다',
  '다루고 있다',
  '서술하고 있다',
  '제시하고 있다',
];

export function containsForbiddenMetaPhrases(text: string): boolean {
  return FORBIDDEN_META_PHRASES.some((phrase) => text.includes(phrase));
}

/**
 * 생략부호 체크 (Ellipsis/Truncation 차단)
 */
export function hasEllipsis(text: string): boolean {
  return /\.{2,}|…/.test(text);
}

/**
 * 브릿지 품질 점수 (0~100)
 */
export function calculateBridgeQuality(text: string, genre: Genre): number {
  let score = 100;

  // 금칙어 감점
  if (containsForbiddenMetaPhrases(text)) score -= 30;

  // 생략부호 감점
  if (hasEllipsis(text)) score -= 50;

  // 연결사 부족 감점
  const connectorCount = Object.values(BRIDGE_CONNECTORS[genre] || {})
    .flat()
    .filter((conn) => text.includes(conn)).length;
  if (connectorCount === 0) score -= 20;

  // 문장 수 부족 감점
  const sentenceCount = text.split(/[.。!?]/).filter((s) => s.trim().length > 5).length;
  if (sentenceCount < 2) score -= 20;

  return Math.max(0, score);
}
