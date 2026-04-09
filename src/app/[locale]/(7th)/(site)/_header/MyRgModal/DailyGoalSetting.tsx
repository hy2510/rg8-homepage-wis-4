'use client'

import {
  useFetchSetStudentDailyLearning,
  useOnLoadStudentDailyLearningHistory,
} from '@/7th/_client/store/student/daily-learning/hook'
import { useStudentDailyLearning } from '@/7th/_client/store/student/daily-learning/selector'
import { Button } from '@/7th/_ui/common/common-components'
import { useStyle, useThemeMode } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'

const STYLE_ID = 'global_option_my_rg'

// 일일 목표 설정
export function DailyGoalSetting() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const studyLearning = useStudentDailyLearning().payload
  const defaultSettingType =
    studyLearning.settingType === 'Books' ? 'book' : 'point'
  const defaultSettingValue =
    defaultSettingType === 'book' ? studyLearning.books : studyLearning.point

  const { loading: isChangeLoading, fetch: fetchChangeDailyLearning } =
    useFetchSetStudentDailyLearning()

  const [type, setType] = useState<'book' | 'point'>(defaultSettingType)
  const [settingValue, setSettingValue] = useState(defaultSettingValue || 1)

  const isSettingChanged = !(
    defaultSettingType === type && defaultSettingValue === settingValue
  )

  const { loading } = useOnLoadStudentDailyLearningHistory()
  const historyList = useStudentDailyLearning().history

  const onChangeSettingType = (type: 'point' | 'book') => {
    setType(type)
    if (type === 'point') {
      setSettingValue(Math.max(1, studyLearning.point))
    } else {
      setSettingValue(Math.max(1, studyLearning.books))
    }
  }

  const onUpdateSetting = () => {
    if (!isChangeLoading) {
      const level = studyLearning.settingLevelName
      const settingType = type === 'book' ? 'Books' : 'Points'
      fetchChangeDailyLearning(level, settingType, settingValue)
    }
  }

  const isDarkMode = useThemeMode() === 'dark'
  const plusIconPath = isDarkMode
    ? '/src/images/@daily-goal-setting/plus_white.svg'
    : '/src/images/@daily-goal-setting/plus.svg'
  const minusIconPath = isDarkMode
    ? '/src/images/@daily-goal-setting/minus_white.svg'
    : '/src/images/@daily-goal-setting/minus.svg'

  return (
    <div className={style.daily_goal_setting}>
      <div className={style.row_a}>
        <div className={style.txt_h}>{t('t091')}</div>
        <div className={style.row_a_container}>
          <div
            className={`${style.point} ${type === 'point' && style.active}`}
            onClick={() => {
              onChangeSettingType('point')
            }}>
            <div className={style.icon}>
              <Image
                alt=""
                src="/src/images/@daily-goal-setting/earn_point.svg"
                width={90}
                height={90}
              />
            </div>
            <div className={style.text_l}>{t('t092')}</div>
          </div>
          <div
            className={`${style.passed} ${type === 'book' && style.active}`}
            onClick={() => {
              onChangeSettingType('book')
            }}>
            <div className="icon">
              <Image
                alt=""
                src="/src/images/@daily-goal-setting/passed.svg"
                width={90}
                height={90}
              />
            </div>
            <div className={style.text_l}>{t('t093')}</div>
          </div>
        </div>
      </div>
      <div className={style.row_b}>
        <div className={style.txt_h}>{t('t094')}</div>
        <div className={style.row_b_container}>
          <div className={style.counter}>
            <div
              className={style.minus_button}
              onClick={() => {
                const newValue = Math.ceil(settingValue - 1)
                setSettingValue(Math.max(newValue, 1))
              }}>
              <Image alt="" src={minusIconPath} width={36} height={36} />
            </div>

            <div className={style.number}>
              {' '}
              {type === 'book'
                ? t('t095', { num: settingValue })
                : t('t096', { num: settingValue })}
            </div>
            <div
              className={style.plus_button}
              onClick={() => {
                const newValue = Math.ceil(settingValue + 1)
                setSettingValue(Math.min(newValue, 150))
              }}>
              <Image alt="" src={plusIconPath} width={36} height={36} />
            </div>
          </div>
          <div className={style.save_button}>
            {isSettingChanged ? (
              <Button
                shadow
                color={isChangeLoading ? 'gray' : 'blue'}
                width="100%"
                onClick={() => onUpdateSetting()}>
                {t('t097')}
              </Button>
            ) : (
              <Button color={'gray'} width="100%">
                <span className={style.txt_l}>{t('t098')}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={style.row_c}>
        <div className={style.txt_h}>{t('t099')}</div>
        <div className={style.row_c_container}>
          {!loading &&
            historyList.map((history, idx) => {
              return (
                <div key={`setting_history_${history.iDX}-${idx}`}>
                  <DailyGoalSetHistoryItem
                    date={history.settingDate}
                    type={history.settingType}
                    point={history.aimPoint}
                    book={history.settingBooks}
                  />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

// 일일 목표 설정 > 목표 설정 히스토리 아이템
function DailyGoalSetHistoryItem({
  date,
  type,
  point,
  book,
}: {
  date: string
  type: string
  point: number
  book: number
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.daily_goal_set_history_item}>
      <div className={style.set_date}>{date}</div>
      <div className={style.comment}>
        {type === 'Books' ? t('t093') : t('t092')}
      </div>
      <div className={style.set_goal}>
        {type === 'Books' ? t('t023', { num: book }) : `${point}P`}
      </div>
    </div>
  )
}
