import { Assets } from '@/8th/assets/asset-library'
import { LevelBook } from '@/8th/features/achieve/model/level-books'
import { SearchSeriesCategory } from '@/8th/features/library/model/category-series'
import SITE_PATH from '@/app/site-path'
import LevelUtils from '@/util/level-utils'
import { StaticImageData } from 'next/image'

export type SectionLevelDataType = {
  type: 'eb' | 'pb' | 'study' | 'game' | 'song'
  level: string
  title: string
  total: number
  completed: number
  imgSrc: string | StaticImageData
  bgColor: string
  fontColor: string
  href: string
}

export type SectionSeriesDataType = {
  title: string
  minLevel: string
  maxLevel: string
  imgSrc: string
  color: string
  href: string
}

export type LevelSectionType = {
  section: string
  levels: {
    group?: string
    items: SectionLevelDataType[]
  }[]
  series?: {
    group?: string
    items: SectionSeriesDataType[]
  }[]
  todos?: {
    group?: string
    items: SectionLevelDataType[]
  }[]
}

const levelColor: Record<string, { color: string; fontColor: string }> = {
  ka: { color: '#FBCE2A', fontColor: '#fff' },
  kb: { color: '#FBB02C', fontColor: '#fff' },
  kc: { color: '#FA9231', fontColor: '#fff' },
  '1a': { color: '#F66A2A', fontColor: '#fff' },
  '1b': { color: '#F75E44', fontColor: '#fff' },
  '1c': { color: '#EE3649', fontColor: '#fff' },
  '2a': { color: '#ADC335', fontColor: '#fff' },
  '2b': { color: '#80C133', fontColor: '#fff' },
  '2c': { color: '#5EB14E', fontColor: '#fff' },
  '3a': { color: '#60B0AD', fontColor: '#fff' },
  '3b': { color: '#5AA4C6', fontColor: '#fff' },
  '3c': { color: '#5390D1', fontColor: '#fff' },
  '4a': { color: '#7C6DCC', fontColor: '#fff' },
  '4b': { color: '#9458C9', fontColor: '#fff' },
  '4c': { color: '#994FA3', fontColor: '#fff' },
  '5a': { color: '#9A7E4B', fontColor: '#fff' },
  '5b': { color: '#72542E', fontColor: '#fff' },
  '5c': { color: '#584024', fontColor: '#fff' },
  '6a': { color: '#707070', fontColor: '#fff' },
  '6b': { color: '#464545', fontColor: '#fff' },
  '6c': { color: '#262525', fontColor: '#fff' },
}

const dodoAbcColor: Record<string, { color: string; fontColor: string }> = {
  alphabet: { color: '#FFD93D', fontColor: '#fff' },
  phonics: { color: '#24CBF3', fontColor: '#fff' },
  sightword: { color: '#7ADAA5', fontColor: '#fff' },
}

const prekColor: Record<string, { color: string; fontColor: string }> = {
  alphabet: { color: '#3FAE45', fontColor: '#fff' },
  phonics: { color: '#E31313', fontColor: '#fff' },
  word: { color: '#FEA500', fontColor: '#fff' },
  story: { color: '#2B93D2', fontColor: '#fff' },
}

const seriesColor: Record<string, { color: string; fontColor: string }> = {
  red: { color: '#d83939', fontColor: '#fff' },
  orange: { color: '#f88f1d', fontColor: '#fff' },
  yellow: { color: '#f2d121', fontColor: '#fff' },
  green: { color: '#9fd62b', fontColor: '#fff' },
  blue: { color: '#43a5ec', fontColor: '#fff' },
  dark_blue: { color: '#13487c', fontColor: '#fff' },
  purple: { color: '#722379', fontColor: '#fff' },
  gray: { color: '#222222', fontColor: '#fff' },
  brown: { color: '#866017', fontColor: '#fff' },
  light_gray: { color: '#cdcdcd', fontColor: '#fff' },
  pink: { color: '#cc5f88', fontColor: '#fff' },
  dark_green: { color: '#22a57b', fontColor: '#fff' },
  default: { color: '#5e7496', fontColor: '#fff' },
}

