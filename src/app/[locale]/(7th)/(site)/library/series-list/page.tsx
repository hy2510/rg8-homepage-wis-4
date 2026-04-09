'use client'

import ClientTo from '@/7th/_app/ClientTo'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useState } from 'react'

export default function Page() {
  const siteOption = useSiteBlueprint()
  const { EB, PB } = siteOption.studyOpen

  const [redirect, setRedirect] = useState<string | undefined>(undefined)

  if (EB) {
    if (!redirect) {
      setRedirect(`${SITE_PATH.LIBRARY.SERIES_LIST_EB}`)
    }
  } else if (PB) {
    if (!redirect) {
      setRedirect(`${SITE_PATH.LIBRARY.SERIES_LIST_PB}`)
    }
  }
  if (redirect) {
    return <ClientTo to={redirect} isReplace key={Date.now()} />
  }
  return <>Not support is this customer Series Menu.</>
}
