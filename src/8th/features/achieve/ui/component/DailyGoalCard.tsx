'use client'

import { Assets } from '@/8th/assets/asset-library'
import { DailyGoalCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import {
  AwardBgStyle,
  AwardImageStyle,
  CommonTitleStyle,
  WidgetBoxStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import { shuffleDeterministic } from '@/util/hash-utils'
import Image from 'next/image'
import { Fragment, useEffect, useMemo, useState } from 'react'
import DailyGoalModal from '../modal/DailyGoalModal'

type GoalType = 'Points' | 'Books'
type DailyGoalStatus = 'running' | 'complete' | 'award'
const MAX_DAILY_GOAL_COUNT = 1050
const DAILY_GOAL_COUNT_STEP = 25
const DAILY_GOAL_COMPLETE_TITLE_LIST = [
  'Awesome job!',
  'Great work!',
  'Way to go!',
  'Superstar!',
  'High five!',
  "You're amazing!",
  'Fantastic job!',
  'Boom! You did it!',
]

export default function DailyGoalCard({
  loading,
  studentId,
  currentValue,
  settingValue,
  settingType,
  awardDay = 0,
}: {
  loading: boolean
  studentId: string
  currentValue: number
  settingValue: number
  settingType: GoalType
  awardDay?: number
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isSuccessTodayGoal = currentValue >= settingValue
  const award = 0 < awardDay
  let dailyGoalStatus: DailyGoalStatus = 'running'
  if (isSuccessTodayGoal) {
    dailyGoalStatus = 'complete'
  }
  if (dailyGoalStatus === 'complete' && award) {
    dailyGoalStatus = 'award'
  }

  const dayNumVal = Math.floor(Date.now() / 86400000) // 하루 단위
  const todayTitle = useMemo(() => {
    if (studentId === '') {
      return ''
    }
    const cycle = Math.floor(dayNumVal / 8)

    const titles = shuffleDeterministic(
      DAILY_GOAL_COMPLETE_TITLE_LIST,
      `${studentId}-set-${cycle}`,
    )
    const index = dayNumVal % titles.length

    return titles[index]
  }, [dayNumVal, studentId])

  if (loading) {
    return (
      <WidgetBoxStyle height="168px" todayGoal={false} getAward={false}>
        <DailyGoalRunning
          loading={true}
          settingType={'Books'}
          currentValue={0}
          settingValue={0}
        />
      </WidgetBoxStyle>
    )
  }
  return (
    <>
      <WidgetBoxStyle
        height="168px"
        todayGoal={dailyGoalStatus === 'complete'}
        getAward={dailyGoalStatus === 'award'}>
        {dailyGoalStatus === 'running' && (
          <DailyGoalRunning
            settingType={settingType}
            currentValue={currentValue}
            settingValue={settingValue}
            onClick={() => setIsModalOpen(true)}
          />
        )}
        {dailyGoalStatus === 'complete' && (
          <DailyGoalComplete
            todayTitle={todayTitle}
            settingType={settingType}
            currentValue={currentValue}
            settingValue={settingValue}
            onClick={() => setIsModalOpen(true)}
          />
        )}
        {dailyGoalStatus === 'award' && (
          <DailyGoalAward
            awardDay={awardDay}
            onClick={() => setIsModalOpen(true)}
          />
        )}
      </WidgetBoxStyle>
      {isModalOpen && <DailyGoalModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

function DailyGoalRunning({
  settingType,
  currentValue,
  settingValue,
  loading,
  onClick,
}: {
  settingType: GoalType
  currentValue: number
  settingValue: number
  loading?: boolean
  onClick?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const goalMessage =
    settingType === 'Points'
      ? t('t8th212', { num: settingValue }).split('\n')
      : t('t8th211', { num: settingValue }).split('\n')
  const chartText =
    settingType === 'Points' ? `+${currentValue}P` : currentValue

  return (
    <DailyGoalCardStyle>
      <CommonTitleStyle onClick={onClick}>{t('t8th201')}</CommonTitleStyle>
      <div className="body">
        <div className="comment">
          {goalMessage.map((text, index) => {
            return (
              <Fragment key={text}>
                {index > 0 && <br />}
                {text}
              </Fragment>
            )
          })}
        </div>

        <div className="progress">
          <div className="donut-progress">
            <DonutProgress
              currentValue={loading ? 0 : currentValue}
              settingValue={loading ? 100 : settingValue}
              size={100}
              radius={35}
              width={6}
            />
            <div className="donut-text">
              <span
                className={`daily-progress ${currentValue > 0 ? 'active' : ''}`}>
                {chartText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DailyGoalCardStyle>
  )
}

function DailyGoalComplete({
  todayTitle,
  settingType,
  currentValue,
  settingValue,
  onClick,
}: {
  todayTitle: string
  settingType: GoalType
  currentValue: number
  settingValue: number
  onClick?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const completeText =
    settingType === 'Points'
      ? `${currentValue.toFixed(1)}P`
      : `${currentValue}/${settingValue}`

  return (
    <DailyGoalCardStyle>
      <CommonTitleStyle todayGoal onClick={onClick}>
        {t('t8th201')}
      </CommonTitleStyle>
      <div className="body-complete">
        <div className="comment">
          <div className="comment-title">{todayTitle}</div>
          <div className="comment-text">{t('t8th213')}</div>
        </div>
        <div className="complete">{completeText}</div>
      </div>
    </DailyGoalCardStyle>
  )
}

function DailyGoalAward({
  awardDay,
  onClick,
}: {
  awardDay: number
  onClick?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const awardImage = useMemo(() => {
    if (awardDay <= DAILY_GOAL_COUNT_STEP) {
      return Assets.Icon.DailyGoal.dailyGoal25
    }
    if (awardDay > MAX_DAILY_GOAL_COUNT) {
      return Assets.Icon.DailyGoal.dailyGoal1050
    }
    return Assets.Icon.DailyGoal[
      `dailyGoal${awardDay}` as keyof typeof Assets.Icon.DailyGoal
    ]
  }, [awardDay])

  return (
    <DailyGoalCardStyle>
      <CommonTitleStyle getAward onClick={onClick}>
        {t('t8th201')}
      </CommonTitleStyle>
      <div className="body-complete">
        <div className="comment award">
          <div className="comment-title">Achieved {awardDay} times!</div>
        </div>
        <BoxStyle position="relative" width="100px" height="100px">
          <AwardImageStyle>
            <Image
              src={awardImage}
              alt="Daily Goal Award"
              width={80}
              height={80}
            />
          </AwardImageStyle>
          <AwardBgStyle />
        </BoxStyle>
      </div>
    </DailyGoalCardStyle>
  )
}

function DonutProgress({
  currentValue,
  settingValue,
  size,
  radius,
  width,
}: {
  currentValue: number
  settingValue: number
  size: number
  radius: number
  width: number
}) {
  const [progressValue, setProgressValue] = useState(0)

  const strokeDasharray = useMemo(() => {
    let normalizedProgress = Math.max(
      0,
      Math.min(currentValue / settingValue, 1),
    )
    // 97% 이상일 경우 97%로 보정 (완료된 것 처럼 보이는 현상 완화)
    if (0.97 < normalizedProgress && normalizedProgress < 1) {
      normalizedProgress = 0.97
    }

    const circumference = Math.ceil(2 * Math.PI * radius)
    const offset = Math.ceil(normalizedProgress * circumference)

    return { circumference, offset }
  }, [currentValue, settingValue, radius])

  useEffect(() => {
    const duration = 1500
    let animationId: number | null = null
    let startTime: number = 0

    // 선형 보간법
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    // ease-in-out (Sine) — CSS ease-in-out과 매우 유사
    const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOut(progress)
      setProgressValue(lerp(0, strokeDasharray.offset, eased))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate)
    }, 1000)
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [strokeDasharray.offset])

  const cx = size / 2
  const cy = size / 2

  return (
    <svg className="donut-chart" width={size} height={size}>
      <circle
        className="donut-hole"
        cx={cx}
        cy={cy}
        r={radius}
        fill="transparent"
      />
      <circle
        className="donut-ring"
        cx={cx}
        cy={cy}
        r={radius}
        fill="transparent"
        stroke="var(--line-color-primary)"
        strokeWidth={width}
      />
      <circle
        className="donut-segment"
        cx={cx}
        cy={cy}
        r={radius}
        fill="transparent"
        stroke="var(--color-red-medium)"
        strokeWidth={width}
        strokeDasharray={`${progressValue} ${strokeDasharray.circumference}`}
        strokeDashoffset={0}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="round"
      />
    </svg>
  )
}
