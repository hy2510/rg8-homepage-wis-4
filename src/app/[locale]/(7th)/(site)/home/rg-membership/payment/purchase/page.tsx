'use client'

import { useDevicePlatform } from '@/7th/__root/ApplicationContext'
import ClientTo from '@/7th/_app/ClientTo'
import {
  useStudentInfoFlagLogin,
  useStudentStudyable,
} from '@/7th/_client/store/student/info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Purchase from '../_cpnt/Purchase'
import PurchaseInApp from '../_cpnt/PurchaseInApp'

export default function Page() {
  const { country, target, isPaymentable } = useSiteBlueprint()
  const { value: studyState } = useStudentStudyable()
  const platform = useDevicePlatform()

  // @language 'common'
  const { t } = useTranslation()

  const path = usePathname()
  const isLogOff = useStudentInfoFlagLogin() === 'off'
  const [redirect, setRedirect] = useState('')

  if (studyState === 'PAUSED') {
    // 학습 일시중지 중에는 이용권을 구매할 수 없습니다.
    return <div>{t('t730')}</div>
  }

  if (isPaymentable && isLogOff) {
    if (!redirect) {
      alert(t('t929'))
      // setRedirect(`${SITE_PATH.ACCOUNT.SIGN_IN}?to=${path}`)
      setRedirect(`${SITE_PATH.ACCOUNT.SIGN_IN}`)
    }
    return <>{redirect && <ClientTo to={redirect}></ClientTo>}</>
  }

  if (isPaymentable && target.private && platform !== 'unknown') {
    let purchaseType: 'direct' | 'directvn' | 'android' | 'ios' = 'direct'
    const isChangeUserInfo = country.korea
    if (platform === 'Android' || platform === 'iOS') {
      purchaseType = platform.toLowerCase() as 'android' | 'ios'
      return (
        <PurchaseInApp
          purchaseType={purchaseType}
          isChangeUserInfo={isChangeUserInfo}
        />
      )
    } else if (country.vietnam) {
      purchaseType = 'directvn'
    }
    return (
      <Purchase
        purchaseType={purchaseType}
        isChangeUserInfo={isChangeUserInfo}
      />
    )
  }
  return <>{`Not accessible.`}</>
}
