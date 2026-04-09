import { LevelMasterItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * 레벨마스터 뱃지
 */

interface LevelMasterItemProps {
  isComplete: boolean
  level: string
  booksRead: number
  earnPoints: number
  totalPoints: number
  imgSrc: string
  isCurrentLevel: string
  onClick?: (level: string) => void
  onClickCertification?: () => void
}

export default function LevelMasterItem({
  isComplete,
  level,
  booksRead,
  earnPoints,
  totalPoints,
  imgSrc,
  isCurrentLevel,
  onClick,
  onClickCertification,
}: LevelMasterItemProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const [isCurrent, setIsCurrent] = useState(level === isCurrentLevel)

  // isCurrentLevel이 변경되면 isCurrent 상태도 업데이트
  useEffect(() => {
    setIsCurrent(level === isCurrentLevel)
  }, [level, isCurrentLevel])

  const handleClick = () => {
    if (onClick) {
      onClick(level)
    }
  }

  const isCertificationAvailable = isComplete && !!onClickCertification

  return (
    <LevelMasterItemStyle>
      {isComplete && (
        <BoxStyle
          className={`level-master-item-container ${isCurrent ? 'current' : ''} complete`}
          onClick={handleClick}>
          <Image src={imgSrc} alt="Award Challenge" width={100} height={100} />
          <BoxStyle className={`check-mark ${isCurrent ? 'current' : ''}`} />
        </BoxStyle>
      )}
      {!isComplete && (
        <BoxStyle
          className={`level-master-item-container ${isCurrent ? 'current' : ''}`}
          onClick={handleClick}>
          <TextStyle className={`level ${isCurrent ? 'current' : ''}`}>
            {level}
          </TextStyle>
          <BoxStyle className={`check-mark ${isCurrent ? 'current' : ''}`} />
          {isCurrent && (
            <div className="progress">
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${Math.min(100, (earnPoints / totalPoints) * 100)}%`,
                  }}></div>
              </div>
            </div>
          )}
        </BoxStyle>
      )}
      <BoxStyle
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}>
        <TextStyle className="books-read">
          {isComplete ? `[${t('t8th193')}] ` : ''}
          {t('t8th194', { num: booksRead })}
        </TextStyle>
        <TextStyle className="earn-points">
          {t('t8th195', { num1: earnPoints, num2: totalPoints })}
        </TextStyle>
        {isCertificationAvailable && (
          <TextStyle className="complete-text" onClick={onClickCertification}>
            {t('t8th196')}
          </TextStyle>
        )}
      </BoxStyle>
    </LevelMasterItemStyle>
  )
}
