'use client'

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
import Ticket from '../_cpnt/Ticket'

export default function Page() {
  const { isPaymentable } = useSiteBlueprint()
  const { value: studyState } = useStudentStudyable()

  // @language 'common'
  const { t } = useTranslation()

  const path = usePathname()
  const isLogOff = useStudentInfoFlagLogin() === 'off'
  const [redirect, setRedirect] = useState('')

  if (studyState === 'PAUSED') {
    // 학습 일시중지 중에는 티켓등록을 할 수 없습니다.
    return <div>{t('t731')}</div>
  }

  if (isPaymentable && isLogOff) {
    if (!redirect) {
      alert(t('t929'))
      // setRedirect(`${SITE_PATH.ACCOUNT.SIGN_IN}?to=${path}`)
      setRedirect(`${SITE_PATH.ACCOUNT.SIGN_IN}`)
    }
    return <>{redirect && <ClientTo to={redirect}></ClientTo>}</>
  }

  return <Ticket />
}