export function findSeriesColor(color: string): {
  color: string
  fontColor: string
} {
  const colorList = Object.keys(seriesColor)
  if (colorList.includes(color)) {
    return seriesColor[color]
  }
  return seriesColor.default
}

type DodoABCGroup = 'Alphabet' | 'Phonics' | 'Sight Words'
const DODO_ABC_GROUP: DodoABCGroup[] = ['Alphabet', 'Phonics', 'Sight Words']

const dodoAbcOrder: {
  id: string
  key: string
  group: DodoABCGroup
  title: string
  type: 'study' | 'game' | 'song'
  img: StaticImageData
  path: string
}[] = [
  {
    id: 'PK(Dodo ABC (Alphabet))',
    key: 'alphabet',
    group: 'Alphabet',
    title: 'Alphabet',
    type: 'study',
    img: Assets.Thumbnail.AlphabetStudy,
    path: 'alphabet',
  },
  {
    id: 'PK(Dodo ABC (Game > Alphabet))',
    key: 'alphabet',
    group: 'Alphabet',
    title: 'Alphabet Game',
    type: 'game',
    img: Assets.Thumbnail.AlphabetGame,
    path: 'game-alphabet',
  },
  {
    id: 'PK(Dodo ABC (Song & Chant > Alphabet Chant))',
    key: 'alphabet',
    group: 'Alphabet',
    title: 'Alphabet Chant',
    type: 'song',
    img: Assets.Thumbnail.AlphabetSong,
    path: 'alphabet-chant',
  },
  {
    id: 'PK(Dodo ABC (Phonics 1))',
    key: 'phonics',
    group: 'Phonics',
    title: 'Phonics 1',
    type: 'study',
    img: Assets.Thumbnail.Phonics1Study,
    path: 'phonics1',
  },
  {
    id: 'PK(Dodo ABC (Phonics 2))',
    key: 'phonics',
    group: 'Phonics',
    title: 'Phonics 2',
    type: 'study',
    img: Assets.Thumbnail.Phonics2Study,
    path: 'phonics2',
  },
  {
    id: 'PK(Dodo ABC (Game > Phonics))',
    key: 'phonics',
    group: 'Phonics',
    title: 'Phonics Game',
    type: 'game',
    img: Assets.Thumbnail.PhonicsGame,
    path: 'game-phonics',
  },
  {
    id: 'PK(Dodo ABC (Song & Chant > Phonics Chant))',
    key: 'phonics',
    group: 'Phonics',
    title: 'Phonics Chant',
    type: 'song',
    img: Assets.Thumbnail.PhonicsSong,
    path: 'phonics-chant',
  },
  {
    id: 'PK(Dodo ABC (Sight Words 1))',
    key: 'sightword',
    group: 'Sight Words',
    title: 'Sight Words 1',
    type: 'study',
    img: Assets.Thumbnail.SightWord1Study,
    path: 'sightwords1',
  },
  {
    id: 'PK(Dodo ABC (Sight Words 2))',
    key: 'sightword',
    group: 'Sight Words',
    title: 'Sight Words 2',
    type: 'study',
    img: Assets.Thumbnail.SightWord2Study,
    path: 'sightwords2',
  },
  {
    id: 'PK(Dodo ABC (Game > Sight Words 1))',
    key: 'sightword',
    group: 'Sight Words',
    title: 'Sight Words 1 Game',
    type: 'game',
    img: Assets.Thumbnail.SightWord1Game,
    path: 'game-sightwords1',
  },
  {
    id: 'PK(Dodo ABC (Game > Sight Words 2))',
    key: 'sightword',
    group: 'Sight Words',
    title: 'Sight Words 2 Game',
    type: 'game',
    img: Assets.Thumbnail.SightWord2Game,
    path: 'game-sightwords2',
  },
  {
    id: 'PK(Dodo ABC (Song & Chant > Nursery Rhyme))',
    key: 'sightword',
    group: 'Sight Words',
    title: 'Nursery Rhyme',
    type: 'song',
    img: Assets.Thumbnail.NurseryRhyme,
    path: 'nursery-rhyme',
  },
]
const dodoAbcOrderMap = new Map(dodoAbcOrder.map((item, i) => [item.id, i]))

