'use client'

import { useStudentInfoFlagLogin } from '@/7th/_client/store/student/info/selector'
import { ReactNode } from 'react'

export default function LoginBarrierClient({
  children,
}: {
  children?: ReactNode
  redirectPath?: string
}) {
  const loginStatus = useStudentInfoFlagLogin()

  if (loginStatus === 'on') {
    return <div></div>
  }
  return <>{children}</>
}
