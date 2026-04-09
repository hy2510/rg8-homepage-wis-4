'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import {
  SettingImageSelectorAvatarContainer,
  SettingImageSelectorAvatarItemStyle,
  SettingImageSelectorNavigationButton,
  SettingImageSelectorPageDot,
  SettingImageSelectorPageIndicator,
  SettingImageSelectorStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

interface SettingImageSelectorProps {
  value?: string
  list?: { value: string; label: string; image: string }[]
  onChange?: (value: string) => void
}

/**
 * Avatar, ReadingUnit Select Option
 */
export default function SettingImageSelector({
  value,
  list,
  onChange,
}: SettingImageSelectorProps) {
  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(0)

  const isPhone = useIsPhone()

  const visibleItems = useMemo(() => {
    const items: ({ value: string; label: string; image: string } | 'empty')[] =
      []
    const startIndex = currentPage * itemsPerPage
    if (list && list.length > 0) {
      for (let i = 0; i < itemsPerPage; i++) {
        if (startIndex + i < list.length) {
          items.push(list[startIndex + i])
        } else {
          items.push('empty')
        }
      }
    }
    return items
  }, [list, currentPage, itemsPerPage])

  useEffect(() => {
    if (value && list && list.length > 0) {
      const index = list.findIndex((item) => item.value === value)
      if (index !== -1) {
        setCurrentPage(Math.floor(index / itemsPerPage))
      }
    }
  }, [itemsPerPage, value, list])

  const totalPages = Math.ceil((list ? list.length : 0) / itemsPerPage)

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <SettingImageSelectorStyle>
      <SettingImageSelectorNavigationButton
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="prev">
        <Image
          src={Assets.Icon.chevronLeftGray}
          alt="chevron left"
          width={24}
          height={24}
        />
      </SettingImageSelectorNavigationButton>

      <SettingImageSelectorAvatarContainer>
        {visibleItems.map((avatar, index) => {
          if (avatar === 'empty') {
            return (
              <ImageEmptyItem
                key={`empty_${index}`}
                imageSize={isPhone ? 100 : 120}
              />
            )
          }
          return (
            <ImageItem
              key={avatar.value}
              src={avatar.image}
              label={avatar.label}
              isSelected={value === avatar.value}
              imageSize={isPhone ? 100 : 120}
              onClick={() => handleChange(avatar.value)}
            />
          )
        })}
      </SettingImageSelectorAvatarContainer>

      <SettingImageSelectorNavigationButton
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className="next">
        <Image
          src={Assets.Icon.chevronRightGray}
          alt="chevron right"
          width={24}
          height={24}
        />
      </SettingImageSelectorNavigationButton>

      <SettingImageSelectorPageIndicator>
        {Array.from({ length: totalPages }, (_, index) => (
          <SettingImageSelectorPageDot
            key={index}
            isActive={index === currentPage}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </SettingImageSelectorPageIndicator>
    </SettingImageSelectorStyle>
  )
}

function ImageItem({
  src,
  label,
  isSelected,
  onClick,
  imageSize = 120 | 100,
}: {
  src: string
  label: string
  isSelected: boolean
  onClick: () => void
  imageSize?: number | 120 | 100
}) {
  return (
    <SettingImageSelectorAvatarItemStyle
      isSelected={isSelected}
      onClick={onClick}
      imageSize={imageSize}>
      <Image
        src={src}
        alt={label}
        width={imageSize}
        height={imageSize}
        className="avatar-image"
      />
    </SettingImageSelectorAvatarItemStyle>
  )
}

function ImageEmptyItem({
  imageSize = 120 | 100,
}: {
  imageSize?: number | 120 | 100
}) {
  return (
    <SettingImageSelectorAvatarItemStyle
      isSelected={false}
      imageSize={imageSize}>
      <div style={{ width: imageSize, height: imageSize }}></div>
    </SettingImageSelectorAvatarItemStyle>
  )
}
