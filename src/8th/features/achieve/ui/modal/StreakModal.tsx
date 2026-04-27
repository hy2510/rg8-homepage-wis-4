'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useSuccessiveStudy } from '@/8th/features/achieve/service/achieve-query'
import { useContinuousStudy } from '@/8th/features/student/service/learning-query'
import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, StreakLine, TextStyle } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import Image from 'next/image'
import { useEffect, useMemo, useRef } from 'react'
import StreakItem from '../component/StreakItem'

const MAX_STREAK_DAY = 300
const STREAK_DAY_STEP = 20

interface StreakData {
  isEarnAward: boolean
  streakDay: number
  awardImgSrc: string
  beforeDay: number
  day: number
  date?: string
}

interface StreakModalProps {
  onClose: () => void
}

/**
 * 연속학습 모달
 */
export default function StreakModal({ onClose }: StreakModalProps) {
  // @language 'common'
  const { t } = useTranslation()

  const maketingEventTracker = useTrack()

  const continuousStudy = useContinuousStudy()
  const { data: streakData, isFetching: isStreakFetching } =
    useSuccessiveStudy()

  const currentProgressRef = useRef<HTMLDivElement>(null)

  // 연속학습 데이터 배열
  const streakItems = useMemo(() => {
    const responseList = streakData?.list || []

    const listLength = Math.max(
      MAX_STREAK_DAY / STREAK_DAY_STEP,
      responseList.length,
    )
    const list: StreakData[] = Array.from(
      {
        length: listLength,
      },
      (_, index) => {
        const day = (index + 1) * STREAK_DAY_STEP
        let imageAssets = Assets.Icon.Streak['streak20Days']
        if (day > MAX_STREAK_DAY) {
          const imageKey = [
            'streakMax1',
            'streakMax2',
            'streakMax3',
            'streakMax4',
            'streakMax5',
          ]
          const imageIndex =
            ((day - MAX_STREAK_DAY) / STREAK_DAY_STEP - 1 + imageKey.length) %
            imageKey.length

          imageAssets =
            Assets.Icon.Streak[
              imageKey[imageIndex] as keyof typeof Assets.Icon.Streak
            ]
        } else {
          imageAssets =
            Assets.Icon.Streak[
              `streak${day}Days` as keyof typeof Assets.Icon.Streak
            ]
        }
        return {
          day,
          beforeDay: day - STREAK_DAY_STEP + 1,
          imageSrc: imageAssets,
        }
      },
    ).map((item, index) => {
      const streak =
        index < responseList.length ? responseList[index] : undefined
      return {
        isEarnAward: !!streak,
        streakDay: item.day,
        awardImgSrc: item.imageSrc,
        day: item.day,
        beforeDay: item.beforeDay,
        date: streak
          ? DateUtils.toStringDate(DateUtils.createDate(streak.achievedDate), {
              divide: '.',
            })
          : undefined,
      }
    })
    return list
  }, [streakData])

  const isTodayStudy = continuousStudy.data?.todayStudyYn || false
  const currentStreakDay = continuousStudy.data?.continuous || 0

  // 현재 진행 중인 아이템 찾기
  let currentStreakItemDay = 0
  if (!isStreakFetching) {
    for (let i = 0; i < streakItems.length - 1; i++) {
      if (currentStreakDay > streakItems[i].day) {
        continue
      }
      if (currentStreakDay === streakItems[i].day && !isTodayStudy) {
        continue
      }
      currentStreakItemDay = streakItems[i].day
      break
    }
    if (currentStreakDay > 0 && currentStreakItemDay === 0) {
      currentStreakItemDay = streakItems[streakItems.length - 1].day
    }
  }

  // 모달이 열릴 때 현재 진행 중인 아이템으로 스크롤
  useEffect(() => {
    if (currentStreakItemDay > 0 && currentProgressRef.current) {
      // 약간의 지연을 두어 모달이 완전히 렌더링된 후 스크롤
      const timer = setTimeout(() => {
        currentProgressRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [currentStreakItemDay])

  useEffect(() => {
    maketingEventTracker.eventAction('연속학습어워드 화면 진입', {
      version: '8th',
      current_streak: currentStreakDay === 0 ? undefined : currentStreakDay,
    })
  }, [maketingEventTracker, currentStreakDay])

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">{t('t8th253')}</div>
        <div className="btn-close" onClick={onClose} />
      </ModalHeaderStyle>
      <ModalBodyStyle viewCloud>
        <BoxStyle display="flex" flexDirection="column">
          {isStreakFetching ? (
            <div style={{ height: '100dvh' }} />
          ) : (
            <BoxStyle
              display="flex"
              flexDirection="column"
              gap={10}
              alignItems="center"
              justifyContent="space-between">
              <TextStyle
                fontFamily="sans"
                fontColor="secondary"
                fontWeight="bold">
                {t('t8th254')}
              </TextStyle>
              <Image
                src={Assets.Icon.arrowDownGray}
                alt=""
                width={20}
                height={20}
              />
            </BoxStyle>
          )}
          {!isStreakFetching &&
            streakItems.map((streak, index) => {
              const streakType = streak.isEarnAward
                ? 'earned'
                : currentStreakItemDay === streak.day
                  ? 'progress'
                  : 'notCompleted'
              return (
                <div
                  key={`streak_${streak.day}`}
                  ref={
                    currentStreakItemDay === streak.day
                      ? currentProgressRef
                      : null
                  }>
                  <StreakItem
                    streakType={streakType}
                    date={streak.date}
                    awardImgSrc={streak.awardImgSrc}
                    rangeMaxDay={streak.day}
                    rangeMinDay={streak.beforeDay}
                    currentDay={currentStreakDay}
                    isTodayStudy={isTodayStudy}
                  />
                  {index < streakItems.length - 1 && <StreakLine />}
                </div>
              )
            })}
        </BoxStyle>
      </ModalBodyStyle>
    </ModalContainer>
  )
}
