import { Assets } from '@/8th/assets/asset-library'
import {
  DailyRGNavBarStyle,
  DailyRGSubTextStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import DropdownMenu from '@/8th/shared/ui/Dropdowns'
import { Gap } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'

export default function DailyRGLevelTitle({
  currentLevel,
  onLevelChange,
  currentStageId,
  stages,
  onStageChange,
}: {
  currentLevel: string
  onLevelChange?: (level: string) => void
  currentStageId: string
  stages: {
    stageId: string
    levelKey: string
    stageName: string
    subText: string
    levels: { level: string; label?: string }[]
  }[]
  onStageChange?: (stageId: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const onStageClick = (stageId: string) => {
    setIsDropdownOpen(false)
    const currentStage = stages.find((stage) => stage.stageId === stageId)
    if (currentStage) {
      if (onStageChange) {
        onStageChange(currentStage.stageId)
      }
    }
  }

  const stageItems = stages.map((stage) => ({
    text: stage.stageName,
    subText: stage.subText,
    onClick: () => onStageClick(stage.stageId),
  }))

  const currentIndex = stages.findIndex(
    (stage) => stage.stageId === currentStageId,
  )

  const levels = currentIndex >= 0 ? stages[currentIndex].levels : []

  return (
    <>
      <DailyRGSubTextStyle>{t('t8th334')}</DailyRGSubTextStyle>

      <Gap size={10} />

      <DailyRGNavBarStyle>
        <div className="level-box">
          {levels.map((lv) => (
            <div
              className={`level-item ${lv.level === currentLevel ? 'current' : ''}`}
              key={lv.level}
              onClick={() => {
                if (lv.level === currentLevel) {
                  return
                }
                if (onLevelChange) {
                  onLevelChange(lv.level)
                }
              }}>
              {lv.label ? lv.label : lv.level}
            </div>
          ))}
        </div>
        <div className="more-button">
          <div
            className="more-button-trigger"
            onMouseDown={(e) => {
              e.stopPropagation()
            }}
            onClick={(e) => {
              e.stopPropagation()
              setIsDropdownOpen((open) => !open)
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setIsDropdownOpen((open) => !open)
              }
            }}>
            <Image
              src={Assets.Icon.moreHorizontalGray}
              alt="more"
              width={24}
              height={24}
            />
          </div>
          <DropdownMenu
            items={stageItems}
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            showArrow={false}
            viewGrid={false}
            currentIndex={currentIndex}
            position="bottomRight"
          />
        </div>
      </DailyRGNavBarStyle>
    </>
  )
}
