'use client'

import { Assets } from '@/8th/assets/asset-library'
import Image from 'next/image'
import React from 'react'
import {
  CheckboxLabelStyle,
  CheckboxStyle,
  HiddenCheckboxStyle,
} from '../styled/SharedStyled'
import { BoxStyle } from './Misc'

interface CustomCheckboxProps {
  id: string
  checked?: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export default function CustomCheckbox({
  id,
  checked = false,
  onChange,
  label,
  disabled = false,
}: CustomCheckboxProps) {
  const handleToggle = () => {
    if (disabled) return
    onChange(!checked)
  }

  const onClickCheckbox = (event: React.MouseEvent) => {
    if (disabled) return
    event.preventDefault()
    handleToggle()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <BoxStyle display="flex" alignItems="center" gap={12}>
      <HiddenCheckboxStyle
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
      />
      <CheckboxStyle
        checked={checked}
        disabled={disabled}
        onClick={onClickCheckbox}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}>
        {checked && (
          <Image
            src={Assets.Icon.checkWhite}
            alt="check"
            width={20}
            height={20}
          />
        )}
      </CheckboxStyle>
      {label && (
        <CheckboxLabelStyle
          htmlFor={id}
          onClick={onClickCheckbox}
          style={{ cursor: 'pointer' }}>
          {label}
        </CheckboxLabelStyle>
      )}
    </BoxStyle>
  )
}
