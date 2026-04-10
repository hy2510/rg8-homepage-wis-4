'use client'

import { librarySeriesScrollElementId } from '@/8th/features/library/ui/librarySeriesNavRestore'
import { SeriesItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'
import Link from 'next/link'

interface SeriesItemProps {
  level: string
  title: string
  href: string
  imgSrc: string
  bgColor?: string
  /** 시리즈 상세로 이동 직전 호출 (뒤로가기 시 by Series·스크롤 복원용) */
  onSeriesNavigate?: () => void
  /** true면 복귀 스크롤용 id 부여 (라이브러리 finder 그리드) */
  assignScrollAnchor?: boolean
}

export default function SeriesItem({
  level,
  title,
  href,
  imgSrc,
  bgColor = '#222',
  onSeriesNavigate,
  assignScrollAnchor,
}: SeriesItemProps) {
  const scrollId = assignScrollAnchor ? librarySeriesScrollElementId(title) : undefined

  return (
    <Link
      href={href}
      scroll={false}
      onClick={() => {
        onSeriesNavigate?.()
      }}>
      <SeriesItemStyle bgColor={bgColor} id={scrollId}>
        <div className="series-image-container">
          <Image
            src={imgSrc}
            alt="search-bar-icon"
            width={150}
            height={214}
            className="book-cover"
          />
          <div className="book-cover-shadow" />
        </div>
        <div className="series-name">
          [{level.toUpperCase()}] {title}
        </div>
        {/* {isRecentlyViewed && (
          <div className="delete-button">
            <Image
              src={Assets.Icon.deleteWhite}
              alt="delete"
              width={24}
              height={24}
            />
          </div>
        )} */}
      </SeriesItemStyle>
    </Link>
  )
}
