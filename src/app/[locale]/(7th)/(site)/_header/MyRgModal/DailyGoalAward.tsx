'use client'

import { useAchieveSuccessiveDailyGoal } from '@/7th/_client/store/achieve/successive-daily-goal/selector'
import { AlertBar, EmptyMessage } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'

const STYLE_ID = 'global_option_my_rg'

/** 일일 목표 완료 아이템은 최대 1050회 까지만 획득 가능 */
const DAILY_SUCCESS_MAX_STUDY = 1050

// 일일 목표 달성 어워드
export function DailyGoalAward() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const awardGoal = useAchieveSuccessiveDailyGoal().payload

  return (
    <div className={style.daily_goal_award}>
      <AlertBar>{t('t084')}</AlertBar>
      {!awardGoal || awardGoal.length <= 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.daily_goal_award_list}>
          {awardGoal
            .filter(
              (award) =>
                award.achievedCount > 0 &&
                award.achievedCount <= DAILY_SUCCESS_MAX_STUDY,
            )
            .map((award, i) => {
              const image = `/src/images/@award-daily-goal/badge_${award.achievedCount}d.svg`
              const text = t('t086', { num: award.achievedCount })
              return (
                <div key={`goal_award_${i}`}>
                  <DailyGoalAwardItem
                    awardImgSrc={image}
                    awardName={text}
                    awardGetDate={award.achievedDate}
                  />
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

// 목표 달성 어워드 > 어워드 아이템
function DailyGoalAwardItem({
  awardImgSrc,
  awardName,
  awardGetDate,
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
}) {
  const style = useStyle(STYLE_ID)

  const dateFormatted = `${awardGetDate.substring(0, 4)}. ${awardGetDate.substring(4, 6)}. ${awardGetDate.substring(6, 8)}`
  return (
    <div className={style.award_daily_goal_item}>
      <div className={style.row_a}>
        <div className={style.award_image}>
          <Image alt="" src={awardImgSrc} width={120} height={120} />
        </div>
        <div className={style.award_image_bg}></div>
      </div>
      <div className={style.row_b}>
        <div className={style.txt_l1}>{awardName}</div>
        <div className={style.txt_l2}>{dateFormatted}</div>
      </div>
    </div>
  )
}
