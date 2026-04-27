'use client'

import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { BoxStyle, Gap } from '@/8th/shared/ui/Misc'
import { useEffect, useState } from 'react'
import { LevelSectionType, SectionSeriesDataType } from '../levelSectionData'
import LevelItem from './LevelSectionLevelItem'
import SeriesItem from './LevelSectionSeriesItem'

export default function LevelSectionContentEbPb({
  section,
  defaultTab = 'level',
  onActiveTabChange,
}: {
  section: LevelSectionType
  defaultTab?: 'level' | 'series'
  onActiveTabChange?: (type: 'level' | 'series') => void
}) {
  const hasLevels = section.levels.length > 0
  const hasSeries = false // !!section.series && section.series.length > 0

  const [activeTab, setActiveTab] = useState<'level' | 'series'>(defaultTab)

  const showTabs = hasLevels && hasSeries

  const isPhone = useIsPhone()

  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

  const gapSize = isPhone ? 20 : 25

  const onTabChange = (type: 'level' | 'series') => {
    setActiveTab(type)
    if (onActiveTabChange) {
      onActiveTabChange(type)
    }
  }

  return (
    <>
      {showTabs && (
        <>
          <Gap size={gapSize} />
          <BoxStyle className="section-tabs" display="flex" gap={10}>
            <button
              className={`section-tab ${activeTab === 'level' ? 'active' : ''}`}
              onClick={() => onTabChange('level')}>
              by Level
            </button>
            <button
              className={`section-tab ${activeTab === 'series' ? 'active' : ''}`}
              onClick={() => onTabChange('series')}>
              by Series
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
              type="level"
              gapSize={gapSize}>
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
            />
          )
        })}
    </>
  )
}

function LevelSectionBody({
  type,
  gapSize = 25,
  children,
}: {
  type: 'level' | 'series'
  gapSize?: number
  children?: React.ReactNode
}) {
  const containClassName =
    type === 'level' ? 'level-container' : 'series-container'

  return (
    <>
      <Gap size={gapSize} />
      <div className={containClassName}>{children}</div>
      <Gap size={gapSize} />
    </>
  )
}

function SeriesSectionBody({
  series,
  gapSize = 25,
}: {
  series: SectionSeriesDataType[]
  gapSize?: number
}) {
  return (
    <>
      <Gap size={gapSize} />
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
            />
          ))}
        </div>
      </div>
    </>
  )
}
