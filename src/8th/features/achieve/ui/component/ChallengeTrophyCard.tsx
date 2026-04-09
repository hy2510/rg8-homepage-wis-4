'use client'

import { Assets } from '@/8th/assets/asset-library'
import { ChallengeTrophyCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'
import ChallengeTrophyModal from '../modal/ChallengeTrophyModal'

/**
 * 영어독서왕 수상 이력(퍼포먼스)
 */
export default function ChallengeTrophyCard({
  trophy,
}: {
  trophy?: {
    title: string
    grade: number
    registDate: string
  }
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [isChallengeTrophyModalOpen, setChallengeTrophyModalOpen] =
    useState(false)

  let trophyImage = Assets.Challenge.best
  if (trophy?.grade === 1) {
    trophyImage = Assets.Challenge.best
  } else if (trophy?.grade === 2) {
    trophyImage = Assets.Challenge.excellence
  } else if (trophy?.grade === 3) {
    trophyImage = Assets.Challenge.grand
  } else if (trophy?.grade === 4) {
    trophyImage = Assets.Challenge.sincerity
  }

  return (
    <ChallengeTrophyCardStyle>
      <BoxStyle
        className="title-link"
        onClick={() => {
          if (trophy) {
            setChallengeTrophyModalOpen(true)
          }
        }}>
        <span>{t('t8th198')}</span>
      </BoxStyle>

      {trophy ? (
        <BoxStyle
          display="flex"
          alignItems="center"
          gap={5}
          padding="10px 0 0 0"
          onClick={() => {
            if (trophy) {
              setChallengeTrophyModalOpen(true)
            }
          }}>
          <Image
            className="challenge-trophy-image"
            src={trophyImage}
            alt="Award Challenge"
            width={72}
            height={72}
          />
          <BoxStyle
            display="flex"
            flexDirection="column"
            alignItems="flex-start">
            <TextStyle fontColor="lightBlue" fontFamily="sans" fontWeight={800}>
              {trophy.title}
            </TextStyle>
            <TextStyle
              fontSize="medium"
              fontColor="secondary"
              fontFamily="sans">
              {trophy.registDate}
            </TextStyle>
          </BoxStyle>
        </BoxStyle>
      ) : (
        <BoxStyle
          width="100%"
          height="80px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="challenge-award-name">
          {t('t8th199')}
        </BoxStyle>
      )}
      {isChallengeTrophyModalOpen && (
        <ChallengeTrophyModal
          onClickClose={() => setChallengeTrophyModalOpen(false)}
        />
      )}
    </ChallengeTrophyCardStyle>
  )
}
