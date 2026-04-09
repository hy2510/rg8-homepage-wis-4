'use client'

import { createPortal } from 'react-dom'

export default function ModalPortal({
  children,
}: {
  children: React.ReactNode
}) {
  const modalPortal = document.getElementById('modal-portal')
  if (!modalPortal) {
    return null
  }
  return createPortal(children, modalPortal)
}
