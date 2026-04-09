'use client'

import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const STYLE_ID = 'page_kids_prek'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { PreK, DodoABC } = useSiteBlueprint().studyOpen

  const style = useStyle(STYLE_ID)
  const pathname = usePathname()

  const dodoAbc = pathname.indexOf(SITE_PATH.BASIC.DODO_ABC) != -1
  const preK = pathname.indexOf(SITE_PATH.BASIC.PRE_K) != -1

  return (
    <>
      <div className={style.kids_top}>
        {PreK && DodoABC && (
          <div className={style.kids_top_nav}>
            <Link href={SITE_PATH.BASIC.DODO_ABC}>
              <div className={`${style.nav_item} ${dodoAbc && style.active}`}>
                DODO ABC
              </div>
            </Link>
            <Link href={SITE_PATH.BASIC.PRE_K}>
              <div className={`${style.nav_item} ${preK && style.active}`}>
                PRE K
              </div>
            </Link>
          </div>
        )}
      </div>
      {children}
    </>
  )
}
