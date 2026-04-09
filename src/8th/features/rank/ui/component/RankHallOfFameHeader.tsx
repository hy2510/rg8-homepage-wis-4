'use client'

import HallOfFameInfoModal from '@/8th/features/achieve/ui/modal/HallOfFameInfoModal'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'

/**
 * 명예의전당 헤더
 */
export default function RankHallOfFameHeader() {
  // @Language 'common'
  const { t } = useTranslation()

  const [isHallOfFameInfoModalOpen, setIsHallOfFameInfoModalOpen] =
    useState(false)

  return (
    <>
      <BoxStyle
        display="flex"
        flexDirection="column"
        gap={5}
        padding="0 0 0 10px">
        <TextStyle
          fontColor="secondary"
          fontFamily="sans"
          fontSize="small"
          fontWeight={500}>
          {t('t8th244')}
        </TextStyle>
        <TextStyle
          fontColor="lightBlue"
          fontFamily="sans"
          fontSize="small"
          fontWeight={500}
          onClick={() => setIsHallOfFameInfoModalOpen(true)}>
          {t('t8th245')}
        </TextStyle>
      </BoxStyle>
      {isHallOfFameInfoModalOpen && (
        <HallOfFameInfoModal
          onCloseModal={() => setIsHallOfFameInfoModalOpen(false)}
        />
      )}
    </>
  )
}
