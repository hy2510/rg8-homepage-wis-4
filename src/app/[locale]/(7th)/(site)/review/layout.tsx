'use client'

import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { Nav, NavItem } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic'

const STYLE_ID = 'page_review_view'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { target, isPaymentable } = useSiteBlueprint()

  const router = useRouter()
  const path = usePathname()
  const params = useSearchParams()

  const keyword = params.get('keyword') || ''
  const startDate = params.get('startDate') || ''
  const endDate = params.get('endDate') || ''

  const isSpeakActive = path.includes(SITE_PATH.REVIEW.SPEAK)
  const isWriteActive = path.includes(SITE_PATH.REVIEW.WRITE)

  const onClickNavLink = (type: 'read' | 'speak' | 'write') => {
    let qs = ''
    if (startDate) {
      qs += `startDate=${startDate}&`
    }
    if (endDate) {
      qs += `endDate=${endDate}&`
    }
    if (keyword) {
      qs += `keyword=${keyword}&`
    }
    if (qs.length > 1) {
      qs = '?' + qs.substring(0, qs.length - 1)
    }
    let site = ''
    if (type === 'write') {
      site = SITE_PATH.REVIEW.WRITE
    } else if (type === 'speak') {
      site = SITE_PATH.REVIEW.SPEAK
    } else {
      site = SITE_PATH.REVIEW.MAIN
    }
    router.push(`${site}${qs}`)
  }

  const isWritingMenuOpen = target.academy || (target.school && isPaymentable)

  return (
    <div className="container compact">
      <div className={style.nav_bar}>
        <div className={style.txt_h}>{t('t140')}</div>
        <Nav>
          <NavItem
            active={!isSpeakActive && !isWriteActive}
            onClick={() => {
              onClickNavLink('read')
            }}>
            My Read
          </NavItem>
          <NavItem
            active={isSpeakActive}
            onClick={() => {
              onClickNavLink('speak')
            }}>
            My Speak
          </NavItem>
          {isWritingMenuOpen && (
            <NavItem
              active={isWriteActive}
              onClick={() => {
                onClickNavLink('write')
              }}>
              Writing Activity
            </NavItem>
          )}
        </Nav>
      </div>
      <main className={style.review}>{children}</main>
    </div>
  )
}
