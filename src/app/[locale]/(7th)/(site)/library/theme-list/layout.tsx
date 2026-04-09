'use client'

import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { BackLink, Nav, NavItem } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const STYLE_ID = 'page_theme'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { studyOpen } = useSiteBlueprint()

  const uiBookTypeList: { label: string; value: 'EB' | 'PB' }[] = []
  if (studyOpen.EB) {
    uiBookTypeList.push({ label: 'eBook', value: 'EB' })
  }
  if (studyOpen.PB) {
    uiBookTypeList.push({ label: 'pBook Quiz', value: 'PB' })
  }

  const bookType = pathname.includes('e-book')
    ? 'EB'
    : pathname.includes('p-book-quiz')
      ? 'PB'
      : ''

  const onSelectNavBookType = (bookType: string) => {
    if (bookType === 'EB') {
      router.replace(`${SITE_PATH.LIBRARY.THEME_LIST_EB}`)
    } else if (bookType === 'PB') {
      router.replace(`${SITE_PATH.LIBRARY.THEME_LIST_PB}`)
    }
  }

  return (
    <main className={style.theme_all}>
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        {t('t393')}
      </BackLink>
      {!bookType ||
        (uiBookTypeList.length === 0 ? (
          <></>
        ) : (
          <>
            <Nav>
              {uiBookTypeList.map((item) => {
                const isActive = bookType === item.value
                return (
                  <NavItem
                    key={item.value}
                    active={isActive}
                    onClick={() => {
                      if (!isActive) {
                        onSelectNavBookType(item.value)
                      }
                    }}>
                    {item.label}
                  </NavItem>
                )
              })}
            </Nav>
            <div></div>
          </>
        ))}
      {children}
    </main>
  )
}
