'use client'

import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const STYLE_ID = 'page_catalog'

export default function SubPageNavBar() {
  const style = useStyle(STYLE_ID)

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
        pathname.indexOf(SITE_PATH.CATALOG.PBOOK_QUIZ) != -1
      ) {
        if (containerRef.current) {
          containerRef.current.scrollLeft = menuRef1.current.offsetLeft - 20
        }
      }
      if (
        menuRef2.current &&
        pathname.indexOf(SITE_PATH.CATALOG.MOTIVATION) != -1
      ) {
        if (containerRef.current) {
          containerRef.current.scrollLeft = menuRef2.current.offsetLeft - 20
        }
      }
      if (
        menuRef3.current &&
        pathname.indexOf(SITE_PATH.CATALOG.MOVIE_CONTENTS) != -1
      ) {
        if (containerRef.current) {
          containerRef.current.scrollLeft = menuRef3.current.offsetLeft - 20
        }
      }
      if (
        menuRef4.current &&
        pathname.indexOf(SITE_PATH.CATALOG.AI_SPEAK) != -1
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
      <Link href={SITE_PATH.CATALOG.HOME}>
        <div className={`${style.nav_item} ${style.home}`}></div>
      </Link>
      <Link href={SITE_PATH.CATALOG.BASIC}>
        <div
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.BASIC) != -1 && style.active}`}>
          기초 영어
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG.EBOOK}>
        <div
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.EBOOK) != -1 && style.active}`}>
          오디오 스토리북
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG.PBOOK_QUIZ}>
        <div
          ref={menuRef1}
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.PBOOK_QUIZ) != -1 && style.active}`}>
          영어 원서 북퀴즈
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG.MOVIE_CONTENTS}>
        <div
          ref={menuRef3}
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.MOVIE_CONTENTS) != -1 && style.active}`}>
          영상 콘텐츠
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG.AI_SPEAK}>
        <div
          ref={menuRef4}
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.AI_SPEAK) != -1 && style.active}`}>
          AI SPEAK
        </div>
      </Link>
      <Link href={SITE_PATH.CATALOG.MOTIVATION}>
        <div
          ref={menuRef2}
          className={`${style.nav_item} ${pathname.indexOf(SITE_PATH.CATALOG.MOTIVATION) != -1 && style.active}`}>
          학습 동기부여
        </div>
      </Link>
    </div>
  )
}
