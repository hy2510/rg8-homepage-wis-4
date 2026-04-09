'use client'

import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import React from 'react'
import VnFloatingMenu from '../home/_cpnt/VnFloatingMenu'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { target, country } = useSiteBlueprint()
  return (
    <>
      {target.private && country.vietnam && <VnFloatingMenu />}
      {children}
    </>
  )
}
