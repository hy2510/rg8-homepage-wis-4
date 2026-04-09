'use client'

import { useAchieveReadingKingTrophy } from '@/7th/_client/store/achieve/readingking-trophy/selector'
import { useStudentInfo } from '@/7th/_client/store/student/info/selector'
import { AlertBar, EmptyMessage } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'

const STYLE_ID = 'global_option_my_rg'

// 챌린지(영어 독서왕 시상) 어워드
export function ChallengeAward() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { name: studentName } = useStudentInfo()

  const [selectedAward, setSelectedAward] = useState<
    | {
        awardName: string
        awardGetDate: string
        awardImgSrc: string
      }
    | undefined
  >(undefined)

  const TROPHY_IMAGES = [
    '/src/images/@award-challenge/award_daesang.svg',
    '/src/images/@award-challenge/award_choiwoosu.svg',
    '/src/images/@award-challenge/award_woosu.svg',
    '/src/images/@award-challenge/award_sungsil.svg',
  ]

  const awardReadingKing = useAchieveReadingKingTrophy().payload

  const [isShowCloseButton, setIsShowCloseButton] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const showOverlayRef = useRef(false)
  const onCloseAwardOverlay = () => {
    showOverlayRef.current = false
    setSelectedAward(undefined)
    setIsShowCloseButton(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.removeEventListener('ended', onShowCloseButton)
    }
  }
  const onShowCloseButton = useCallback(() => {
    setIsShowCloseButton(true)
  }, [])

  return (
    <div className={style.challenge_award}>
      <AlertBar>{t('t089')}</AlertBar>
      {!awardReadingKing || awardReadingKing.length <= 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <>
          {/* 오디오 요소 추가 */}
          <audio ref={audioRef} preload="auto">
            <source src="/src/sounds/award-challenge.mp3" type="audio/mpeg" />
          </audio>

          <div className={style.challenge_award_list}>
            {awardReadingKing.map((award, idx) => {
              return (
                <div key={`award_readingking_${idx}`}>
                  <ChallengeAwardItem
                    awardImgSrc={TROPHY_IMAGES[award.prizeGrade - 1]}
                    awardName={award.prizeTitle}
                    awardGetDate={award.registDate}
                    onImageClick={() => {
                      showOverlayRef.current = true
                      setIsShowCloseButton(false)
                      setSelectedAward({
                        awardName: award.prizeTitle,
                        awardGetDate: award.registDate,
                        awardImgSrc: TROPHY_IMAGES[award.prizeGrade - 1],
                      })
                      if (audioRef.current) {
                        audioRef.current.currentTime = 0
                        audioRef.current.play()
                        audioRef.current.addEventListener(
                          'ended',
                          onShowCloseButton,
                        )
                      }
                    }}
                  />
                </div>
              )
            })}
            {selectedAward && (
              <div className={style.challenge_award_bg_overlay}>
                <div className={style.overlay_image_container}>
                  <div className={style.confetti}></div>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={onCloseAwardOverlay}>
                    <Image
                      src={selectedAward.awardImgSrc}
                      alt="Award"
                      width={350}
                      height={350}
                      className={`${style.overlay_image} animate__animated animate__fadeInUp`}
                    />
                  </div>
                  <div className={style.overlay_award_info}>
                    <div>{t('t930')}</div>
                    <div className={style.overlay_award_name}>
                      {selectedAward.awardName}
                    </div>
                    <div className={style.overlay_user_name}>{studentName}</div>
                    <div className={style.overlay_award_date}>
                      {selectedAward.awardGetDate}
                    </div>
                  </div>
                  {isShowCloseButton && (
                    <button
                      className={style.close_button}
                      onClick={onCloseAwardOverlay}>
                      <Image
                        src="/src/images/delete-icons/x_white.svg"
                        alt="Close"
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// 챌린지(영어 독서왕 시상) 어워드 > 어워드 아이템
function ChallengeAwardItem({
  awardImgSrc,
  awardName,
  awardGetDate,
  onImageClick,
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
  onImageClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.challenge_award_item} onClick={onImageClick}>
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
  )
}
