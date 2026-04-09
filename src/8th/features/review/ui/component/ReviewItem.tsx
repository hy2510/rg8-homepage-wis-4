'use client'

import {
  useIsTabletLarge,
  useIsTabletSmall,
} from '@/8th/shared/context/ScreenModeContext'
import { ReviewBookItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import CustomCheckbox from '@/8th/shared/ui/CustomCheckbox'
import DropdownMenu from '@/8th/shared/ui/Dropdowns'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import Image from 'next/image'

/**
 * 결과 목록 아이템
 */

interface ReviewBookItemProps {
  uid: string
  title: string
  levelName: string
  src: string
  studyDate: string
  totalScore: number
  stepScore1: number
  stepScore2: number
  stepScore3: number
  stepScore4: number
  stepScore5: number
  isPassed: boolean
  earnPoints: number
  completedInfo: string
  isCheckable?: boolean
  isChecked?: boolean
  expendMenu?: {
    text: string
    subText?: string
    onClick?: () => void
  }[]
  onClick?: () => void
  onExpendMenuClick?: (isOpen: boolean) => void
}

export default function ReviewBookItem({
  uid,
  title,
  levelName,
  src,
  studyDate,
  totalScore,
  stepScore1,
  stepScore2,
  stepScore3,
  stepScore4,
  stepScore5,
  isPassed,
  earnPoints,
  completedInfo,
  expendMenu,
  isCheckable,
  isChecked,
  onClick,
  onExpendMenuClick,
}: ReviewBookItemProps) {
  const isMobile = useIsTabletSmall('smaller')
  const isGnbBottomTablet = useIsTabletLarge('smaller')

  const isPKLevel = levelName.startsWith('EB-PK')
  const scoreBox: { step: number; score: number }[] = []
  if (!isPKLevel) {
    if (completedInfo.toLowerCase().includes('easy')) {
      scoreBox.push({ step: 1, score: stepScore1 })
      scoreBox.push({ step: 3, score: stepScore3 })
    } else {
      scoreBox.push({ step: 1, score: stepScore1 })
      scoreBox.push({ step: 2, score: stepScore2 })
      scoreBox.push({ step: 3, score: stepScore3 })
      scoreBox.push({ step: 4, score: stepScore4 })
      if (!levelName.startsWith('EB-K')) {
        scoreBox.push({ step: 5, score: stepScore5 })
      }
    }
  }

  return (
    <ReviewBookItemStyle>
      <BoxStyle
        display="flex"
        alignItems="center"
        gap={isMobile ? 15 : 20}
        flexDirection={isMobile ? 'column' : 'row'}
        width={isMobile ? '100%' : 'auto'}
        onClick={isCheckable ? onClick : undefined}>
        <BoxStyle className="book-cover">
          <Image src={src} alt="book-cover" width={100} height={136} />
          {isCheckable && (
            <BoxStyle
              position="absolute"
              top={isMobile ? '8px' : '28px'}
              left={isMobile ? '24px' : '8px'}
              zIndex={1}
              className="animate__animated animate__bounce">
              <CustomCheckbox
                id={`book-${title}-${uid}`}
                checked={isChecked}
                onChange={() => {
                  if (onClick) {
                    onClick()
                  }
                }}
              />
            </BoxStyle>
          )}
        </BoxStyle>
        <BoxStyle className="review-book-info-container">
          <BoxStyle
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={10}>
            <div style={{ paddingLeft: isMobile ? '5px' : '0' }}>
              <div className="book-code">{levelName}</div>
              <div className="book-title">{title}</div>
            </div>
            <div className={`total-score ${isPassed ? 'pass' : ''}`}>
              {`${totalScore}%${isPassed && earnPoints != 0 ? ` , +${earnPoints}P` : ''}`}
            </div>
          </BoxStyle>
          {scoreBox.length > 0 && (
            <BoxStyle display="flex">
              {scoreBox.map(({ step, score }) => (
                <div key={step} className="step-score">
                  <span>{step}.</span>
                  <span>{`${score}%`}</span>
                </div>
              ))}
            </BoxStyle>
          )}
        </BoxStyle>
      </BoxStyle>
      <BoxStyle className="mobile-review-more-button-container">
        <BoxStyle
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          gap={10}>
          <BoxStyle className="study-results">
            <span>
              {isPassed ? 'PASS' : 'FAIL'}
              {isPassed && `  ·  ${completedInfo}`}
            </span>
            <span>{studyDate}</span>
          </BoxStyle>
          {totalScore === 100 && (
            <div className="perfect-mark perfect">
              <span>Perfect</span>
            </div>
          )}
        </BoxStyle>
        <BoxStyle position="relative">
          <BoxStyle
            className="more-icon"
            onClick={() => {
              if (onExpendMenuClick) {
                onExpendMenuClick(true)
              }
            }}
            // onClick={() => {
            //   if (isReportMenuOpen) {
            //     setIsReportMenuOpen(false)
            //   } else if (!isCheckable) {
            //     setIsReportMenuOpen(true)
            //   }
            // }}
          />
          {expendMenu && expendMenu.length > 0 && (
            <DropdownMenu
              items={expendMenu}
              position={isGnbBottomTablet ? 'leftCenter' : 'rightCenter'}
              isOpen={true}
              onClose={() => {
                if (onExpendMenuClick) {
                  onExpendMenuClick(false)
                }
              }}
              // onClose={() => setIsReportMenuOpen(false)}
            />
          )}
        </BoxStyle>
      </BoxStyle>
    </ReviewBookItemStyle>
  )
}
