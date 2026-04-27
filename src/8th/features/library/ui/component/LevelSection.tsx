'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { LevelSectionStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, Divide, Gap } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { LevelSectionType, SectionSeriesDataType } from '../levelSectionData'
import LevelItem from './LevelSectionLevelItem'
import SeriesItem from './LevelSectionSeriesItem'

// @ Deprecated - 화면 변경되면서 사용하지 않음
export default function LevelSection({
  levelSection,
  defaultLevel,
}: {
  levelSection: LevelSectionType[]
  defaultLevel?: string
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  const containerRef = useRef<HTMLDivElement>(null)
  const animActiveRef = useRef<boolean>(false)

  const [openSections, setOpenSections] = useState<string | undefined>(
    defaultLevel,
  )

  useEffect(() => {
    if (defaultLevel) {
      setOpenSections(defaultLevel)
    }
  }, [defaultLevel])

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
        <Image
          src={Assets.Icon.Study.leveledReading}
          alt="leveled-reading"
          width={28}
          height={28}
        />
        <span>{t('t8th003')}</span>
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
              {section.levels.length > 0 &&
                section.levels.map((group, index) => {
                  return (
                    <LevelSectionBody
                      key={`${section.section}-${index}`}
                      title={group.group}
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
              {section.series &&
                section.series.length > 0 &&
                section.series.map((group, idx) => {
                  return (
                    <SeriesSectionBody
                      key={`${section.section}-${idx}`}
                      series={group.items}
                      gapSize={gapSize}
                    />
                  )
                })}
              <Gap size={30} />
            </LevelSectionItem>
          )
        })}
      </BoxStyle>
    </LevelSectionStyle>
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
  children,
}: {
  type: 'level' | 'series'
  title?: string | 'none'
  gapSize?: number
  children?: React.ReactNode
}) {
  const containClassName =
    type === 'level' ? 'level-container' : 'series-container'

  let headerText: string | undefined = title
  if (headerText === 'none') {
    headerText = undefined
  }
  if (!headerText) {
    if (type === 'level') {
      headerText = 'By Level'
    } else {
      headerText = 'By Series'
    }
  }

  return (
    <>
      {title === 'none' ? (
        <Gap size={gapSize} />
      ) : (
        <>
          <Gap size={gapSize} />
          <Divide title={headerText} />
          <Gap size={gapSize} />
        </>
      )}
      <div className={containClassName}>{children}</div>
    </>
  )
}

const ITEMS_PER_PAGE = 6
function SeriesSectionBody({
  series,
  gapSize = 25,
}: {
  series: SectionSeriesDataType[]
  gapSize?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const paginationItems: SectionSeriesDataType[][] = useMemo(() => {
    const items: SectionSeriesDataType[][] = []
    const totalPages = Math.ceil(series.length / ITEMS_PER_PAGE)

    for (let i = 0; i < totalPages; i++) {
      items.push(series.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE))
    }
    return items
  }, [series])

  const [isFocusPosition, setFocusPosition] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (window && containerRef.current && isFocusPosition) {
      const rect = containerRef.current.getBoundingClientRect()
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop
      const targetPosition = currentScrollTop + rect.top - 100
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
      setFocusPosition(false)
    }
  }, [isFocusPosition])

  const totalPages = paginationItems.length
  const pageItems = paginationItems[page - 1]
  const onPageChange = (page: number) => {
    setPage(page)
    setFocusPosition(true)
  }

  return (
    <>
      <Gap size={gapSize} />
      <Divide title="By Series" />
      <Gap size={gapSize} />
      <div className="series-pagination-container" ref={containerRef}>
        <div className="series-container">
          {pageItems.map((series) => (
            <SeriesItem
              key={series.title}
              level={
                series.minLevel === series.maxLevel
                  ? series.minLevel
                  : `${series.minLevel}~${series.maxLevel}`
              }
              title={series.title}
              imgSrc={series.imgSrc}
              bgColor={series.color}
              href={series.href}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              className="pagination-button prev"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}>
              <Image
                src={Assets.Icon.chevronLeftGray}
                alt="Previous"
                width={20}
                height={20}
              />
            </button>

            <div className="pagination-dots">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`pagination-dot ${page - 1 === index ? 'active' : ''}`}
                  onClick={() => onPageChange(index + 1)}
                />
              ))}
            </div>

            <button
              className="pagination-button next"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}>
              <Image
                src={Assets.Icon.chevronRightGray}
                alt="Next"
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
