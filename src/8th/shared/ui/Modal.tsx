'use client'

import { useLockBodyScroll } from '../context/ScrollLockContext'
import { BookInfoModalStyle } from '../styled/FeaturesStyled'
import {
  MiniModalContainerStyle,
  ModalContainerStyle,
} from '../styled/SharedStyled'
import ModalPortal from './ModalPortal'

export function ModalContainer({
  excludePortal = false,
  children,
}: {
  excludePortal?: boolean
  children: React.ReactNode
}) {
  useLockBodyScroll()

  if (excludePortal) {
    return (
      <BookInfoModalStyle>
        <ModalContainerStyle>{children}</ModalContainerStyle>
      </BookInfoModalStyle>
    )
  }
  return (
    <ModalPortal>
      <BookInfoModalStyle>
        <ModalContainerStyle>{children}</ModalContainerStyle>
      </BookInfoModalStyle>
    </ModalPortal>
  )
}

export function MiniModalContainer({
  children,
  minHeight,
}: {
  minHeight?: string
  children: React.ReactNode
}) {
  useLockBodyScroll()

  return (
    <MiniModalContainerStyle minHeight={minHeight}>
      {children}
    </MiniModalContainerStyle>
  )
}
