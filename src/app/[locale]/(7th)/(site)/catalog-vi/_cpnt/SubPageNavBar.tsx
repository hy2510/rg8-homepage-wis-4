'use client'

import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useCatalogSectionText } from '../_i18n/useCatalogText'

const STYLE_ID = 'page_catalog'

export default function SubPageNavBar() {
  const style = useStyle(STYLE_ID)
  const sectionText = useCatalogSectionText('common')

  const isMobile = useScreenMode() === 'mobile'

  const pathname = usePathname()

  const containerRef = useRef<HTMLDivElement | null>(null)

  const menuRef1 = useRef<HTMLDivElement | null>(null)
  const menuRef2 = useRef<HTMLDivElement | null>(null)
  const menuRef3 = useRef<HTMLDivElement | null>(null)
  const menuRef4 = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isMobile) {
      if (
        menuRef1.current &&
        pathname.indexOf(SITE_PATH.CATALOG_VI.PBOOK_QUIZ) != -1
      ) {
        if (containerRef.current) {
          containerRef.current.scrollLeft = menuRef1.current.offsetLeft - 20
        }
      }
      if (
        menuRef2.current &&
        pathname.indexOf(SITE_PATH.CATALOG_VI.MOTIVATION) != -1
      ) {
        if (containerRef.current) {
          containerRef.current.scrollLeft = menuRef2.current.offsetLeft - 20
        }
      }
      if (
        menuRef3.current &&
        pathname.indexOf(SITE_PATH.CATALOG_VI.MOVIE_CONTENTS) != -1
      ) {
        if (containerRef.current) {
          containerRef.current.scrollLeft = menuRef3.current.offsetLeft - 20
        }
      }
      if (
        menuRef4.current &&
        pathname.indexOf(SITE_PATH.CATALOG_VI.AI_SPEAK) != -1
      ) {
        if (containerRef.current) {
          containerRef.current.scrollLeft = menuRef4.current.offsetLeft - 20
        }
      }
    }
  })

  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`${style.sub_page_nav_bar} ${isScroll && style.scroll}`}
      ref={containerRef}>
      <Link href={SITE_PATH.CATALOG_VI.HOME}>
        <div className={`${style.nav_item} ${style.home}`}></div>
      </Link>
      <Link href={SITE_PATH.CATALOG_VI.BASIC}>
        <div
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG_VI.BASIC) != -1 && style.active}`}
          style={{ textAlign: 'center' }}>
          {sectionText.txt1}
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG_VI.EBOOK}>
        <div
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG_VI.EBOOK) != -1 && style.active}`}
          style={{ textAlign: 'center' }}>
          {sectionText.txt2}
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG_VI.PBOOK_QUIZ}>
        <div
          ref={menuRef1}
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG_VI.PBOOK_QUIZ) != -1 && style.active}`}
          style={{ textAlign: 'center' }}>
          {sectionText.txt3}
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG_VI.MOVIE_CONTENTS}>
        <div
          ref={menuRef3}
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG_VI.MOVIE_CONTENTS) != -1 && style.active}`}
          style={{ textAlign: 'center' }}>
          {sectionText.txt4}
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG_VI.AI_SPEAK}>
        <div
          ref={menuRef4}
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG_VI.AI_SPEAK) != -1 && style.active}`}
          style={{ textAlign: 'center' }}>
          AI SPEAK
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG_VI.MOTIVATION}>
        <div
          ref={menuRef2}
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG_VI.MOTIVATION) != -1 && style.active}`}
          style={{ textAlign: 'center' }}>
          {sectionText.txt5}
        </div>
      </Link>
    </div>
  )
}
