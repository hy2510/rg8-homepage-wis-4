'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { LevelSectionStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, Divide, Gap } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LevelSectionType, SectionSeriesDataType } from '../levelSectionData'
import {
  LibrarySeriesNavPayload,
  clearLibrarySeriesNav,
  flashLibrarySeriesRestoreElement,
  librarySeriesScrollElementId,
  peekLibrarySeriesNav,
  rememberLibrarySeriesNav,
} from '../librarySeriesNavRestore'
import LevelItem from './LevelSectionLevelItem'
import SeriesItem from './LevelSectionSeriesItem'

/** Dodo ABC PK 블록만 Alphabet / Phonics / Sight Words 구분 디바이더·타이틀 표시 */
function isDodoAbcPkSection(sectionTitle: string): boolean {
  return sectionTitle === 'PK' || sectionTitle.startsWith('PK ·')
}

function sectionContainsSeriesTitle(
  section: LevelSectionType,
  seriesTitle: string,
): boolean {
  return (section.series || []).some((g) =>
    g.items.some((item) => item.title === seriesTitle),
  )
}

function resolveSectionForSeriesRestore(
  levelSection: LevelSectionType[],
  payload: LibrarySeriesNavPayload,
): string | undefined {
  if (payload.section) {
    const found = levelSection.find((s) => s.section === payload.section)
    if (found && sectionContainsSeriesTitle(found, payload.seriesTitle)) {
      return found.section
    }
  }
  return levelSection.find((s) =>
    sectionContainsSeriesTitle(s, payload.seriesTitle),
  )?.section
}