export function sortLevelSectionDodoABC(data: LevelBook[]) {
  return data.sort(
    (a, b) =>
      dodoAbcOrderMap.get(a.levelName)! - dodoAbcOrderMap.get(b.levelName)!,
  )
}

export function getLevelSectionDodoABCOrderItem(levelName: string) {
  return dodoAbcOrder[dodoAbcOrderMap.get(levelName)!]
}

const prekOrder = [
  {
    id: 'PK(AlphabetLand)',
    key: 'alphabet',
    title: 'Alphabet',
    img: Assets.Thumbnail.ClassicAlphabetStudy,
  },
  {
    id: 'PK(PhonicsLand)',
    key: 'phonics',
    title: 'Phonics',

    img: Assets.Thumbnail.ClassicPhonicsStudy,
  },
  {
    id: 'PK(StoryLand)',
    key: 'story',
    title: 'Story',
    img: Assets.Thumbnail.ClassicStoryStudy,
  },
  {
    id: 'PK(WordLand)',
    key: 'word',
    title: 'Word',
    img: Assets.Thumbnail.ClassicWordStudy,
  },
]
const prekOrderMap = new Map(prekOrder.map((item, i) => [item.id, i]))

export function sortLevelSectionPreK(data: LevelBook[]) {
  return data.sort(
    (a, b) => prekOrderMap.get(a.levelName)! - prekOrderMap.get(b.levelName)!,
  )
}

export function getLevelSectionPreKOrderItem(levelName: string) {
  return prekOrder[prekOrderMap.get(levelName)!]
}

function isIncludeLevelGroup(
  group: 'Kto1' | '2to3' | '4to6',
  level: string,
): boolean {
  switch (group) {
    case 'Kto1': {
      const groupLevels = ['KA', 'KB', 'KC', '1A', '1B', '1C']
      return groupLevels.includes(level)
    }
    case '2to3': {
      const groupLevels = ['2A', '2B', '2C', '3A', '3B', '3C']
      return groupLevels.includes(level)
    }
    case '4to6': {
      const groupLevels = ['4A', '4B', '4C', '5A', '5B', '5C', '6A', '6B', '6C']
      return groupLevels.includes(level)
    }
    default:
      return false
  }
}

export function makeLevelSectionTypeDodoABC(
  levels: LevelBook[],
): LevelSectionType | undefined {
  const dodoAbcData = sortLevelSectionDodoABC(levels)
  if (dodoAbcData.length === 0) {
    return undefined
  }

  const levelGroups = DODO_ABC_GROUP.map((group) => {
    return {
      group: group,
      items: dodoAbcData.filter((level) => {
        const orderItem = getLevelSectionDodoABCOrderItem(level.levelName)
        return orderItem.group === group
      }),
    }
  }).filter((group) => group.items.length > 0)

  const data: LevelSectionType = {
    section: 'Level PK',
    levels: [
      ...levelGroups.map((group) => {
        return {
          group: group.group,
          items: group.items.map((level) => makeLevelItemPK('dodoabc', level)),
        }
      }),
    ],
  }
  return data
}

export function makeLevelSectionTypePK(
  levels: LevelBook[],
): LevelSectionType | undefined {
  const pkData = sortLevelSectionPreK(levels)
  if (pkData.length === 0) {
    return undefined
  }
  const data: LevelSectionType = {
    section: 'Level PK Classic',
    levels: [
      {
        group: 'none',
        items: pkData.map((level) => makeLevelItemPK('pk', level)),
      },
    ],
  }

  return data
}

export function makeLevelItemPK(
  type: 'pk' | 'dodoabc',
  level: LevelBook,
): SectionLevelDataType {
  if (type === 'dodoabc') {
    const orderItem = getLevelSectionDodoABCOrderItem(level.levelName)
    return {
      type: orderItem.type,
      level: level.levelName,
      title: orderItem.title,
      total: level.totalBooks,
      imgSrc: orderItem.img,
      completed: level.completedBooks,
      bgColor: dodoAbcColor[orderItem.key].color,
      fontColor: dodoAbcColor[orderItem.key].fontColor,
      href: `${SITE_PATH.NW82.EB_DODOABC}/${orderItem.path}`,
    }
  } else {
    const orderItem = getLevelSectionPreKOrderItem(level.levelName)
    return {
      type: 'study',
      level: level.levelName,
      title: orderItem.title,
      total: level.totalBooks,
      imgSrc: orderItem.img,
      completed: level.completedBooks,
      bgColor: prekColor[orderItem.key].color,
      fontColor: prekColor[orderItem.key].fontColor,
      href: `${SITE_PATH.NW82.EB_PREK}/${orderItem.key}`,
    }
  }
}

