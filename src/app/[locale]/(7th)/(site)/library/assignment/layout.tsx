'use client'

import { BackLink } from '@/7th/_ui/common/common-components'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { ReactNode } from 'react'

export default function Layout({ children }: { children?: ReactNode }) {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className="pd-top-m">
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        {t('t376')}
      </BackLink>
      <div className="mg-bottom-m"></div>
      {children}
    </div>
  )
}