export default function LevelSection({
  levelSection,
  defaultLevel,
  libraryBookType,
}: {
  levelSection: LevelSectionType[]
  defaultLevel?: string
  libraryBookType?: 'EB' | 'PB'
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  const containerRef = useRef<HTMLDivElement>(null)
  const animActiveRef = useRef<boolean>(false)

  const [openSections, setOpenSections] = useState<string | undefined>(
    defaultLevel,
  )
  const [seriesRestore, setSeriesRestore] =
    useState<LibrarySeriesNavPayload | null>(null)
  const seriesNavConsumedRef = useRef(false)

  useLayoutEffect(() => {
    if (levelSection.length === 0) return
    if (seriesNavConsumedRef.current) return
    const payload = peekLibrarySeriesNav()
    if (!payload) return
    if (payload.returnTarget === 'seriesList') {
      clearLibrarySeriesNav()
      return
    }
    seriesNavConsumedRef.current = true
    clearLibrarySeriesNav()
    setSeriesRestore(payload)
    const sec = resolveSectionForSeriesRestore(levelSection, payload)
    if (sec) {
      setOpenSections(sec)
    }
  }, [levelSection])

  useEffect(() => {
    if (seriesRestore) return
    if (defaultLevel) {
      setOpenSections(defaultLevel)
    }
  }, [defaultLevel, seriesRestore])

  useEffect(() => {
    if (!!openSections) {
      if (containerRef.current && animActiveRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const currentScrollTop =
          window.pageYOffset || document.documentElement.scrollTop
        const targetPosition = currentScrollTop + rect.top - 100
        window.scrollTo({ top: targetPosition, behavior: 'smooth' })
      }
    }
  }, [openSections])

  useEffect(() => {
    if (!seriesRestore) return
    const targetSec = resolveSectionForSeriesRestore(
      levelSection,
      seriesRestore,
    )
    if (!targetSec || openSections !== targetSec) return
    const scrollId = librarySeriesScrollElementId(seriesRestore.seriesTitle)
    const t = window.setTimeout(() => {
      document.getElementById(scrollId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
      flashLibrarySeriesRestoreElement(seriesRestore.seriesTitle)
    }, 450)
    return () => window.clearTimeout(t)
  }, [seriesRestore, openSections, levelSection])

  const onSectionItemClick = (id: string) => {
    animActiveRef.current = true
    if (id === openSections) {
      setOpenSections(undefined)
    } else {
      setOpenSections(id)
    }
  }

  const gapSize = isPhone ? 20 : 25

  return (
    <LevelSectionStyle ref={containerRef}>
      <BoxStyle className="title" display="flex" alignItems="center" gap={10}>
        {/* <Image
          src={Assets.Icon.Study.leveledReading}
          alt="leveled-reading"
          width={28}
          height={28}
        /> */}
        <span>· {t('t8th003')}</span>
      </BoxStyle>
      <BoxStyle
        className="accordion-container"
        display="flex"
        flexDirection="column">
        {levelSection.map((section) => {
          return (
            <LevelSectionItem
              key={section.section}
              title={section.section}
              isOpen={openSections === section.section}
              onClick={onSectionItemClick}>
              <SectionTabContent
                section={section}
                gapSize={gapSize}
                seriesRestore={seriesRestore}
                levelSection={levelSection}
                libraryBookType={libraryBookType}
              />
              <Gap size={30} />
            </LevelSectionItem>
          )
        })}
      </BoxStyle>
    </LevelSectionStyle>
  )
}

function SectionTabContent({
  section,
  gapSize,
  seriesRestore,
  levelSection,
  libraryBookType,
}: {
  section: LevelSectionType
  gapSize: number
  seriesRestore: LibrarySeriesNavPayload | null
  levelSection: LevelSectionType[]
  libraryBookType?: 'EB' | 'PB'
}) {
  const hasLevels = section.levels.length > 0
  const hasSeries = !!section.series && section.series.length > 0

  const preferSeriesTab =
    !!seriesRestore &&
    !!hasSeries &&
    resolveSectionForSeriesRestore(levelSection, seriesRestore) ===
      section.section

  const [activeTab, setActiveTab] = useState<'level' | 'series'>(
    preferSeriesTab ? 'series' : hasLevels ? 'level' : 'series',
  )

  useEffect(() => {
    setActiveTab(preferSeriesTab ? 'series' : hasLevels ? 'level' : 'series')
  }, [section.section, hasLevels, preferSeriesTab])

  const showTabs = hasLevels && hasSeries
  const showPkGroupDivider = isDodoAbcPkSection(section.section)

  return (
    <>
      {showTabs && (
        <>
          <Gap size={gapSize} />
          <BoxStyle className="section-tabs" display="flex" gap={10}>
            <button
              className={`section-tab ${activeTab === 'level' ? 'active' : ''}`}
              onClick={() => setActiveTab('level')}>
              Level
            </button>
            <button
              className={`section-tab ${activeTab === 'series' ? 'active' : ''}`}
              onClick={() => setActiveTab('series')}>
              Series
            </button>
          </BoxStyle>
        </>
      )}

      {(!showTabs || activeTab === 'level') &&
        hasLevels &&
        section.levels.map((group, index) => {
          return (
            <LevelSectionBody
              key={`${section.section}-${index}`}
              title={group.group}
              type="level"
              gapSize={gapSize}
              showPkGroupDivider={showPkGroupDivider}>
              {group.items.map((level) => {
                return (
                  <LevelItem
                    key={`${level.type}${level.level}-${level.title}`}
                    type={level.type}
                    level={level.level}
                    title={level.title}
                    bgColor={level.bgColor}
                    fontColor={level.fontColor}
                    completed={level.completed}
                    href={level.href}
                    imgSrc={level.imgSrc}
                    total={level.total}
                  />
                )
              })}
            </LevelSectionBody>
          )
        })}

      {(!showTabs || activeTab === 'series') &&
        hasSeries &&
        section.series!.map((group, idx) => {
          return (
            <SeriesSectionBody
              key={`${section.section}-${idx}`}
              series={group.items}
              gapSize={gapSize}
              accordionSectionTitle={section.section}
              libraryBookType={libraryBookType}
            />
          )
        })}
    </>
  )
}

function LevelSectionItem({
  title,
  isOpen,
  children,
  onClick,
}: {
  title: string
  isOpen: boolean
  children?: React.ReactNode
  onClick?: (id: string) => void
}) {
  return (
    <div>
      <div
        className={`accordion-header ${isOpen ? 'open' : ''}`}
        onClick={() => {
          if (onClick) {
            onClick(title)
          }
        }}>
        <span className="accordion-title">{title}</span>
        <span className="arrow">
          {isOpen ? (
            <Image
              src={Assets.Icon.chevronDownGray}
              alt="arrow-down"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={Assets.Icon.chevronRightGray}
              alt="arrow-right"
              width={24}
              height={24}
            />
          )}
        </span>
      </div>
      <div className={`accordion-body ${isOpen ? 'open' : ''}`}>{children}</div>
    </div>
  )
}

function LevelSectionBody({
  type,
  title,
  gapSize = 25,
  showPkGroupDivider = false,
  children,
}: {
  type: 'level' | 'series'
  title?: string | 'none'
  gapSize?: number
  showPkGroupDivider?: boolean
  children?: React.ReactNode
}) {
  const containClassName =
    type === 'level' ? 'level-container' : 'series-container'

  const groupLabel = title && title !== 'none' ? title : undefined
  const showDivide = showPkGroupDivider && !!groupLabel

  return (
    <>
      <Gap size={gapSize} />
      {showDivide && (
        <>
          <Divide title={groupLabel} />
          <Gap size={gapSize} />
        </>
      )}
      <div className={containClassName}>{children}</div>
    </>
  )
}

function SeriesSectionBody({
  series,
  gapSize = 25,
  accordionSectionTitle,
  libraryBookType,
}: {
  series: SectionSeriesDataType[]
  gapSize?: number
  accordionSectionTitle: string
  libraryBookType?: 'EB' | 'PB'
}) {
  return (
    <>
      <Gap size={gapSize} />
      {/* <Divide title="By Series" />
      <Gap size={gapSize} /> */}
      <div className="series-pagination-container">
        <div className="series-container">
          {series.map((seriesItem) => (
            <SeriesItem
              key={seriesItem.title}
              level={
                seriesItem.minLevel === seriesItem.maxLevel
                  ? seriesItem.minLevel
                  : `${seriesItem.minLevel}~${seriesItem.maxLevel}`
              }
              title={seriesItem.title}
              imgSrc={seriesItem.imgSrc}
              bgColor={seriesItem.color}
              href={seriesItem.href}
              assignScrollAnchor
              onSeriesNavigate={() =>
                rememberLibrarySeriesNav({
                  section: accordionSectionTitle,
                  seriesTitle: seriesItem.title,
                  returnTarget: 'finder',
                  bookType: libraryBookType,
                })
              }
            />
          ))}
        </div>
      </div>
    </>
  )
}
