const LEVELS = [
  'PK',
  'KA',
  'KB',
  'KC',
  '1A',
  '1B',
  '1C',
  '2A',
  '2B',
  '2C',
  '3A',
  '3B',
  '3C',
  '4A',
  '4B',
  '4C',
  '5A',
  '5B',
  '5C',
  '6A',
  '6B',
  '6C',
]

function getLevel(level: string): string {
  let myLevel = level.toUpperCase()
  if (
    myLevel === 'PRE K' ||
    myLevel === 'PREK' ||
    myLevel === 'DODO ABC' ||
    myLevel === 'DODOABC'
  ) {
    myLevel = 'PK'
  }
  return myLevel
}

function getLevelIndex(level: string): number {
  const myLevel = getLevel(level)
  return LEVELS.findIndex((lv) => lv === myLevel)
}

function nextLevel(level: string): string | undefined {
  const myLevelIndex = getLevelIndex(level)
  if (myLevelIndex === LEVELS.length - 1) {
    return
  }
  return LEVELS[myLevelIndex + 1]
}

function previousLevel(level: string): string | undefined {
  const myLevelIndex = getLevelIndex(level)
  if (myLevelIndex <= 0) {
    return
  }
  return LEVELS[myLevelIndex - 1]
}

function isContainLevel(
  level: string,
  minLevel: string,
  maxLevel: string,
): boolean {
  const myLevelIndex = getLevelIndex(level)
  const minLevelIndex = getLevelIndex(minLevel)
  const maxLevelIndex = getLevelIndex(maxLevel)

  return minLevelIndex <= myLevelIndex && myLevelIndex <= maxLevelIndex
}

const LevelUtils = {
  nextLevel,
  previousLevel,
  isContainLevel,
  getLevelIndex,
}
export default LevelUtils
