'use client'

import { AlertBar } from '@/7th/_ui/common/common-components'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'

const STYLE_ID = 'challenge_board'

// 영어독서왕 스코어보드
export function ChallengeBoardStartInform({
  startDate,
  endDate,
  onClickSetting,
}: {
  startDate: string
  endDate: string
  onClickSetting?: () => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const todayObj = new Date()
  const startDateObj = DateUtils.createDate(startDate)
  const endDateObj = DateUtils.createDate(endDate)

  const todayChallengeDoingValue = DateUtils.rangeDayCheck(
    startDateObj,
    endDateObj,
    todayObj,
  )
  const isTodayChallengeDoing =
    todayChallengeDoingValue !== -2 && todayChallengeDoingValue !== 2
  const challengeMessage = t('t829') // 영어독서왕 선발대회가 시작되었습니다! 참여를 원하시면 학습설정에서 ‘챌린지 참여 현황 보기’를 선택해 주세요.

  return (
    <>
      {isTodayChallengeDoing && (
        <>
          <AlertBar>
            <span>
              {challengeMessage}
              <strong>
                <span
                  style={{
                    marginLeft: '8px',
                    color: 'var(--red)',
                    cursor: 'pointer',
                  }}
                  onClick={onClickSetting}>
                  {/* 바로가기 */}
                  {t('t830')}
                </span>
              </strong>
            </span>
          </AlertBar>
        </>
      )}
    </>
  )
}
