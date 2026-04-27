'use client'

import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { Divide, Gap } from '@/8th/shared/ui/Misc'
import { LevelSectionType } from '../levelSectionData'
import LevelItem from './LevelSectionLevelItem'

export default function LevelSectionContentPk({
  section,
}: {
  section: LevelSectionType
}) {
  const hasLevels = section.levels.length > 0

  const isPhone = useIsPhone()

  const gapSize = isPhone ? 20 : 25

  return (
    <>
      {hasLevels &&
        section.levels.map((group, index) => {
          return (
            <LevelSectionBody
              key={`${section.section}-${index}`}
              divideLabel={group.group}
              gapSize={gapSize}>
              {group.items.map((level) => {
                return (
                  <LevelItem
                    key={`${level.type}${level.level}-${level.title}`}
                    type={level.type}
                    level={level.level}
                    title={level.title}
                    bgColor={level.bgColor}
                    fontColor={level.fontColor}
                    completed={level.completed}
                    href={level.href}
                    imgSrc={level.imgSrc}
                    total={level.total}
                  />
                )
              })}
            </LevelSectionBody>
          )
        })}
    </>
  )
}

function LevelSectionBody({
  divideLabel,
  gapSize = 25,
  children,
}: {
  divideLabel?: string
  gapSize?: number
  children?: React.ReactNode
}) {
  const containClassName = 'level-container'

  return (
    <>
      {divideLabel && (
        <>
          <Gap size={gapSize} />
          <Divide title={divideLabel} />
        </>
      )}
      <Gap size={gapSize} />
      <div className={containClassName}>{children}</div>
    </>
  )
}
