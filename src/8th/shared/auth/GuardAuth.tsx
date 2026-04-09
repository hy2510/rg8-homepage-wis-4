'use client'

import { useEffect } from 'react'
import { useAuth, useGuardRedirect } from './AuthContext'

export function GuardStudent({
  children,
  redirectTo,
}: {
  children: React.ReactNode
  redirectTo?: string
}) {
  const { student: status } = useAuth()
  const setGuardRedirect = useGuardRedirect()

  useEffect(() => {
    if (redirectTo && status === 'inactive') {
      if (setGuardRedirect) {
        setGuardRedirect(redirectTo)
      }
    }
  }, [status, redirectTo, setGuardRedirect])

  if (status === 'active') {
    return <>{children}</>
  }
  return null
}

export function GuardStaff({
  children,
  redirectTo,
}: {
  children: React.ReactNode
  redirectTo?: string
}) {
  const { staff: status } = useAuth()
  const setGuardRedirect = useGuardRedirect()

  useEffect(() => {
    if (redirectTo && status === 'inactive') {
      if (setGuardRedirect) {
        setGuardRedirect(redirectTo)
      }
    }
  }, [status, redirectTo, setGuardRedirect])

  if (status === 'active') {
    return <>{children}</>
  }
  return null
}

export function GuardGuestOnly({
  children,
  redirectTo,
}: {
  children: React.ReactNode
  redirectTo?: string
}) {
  const { student, staff } = useAuth()
  const setGuardRedirect = useGuardRedirect()

  useEffect(() => {
    if (redirectTo && (student === 'active' || staff === 'active')) {
      if (setGuardRedirect) {
        setGuardRedirect(redirectTo)
      }
    }
  }, [student, staff, redirectTo, setGuardRedirect])

  if (student === 'inactive' && staff === 'inactive') {
    return <>{children}</>
  }
  return null
}
