'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useIsTabletSmall } from '@/8th/shared/context/ScreenModeContext'
import { ChallengeAwardBgOverlayStyle } from '@/8th/shared/styled/SharedStyled'
import ModalPortal from '@/8th/shared/ui/ModalPortal'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function ChallengeAwardModal({
  studentName,
  awardName,
  awardDate,
  awardGrade,
  onClose,
}: {
  studentName: string
  awardName: string
  awardDate: string
  awardGrade: number
  onClose?: () => void
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isShowCloseButton, setShowCloseButton] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    const onMediaEnded = () => {
      if (audio) {
        audio.currentTime = 0
        setShowCloseButton(true)
      }
    }
    if (audio) {
      audio.addEventListener('ended', onMediaEnded)
      audio.currentTime = 0
      audio.play()
    }
    return () => {
      if (audio) {
        audio.removeEventListener('ended', onMediaEnded)
        audio.pause()
      }
    }
  }, [])

  const TROPHY_IMAGES = [
    Assets.Challenge.best, // 대상
    Assets.Challenge.grand, // 최우수
    Assets.Challenge.excellence, // 우수
    Assets.Challenge.sincerity, // 성실
  ]
  const awardImgSrc =
    awardGrade > 0 && awardGrade <= TROPHY_IMAGES.length
      ? TROPHY_IMAGES[awardGrade - 1]
      : TROPHY_IMAGES[TROPHY_IMAGES.length - 1]

  const isMobile = useIsTabletSmall('smaller')

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/src/8th/sounds/award-challenge.mp3" type="audio/mpeg" />
      </audio>
      <ModalPortal>
        <ChallengeAwardBgOverlayStyle isMobile={isMobile}>
          <div className="container">
            {/* Rotating Background */}
            <div className="bg-overlay" />
            {/* Content Container */}
            <div className="content-wrapper">
              {/* Confetti */}
              <div className="confetti" />
              {/* Award Image */}
              <div
                style={{ cursor: onClose ? 'pointer' : 'default' }}
                onClick={onClose}>
                <Image
                  className="award-image"
                  src={awardImgSrc}
                  alt="Award"
                  width={350}
                  height={350}
                />
              </div>
              {/* Award Info */}
              {/* <div style={{ textAlign: 'center', color: '#ffffff' }}> */}
              <div className="content-info">
                <div className="content-info-title">
                  {'리딩게이트 영어독서왕 선발대회'}
                </div>
                <div className="content-info-award-name">{awardName}</div>
                <div className="content-info-name">{studentName}</div>
                <div className="content-info-date">{awardDate}</div>
              </div>
              {/* Close Button */}
              {isShowCloseButton && (
                <button className="close-button" onClick={onClose}>
                  <Image
                    src={Assets.Icon.deleteWhite}
                    alt="Close"
                    width={24}
                    height={24}
                  />
                </button>
              )}
            </div>
          </div>
        </ChallengeAwardBgOverlayStyle>
      </ModalPortal>
    </>
  )
}
