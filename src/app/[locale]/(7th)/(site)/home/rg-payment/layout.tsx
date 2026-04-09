'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import {
  NavBar,
  NavItem,
} from '@/7th/_ui/modules/home-rg-membership-components/nav-bar'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const STYLE_ID = 'page_rg_membership'

export default function Layout({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()

  return (
    <main className={`${style.rg_membership} container`}>
      <NavBar>
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.RG_PAYMENT) != -1}
          href={SITE_PATH.HOME.RG_PAYMENT}>
          {/* 미납 내역 */}
          {t('t735')}
        </NavItem>
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.RG_PAYMENT_HISTORY) != -1}
          href={SITE_PATH.HOME.RG_PAYMENT_HISTORY}>
          {/* 납입 이력 */}
          {t('t736')}
        </NavItem>
      </NavBar>
      <div className={style.contents_box}>{children}</div>
    </main>
  )
}
