'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import {
  ChallengeBoardGoalInfoStyle,
  ChallengeBoardProgressInfoStyle,
  ChallengeBoardProgressItemStyle,
  ChallengeBoardStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import {
  DropdownContainerStyle,
  DropdownItemStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// 메인 컴포넌트
export default function ChallengeBoard({
  title,
  startDate,
  endDate,
  prize,
  point,
  learningDays,
  isTodayStudy,
  prizeList,
  onPrizeChange,
  onExpendChange,
  isDefaultExpend,
}: {
  title: string
  startDate: string
  endDate: string
  prize: string
  point: number
  learningDays: number
  isTodayStudy: boolean
  prizeList: {
    eventPrizeId: string
    prizeTitle: string
    prizeDays: number
    prizePoint: number
  }[]
  onPrizeChange?: (prizeId: string) => void
  onExpendChange?: (isExpend: boolean) => void
  isDefaultExpend?: boolean
}) {
  const [isExpend, setExpend] = useState(isDefaultExpend || false)
  const remainingDays = DateUtils.dayDistance(
    new Date(),
    DateUtils.createDate(endDate),
  )

  const maxEventDay = DateUtils.dayDistance(
    DateUtils.createDate(startDate),
    DateUtils.createDate(endDate),
    true,
  )
  const currentEventPrize =
    prizeList.find((p) => p.eventPrizeId === prize) ||
    prizeList[prizeList.length - 1]

  const prizeOptions = prizeList.map((prize) => ({
    key: prize.eventPrizeId,
    label: prize.prizeTitle,
  }))

  let minimumPrizeDay = currentEventPrize.prizeDays
  prizeList.forEach((prize) => {
    if (prize.prizeDays < minimumPrizeDay) {
      minimumPrizeDay = prize.prizeDays
    }
  })
  let minimumPrizePoint = currentEventPrize.prizePoint
  prizeList.forEach((prize) => {
    if (prize.prizePoint < minimumPrizePoint) {
      minimumPrizePoint = prize.prizePoint
    }
  })

  return (
    <ChallengeBoardStyle>
      <ChallengeBoardSimple
        title={title}
        endDate={endDate}
        remainingDays={remainingDays}
        isExpended={isExpend}
        isTodayStudy={isTodayStudy}
        onClick={() => {
          const newIsExpend = !isExpend
          setExpend(newIsExpend)
          if (onExpendChange) {
            onExpendChange(newIsExpend)
          }
        }}
      />
      {isExpend && (
        <ChallengeBoardExpend
          prizeId={currentEventPrize.eventPrizeId}
          prizeTitle={currentEventPrize.prizeTitle}
          point={point}
          goalPoint={currentEventPrize.prizePoint}
          minEventPoint={minimumPrizePoint}
          learningDays={learningDays}
          goalDay={currentEventPrize.prizeDays}
          minEventDay={minimumPrizeDay}
          maxEventDay={maxEventDay}
          prizeList={prizeOptions}
          remainingDays={remainingDays}
          isTodayStudy={isTodayStudy}
          onChangeGoal={onPrizeChange}
        />
      )}
    </ChallengeBoardStyle>
  )
}

function ChallengeBoardSimple({
  title,
  endDate,
  isExpended,
  remainingDays,
  isTodayStudy,
  onClick,
}: {
  title: string
  endDate: string
  remainingDays: number
  isExpended: boolean
  isTodayStudy?: boolean
  onClick?: () => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  const endDateObj = DateUtils.createDate(endDate)

  let eventStatusMessage = ''
  if (remainingDays > 0) {
    eventStatusMessage = t('t8th272', {
      txt: `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}`,
      num: remainingDays,
    }).replace('&#x2F;', '/')
  } else if (remainingDays === 0) {
    eventStatusMessage = t('t8th273', {
      txt: `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}`,
    }).replace('&#x2F;', '/')
  } else {
    eventStatusMessage = t('t8th274', {
      txt: `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}`,
    }).replace('&#x2F;', '/')
  }

  return (
    <BoxStyle className="challenge-board-top" onClick={onClick}>
      <Image
        src="/src/8th/images/challenge_symbol_edmond.png"
        alt="challenge-board"
        width={100}
        height={100}
        className="challenge-board-symbol"
      />
      <BoxStyle className="challenge-board-title">
        <TextStyle
          fontSize={isPhone ? '1em' : 'large'}
          fontWeight="bold"
          fontFamily="sans">
          {t('t8th271', { txt: title })}
        </TextStyle>
        <TextStyle
          fontSize={isPhone ? '0.9em' : 'medium'}
          fontWeight="bold"
          fontFamily="sans"
          fontColor="secondary">
          {eventStatusMessage}
        </TextStyle>
      </BoxStyle>
      <BoxStyle className="challenge-board-arrow">
        <Image
          src={Assets.Icon.chevronRightGray}
          alt="arrow-right"
          width={24}
          height={24}
          style={{
            transform: isExpended ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </BoxStyle>
    </BoxStyle>
  )
}

function ChallengeBoardExpend({
  prizeId,
  prizeTitle,
  point,
  minEventPoint,
  goalPoint,
  learningDays,
  minEventDay,
  maxEventDay,
  goalDay,
  remainingDays,
  prizeList,
  isTodayStudy,
  onChangeGoal,
}: {
  prizeId: string
  prizeTitle: string
  point: number
  minEventPoint: number
  goalPoint: number
  learningDays: number
  goalDay: number
  minEventDay: number
  maxEventDay: number
  remainingDays: number
  prizeList: {
    key: string
    label: string
  }[]
  isTodayStudy?: boolean
  onChangeGoal?: (id: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  const eventFail =
    minEventDay > learningDays + (isTodayStudy ? -1 : 0) + remainingDays

  return (
    <>
      <ChallengeBoardGoalInfoStyle>
        <BoxStyle
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={5}>
          <TextStyle fontSize="medium" fontWeight="bold" fontFamily="sans">
            {t('t8th275', { txt: prizeTitle })}
          </TextStyle>
          <TextStyle
            fontSize="small"
            fontWeight="bold"
            fontFamily="sans"
            fontColor="secondary">
            {`💡 ${t('t8th276')}`}
          </TextStyle>
        </BoxStyle>
        <ChallengeBoardEditMenu
          items={prizeList}
          currentEventPrizeId={prizeId}
          onItemClick={(item) => {
            if (onChangeGoal) {
              onChangeGoal(item.key)
            }
          }}
        />
      </ChallengeBoardGoalInfoStyle>
      <ChallengeBoardProgressInfoStyle>
        <BoxStyle
          display="flex"
          gap={20}
          flexDirection={isPhone ? 'column' : 'row'}>
          <ProgressItem
            progressType="earned-point"
            currentValue={point}
            goalValue={goalPoint}
            maxValue={goalPoint}
          />
          <ProgressItem
            progressType="study-day"
            currentValue={learningDays}
            goalValue={goalDay}
            maxValue={maxEventDay}
          />
          <ProgressItem
            progressType="remaining-day"
            currentValue={Math.max(maxEventDay - remainingDays, 0)}
            goalValue={maxEventDay}
            maxValue={maxEventDay}
          />
        </BoxStyle>
        {eventFail && (
          <TextStyle
            fontSize="small"
            fontWeight="bold"
            fontFamily="sans"
            fontColor="#F02E3E">
            {`⚠️ ${t('t8th281')}`}
          </TextStyle>
        )}
      </ChallengeBoardProgressInfoStyle>
    </>
  )
}

// 프로그레스 아이템 컴포넌트
function ProgressItem({
  progressType,
  currentValue,
  goalValue,
  maxValue,
}: {
  progressType: 'study-day' | 'earned-point' | 'remaining-day'
  currentValue: number
  goalValue: number
  maxValue: number
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [isVisible, setIsVisible] = useState(false)

  // 현재 진행률 계산(goalValue 기준 백분율)
  const progressGoalBasePercentage = NumberUtils.toRgDecimalPoint(
    NumberUtils.getHundredPercentage(currentValue, goalValue, {
      isInteger: false,
      limitZeroToHundred: false,
    }),
  )
  // 현재 진행률 계산(maxValue 기준 백분율)
  let progressMaxBasePercentage = progressGoalBasePercentage
  if (goalValue !== maxValue) {
    progressMaxBasePercentage = NumberUtils.toRgDecimalPoint(
      NumberUtils.getHundredPercentage(currentValue, maxValue, {
        isInteger: false,
        limitZeroToHundred: false,
      }),
    )
  }
  // 목표 길이 계산 (goalValue 기준 백분율)
  const goalLengthPercentage = NumberUtils.toRgDecimalPoint(
    NumberUtils.getHundredPercentage(goalValue, maxValue, {
      isInteger: false,
      limitZeroToHundred: false,
    }),
  )

  // 컴포넌트가 마운트되면 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100) // 약간의 지연 후 애니메이션 시작

    return () => clearTimeout(timer)
  }, [])

  let title = ''
  let titleText = ''
  let fillColor = ''
  let subText = ''
  if (progressType === 'study-day') {
    title = t('t8th278')
    titleText = t('t8th282', { txt: `${currentValue}/${maxValue}` }).replace(
      '&#x2F;',
      '/',
    )
    fillColor = 'red'
    subText = `${t('t8th279', { num: progressGoalBasePercentage })}${t('t8th280', { num: goalValue })}`
  } else if (progressType === 'earned-point') {
    title = t('t8th277')
    titleText = t('t8th283', { txt: `${currentValue}/${goalValue}` }).replace(
      '&#x2F;',
      '/',
    )
    fillColor = ''
    subText = t('t8th279', { num: progressGoalBasePercentage })
  } else if (progressType === 'remaining-day') {
    title = t('t8th327')
    titleText = t('t8th282', { txt: `${currentValue}/${maxValue}` }).replace(
      '&#x2F;',
      '/',
    )
    fillColor = 'green'
    subText = t('t8th328', { txt: currentValue })
  }

  return (
    <ChallengeBoardProgressItemStyle>
      <BoxStyle display="flex" gap={5}>
        <span className="title-text">{title} ·</span>
        <span className="title-text">{titleText}</span>
      </BoxStyle>
      <div className="progress-bar">
        <div
          className={`progress-bar-fill ${fillColor}`}
          style={{
            width: isVisible
              ? `${Math.min(progressMaxBasePercentage, 100)}%`
              : '0%',
          }}></div>
        {goalValue !== maxValue && (
          <div
            className="progress-bar-fill-goal"
            style={{
              width: isVisible ? `${goalLengthPercentage}%` : '0%',
            }}></div>
        )}
      </div>
      <span className="sub-text">{subText}</span>
    </ChallengeBoardProgressItemStyle>
  )
}

export function ChallengeBoardEditMenu({
  items,
  currentEventPrizeId,
  showArrow = false,
  viewGrid = false,
  onItemClick,
}: {
  items: {
    key: string
    label: string
  }[]
  currentEventPrizeId: string
  showArrow?: boolean
  viewGrid?: boolean
  onItemClick?: (item: { key: string; label: string }) => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [isMenuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <div ref={dropdownRef} onClick={() => setMenuOpen(!isMenuOpen)}>
      <BoxStyle className="challenge-board-goal-edit-button">
        <Image src={Assets.Icon.EditGray} alt="edit" width={20} height={20} />
        {isMenuOpen && items.length > 0 && (
          <DropdownContainerStyle position={'bottomRight'} viewGrid={viewGrid}>
            {items.map((item, index) => (
              <DropdownItemStyle
                key={index}
                onClick={() => {
                  if (onItemClick) {
                    onItemClick(item)
                  }
                  setMenuOpen(false)
                }}
                viewGrid={viewGrid}>
                <BoxStyle
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start">
                  <div className="link-text">{undefined}</div>
                  <div className="sub-text">{item.label}</div>
                </BoxStyle>
                {showArrow && (
                  <div className="icon">
                    <Image
                      src={Assets.Icon.arrowUpRightGray}
                      alt="arrow up right"
                      width={10}
                      height={10}
                    />
                  </div>
                )}
                {item.key === currentEventPrizeId && (
                  <div className="current">
                    <Image
                      src={Assets.Icon.checkLightBlue}
                      alt="check"
                      width={16}
                      height={16}
                    />
                  </div>
                )}
              </DropdownItemStyle>
            ))}
          </DropdownContainerStyle>
        )}
      </BoxStyle>
    </div>
  )
}
