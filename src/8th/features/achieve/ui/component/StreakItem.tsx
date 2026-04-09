'use client'

import { Assets } from '@/8th/assets/asset-library'
import { StreakItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'

/**
 * 연속학습달성 뱃지
 */

interface StreakItemProps {
  streakType: 'earned' | 'progress' | 'notCompleted'
  date?: string
  awardImgSrc: string
  currentDay: number
  rangeMinDay: number
  rangeMaxDay: number
  isTodayStudy: boolean
}

export default function StreakItem({
  streakType,
  date,
  awardImgSrc,
  rangeMinDay,
  rangeMaxDay,
  currentDay,
  isTodayStudy,
}: StreakItemProps) {
  return (
    <StreakItemStyle streakDays={rangeMaxDay.toString()}>
      {streakType === 'earned' && (
        <StreakAwardEarnedItem streakImageSrc={awardImgSrc} earnDate={date!} />
      )}
      {streakType === 'progress' && (
        <StreakAwardProgressItem
          streakImageSrc={awardImgSrc}
          isActive={isTodayStudy}
          currentDay={currentDay}
          rangeMinDay={rangeMinDay}
          rangeMaxDay={rangeMaxDay}
        />
      )}
      {streakType === 'notCompleted' && (
        <StreakAwardLockedItem streakImageSrc={awardImgSrc} />
      )}
    </StreakItemStyle>
  )
}

function StreakAwardEarnedItem({
  streakImageSrc,
  earnDate,
}: {
  streakImageSrc: string
  earnDate: string
}) {
  return (
    <BoxStyle
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={10}>
      <Image src={streakImageSrc} alt="Streak Award" width={120} height={120} />
      <TextStyle fontFamily="sans" fontColor="secondary" fontWeight="bold">
        +{earnDate}
      </TextStyle>
    </BoxStyle>
  )
}

function StreakAwardProgressItem({
  streakImageSrc,
  isActive,
  currentDay,
  rangeMinDay,
  rangeMaxDay,
}: {
  streakImageSrc: string
  isActive: boolean
  currentDay: number
  rangeMinDay: number
  rangeMaxDay: number
}) {
  // @language 'common'
  const { t } = useTranslation()

  const progressPercentage = Math.min(
    100,
    ((currentDay - rangeMinDay + 1) / (rangeMaxDay - rangeMinDay + 1)) * 100,
  )
  return (
    <BoxStyle
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={10}>
      {/* 이미지는 연속학습 중, 연속학습 끊김, 연속학습 달성 3가지 케이스가 있음 */}
      <BoxStyle className="container">
        {isActive && (
          <Image
            src={Assets.Icon.Side.streakFire}
            alt="Streak Award"
            width={60}
            height={60}
            className="streak-fire-icon"
          />
        )}
        <Image
          src={streakImageSrc}
          alt="Streak Award"
          width={100}
          height={100}
          className="streak-award-gray-image"
        />
        <div className="progress">
          <div className={`progress-bar ${isActive ? 'today-streak' : ''}`}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${progressPercentage}%`,
              }}></div>
          </div>
        </div>
      </BoxStyle>
      <TextStyle fontFamily="sans" fontColor="secondary" fontWeight="bold">
        <TextStyle
          type="span"
          fontFamily="sans"
          fontColor={`${isActive ? '#ff374b' : 'secondary'}`}
          fontWeight="bold">
          {currentDay}
        </TextStyle>
        /{rangeMaxDay} {t('t8th255')}
      </TextStyle>
    </BoxStyle>
  )
}

function StreakAwardLockedItem({ streakImageSrc }: { streakImageSrc: string }) {
  return (
    <BoxStyle
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={10}>
      <BoxStyle className="container">
        <Image
          src={streakImageSrc}
          alt="Streak Award"
          width={100}
          height={100}
          className="streak-award-gray-image"
        />
      </BoxStyle>
    </BoxStyle>
  )
}
