'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useSuccessiveDailyGoal } from '@/8th/features/achieve/service/achieve-query'
import {
  useChangeDailyLearning,
  useStudentDailyLearning,
  useStudentDailyLearningHistory,
} from '@/8th/features/student/service/learning-query'
import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, StreakLine, TextStyle } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import DailyGoalItem from '../component/DailyGoalItem'
import DailyGoalSetting from '../component/DailyGoalSetting'

const MAX_DAILY_GOAL_COUNT = 1050
const DAILY_GOAL_COUNT_STEP = 25

/**
 * 일일목표, 일일학습 모달
 */

interface DailyGoalModalProps {
  onClose: () => void
}

/**
 * 일일 목표 아이템 타입
 */
interface DailyGoalItemData {
  isEarnAward: boolean
  goalCount: number
  date?: string
  awardImgSrc?: string
}

export default function DailyGoalModal({ onClose }: DailyGoalModalProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const studentSetting = useStudentDailyLearning()
  const settingHistory = useStudentDailyLearningHistory()
  const dailyGoal = useSuccessiveDailyGoal()
  const { mutate: changeDailyLearning } = useChangeDailyLearning()

  const isLoading =
    studentSetting.isLoading || settingHistory.isLoading || dailyGoal.isLoading

  const dailyGoalItems = useMemo(() => {
    const responseList = dailyGoal.data?.list || []

    const list: DailyGoalItemData[] = Array.from(
      { length: MAX_DAILY_GOAL_COUNT / DAILY_GOAL_COUNT_STEP },
      (_, index) => {
        const count = (index + 1) * DAILY_GOAL_COUNT_STEP
        const imageId =
          `dailyGoal${count}` as keyof typeof Assets.Icon.DailyGoal
        return {
          count: count,
          imageSrc: Assets.Icon.DailyGoal[imageId],
        }
      },
    ).map((item, index) => {
      const goal = index < responseList.length ? responseList[index] : undefined
      return {
        isEarnAward: !!goal,
        goalCount: item.count,
        date: goal
          ? DateUtils.toStringDate(DateUtils.createDate(goal.achievedDate), {
              divide: '.',
            })
          : undefined,
        awardImgSrc: goal ? item.imageSrc : undefined,
      }
    })
    return list
  }, [dailyGoal.data])

  const [isDailyGoalSettingVisible, setDailyGoalSettingVisible] =
    useState(false)

  const toggleDailyGoalSetting = () => {
    setDailyGoalSettingVisible(!isDailyGoalSettingVisible)
  }

  const onChangeDailyGoal = (method: 'Books' | 'Points', value: number) => {
    changeDailyLearning({
      type: method,
      level: studentSetting.data?.settingLevelName || 'PK',
      value: value,
    })
  }

  const selectMethod = studentSetting.data?.settingType as 'Books' | 'Points'
  const initialPoints = studentSetting.data?.point || 1
  const initialBooks = studentSetting.data?.books || 1
  const goalValue = selectMethod === 'Points' ? initialPoints : initialBooks
  const goalMessage =
    selectMethod === 'Points'
      ? t('t8th203', { num: goalValue })
      : t('t8th204', { num: goalValue })
  const currentGoalValue = dailyGoal.data?.currentDailyGoal || 0
  const nextGoalValue =
    dailyGoalItems.find((item) => !item.isEarnAward)?.goalCount || 0
  const changeSettingHistory =
    settingHistory.data?.list.map((item) => ({
      method: item.settingType as 'Points' | 'Books',
      value: item.settingType === 'Books' ? item.settingBooks : item.aimPoint,
      date: item.settingDate,
    })) || []

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">{t('t8th201')}</div>
        <div className="btn-close" onClick={onClose} />
      </ModalHeaderStyle>
      <ModalBodyStyle viewCloud>
        <BoxStyle display="flex" flexDirection="column">
          {isLoading ? (
            <div style={{ height: '100dvh' }}></div>
          ) : (
            <>
              <BoxStyle
                display="flex"
                flexDirection="column"
                gap={10}
                alignItems="center"
                justifyContent="space-between"
                margin={'0 0 10px 0'}>
                <TextStyle
                  fontFamily="sans"
                  fontColor="secondary"
                  fontWeight="bold">
                  {t('t8th202')}
                </TextStyle>
                <BoxStyle
                  display="flex"
                  alignItems="center"
                  gap={5}
                  cursor="pointer"
                  onClick={toggleDailyGoalSetting}>
                  <TextStyle
                    fontFamily="sans"
                    fontColor="lightBlue"
                    fontWeight="bold">
                    {goalMessage}
                  </TextStyle>
                  <Image
                    src={
                      isDailyGoalSettingVisible
                        ? Assets.Icon.chevronDownBlue
                        : Assets.Icon.chevronRightBlue
                    }
                    alt=""
                    width={16}
                    height={16}
                  />
                </BoxStyle>
                {isDailyGoalSettingVisible && (
                  <DailyGoalSetting
                    initialMethod={selectMethod}
                    initialPoints={initialPoints}
                    initialBooks={initialBooks}
                    changeHistoryList={changeSettingHistory}
                    onChangeDailyGoal={onChangeDailyGoal}
                  />
                )}
                <Image
                  src={Assets.Icon.arrowDownGray}
                  alt=""
                  width={20}
                  height={20}
                />
              </BoxStyle>
              {dailyGoalItems.map((item, index) => (
                <div key={`daily_goal_item_${item.goalCount}`}>
                  <DailyGoalItem
                    isEarnAward={item.isEarnAward}
                    isCurrent={nextGoalValue === item.goalCount}
                    count={item.goalCount}
                    currentCount={currentGoalValue}
                    awardImgSrc={item.awardImgSrc}
                    date={item.date}
                  />
                  {index < dailyGoalItems.length - 1 && <StreakLine />}
                </div>
              ))}
            </>
          )}
        </BoxStyle>
      </ModalBodyStyle>
    </ModalContainer>
  )
}
