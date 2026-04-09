'use client'

import { useApplicationType } from '@/7th/__root/ApplicationContext'
import {
  useStaffInfoFlagLogin,
  useStudentInfoFlagLogin,
} from '@/7th/_client/store/student/info/selector'
import SITE_PATH, { STAFF_PATH } from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  // const authToken = getAuthorizationWithCookie().getActiveAccessToken()
  // if (authToken) {
  //   redirect(SITE_PATH.HOME.MAIN)
  // } else {
  //   redirect(SITE_PATH.ACCOUNT.MAIN)
  // }

  const router = useRouter()
  const appType = useApplicationType()
  const loginStatus = useStudentInfoFlagLogin()
  const staffLoginStatus = useStaffInfoFlagLogin()

  useEffect(() => {
    if (staffLoginStatus === 'off') {
      if (appType === 'app') {
        if (loginStatus === 'on') {
          router.replace(SITE_PATH.HOME.MAIN)
        } else if (loginStatus === 'off') {
          router.replace(SITE_PATH.ACCOUNT.MAIN)
        }
      } else if (loginStatus !== 'unknown') {
        router.replace(SITE_PATH.HOME.MAIN)
      }
    } else if (staffLoginStatus === 'on' && loginStatus !== 'on') {
      router.replace(STAFF_PATH.MAIN)
    }
  }, [appType, router, loginStatus, staffLoginStatus])
}
