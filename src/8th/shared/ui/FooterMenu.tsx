'use client'

import { FooterMenuStyle } from '@/8th/shared/styled/SharedStyled'
import Link from 'next/link'
import { RefObject } from 'react'
import { useIsTabletLarge } from '../context/ScreenModeContext'

type MenuLink = {
  event: 'a' | 'link' | 'click'
  text: string
  url?: string
  onClick?: (url: string) => void
}

export default function FooterMenu({
  menuLinks,
  footerRef,
}: {
  menuLinks?: MenuLink[]
  footerRef?: RefObject<HTMLDivElement | null>
}) {
  const isGnbBottom = useIsTabletLarge('smaller')
  return (
    <FooterMenuStyle isGnbBottom={isGnbBottom} ref={footerRef}>
      {menuLinks &&
        menuLinks.length > 0 &&
        menuLinks.map((menuLink) => {
          const key = `${menuLink.url}-${menuLink.event}`
          const href = menuLink.url || ''
          if (menuLink.event === 'a') {
            return (
              <a href={href} key={key}>
                <div className="menu-item">{menuLink.text}</div>
              </a>
            )
          }
          if (menuLink.event === 'link') {
            return (
              <Link href={href} key={key}>
                <div className="menu-item">{menuLink.text}</div>
              </Link>
            )
          }
          return (
            <div
              className="menu-item"
              onClick={() => {
                if (menuLink.onClick) {
                  menuLink.onClick(href)
                }
              }}
              key={key}>
              {menuLink.text}
            </div>
          )
        })}
    </FooterMenuStyle>
  )
}
