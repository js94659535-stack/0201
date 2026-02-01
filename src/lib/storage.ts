/**
 * D1 Storage for allSummaries
 */

export async function ensureD1(db: D1Database) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS ms_docs (
      doc_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      original_text TEXT NOT NULL,
      all_summaries_json TEXT NOT NULL,
      PRIMARY KEY (doc_id, user_id)
    );
  `).run()
  
  await db.prepare(`
    CREATE INDEX IF NOT EXISTS ms_docs_user_time ON ms_docs(user_id, created_at);
  `).run()
}

export async function saveDocV1(db: D1Database, payload: {
  docId: string
  userId: string
  originalText: string
  allSummaries: any
}) {
  const createdAt = new Date().toISOString()
  await db.prepare(`
    INSERT INTO ms_docs (doc_id, user_id, created_at, original_text, all_summaries_json)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(doc_id, user_id) DO UPDATE SET
      created_at=excluded.created_at,
      original_text=excluded.original_text,
      all_summaries_json=excluded.all_summaries_json;
  `).bind(
    payload.docId,
    payload.userId,
    createdAt,
    payload.originalText,
    JSON.stringify(payload.allSummaries || {})
  ).run()
}

export async function loadDocV1(db: D1Database, q: { docId: string; userId: string }) {
  const r = await db.prepare(`
    SELECT doc_id as docId, user_id as userId, created_at as createdAt,
           original_text as originalText, all_summaries_json as allSummariesJson
    FROM ms_docs WHERE doc_id=? AND user_id=? LIMIT 1;
  `).bind(q.docId, q.userId).first()
  
  if (!r) return null
  
  return {
    ...r,
    allSummaries: JSON.parse((r as any).allSummariesJson || '{}')
  }
}

export async function listDocsV1(db: D1Database, q: { userId: string; limit: number }) {
  const rs = await db.prepare(`
    SELECT doc_id as docId, user_id as userId, created_at as createdAt,
           substr(original_text, 1, 120) as preview
    FROM ms_docs WHERE user_id=? ORDER BY created_at DESC LIMIT ?;
  `).bind(q.userId, q.limit).all()
  
  return rs?.results || []
}
