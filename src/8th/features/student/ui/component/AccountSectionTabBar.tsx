'use client'

import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { LibraryFinderTabBarStyle } from '@/8th/shared/styled/FeaturesStyled'
import SITE_PATH from '@/app/site-path'
import Link from 'next/link'

type AccountSectionTab = 'setting' | 'account'

export default function AccountSectionTabBar({
  active,
}: {
  active: AccountSectionTab
}) {
  const { menu } = useCustomerConfiguration()

  const showSetting = menu.account.setting.open
  const showAccountInfo = menu.account.studentInfo.open

  if (!showSetting && !showAccountInfo) {
    return null
  }

  return (
    <LibraryFinderTabBarStyle>
      <div className="tabs">
        {showSetting && (
          <Link
            href={SITE_PATH.NW82.ACCOUNTINFO_SETTING}
            className={`tab ${active === 'setting' ? 'active' : 'inactive'}`}
            aria-current={active === 'setting' ? 'page' : undefined}
            scroll={false}>
            Profile
          </Link>
        )}
        {showAccountInfo && (
          <Link
            href={SITE_PATH.NW82.ACCOUNTINFO}
            className={`tab ${active === 'account' ? 'active' : 'inactive'}`}
            aria-current={active === 'account' ? 'page' : undefined}
            scroll={false}>
            Account
          </Link>
        )}
      </div>
    </LibraryFinderTabBarStyle>
  )
}
