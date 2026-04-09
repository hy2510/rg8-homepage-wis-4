/** FNV-1a 32bit */
function fnv1a32(seed: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}
/** 32-bit mixing (분포 개선) */
function mix32(x: number): number {
  x ^= x >>> 16
  x = Math.imul(x, 0x7feb352d)
  x ^= x >>> 15
  x = Math.imul(x, 0x846ca68b)
  x ^= x >>> 16
  return x >>> 0
}

/** PRNG(seed -> 0..1) */
function mulberry32(seed32: number): () => number {
  let a = seed32 >>> 0
  return function (): number {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* 키를 받아서 숫자를 만들어줌 */
function makeSeed32(seedKey: string): number {
  return mix32(fnv1a32(seedKey))
}

/* 32비트 숫자의 범위를 0~(bound-1)로 변환 */
function seedToBound(seed32: number, bound: number): number {
  if (!Number.isInteger(bound) || bound <= 0) {
    throw new Error('bound must be a positive integer')
  }
  return (seed32 >>> 0) % bound
}

/** 결정적 셔플(Fisher–Yates): 같은 seed면 항상 같은 순서 */
export function shuffleDeterministic<T>(
  arr: ReadonlyArray<T>,
  seedKey: string,
): T[] {
  const seed32 = makeSeed32(seedKey)

  const out = arr.slice() // T[]
  const rnd = mulberry32(seed32)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    const tmp = out[i]
    out[i] = out[j]
    out[j] = tmp
  }
  return out
}
