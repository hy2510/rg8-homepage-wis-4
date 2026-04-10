'use client'

import { useCategorySeries } from '@/8th/features/library/service/library-query'
import SeriesItem from '@/8th/features/library/ui/component/LevelSectionSeriesItem'
import {
  clearLibrarySeriesNav,
  flashLibrarySeriesRestoreElement,
  librarySeriesScrollElementId,
  peekLibrarySeriesNav,
  rememberLibrarySeriesNav,
} from '@/8th/features/library/ui/librarySeriesNavRestore'
import { findSeriesColor } from '@/8th/features/library/ui/levelSectionData'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { SearchBarStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import LevelUtils from '@/util/level-utils'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

/** 제목 안의 `KA~3C`, `1A ~ 2B` 같은 레벨 구간 문자열을 모두 추출 */
function parseLevelRangesFromTitle(
  title: string,
): { min: string; max: string }[] {
  const re = /([A-Za-z0-9]+)\s*~\s*([A-Za-z0-9]+)/g
  const ranges: { min: string; max: string }[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(title)) !== null) {
    ranges.push({ min: m[1], max: m[2] })
  }
  return ranges
}

function levelRangeContainsToken(
  token: string,
  minRaw: string,
  maxRaw: string,
): boolean {
  const tokenIdx = LevelUtils.getLevelIndex(token)
  if (tokenIdx < 0) return false
  let lo = LevelUtils.getLevelIndex(minRaw)
  let hi = LevelUtils.getLevelIndex(maxRaw)
  if (lo < 0 || hi < 0) return false
  if (lo > hi) [lo, hi] = [hi, lo]
  return lo <= tokenIdx && tokenIdx <= hi
}

function titleContainsSearchedLevel(
  title: string,
  searchTokens: string[],
): boolean {
  const ranges = parseLevelRangesFromTitle(title)
  if (ranges.length === 0) return false
  return searchTokens.some((token) =>
    ranges.some(({ min, max }) => levelRangeContainsToken(token, min, max)),
  )
}

/** API의 bookLevelMin~Max 구간 안에 검색 레벨이 포함되는지 (화면 [1A~1C]와 동일 소스) */
function apiLevelRangeContainsToken(
  bookLevelMin: string,
  bookLevelMax: string,
  searchTokens: string[],
): boolean {
  if (bookLevelMin === bookLevelMax) return false
  return searchTokens.some((token) =>
    levelRangeContainsToken(token, bookLevelMin, bookLevelMax),
  )
}

export default function SeriesList({ booktype }: { booktype: string }) {
  //@language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()
  const [searchQuery, setSearchQuery] = useState('')

  const categorySeries = useCategorySeries({
    bookType: booktype as 'EB' | 'PB',
  })

  const filteredCategory = useMemo(() => {
    const list = categorySeries?.data?.category ?? []
    const q = searchQuery.trim().toLowerCase()
    if (!q) return list
    const searchTokens = searchQuery.trim().split(/\s+/).filter(Boolean)
    return list.filter((series) => {
      const levelRange =
        series.bookLevelMin !== series.bookLevelMax
          ? `${series.bookLevelMin}~${series.bookLevelMax}`
          : String(series.bookLevelMin)
      const nameMatch = series.name.toLowerCase().includes(q)
      const levelMatch = levelRange.toLowerCase().includes(q)
      const titleLevelSpanMatch = titleContainsSearchedLevel(
        series.name,
        searchTokens,
      )
      const apiLevelSpanMatch = apiLevelRangeContainsToken(
        series.bookLevelMin,
        series.bookLevelMax,
        searchTokens,
      )
      return nameMatch || levelMatch || titleLevelSpanMatch || apiLevelSpanMatch
    })
  }, [categorySeries?.data?.category, searchQuery])

  const seriesListScrollConsumedRef = useRef(false)
  const [seriesScrollTitle, setSeriesScrollTitle] = useState<string | null>(
    null,
  )

  useLayoutEffect(() => {
    if (categorySeries?.isLoading || filteredCategory.length === 0) return
    if (seriesListScrollConsumedRef.current) return
    const p = peekLibrarySeriesNav()
    if (
      !p ||
      p.returnTarget !== 'seriesList' ||
      p.bookType !== booktype
    ) {
      return
    }
    seriesListScrollConsumedRef.current = true
    clearLibrarySeriesNav()
    setSeriesScrollTitle(p.seriesTitle)
  }, [booktype, categorySeries?.isLoading, filteredCategory.length])

  useEffect(() => {
    if (!seriesScrollTitle) return
    const scrollId = librarySeriesScrollElementId(seriesScrollTitle)
    const t = window.setTimeout(() => {
      document.getElementById(scrollId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
      flashLibrarySeriesRestoreElement(seriesScrollTitle)
      setSeriesScrollTitle(null)
    }, 450)
    return () => window.clearTimeout(t)
  }, [seriesScrollTitle])

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th039')}`}
        parentPath={booktype === 'EB' ? SITE_PATH.NW82.EB : SITE_PATH.NW82.PB}
        libraryBookType={booktype as 'EB' | 'PB'}
      />
      <BoxStyle display="flex" flexDirection="column" gap={20}>
        <SearchBarStyle className="input-only">
          <BoxStyle
            display="flex"
            width="100%"
            alignItems="center"
            minWidth="0">
            <BoxStyle
              className="search-input"
              width="100%"
              minWidth="0"
              flex="1">
              <input
                type="search"
                placeholder={t('t8th324')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t('t8th324')}
                style={{ fontSize: '0.9em' }}
              />
            </BoxStyle>
          </BoxStyle>
        </SearchBarStyle>
        <BoxStyle
          display="grid"
          gridTemplateColumns={`repeat(${isPhone ? 2 : 3}, 1fr)`}
          gap={20}>
          {categorySeries?.isLoading ? (
            <TextStyle
              padding="0 0 0 20px"
              fontSize="medium"
              fontFamily="sans"
              width="100%">
              Loading...
            </TextStyle>
          ) : filteredCategory.length === 0 ? (
            <TextStyle
              padding="0 0 0 20px"
              fontSize="medium"
              fontFamily="sans"
              width="100%">
              {t('t8th009')}
            </TextStyle>
          ) : (
            filteredCategory.map((series) => {
              const levelRange =
                series.bookLevelMin !== series.bookLevelMax
                  ? `${series.bookLevelMin}~${series.bookLevelMax}`
                  : series.bookLevelMin
              const color = findSeriesColor(series.color).color
              const href =
                booktype === 'EB'
                  ? `${SITE_PATH.NW82.EB_SERIES_FIND}?name=${encodeURIComponent(series.name)}&level=${levelRange}`
                  : `${SITE_PATH.NW82.PB_SERIES_FIND}?name=${encodeURIComponent(series.name)}&level=${levelRange}`
              return (
                <SeriesItem
                  key={series.name}
                  level={levelRange}
                  title={series.name}
                  imgSrc={series.imagePath}
                  bgColor={color}
                  href={href}
                  assignScrollAnchor
                  onSeriesNavigate={() =>
                    rememberLibrarySeriesNav({
                      seriesTitle: series.name,
                      returnTarget: 'seriesList',
                      bookType: booktype as 'EB' | 'PB',
                    })
                  }
                />
              )
            })
          )}
        </BoxStyle>
      </BoxStyle>
    </>
  )
}
