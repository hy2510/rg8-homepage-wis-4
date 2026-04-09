'use client'

import { ReviewBookItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import Image from 'next/image'

/**
 * 결과 목록 아이템
 */

interface ReviewBookItemProps {
  title: string
  levelName: string
  src: string
  studyDate: string
  isPassed: boolean
}

export default function ReviewSpeakItem({
  title,
  levelName,
  src,
  studyDate,
  isPassed,
}: ReviewBookItemProps) {
  return (
    <ReviewBookItemStyle>
      <BoxStyle display="flex" alignItems="center" gap={20}>
        <BoxStyle className="book-cover">
          <Image src={src} alt="book-cover" width={100} height={136} />
        </BoxStyle>
        <BoxStyle
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={10}
          flexWrap="nowrap">
          <BoxStyle
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={10}>
            <div>
              <div className="book-code">{levelName}</div>
              <div className="book-title">{title}</div>
            </div>
            <div className={`total-score ${isPassed ? 'pass' : ''}`}></div>
          </BoxStyle>
        </BoxStyle>
      </BoxStyle>
      <BoxStyle display="flex" alignItems="center" gap={10}>
        <BoxStyle
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          gap={10}>
          <BoxStyle className="study-results">
            <span>{isPassed ? 'PASS' : 'FAIL'}</span>
            <span>{studyDate}</span>
          </BoxStyle>
        </BoxStyle>
      </BoxStyle>
    </ReviewBookItemStyle>
  )
}
