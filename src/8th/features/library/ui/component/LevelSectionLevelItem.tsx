'use client'

import {
  LevelItemStyle,
  LevelPkItemStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import useTranslation from '@/localization/client/useTranslations'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

/**
 * 레벨 아이템
 */

interface LevelItemProps {
  type: 'eb' | 'pb' | 'study' | 'game' | 'song'
  level: string
  title: string
  completed: number
  total: number
  href: string
  imgSrc?: string | StaticImageData
  bgColor?: string
  fontColor?: string
}

function ProgressDonut({
  completed,
  total,
}: {
  completed: number
  total: number
}) {
  const safeTotal = total > 0 ? total : 1
  const percent = Math.min(100, Math.max(0, (completed / safeTotal) * 100))

  return (
    <div
      className="progress-donut"
      style={
        {
          '--progress': `${percent}%`,
        } as React.CSSProperties
      }>
      <div className="progress-donut-inner">{Math.round(percent)}%</div>
    </div>
  )
}

export default function LevelItem({
  type,
  level,
  title,
  completed,
  total,
  href,
  imgSrc,
  bgColor = '#f0f0f0',
  fontColor = '#fff',
}: LevelItemProps) {
  if (type === 'eb' || type === 'pb') {
    return (
      <LevelStudyItem
        type={type}
        level={level}
        title={title}
        completed={completed}
        total={total}
        href={href}
        imgSrc={imgSrc}
        bgColor={bgColor}
        fontColor={fontColor}
      />
    )
  }
  return (
    <LevelPkItem
      type={type}
      level={level}
      title={title}
      completed={completed}
      total={total}
      href={href}
      imgSrc={imgSrc}
      bgColor={bgColor}
      fontColor={fontColor}
    />
  )
}

function LevelStudyItem({
  type,
  level,
  title,
  completed,
  total,
  href,
  imgSrc,
  bgColor = '#f0f0f0',
  fontColor = '#fff',
}: LevelItemProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const [currentImageUrl, setCurrentImageUrl] = useState<
    string | StaticImageData
  >(imgSrc || '')
  const [isTransitioning, setIsTransitioning] = useState(false)

  return (
    <Link href={href}>
      <LevelItemStyle
        bgColor={bgColor}
        fontColor={fontColor}
        isTransitioning={isTransitioning}>
        <div className="level-image-container">
          <ProgressDonut completed={completed} total={total} />
          <Image
            src={currentImageUrl}
            alt="search-bar-icon"
            width={150}
            height={214}
            className="book-cover"
          />
          <div className="book-cover-shadow" />
        </div>
        <div className="level-container">
          <div className="wrapper">
            <div className="level">{title}</div>
            {/* <div className="more-books">
              <span>more</span>
              <Image
                src={Assets.Icon.chevronRightWhite}
                alt="arrow-right"
                width={16}
                height={16}
              />
            </div> */}
          </div>
        </div>
        <div className="study-count">
          <span>{completed}</span>
          <span>/{total}</span>
          {/* <span> {t('t8th247')}</span> */}
        </div>
        {/* <div className="delete-button">
          <Image
            src={Assets.Icon.deleteWhite}
            alt="delete"
            width={24}
            height={24}
          />
        </div> */}
      </LevelItemStyle>
    </Link>
  )
}

function LevelPkItem({
  type,
  title,
  completed,
  total,
  href,
  imgSrc,
  bgColor = '#f0f0f0',
  fontColor = '#fff',
}: LevelItemProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  return (
    <Link href={href}>
      <LevelPkItemStyle
        bgColor={bgColor}
        fontColor={fontColor}
        isTransitioning={isTransitioning}>
        <div className="thumbnail-container">
          {type === 'study' && (
            <ProgressDonut completed={completed} total={total} />
          )}
          <Image
            src={imgSrc!}
            alt="level-image"
            width={142}
            height={80}
            className={`thumbnail-image ${type === 'study' ? '' : 'sub'}`}
          />
          {type === 'study' && <div className="thumbnail-shadow" />}
          <div className="mobile-title">{title}</div>
        </div>
        <div className="title-container">
          <div className="title">{title}</div>
        </div>
        <div className="study-count">
          <span>{completed}</span>
          <span>/{total}</span>
          {/* <span> Activities</span> */}
        </div>
      </LevelPkItemStyle>
    </Link>
  )
}
