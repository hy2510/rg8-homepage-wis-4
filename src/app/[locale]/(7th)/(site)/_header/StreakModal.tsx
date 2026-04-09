'use client'

import { useOnLoadSuccessiveStudy } from '@/7th/_client/store/achieve/successive-study/hook'
import { useAchieveSuccessiveStudy } from '@/7th/_client/store/achieve/successive-study/selector'
import { useStudentContinuousStudyNewType } from '@/7th/_client/store/student/continuous-study/selector'
import {
  AlertBar,
  EmptyMessage,
  Modal,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { CONTINUOUS_SETTING } from './MyRgModal'

const STYLE_ID = 'global_option_streak'

// 연속학습 모달
export function StreakModal({ onCloseModal }: { onCloseModal?: () => void }) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const { loading } = useOnLoadSuccessiveStudy()
  const successiveStudyList = useAchieveSuccessiveStudy().payload
  const continuousDay = useStudentContinuousStudyNewType().continuous

  // 체크포인트
  const CheckPoint = ({
    imgSrc,
    score,
    date,
  }: {
    imgSrc: string
    score: number
    date: string
  }) => {
    return (
      <div className={style.check_point}>
        <div className={style.check_mark}>
          <div className={style.line}></div>
          <Image
            alt=""
            src="/src/images/@streak-modal/check_mark.svg"
            width={30}
            height={30}
          />
          <div className={style.line}></div>
        </div>
        <div className={style.label_image}>
          <Image alt="" src={imgSrc} width={110} height={110} />
        </div>
        <div className={style.check_message}>
          <div className={style.txt_l}>{t('t447', { num: score })}</div>
          <div className={style.date}>{date}</div>
        </div>
      </div>
    )
  }

  const nextItemDay =
    Math.floor(continuousDay / CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP) *
      CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP +
    CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP
  const remainingText =
    continuousDay >= CONTINUOUS_SETTING.CONTINUOUS_MAX_DAY
      ? `${t('t559', { num: continuousDay })}` // ${continuousDay}일 달성하였습니다!
      : `${t('t561', { num1: nextItemDay, num2: CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP - (continuousDay % CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP) })}` // ${nextItemDay}일 달성까지 ${CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP - (continuousDay % CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP)}일 남았어요!

  // 연속학습 어워드 카운터
  const useTotalStreakCounter = () => {
    let num

    if (continuousDay >= 1 && continuousDay <= 20) {
      num = continuousDay
    } else if (continuousDay % 100 === 0) {
      num = continuousDay
    } else {
      num = continuousDay % 20
    }

    const isStreak = continuousDay !== 0
    const streakStatus =
      num.toString().slice(-1) !== '0' ||
      (Number(num) % 10 === 0 && Number(num) % 20 !== 0)
        ? '+' + num.toString()
        : continuousDay
    const getAward = continuousDay >= 20 && continuousDay % 20 === 0

    return { isStreak, streakStatus, getAward }
  }

  const totalStreakCounter = useTotalStreakCounter()

  // 마지막 어워드 학습일수
  const lastStraightDayCount =
    successiveStudyList && successiveStudyList.length > 0
      ? successiveStudyList[successiveStudyList.length - 1].straightDayCount
      : 0

  // 마지막 어워드를 획득한 날짜
  const lastAchievedDate =
    successiveStudyList && successiveStudyList.length > 0
      ? successiveStudyList[successiveStudyList.length - 1].achievedDate
      : 0

  // 오늘 날짜
  const todays = new Date()
  const year = todays.getFullYear()
  const month = String(todays.getMonth() + 1).padStart(2, '0')
  const day = String(todays.getDate()).padStart(2, '0')

  const formattedDate = `${year}${month}${day}`

  return (
    <Modal
      compact
      header
      // title={t('t171')}
      title={t('t039')}
      onClickDelete={onCloseModal}
      onClickLightbox={onCloseModal}>
      <div className={style.streak_modal}>
        {!loading && (
          <>
            <div className={style.streak_modal_body}>
              <div className="mg-bottom-m">
                {/* <AlertBar>{t('t172')}</AlertBar> */}
                {/* 연속 학습은 20일간 매일 1권 이상 학습 시 어워드와 함께 누적되며, 실패 시 마지막 어워드의 날 수 부터 다시 시작할 수 있어요. */}
                <AlertBar>{t('t564')}</AlertBar>
              </div>
              {/* 연속학습 달성 기록이 있을 때 */}
              {successiveStudyList && successiveStudyList.length > 0 ? (
                <>
                  <div className={style.advance_notice}>
                    <div className={style.txt_p}>{remainingText}</div>
                  </div>
                  {successiveStudyList
                    .filter(
                      (item) =>
                        item.straightDayCount >=
                          CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP &&
                        item.straightDayCount <=
                          Math.min(
                            continuousDay,
                            CONTINUOUS_SETTING.CONTINUOUS_MAX_DAY,
                          ),
                    )
                    .reverse()
                    .map((item) => {
                      const day = item.straightDayCount
                      const date = item.achievedDate
                      const dateString = `${date.substring(0, 4)}. ${date.substring(4, 6)}. ${date.substring(6, 8)}`
                      let src = ''
                      if (day <= CONTINUOUS_SETTING.CONTINUOUS_IMAGE_DAY) {
                        src = `/src/images/@award-streak/badge_${day}days.svg`
                      } else {
                        const idx =
                          ((day - CONTINUOUS_SETTING.CONTINUOUS_IMAGE_DAY) /
                            CONTINUOUS_SETTING.CONTINUOUS_DAY_STEP) %
                          3
                        src = `/src/images/@award-streak/badge_max_${idx === 0 ? 3 : idx}.svg`
                      }
                      return (
                        <CheckPoint
                          key={`successive-study-${day}`}
                          score={day}
                          date={dateString}
                          imgSrc={src}
                        />
                      )
                    })}
                  {/* {continuousDay >= 20 && (
                    <div className={style.start_point}>
                      <div className={style.txt_p}>{t('t498')}!</div>
                    </div>
                  )} */}
                </>
              ) : (
                <>
                  {/* 연속학습 달성 기록이 없을 때 */}
                  <EmptyMessage isAward>
                    {t('t085')}
                    <br />
                    {t('t173')}
                  </EmptyMessage>
                </>
              )}
            </div>
            <div className={style.streak_modal_bottom}>
              {/* 연속학습일이 0이거나, 마지막 날짜(예: 9/7)의 어워드 학습일수와 다른 날짜(예:9/8)의 연속 학습일수가 같을 때는 하단 바를 안보여줌 */}
              {continuousDay === 0 ||
              (lastAchievedDate != formattedDate &&
                lastStraightDayCount == continuousDay) ? (
                <></>
              ) : totalStreakCounter.getAward ? (
                <>
                  <div className={style.streak_status}>
                    <div className={style.txt_l}>
                      {/* WOW! 연속 학습 */}
                      <span>{t('t565')}</span>
                    </div>
                    <div className={`${style.score} ${style.active} heartbeat`}>
                      <span>{Number(totalStreakCounter.streakStatus)}</span>
                    </div>
                    <div className={style.txt_l}>
                      {/* 일 달성! */}
                      <span>{t('t566')}</span>
                    </div>
                  </div>
                </>
              ) : continuousDay < 20 ? (
                <>
                  <div className={style.streak_status}>
                    <div className={style.txt_l}>
                      {/* 연속 학습 어워드 획득까지 */}
                      <span>{t('t567')}</span>
                    </div>
                    <div className={`${style.score}`}>
                      <span style={{ fontSize: '1.15em' }}>
                        D-{20 - (Number(totalStreakCounter.streakStatus) % 20)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={style.streak_status}>
                    <div className={style.txt_l}>
                      {/* 누적 연속 학습 */}
                      <span>{t('t568')}</span>
                    </div>
                    <div className={`${style.score} ${style.active}`}>
                      <span style={{ fontSize: '1.15em' }}>
                        <b>{continuousDay}</b>
                      </span>
                    </div>
                    <div className={style.txt_l}>
                      {/* 일 */}
                      <span>{t('t569')}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
