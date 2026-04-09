'use client'

import ClientTo from '@/7th/_app/ClientTo'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useState } from 'react'

export default function Page() {
  const siteOption = useSiteBlueprint()
  const { PreK, DodoABC } = siteOption.studyOpen
  const { isFirstPreK } = siteOption
  const [redirect, setRedirect] = useState<string | undefined>(undefined)

  if (isFirstPreK && PreK) {
    if (!redirect) {
      setRedirect(SITE_PATH.BASIC.PRE_K)
    }
  } else {
    if (DodoABC) {
      if (!redirect) {
        setRedirect(SITE_PATH.BASIC.DODO_ABC)
      }
    } else if (PreK) {
      if (!redirect) {
        setRedirect(SITE_PATH.BASIC.PRE_K)
      }
    }
  }
  if (redirect) {
    return <ClientTo to={redirect} isReplace key={Date.now()} />
  }
  return <>Not support is this customer Kinder StudyMenu.</>
}
