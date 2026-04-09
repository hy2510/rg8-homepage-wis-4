'use client'

import { useAchieveSuccessiveStudy } from '@/7th/_client/store/achieve/successive-study/selector'
import { AlertBar, EmptyMessage } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useMemo } from 'react'
import { CONTINUOUS_SETTING } from '../MyRgModal'

const STYLE_ID = 'global_option_my_rg'

// 연속 학습 달성 어워드
export function StreakAward() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const awardStudy = useAchieveSuccessiveStudy().payload

  const awardStudyList = useMemo(() => {
    type AwardStudy = {
      day: number
      achievedDate: string
      certificationUrl?: string
    }
    const study: AwardStudy[] = []
    awardStudy.forEach((item) => {
      /* 연속학습 인증서 oz리포트 미구현
      if (item.straightDayCount % 100 === 0) {
        study.push({
          ...item,
          day: item.straightDayCount,
          achievedDate: item.achievedDate,
          certificationUrl: 'http://ozreport.a1edu.com/streak',
        })
      }
      */
      const awardGetDate = item.achievedDate
      const dateFormatted = `${awardGetDate.substring(0, 4)}. ${awardGetDate.substring(4, 6)}. ${awardGetDate.substring(6, 8)}`

      study.push({
        day: item.straightDayCount,
        achievedDate: dateFormatted,
      })
    })

    return study
  }, [awardStudy])

  return (
    <div className={style.streak_award}>
      <AlertBar>{t('t087')}</AlertBar>
      {!awardStudy || awardStudy.length <= 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.streak_award_list}>
          {awardStudyList
            .filter(
              (item) =>
                item.day > 0 &&
                item.day <= CONTINUOUS_SETTING.CONTINUOUS_MAX_DAY,
            )
            .map((award, i) => {
              let image = ''
              if (award.certificationUrl) {
                image = '/src/images/@award-streak/certification.svg'
              } else if (award.day <= CONTINUOUS_SETTING.CONTINUOUS_IMAGE_DAY) {
                image = `/src/images/@award-streak/badge_${award.day}days.svg`
              } else {
                const idx =
                  ((award.day - CONTINUOUS_SETTING.CONTINUOUS_IMAGE_DAY) /
                    CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP) %
                  3
                image = `/src/images/@award-streak/badge_max_${idx === 0 ? '3' : idx}.svg`
              }
              const text = t('t088', { num: award.day })
              return (
                <div key={`award-streak-${i}`}>
                  {award.certificationUrl ? (
                    <StreakAwardItem
                      awardImgSrc={image}
                      awardName={text}
                      awardGetDate={award.achievedDate}
                      onClick={() => {}}
                    />
                  ) : (
                    <StreakAwardItem
                      awardImgSrc={image}
                      awardName={text}
                      awardGetDate={award.achievedDate}
                    />
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

// 연속 학습 달성 어워드 > 어워드 아이템
function StreakAwardItem({
  awardImgSrc,
  awardName,
  awardGetDate,
  onClick,
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <>
      {onClick ? (
        <div className={style.streak_award_item} onClick={onClick}>
          <div className={style.row_a}>
            <div className={style.award_image}>
              <Image alt="" src={awardImgSrc} width={120} height={120} />
            </div>
            <div className={style.award_image_bg}></div>
          </div>
          <div className={style.row_b}>
            <div className={style.txt_l1}>{awardName}</div>
            <div className={style.txt_l2}>{awardGetDate}</div>
          </div>
        </div>
      ) : (
        <div className={style.streak_award_item}>
          <div className={style.row_a}>
            <div className={style.award_image}>
              <Image alt="" src={awardImgSrc} width={120} height={120} />
            </div>
            <div className={style.award_image_bg}></div>
          </div>
          <div className={style.row_b}>
            <div className={style.txt_l1}>{awardName}</div>
            <div className={style.txt_l2}>{awardGetDate}</div>
          </div>
        </div>
      )}
    </>
  )
}
