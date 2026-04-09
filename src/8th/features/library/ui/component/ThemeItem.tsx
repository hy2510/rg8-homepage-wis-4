'use client'

import { ThemeItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import Image from 'next/image'

interface ThemeItemProps {
  themeImgSrc: string
  title: string
  onClick?: () => void
}

export default function ThemeItem({
  themeImgSrc,
  title,
  onClick,
}: ThemeItemProps) {
  return (
    <ThemeItemStyle onClick={onClick}>
      <Image
        className="theme-img"
        src={themeImgSrc}
        alt={title}
        width={60}
        height={60}
      />
      <div className="title">{title}</div>
    </ThemeItemStyle>
  )
}
