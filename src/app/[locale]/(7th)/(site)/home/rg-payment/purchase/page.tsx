'use client'

import { useDevicePlatform } from '@/7th/__root/ApplicationContext'
import ClientTo from '@/7th/_app/ClientTo'
import { useStudentInfoFlagLogin } from '@/7th/_client/store/student/info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import PurchaseGroup from '../../rg-membership/payment/_cpnt/PurchaseGroup'

export default function Page() {
  const { target, isPaymentable } = useSiteBlueprint()
  const platform = useDevicePlatform()

  // @language 'common'
  const { t } = useTranslation()

  const path = usePathname()
  const isLogOff = useStudentInfoFlagLogin() === 'off'
  const [redirect, setRedirect] = useState('')

  if (
    isPaymentable &&
    platform !== 'unknown' &&
    (target.school || target.academy)
  ) {
    if (isLogOff) {
      if (!redirect) {
        alert(t('t929'))
        // setRedirect(`${SITE_PATH.ACCOUNT.SIGN_IN}?to=${path}`)
        setRedirect(`${SITE_PATH.ACCOUNT.SIGN_IN}`)
      }
      return <>{redirect && <ClientTo to={redirect}></ClientTo>}</>
    } else {
      return <PurchaseGroup />
    }
  }
  return <>{`Not accessible.`}</>
}
