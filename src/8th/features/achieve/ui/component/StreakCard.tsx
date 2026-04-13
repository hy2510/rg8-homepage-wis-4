import { Assets } from '@/8th/assets/asset-library'
import {
  StreakCardStyle,
  StreakStatusStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import {
  AwardBgStyle,
  AwardImageStyle,
  CommonTitleStyle,
  WidgetBoxStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import StreakModal from '../modal/StreakModal'

const MAX_STREAK_DAY = 300
const STREAK_DAY_STEP = 20

type StreakStatus = 'zero' | 'progress' | 'award'

/**
 * 연속학습 카드 컴포넌트
 * @param titleOpensModal false면 제목 클릭 시 모달 미표시(6th 연속 표기 등 레거시 전용)
 */
export default function StreakCard({
  isTodayStudy,
  streakDay,
  titleOpensModal = true,
}: {
  isTodayStudy: boolean
  streakDay: number
  titleOpensModal?: boolean
}) {
  //@language 'common'
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const awardDay =
    Math.floor(streakDay / STREAK_DAY_STEP) * STREAK_DAY_STEP + STREAK_DAY_STEP
  let streakStatus: StreakStatus = 'zero'

  if (isTodayStudy && streakDay > 0 && streakDay % STREAK_DAY_STEP === 0) {
    streakStatus = 'award'
  } else if (streakDay > 0) {
    streakStatus = 'progress'
  } else {
    streakStatus = 'zero'
  }

  return (
    <>
      <WidgetBoxStyle height="168px" getAward={streakStatus === 'award'}>
        <StreakCardStyle>
          <CommonTitleStyle
            noLink={!titleOpensModal}
            onClick={
              titleOpensModal ? () => setIsModalOpen(true) : undefined
            }
            getAward={awardDay === streakDay}>
            {t('t8th253')}
          </CommonTitleStyle>
          {streakStatus === 'zero' && <StreakStatusReady />}
          {streakStatus === 'progress' && (
            <StreakStatusProgress
              streakDay={streakDay}
              isTodayStudy={isTodayStudy}
            />
          )}
          {streakStatus === 'award' && (
            <StreakStatusAward awardDay={streakDay} />
          )}
        </StreakCardStyle>
        {streakStatus === 'award' && (
          <>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={`petal${i + 3}`} className={`petal${i + 3}`} />
            ))}
          </>
        )}
      </WidgetBoxStyle>
      {titleOpensModal && isModalOpen && (
        <StreakModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

function StreakStatusAward({ awardDay }: { awardDay: number }) {
  // @language 'common'
  const { t } = useTranslation()

  const awardImage = useMemo(() => {
    if (awardDay > MAX_STREAK_DAY) {
      const imageKey = [
        'streakMax1',
        'streakMax2',
        'streakMax3',
        'streakMax4',
        'streakMax5',
      ]
      const imageIndex =
        ((awardDay - MAX_STREAK_DAY) / STREAK_DAY_STEP - 1 + imageKey.length) %
        imageKey.length
      return Assets.Icon.Streak[
        imageKey[imageIndex] as keyof typeof Assets.Icon.Streak
      ]
    } else {
      return Assets.Icon.Streak[
        `streak${awardDay}Days` as keyof typeof Assets.Icon.Streak
      ]
    }
  }, [awardDay])

  return (
    <StreakStatusStyle>
      <BoxStyle
        width="100%"
        display="grid"
        gridTemplateColumns="1fr 100px"
        alignItems="center"
        gap={5}>
        <TextStyle
          fontFamily="sans"
          fontColor="#fff"
          fontWeight="bold"
          fontSize="large"
          padding="0 0 0 5px">
          {t('t8th256', { num: awardDay })}
        </TextStyle>
        <BoxStyle position="relative" width="100px" height="100px">
          <AwardImageStyle>
            <Image src={awardImage} alt="Streak Award" width={80} height={80} />
          </AwardImageStyle>
          <AwardBgStyle />
        </BoxStyle>
      </BoxStyle>
    </StreakStatusStyle>
  )
}

function StreakStatusReady() {
  // @language 'common'
  const { t } = useTranslation()

  return (
    <StreakStatusStyle>
      <div className="streak-status-ready">
        <Image
          src={Assets.Icon.Side.streakGone}
          alt=""
          width={50}
          height={50}
          className="streak-status-ready-icon"
        />
        <div className="streak-progress-text">{t('t8th257')}</div>
      </div>
    </StreakStatusStyle>
  )
}

function StreakStatusProgress({
  streakDay,
  isTodayStudy,
}: {
  streakDay: number
  isTodayStudy: boolean
}) {
  // @language 'common'
  const { t } = useTranslation()

  const streakIconSrc = isTodayStudy
    ? Assets.Icon.Side.streakDone
    : Assets.Icon.Side.streakReadyPending

  return (
    <StreakStatusStyle className="streak-status-centered">
      <Image src={streakIconSrc} alt="" width={50} height={50} />
      <div
        className={`streak-progress-text streak-progress-text--days ${isTodayStudy ? 'active' : ''}`}>
        {t('t8th258', { num: streakDay })}
      </div>
    </StreakStatusStyle>
  )
}
