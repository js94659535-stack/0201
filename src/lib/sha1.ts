/**
 * SHA1-like hash (FNV-1a 32bit)
 * Used for docId and cache keys
 */
export function sha1(s: string): string {
  let h1 = 0x811c9dc5
  const str = String(s || '')
  for (let i = 0; i < str.length; i++) {
    h1 ^= str.charCodeAt(i)
    h1 = Math.imul(h1, 16777619)
  }
  // FNV-1a 32bit to hex
  return ('0000000' + (h1 >>> 0).toString(16)).slice(-8)
}
