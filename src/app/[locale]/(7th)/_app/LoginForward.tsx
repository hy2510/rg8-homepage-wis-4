'use client'

import { updateAccount } from '@/7th/_account/account-list'
import { useStudentAvatar } from '@/7th/_client/store/student/avatar/selector'
import { useSelectStudyLevel } from '@/7th/_client/store/student/daily-learning/selector'
import { useUpdateStudentLogOn } from '@/7th/_client/store/student/info/hook'
import {
  useStudentInfo,
  useStudentStudyable,
} from '@/7th/_client/store/student/info/selector'
import { useCustomerInfo } from '@/7th/_context/CustomerContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import useAccountInfoLoading from '@/7th/site/library/_mode/useAccountInfoLoading'
import { injectUid } from '@/app/api/aalog/logutil'
import SITE_PATH from '@/app/site-path'
import { isGoTo8th, setSiteBridge } from '@/external/site-7-8-bridge'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

export default function LoginForward({
  to,
  error,
}: {
  to?: string
  error?: ReactNode
}) {
  const router = useRouter()
  const state = useAccountInfoLoading()
  const [ready, setReady] = useState(false)

  const onUpdateLogOn = useUpdateStudentLogOn()
  const {
    customerId,
    name: customerName,
    customerUse,
    countryCode,
  } = useCustomerInfo()
  const { loginId, studentId, name: studentName } = useStudentInfo()
  const avatarImage = useStudentAvatar().userAvatar.imageLarge
  const level = useSelectStudyLevel() || undefined
  const { isStudyEnd } = useStudentStudyable()
  const destinationPath = getDestinationPath({
    destination: to,
    level,
    isStudyEnd,
  })

  useEffect(() => {
    if (!state.isLoading && loginId && customerId) {
      injectUid(studentId)
      updateAccount({
        loginId: loginId,
        customerId: customerId,
        customerName: customerName,
        studentId: studentId,
        studentName: studentName,
        avatar: avatarImage,
      })
      setReady(true)
    }
  }, [
    state.isLoading,
    loginId,
    customerId,
    customerName,
    studentId,
    studentName,
    avatarImage,
  ])

  useEffect(() => {
    if (!state.isLoading && ready) {
      onUpdateLogOn()
      if (destinationPath) {
        // 8차 사이트는 직접 이동
        if (destinationPath.startsWith('/8th')) {
          window.location.href = destinationPath
          return
        }
        router.replace(destinationPath)
      }
    }
  }, [router, ready, state.isLoading, destinationPath, to, onUpdateLogOn])

  useEffect(() => {
    if (customerId && studentId) {
      setSiteBridge({ customerId, studentId, customerUse, countryCode })
    } else {
      setSiteBridge()
    }
  }, [customerId, studentId, customerUse, countryCode])

  if (state.isError) {
    return <>{error}</>
  }
  if (state.isLoading) {
    return <LoadingScreen />
  }
  return <></>
}

export const DESTINATION = {
  STUDY: '_study',
  TICKET: '_ticket',
  PURCHASE: '_purchase',
}

function getDestinationPath({
  destination,
  level,
  isStudyEnd,
}: {
  destination?: string
  level?: string
  isStudyEnd?: boolean
}): string {
  let path: string = ''
  if (destination === DESTINATION.TICKET) {
    path = SITE_PATH.HOME.MEMBERSHIP_TICKET
  } else if (destination === DESTINATION.PURCHASE) {
    path = SITE_PATH.HOME.MEMBERSHIP_PAYMENT
  } else if (destination === DESTINATION.STUDY) {
    if (isStudyEnd) {
      path = SITE_PATH.HOME.MAIN
    } else {
      // 7차 - 8차 연동 부분 체크 - 8차 화면으로 이동
      if (isGoTo8th()) {
        path = '/8th/forwarder'
      }
      if (!path) {
        if (level && level !== 'PK') {
          path = SITE_PATH.LIBRARY.HOME
        } else if (level && level === 'PK') {
          path = SITE_PATH.BASIC.HOME
        } else {
          path = SITE_PATH.HOME.MAIN
        }
      }
    }
  } else if (destination?.startsWith('/')) {
    path = destination
  }
  return path
}