export function makeLevelItem(
  type: 'eb' | 'pb',
  level: LevelBook,
): SectionLevelDataType {
  const colorSet = levelColor[level.levelName.toLowerCase()]
  return {
    type: type,
    level: level.levelName,
    title: level.levelName,
    total: level.totalBooks,
    completed: level.completedBooks,
    imgSrc: getRandomCoverImage(type, level.levelName.toLowerCase()),
    bgColor: colorSet.color,
    fontColor: colorSet.fontColor,
    href:
      type === 'eb'
        ? `${SITE_PATH.NW82.EB_LEVEL}/${level.levelName}`
        : `${SITE_PATH.NW82.PB_LEVEL}/${level.levelName}`,
  }
}

export function makeLevelSectionType(
  group: 'Kto1' | '2to3' | '4to6',
  type: 'eb' | 'pb',
  levels: LevelBook[],
): LevelSectionType | undefined {
  const targetLevels = levels.filter((level) =>
    isIncludeLevelGroup(group, level.levelName),
  )

  if (targetLevels.length === 0) {
    return undefined
  }

  let sectionTitle = ''
  switch (group) {
    case 'Kto1':
      sectionTitle = 'Level K to 1'
      break
    case '2to3':
      sectionTitle = 'Level 2 to 3'
      break
    case '4to6':
      sectionTitle = 'Level 4 to 6'
      break
  }

  const data: LevelSectionType = {
    section: sectionTitle,
    levels: [
      {
        items: [...targetLevels.map((level) => makeLevelItem(type, level))],
      },
    ],
  }
  return data
}

