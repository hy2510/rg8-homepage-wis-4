'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import useConnectRefreshToken from '@/7th/site/useConnectRefreshToken'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import { setSiteBridge } from '@/external/site-7-8-bridge'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useRef } from 'react'

const STYLE_ID = 'page_sign_in'

export default function Page() {
  const style = useStyle(STYLE_ID)

  //@language 'common'
  const { t } = useTranslation()

  const didMount = useRef(false)

  const maketingEventTracker = useTrack()
  const onLogout = useConnectRefreshToken()

  useEffect(() => {
    if (didMount.current) return
    didMount.current = true
    setSiteBridge()
    maketingEventTracker.eventAction('로그아웃')
    onLogout()
  }, [onLogout, maketingEventTracker])

  return (
    <main className={style.sign_in}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>
      <LoadingScreen />
    </main>
  )
}
