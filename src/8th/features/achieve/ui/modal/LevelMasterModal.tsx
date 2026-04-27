'use client'

import { Assets } from '@/8th/assets/asset-library'
import {
  useLevelMasters,
  useLevelPoints,
} from '@/8th/features/achieve/service/achieve-query'
import {
  useChangeStudyLearningLevel,
  useStudentDailyLearning,
} from '@/8th/features/student/service/learning-query'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { StreakLine } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import { openWindow } from '@/8th/shared/utils/open-window'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useRef, useState } from 'react'
import LevelMasterItem from '../component/LevelMasterItem'

// 레벨 데이터 타입 정의
export interface LevelData {
  level: string
  booksRead: number
  earnPoints: number
  totalPoints: number
  imgSrc: string
  isComplete: boolean
  certificationDate?: string
  certificationPath?: string
}

const LEVLE_IMAGE_MAP: Record<string, string> = {
  PK: Assets.LevelMaster.levelprek,
  KA: Assets.LevelMaster.levelka,
  KB: Assets.LevelMaster.levelkb,
  KC: Assets.LevelMaster.levelkc,
  '1A': Assets.LevelMaster.level1a,
  '1B': Assets.LevelMaster.level1b,
  '1C': Assets.LevelMaster.level1c,
  '2A': Assets.LevelMaster.level2a,
  '2B': Assets.LevelMaster.level2b,
  '2C': Assets.LevelMaster.level2c,
  '3A': Assets.LevelMaster.level3a,
  '3B': Assets.LevelMaster.level3b,
  '3C': Assets.LevelMaster.level3c,
  '4A': Assets.LevelMaster.level4a,
  '4B': Assets.LevelMaster.level4b,
  '4C': Assets.LevelMaster.level4c,
  '5A': Assets.LevelMaster.level5a,
  '5B': Assets.LevelMaster.level5b,
  '5C': Assets.LevelMaster.level5c,
  '6A': Assets.LevelMaster.level6a,
  '6B': Assets.LevelMaster.level6b,
  '6C': Assets.LevelMaster.level6c,
}

/**
 * 레벨마스터 모달
 */
export default function LevelMasterModal({
  onCloseModal,
}: {
  onCloseModal: () => void
}) {
  const maketingEventTracker = useTrack()
  useEffect(() => {
    maketingEventTracker.eventAction('레벨마스터 목록 화면 진입', {
      version: '8th',
    })
  }, [maketingEventTracker])

  const { setting } = useCustomerConfiguration()

  // @Language 'common'
  const { t } = useTranslation()

  const learning = useStudentDailyLearning()
  const levels = useLevelPoints()
  const levelmaster = useLevelMasters()
  const { mutate: changeStudyLevel } = useChangeStudyLearningLevel({
    onSettled: (data, error, variables) => {
      if (learning.data?.settingLevelName) {
        setCurrentLevel(learning.data?.settingLevelName || 'PK')
      }
    },
  })

  const isLoading =
    levels.isFetching || levelmaster.isFetching || learning.isFetching

  const [currentLevel, setCurrentLevel] = useState<string | undefined>(
    undefined,
  )
  const currentLevelRef = useRef<HTMLDivElement>(null)

  // 모달이 열릴 때 현재 레벨로 스크롤
  useEffect(() => {
    if (!isLoading && currentLevel && currentLevelRef.current) {
      const timer = setTimeout(() => {
        const currentElement = currentLevelRef.current
        if (currentElement) {
          currentElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [isLoading, currentLevel])

  useEffect(() => {
    if (!isLoading && learning.data) {
      const level = learning.data.settingLevelName || 'PK'
      setCurrentLevel(level)
    }
  }, [isLoading, learning.data])

  // 레벨 클릭 핸들러
  const handleLevelClick = (level: string) => {
    const confirmMessage = t('t8th197', { level })
    if (window.confirm(confirmMessage)) {
      const tmpLevel = currentLevel
      changeStudyLevel(level)
    }
  }

  // 외부에서 받은 데이터가 있으면 사용하고, 없으면 기본 데이터 사용
  const levelData: LevelData[] = []
  if (!isLoading) {
    levels.data?.list.forEach((level) => {
      const isComplete =
        levelmaster.data?.list.some(
          (master) => master.masterLevelName === level.levelName,
        ) || false
      const certificationPath = isComplete
        ? levelmaster.data?.list.find(
            (master) => master.masterLevelName === level.levelName,
          )?.certificationPath
        : undefined
      const certificationDate = isComplete
        ? levelmaster.data?.list.find(
            (master) => master.masterLevelName === level.levelName,
          )?.levelDate
        : undefined

      levelData.push({
        level: level.levelName,
        booksRead: level.books,
        earnPoints: level.myRgPoint,
        totalPoints: level.requiredRgPoint,
        imgSrc: LEVLE_IMAGE_MAP[level.levelName],
        isComplete,
        certificationDate,
        certificationPath,
      })
    })
  }

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">{t('t8th191')}</div>
        <div className="btn-close" onClick={onCloseModal} />
      </ModalHeaderStyle>
      <ModalBodyStyle viewCloud>
        {isLoading && <div style={{ height: '100dvh' }} />}
        {!isLoading &&
          currentLevel &&
          levelData.map((level, index) => (
            <div
              key={level.level}
              data-level={level.level}
              ref={currentLevel === level.level ? currentLevelRef : null}>
              {index > 0 && <StreakLine />}
              <LevelMasterItem
                level={level.level}
                booksRead={level.booksRead}
                earnPoints={level.earnPoints}
                totalPoints={level.totalPoints}
                imgSrc={level.imgSrc}
                isComplete={level.isComplete}
                isCurrentLevel={currentLevel}
                certificationDate={level.certificationDate}
                onClick={handleLevelClick}
                onClickCertification={
                  setting.printLevelCertificate && level.certificationPath
                    ? () => {
                        openWindow(
                          `${level.certificationPath}&args5=true&args6=N`,
                          {
                            external: true,
                            target: '_blank',
                            feature: 'noopener, noreferrer',
                          },
                        )
                      }
                    : undefined
                }
              />
            </div>
          ))}
      </ModalBodyStyle>
    </ModalContainer>
  )
}