let randomCoverImageSeed: number[] | undefined = undefined
export function getRandomCoverImage(type: 'eb' | 'pb', level: string) {
  let valueRange = {
    min: 1,
    max: 1,
  }
  switch (type) {
    case 'eb': {
      switch (level) {
        case 'ka':
          valueRange = { min: 1, max: 50 }
          break
        case 'kb':
          valueRange = { min: 1, max: 50 }
          break
        case 'kc':
          valueRange = { min: 1, max: 50 }
          break
        case '1a':
          valueRange = { min: 1, max: 50 }
          break
        case '1b':
          valueRange = { min: 301, max: 340 }
          break
        case '1c':
          valueRange = { min: 331, max: 360 }
          break
        case '2a':
          valueRange = { min: 301, max: 390 }
          break
        case '2b':
          valueRange = { min: 301, max: 380 }
          break
        case '2c':
          valueRange = { min: 301, max: 360 }
          break
        case '3a':
          valueRange = { min: 401, max: 470 }
          break
        case '3b':
          valueRange = { min: 301, max: 340 }
          break
        case '3c':
          valueRange = { min: 1, max: 25 }
          break
        case '4a':
          valueRange = { min: 301, max: 315 }
          break
        case '4b':
          valueRange = { min: 301, max: 320 }
          break
        case '4c':
          valueRange = { min: 301, max: 315 }
          break
        case '5a':
          valueRange = { min: 301, max: 310 }
          break
        case '5b':
          valueRange = { min: 301, max: 310 }
          break
        case '5c':
          valueRange = { min: 1, max: 5 }
          break
        case '6a':
          valueRange = { min: 301, max: 306 }
          break
        case '6b':
          valueRange = { min: 301, max: 301 }
          break
      }
      break
    }
    case 'pb': {
      switch (level) {
        case 'kc':
          valueRange = { min: 1, max: 94 }
          break
        case '1a':
          valueRange = { min: 1, max: 266 }
          break
        case '1b':
          valueRange = { min: 1, max: 257 }
          break
        case '1c':
          valueRange = { min: 1, max: 276 }
          break
        case '2a':
          valueRange = { min: 1, max: 320 }
          break
        case '2b':
          valueRange = { min: 1, max: 323 }
          break
        case '2c':
          valueRange = { min: 1, max: 252 }
          break
        case '3a':
          valueRange = { min: 1, max: 274 }
          break
        case '3b':
          valueRange = { min: 1, max: 195 }
          break
        case '3c':
          valueRange = { min: 4, max: 194 }
          break
        case '4a':
          valueRange = { min: 1, max: 134 }
          break
        case '4b':
          valueRange = { min: 1, max: 108 }
          break
        case '4c':
          valueRange = { min: 1, max: 107 }
          break
        case '5a':
          valueRange = { min: 1, max: 84 }
          break
        case '5b':
          valueRange = { min: 1, max: 75 }
          break
        case '5c':
          valueRange = { min: 1, max: 84 }
          break
        case '6a':
          valueRange = { min: 1, max: 72 }
          break
        case '6b':
          valueRange = { min: 1, max: 46 }
          break
        case '6c':
          valueRange = { min: 1, max: 19 }
          break
      }
      break
    }
  }

  const { min, max } = valueRange
  if (!randomCoverImageSeed) {
    randomCoverImageSeed = [Math.random(), Math.random(), Math.random()]
  }
  const lvChar = level.substring(1, 2) || 'a'
  const randomIndex = lvChar === 'b' ? 1 : lvChar === 'c' ? 2 : 0
  const randomNumber =
    Math.floor(randomCoverImageSeed[randomIndex] * (max - min + 1)) + min

  if (type === 'eb') {
    return `https://wcfresource.a1edu.com/newsystem/image/br/covernew1/eb-${level}-${randomNumber.toString().padStart(3, '0')}.jpg`
  } else {
    return `https://wcfresource.a1edu.com/newsystem/image/br/covernew1/pb-${level}-${randomNumber.toString().padStart(3, '0')}.png`
  }
}

export function makeLevelSectionSeriesItem(
  booktype: 'eb' | 'pb',
  item: SearchSeriesCategory,
): {
  title: string
  minLevel: string
  maxLevel: string
  imgSrc: string
  color: string
  href: string
} {
  const levelRange =
    item.bookLevelMin !== item.bookLevelMax
      ? `${item.bookLevelMin}~${item.bookLevelMax}`
      : item.bookLevelMin
  return {
    title: item.name,
    minLevel: item.bookLevelMin,
    maxLevel: item.bookLevelMax,
    imgSrc: item.imagePath,
    color: findSeriesColor(item.color).color,
    href:
      booktype === 'eb'
        ? `${SITE_PATH.NW82.EB_SERIES_FIND}?name=${encodeURIComponent(item.name)}&level=${levelRange}`
        : `${SITE_PATH.NW82.PB_SERIES_FIND}?name=${encodeURIComponent(item.name)}&level=${levelRange}`,
  }
}

export function makeLevelSectionSeries(
  booktype: 'eb' | 'pb',
  minLevel: string,
  maxLevel: string,
  seriesCategory: SearchSeriesCategory[],
): {
  title: string
  minLevel: string
  maxLevel: string
  imgSrc: string
  color: string
  href: string
}[] {
  const minLevelIndex = LevelUtils.getLevelIndex(minLevel)
  const maxLevelIndex = LevelUtils.getLevelIndex(maxLevel)

  return seriesCategory
    .filter((item) => {
      const seriesMinLevelIndex = LevelUtils.getLevelIndex(item.bookLevelMin)
      const seriesMaxLevelIndex = LevelUtils.getLevelIndex(item.bookLevelMax)

      return (
        seriesMinLevelIndex <= maxLevelIndex &&
        seriesMaxLevelIndex >= minLevelIndex
      )
    })
    .map((item) => makeLevelSectionSeriesItem(booktype, item))
    .sort((a, b) => {
      const aIndex = LevelUtils.getLevelIndex(a.minLevel)
      const bIndex = LevelUtils.getLevelIndex(b.minLevel)
      return aIndex - bIndex
    })
}
