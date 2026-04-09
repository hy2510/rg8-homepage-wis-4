'use client'

import { LevelMasterCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import LevelMasterModal from '../modal/LevelMasterModal'

/**
 * 랭킹 카드(퍼포먼스)
 */

interface LevelMasterCardProps {
  level: string
  earnPoints: number
  levelMasterPoint: number
}

export default function LevelMasterCard({
  level,
  earnPoints,
  levelMasterPoint,
}: LevelMasterCardProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const [isLevelMasterModalOpen, setLevelMasterModalOpen] = useState(false)

  return (
    <LevelMasterCardStyle>
      <BoxStyle className="title-link">
        <span>{t('t8th191')}</span>
        {/* <Image
          src={Assets.Icon.arrowUpRightBlack}
          alt="arrow-up-right-black"
          width={14}
          height={14}
        /> */}
      </BoxStyle>
      <BoxStyle
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={5}
        padding="20px 10px"
        onClick={() => setLevelMasterModalOpen(true)}>
        <div className="level">{level}</div>
        <div className="earn-points">
          {earnPoints}/{levelMasterPoint}P
        </div>
      </BoxStyle>
      {isLevelMasterModalOpen && (
        <LevelMasterModal onCloseModal={() => setLevelMasterModalOpen(false)} />
      )}
    </LevelMasterCardStyle>
  )
}
