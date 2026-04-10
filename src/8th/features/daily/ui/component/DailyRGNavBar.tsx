'use client'

import { Assets } from '@/8th/assets/asset-library'
import { DailyRGNavBarStyle } from '@/8th/shared/styled/FeaturesStyled'
import DropdownMenu from '@/8th/shared/ui/Dropdowns'
import Image from 'next/image'
import { useState } from 'react'

export default function DailyRGNavBar({
  currentStageId,
  stages,
  onStageChange,
}: {
  currentStageId: string
  stages: {
    stageId: string
    levelKey: string
    stageName: string
    subText?: string
  }[]
  onStageChange?: (stageId: string, stageName: string, levelKey: string) => void
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const onStageClick = (stageId: string) => {
    const currentStage = stages.find((stage) => stage.stageId === stageId)
    if (currentStage && onStageChange) {
      onStageChange(
        currentStage.stageId,
        currentStage.stageName,
        currentStage.levelKey,
      )
    }
    setIsDropdownOpen(false)
  }

  const stageItems = stages.map((stage) => ({
    text: stage.stageName,
    subText: stage.subText,
    onClick: () => onStageClick(stage.stageId),
  }))

  const currentIndex = stages.findIndex(
    (stage) => stage.stageId === currentStageId,
  )

  return (
    <DailyRGNavBarStyle>
      <div className="level-box">
        <div className="level-item current">KA</div>
        <div className="level-item">KB</div>
        <div className="level-item">KC</div>
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
  )
}
