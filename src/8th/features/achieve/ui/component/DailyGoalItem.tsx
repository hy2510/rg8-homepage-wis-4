import { DailyGoalItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'

/**
 * 일일목표달성 뱃지
 */

interface DailyGoalItemProps {
  isEarnAward: boolean
  isCurrent: boolean
  count: number
  currentCount?: number
  date?: string
  awardImgSrc?: string
}

export default function DailyGoalItem({
  isEarnAward,
  isCurrent,
  count,
  currentCount,
  date,
  awardImgSrc,
}: DailyGoalItemProps) {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <DailyGoalItemStyle>
      {isEarnAward ? (
        <BoxStyle className="daily-goal-item get-award">
          <Image
            src={awardImgSrc!}
            alt="Daily Goal Award"
            width={120}
            height={120}
            className="daily-goal-image"
          />
          <BoxStyle display="flex" flexDirection="column" alignItems="center">
            <TextStyle className="daily-goal-text">
              {`${t('t8th222', { num: count })}`}
            </TextStyle>
            <TextStyle className="daily-goal-text">+{date}</TextStyle>
          </BoxStyle>
        </BoxStyle>
      ) : (
        <BoxStyle
          className={`daily-goal-item ${isCurrent ? 'current-box' : ''}`}>
          <BoxStyle
            position="absolute"
            top={'50%'}
            left={'50%'}
            transform="translate(-50%, -50%)">
            <TextStyle
              className={`daily-goal-text ${isCurrent ? 'current' : ''}`}>
              {isCurrent && (currentCount || 0) > 0
                ? `${t('t8th223', { txt: `${currentCount}/${count}` })}`.replace(
                    '&#x2F;',
                    '/',
                  )
                : `${t('t8th224', { num: count })}`}
            </TextStyle>
          </BoxStyle>
        </BoxStyle>
      )}
    </DailyGoalItemStyle>
  )
}
