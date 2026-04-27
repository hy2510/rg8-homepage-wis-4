'use client'

import { Assets } from '@/8th/assets/asset-library'
import { LevelSectionStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { LevelSectionType } from '../levelSectionData'
import LevelSectionContentEbPb from './LevelSectionContentEbPb'
import LevelSectionContentPk from './LevelSectionContentPk'

export default function LevelSectionContainer({
  levelSection,
  defaultLevel,
}: {
  levelSection: LevelSectionType[]
  defaultLevel?: string
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const containerRef = useRef<HTMLDivElement>(null)
  const animActiveRef = useRef<boolean>(false)

  const [openSections, setOpenSections] = useState<string | undefined>(
    defaultLevel,
  )
  const [contentType, setContentType] = useState<'level' | 'series'>('level')

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

  const onContentTypeChange = (type: 'level' | 'series') => {
    setContentType(type)
  }

  return (
    <LevelSectionStyle ref={containerRef}>
      <BoxStyle className="title" display="flex" alignItems="center" gap={10}>
        {/* <Image
          src={Assets.Icon.Study.leveledReading}
          alt="leveled-reading"
          width={28}
          height={28}
        /> */}
        <span>{`· ${t('t8th003')}`}</span>
      </BoxStyle>
      <BoxStyle
        className="accordion-container"
        display="flex"
        flexDirection="column">
        {levelSection.map((section) => {
          const isPkSection = section.section.includes('PK')
          return (
            <LevelSectionAccordionItem
              key={section.section}
              title={section.section}
              isOpen={openSections === section.section}
              onClick={onSectionItemClick}>
              {isPkSection ? (
                <LevelSectionContentPk section={section} />
              ) : (
                <LevelSectionContentEbPb
                  section={section}
                  defaultTab={contentType}
                  onActiveTabChange={onContentTypeChange}
                />
              )}
            </LevelSectionAccordionItem>
          )
        })}
      </BoxStyle>
    </LevelSectionStyle>
  )
}

function LevelSectionAccordionItem({
  title,
  isOpen,
  onClick,
  children,
}: {
  isOpen: boolean
  title: string
  onClick?: (id: string) => void
  children?: React.ReactNode
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
