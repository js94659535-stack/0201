/**
 * FALSE Bucket: 요약 검증 실패/품질 실패 결과 보관
 * Purpose: 디버깅, 모델 개선, 재시도 분석
 */

import { D1Database } from '@cloudflare/workers-types';

export interface FalseBucketEntry {
  id: string;
  created_at: string;
  source: string;              // "summary_v4" | "matrix_v4" | "quality_gate"
  reason: string;              // "DETAIL_VALIDATION_FAIL" | "RATIO_OUT_OF_RANGE" | ...
  errors: string[];            // Array of error messages
  input_hash: string;          // SHA256 hash of input_text
  input_text: string;          // Original input text
  model?: string;              // Model name or null
  payload_json?: string;       // Raw result (JSON string)
  retry_count: number;
  meta_json?: string;          // Additional metadata
}

export interface FalseBucketInsertParams {
  source: string;
  reason: string;
  errors: string[];
  input_text: string;
  model?: string;
  payload?: any;               // Will be JSON.stringify'd
  retry_count?: number;
  meta?: any;                  // Will be JSON.stringify'd
}

/**
 * Generate SHA256 hash of text
 */
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate unique ID for false bucket entry
 */
function generateFalseBucketId(): string {
  return `fb_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Insert a failure record into FALSE Bucket
 */
export async function insertFalseBucket(
  db: D1Database | null | undefined,
  params: FalseBucketInsertParams
): Promise<{ id: string; success: boolean; error?: string }> {
  if (!db) {
    console.warn('[FALSE Bucket] D1 database not available, skipping insert');
    return { id: '', success: false, error: 'D1_NOT_AVAILABLE' };
  }

  try {
    const id = generateFalseBucketId();
    const created_at = new Date().toISOString();
    const input_hash = await sha256(params.input_text);
    
    const payload_json = params.payload ? JSON.stringify(params.payload) : null;
    const meta_json = params.meta ? JSON.stringify(params.meta) : null;
    const errors_json = JSON.stringify(params.errors);

    await db.prepare(`
      INSERT INTO ms_false_bucket (
        id, created_at, source, reason, errors,
        input_hash, input_text, model, payload_json,
        retry_count, meta_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      created_at,
      params.source,
      params.reason,
      errors_json,
      input_hash,
      params.input_text,
      params.model || null,
      payload_json,
      params.retry_count || 0,
      meta_json
    ).run();

    console.log('[FALSE Bucket] Inserted:', {
      id,
      source: params.source,
      reason: params.reason,
      input_hash: input_hash.substring(0, 8) + '...',
      errors_count: params.errors.length
    });

    return { id, success: true };
  } catch (err) {
    console.error('[FALSE Bucket] Insert failed:', err);
    return { 
      id: '', 
      success: false, 
      error: err instanceof Error ? err.message : String(err) 
    };
  }
}

/**
 * Query recent failures
 */
export async function queryRecentFailures(
  db: D1Database | null | undefined,
  limit: number = 20
): Promise<FalseBucketEntry[]> {
  if (!db) return [];

  try {
    const result = await db.prepare(`
      SELECT * FROM ms_false_bucket
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(limit).all<FalseBucketEntry>();

    return result.results || [];
  } catch (err) {
    console.error('[FALSE Bucket] Query failed:', err);
    return [];
  }
}

/**
 * Query failures by reason
 */
export async function queryFailuresByReason(
  db: D1Database | null | undefined,
  reason: string,
  limit: number = 10
): Promise<FalseBucketEntry[]> {
  if (!db) return [];

  try {
    const result = await db.prepare(`
      SELECT * FROM ms_false_bucket
      WHERE reason = ?
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(reason, limit).all<FalseBucketEntry>();

    return result.results || [];
  } catch (err) {
    console.error('[FALSE Bucket] Query by reason failed:', err);
    return [];
  }
}

/**
 * Get duplicate failures by input hash
 */
export async function queryDuplicateFailures(
  db: D1Database | null | undefined
): Promise<{ input_hash: string; count: number }[]> {
  if (!db) return [];

  try {
    const result = await db.prepare(`
      SELECT input_hash, COUNT(*) as count
      FROM ms_false_bucket
      GROUP BY input_hash
      HAVING count > 1
      ORDER BY count DESC
      LIMIT 50
    `).all<{ input_hash: string; count: number }>();

    return result.results || [];
  } catch (err) {
    console.error('[FALSE Bucket] Query duplicates failed:', err);
    return [];
  }
}
