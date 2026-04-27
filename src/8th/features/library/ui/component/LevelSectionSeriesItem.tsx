'use client'

import { SeriesItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'
import Link from 'next/link'

interface SeriesItemProps {
  level: string
  title: string
  href: string
  imgSrc: string
  bgColor?: string
}

export default function SeriesItem({
  level,
  title,
  href,
  imgSrc,
  bgColor = '#222',
}: SeriesItemProps) {
  return (
    <Link href={href}>
      <SeriesItemStyle bgColor={bgColor}>
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
