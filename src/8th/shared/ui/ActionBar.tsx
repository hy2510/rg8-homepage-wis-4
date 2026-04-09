'use client'

import { Assets } from '@/8th/assets/asset-library'
import {
  ActionBarContainerStyle,
  ActionBarHeaderStyle,
  DropdownButtonSmallContainerStyle,
  DropdownButtonSmallStyle,
  DropdownSmallItemStyle,
  DropdownSmallMenuStyle,
  DropdownStatusDivider,
} from '@/8th/shared/styled/SharedStyled'
import { RoundedFullButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { ReactNode, useEffect, useRef, useState } from 'react'

export interface ActionBarDropdownItem {
  key: string | '--'
  label?: string
  isActive?: boolean
}

export interface ActionBarDropdownProps {
  title: string
  isTitleBlack?: boolean
  isActiveMakerVisible?: boolean
  items?: ActionBarDropdownItem[]
  onItemClick?: (item: ActionBarDropdownItem) => void
}

interface ActionBarProps {
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  exportPanel?: {
    isOpen: boolean
    title: string
    count?: number
    isEdit?: boolean
    onCancel?: () => void
    onConfirm?: () => void
  }
}

export default function ActionBar({
  header,
  body,
  footer,
  exportPanel,
}: ActionBarProps) {
  return (
    <BoxStyle width="100%">
      {header && <ActionBarHeaderStyle>{header}</ActionBarHeaderStyle>}
      {body && <ActionBarContainerStyle>{body}</ActionBarContainerStyle>}
      {footer}
      {exportPanel && exportPanel.isOpen && (
        <ActionBarExportPanel
          title={exportPanel.title}
          count={exportPanel.count}
          isEdit={exportPanel.isEdit}
          onCancel={exportPanel.onCancel}
          onConfirm={exportPanel.onConfirm}
        />
      )}
    </BoxStyle>
  )
}

export function ActionBarExportPanel({
  title,
  count,
  onCancel,
  onConfirm,
  isEdit,
}: {
  title: string
  count?: number
  onCancel?: () => void
  onConfirm?: () => void
  isEdit?: boolean
}) {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <ActionBarContainerStyle isBottom>
      <BoxStyle display="flex" alignItems="center" gap={10}>
        <TextStyle fontSize="medium">{title}</TextStyle>
        {count !== undefined && (
          <TextStyle fontSize="medium" fontColor="lightBlue">
            ({count})
          </TextStyle>
        )}
      </BoxStyle>
      <BoxStyle
        display="flex"
        alignItems="center"
        gap={10}
        margin={'0 0 0 auto'}>
        <RoundedFullButton viewSmall onClick={onCancel}>
          {t('t8th078')}
        </RoundedFullButton>
        <RoundedFullButton
          viewSmall
          fontColor={
            isEdit ? 'var(--color-red-strong)' : 'var(--font-color-light-blue)'
          }
          onClick={onConfirm}>
          {t('t8th079')}
        </RoundedFullButton>
      </BoxStyle>
    </ActionBarContainerStyle>
  )
}

export function ActionBarDropdown({
  title,
  position,
  isTitleBlack,
  isActiveMakerVisible,
  items,
  onItemClick,
}: {
  title: string
  position?: 'left' | 'right'
  isTitleBlack?: boolean
  isActiveMakerVisible?: boolean
  items?: ActionBarDropdownItem[]
  onItemClick?: (item: ActionBarDropdownItem) => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [isMenuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      if (isMenuOpen) {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isMenuOpen])

  return (
    <DropdownButtonSmallContainerStyle ref={dropdownRef}>
      <DropdownButtonSmallStyle onClick={() => setMenuOpen(!isMenuOpen)}>
        <div className={`link-text ${isTitleBlack ? 'black' : ''}`}>
          {title}
        </div>
        <div className="icon">
          <Image
            src={Assets.Icon.chevronDownGraySmall}
            alt="arrow-down"
            width={14}
            height={14}
            style={{
              transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </DropdownButtonSmallStyle>
      {isMenuOpen && items && items.length > 0 && (
        <DropdownSmallMenuStyle position={position}>
          {items.map((item, index) => {
            if (item.key === '--') {
              return <DropdownStatusDivider key={`divide-${index}`} />
            }
            return (
              <DropdownSmallItemStyle
                key={item.key}
                isSelected={item.isActive ?? false}
                onClick={() => {
                  if (onItemClick) {
                    onItemClick(item)
                  }
                  setMenuOpen(false)
                }}>
                <div className="item-text">{item.label ?? ''}</div>
                {isActiveMakerVisible && item.isActive && (
                  <Image
                    src={Assets.Icon.checkLightBlue}
                    alt="check"
                    width={12}
                    height={12}
                  />
                )}
              </DropdownSmallItemStyle>
            )
          })}
        </DropdownSmallMenuStyle>
      )}
    </DropdownButtonSmallContainerStyle>
  )
}
