'use client'

import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import ActionBar, {
  ActionBarDropdown,
  ActionBarDropdownProps,
} from '@/8th/shared/ui/ActionBar'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { ReactNode } from 'react'

export type { ActionBarDropdownItem } from '@/8th/shared/ui/ActionBar'

interface ActionBarProps {
  title?: string
  count?: number
  headerContent?: ReactNode
  dropdowns?: ActionBarDropdownProps[]
  exportPanel?: {
    isOpen: boolean
    title: string
    count?: number
    isEdit?: boolean
    onCancel?: () => void
    onConfirm?: () => void
  }
}

export default function LibraryActionBar({
  title,
  count = -1,
  headerContent,
  dropdowns,
  exportPanel,
}: ActionBarProps) {
  const isPhone = useIsPhone()

  return (
    <ActionBar
      header={headerContent}
      body={
        <>
          <BoxStyle display="flex" alignItems="center" gap={10}>
            <TextStyle fontSize="large" fontFamily="sans" fontWeight="bolder">
              {title}
            </TextStyle>
            {count >= 0 && (
              <TextStyle
                fontColor="secondary"
                fontSize="medium"
                padding="3px 0 0 0">
                {`(${count})`}
              </TextStyle>
            )}
          </BoxStyle>
          <BoxStyle display="flex" alignItems="center" gap={20}>
            {dropdowns?.map((dropdown, i) => (
              <ActionBarDropdown
                key={dropdown.title}
                title={dropdown.title}
                position={isPhone ? (i > 1 ? 'right' : 'left') : undefined}
                items={dropdown.items}
                isActiveMakerVisible={dropdown.isActiveMakerVisible}
                onItemClick={dropdown.onItemClick}
              />
            ))}
          </BoxStyle>
        </>
      }
      exportPanel={exportPanel}
    />
  )
}
