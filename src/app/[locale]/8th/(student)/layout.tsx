import { GuardStudent } from '@/8th/shared/auth/GuardAuth'
import SITE_PATH from '@/app/site-path'
import React from 'react'
import MainLayout from '../_index/MainLayout'

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <GuardStudent redirectTo={SITE_PATH.ACCOUNT.MAIN}>
      <MainLayout>{children}</MainLayout>
    </GuardStudent>
  )
}
