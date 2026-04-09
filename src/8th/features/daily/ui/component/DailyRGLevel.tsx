import { Assets } from '@/8th/assets/asset-library'
import { DailyRGLevelStyle } from '@/8th/shared/styled/FeaturesStyled'
import DropdownMenu from '@/8th/shared/ui/Dropdowns'
import { TextStyle } from '@/8th/shared/ui/Misc'
import Image from 'next/image'
import { useState } from 'react'

export default function DailyRGLevel({
  stageTitle,
  currentStageId,
  stages,
  onStageChange,
}: {
  stageTitle: string
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
  }

  const stageItems = stages.map((stage) => {
    return {
      text: stage.stageName,
      subText: stage.subText,
      onClick: () => onStageClick(stage.stageId),
    }
  })
  const currentIndex = stages.findIndex(
    (stage) => stage.stageId === currentStageId,
  )

  return (
    <DailyRGLevelStyle onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <TextStyle fontSize="xlarge">{stageTitle}</TextStyle>
      <Image
        src={Assets.Icon.chevronDownGray}
        alt="chevron-down"
        width={24}
        height={24}
      />
      <DropdownMenu
        items={stageItems}
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        showArrow={false}
        viewGrid={false}
        currentIndex={currentIndex}
      />
    </DailyRGLevelStyle>
  )
}
