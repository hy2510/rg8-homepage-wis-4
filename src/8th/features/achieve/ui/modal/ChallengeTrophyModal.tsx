'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useReadingKingTrophy } from '@/8th/features/achieve/service/achieve-query'
import { useStudent } from '@/8th/features/student/service/student-query'
import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, StreakLine, TextStyle } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import ChallengeAwardModal from './ChallengeAwardModal'

/**
 * 영어독서왕 수상 모달
 */

interface ChallengeTrophyProps {
  onClickClose: () => void
}

export default function ChallengeTrophyModal({
  onClickClose,
}: ChallengeTrophyProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const trophy = useReadingKingTrophy()
  const student = useStudent()
  const studentName = student.data?.student?.name || ''

  const [showChallengeAwardModal, setIsShowChallengeAwardModal] = useState<
    | {
        studentName: string
        registDate: string
        prizeTitle: string
        prizeGrade: number
      }
    | undefined
  >(undefined)

  if (trophy.isLoading) {
    return <div></div>
  }

  return (
    <>
      <ModalContainer>
        <ModalHeaderStyle>
          <div className="title">{t('t8th198')}</div>
          <div className="btn-close" onClick={onClickClose} />
        </ModalHeaderStyle>
        <ModalBodyStyle viewCloud>
          {trophy.data?.list.map((item, i) => {
            return (
              <Fragment
                key={`award-item-${item.prizeTitle}-${item.prizeGrade}`}>
                {i > 0 && <StreakLine />}
                <AwardItem
                  key={item.registDate}
                  awardName={item.prizeTitle}
                  awardDate={item.registDate}
                  grade={item.prizeGrade}
                  onItemClick={() => {
                    setIsShowChallengeAwardModal({
                      studentName: studentName,
                      registDate: item.registDate,
                      prizeTitle: item.prizeTitle,
                      prizeGrade: item.prizeGrade,
                    })
                  }}
                />
              </Fragment>
            )
          })}
        </ModalBodyStyle>
      </ModalContainer>
      {showChallengeAwardModal && (
        <ChallengeAwardModal
          awardName={showChallengeAwardModal.prizeTitle}
          awardDate={showChallengeAwardModal.registDate}
          studentName={showChallengeAwardModal.studentName}
          awardGrade={showChallengeAwardModal.prizeGrade}
          onClose={() => {
            setIsShowChallengeAwardModal(undefined)
          }}
        />
      )}
    </>
  )
}

function AwardItem({
  awardName,
  awardDate,
  grade,
  onItemClick,
}: {
  awardName: string
  awardDate: string
  grade: number
  onItemClick?: () => void
}) {
  const TROPHY_IMAGES = [
    Assets.Challenge.best, // 대상
    Assets.Challenge.grand, // 최우수
    Assets.Challenge.excellence, // 우수
    Assets.Challenge.sincerity, // 성실
  ]

  let trophyImage = Assets.Challenge.best
  if (grade === 1) {
    trophyImage = TROPHY_IMAGES[1 - 1]
  } else if (grade === 2) {
    trophyImage = TROPHY_IMAGES[2 - 1]
  } else if (grade === 3) {
    trophyImage = TROPHY_IMAGES[3 - 1]
  } else if (grade === 4) {
    trophyImage = TROPHY_IMAGES[4 - 1]
  }

  return (
    <BoxStyle
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={10}>
      <Image
        src={trophyImage}
        alt="Award Challenge"
        width={120}
        height={120}
        onClick={onItemClick}
        style={{ cursor: onItemClick ? 'pointer' : 'default' }}
      />
      <BoxStyle
        display="flex"
        flexDirection="column"
        alignItems="center"
        onClick={onItemClick}
        gap={3}>
        <TextStyle
          fontSize="medium"
          fontColor="primary"
          fontFamily="sans"
          fontWeight={800}>
          {awardName}
        </TextStyle>
        <TextStyle
          fontSize="medium"
          fontColor="secondary"
          fontFamily="sans"
          fontWeight={800}>
          {awardDate}
        </TextStyle>
      </BoxStyle>
    </BoxStyle>
  )
}
