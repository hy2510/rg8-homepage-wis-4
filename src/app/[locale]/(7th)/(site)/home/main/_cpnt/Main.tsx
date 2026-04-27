'use client'

import style from './main.module.scss'
import { useDevicePlatform } from '@/7th/__root/ApplicationContext'
import { useSelectStudyLevel } from '@/7th/_client/store/student/daily-learning/selector'
import { useStudentIsLogin } from '@/7th/_client/store/student/info/selector'
import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/7th/_context/CustomerContext'
import { openWindow } from '@/7th/_function/open-window'
import { HomeLayout } from '@/7th/_repository/client/object/main'
import { useScreenMode } from '@/7th/_ui/context/StyleContext'
import HiDodoBannerAni from '@/7th/_ui/modules/HiDodoBannerAni'
import {
  HomeMainCard,
  NoticeBanner,
  QuickMenuLayout,
} from '@/7th/_ui/modules/home-main-components/HomeMainComponent'
import LogIn from '@/7th/_ui/modules/home-main-components/home-main-log-in'
import MainBanner from '@/7th/_ui/modules/home-main-components/home-main-main-banner'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import { isGoTo8th } from '@/external/site-7-8-bridge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useHomeMain } from '../../_cpnt/HomeContext'

export default function Main() {
  const router = useRouter()
  const { customerId } = useCustomerInfo()

  useEffect(() => {
    if (!customerId) {
      router.replace(SITE_PATH.ACCOUNT.MAIN)
    }
  }, [router, customerId])

  const platform = useDevicePlatform()

  if (platform === 'unknown') {
    return <></>
  }
  return <MainComponent platform={platform} />
}

function MainComponent({ platform }: { platform: string }) {
  const isMobile = useScreenMode() === 'mobile'

  const [formfactor, setFormfactor] = useState<'small' | 'medium' | 'full'>(
    'small',
  )
  useEffect(() => {
    const findFormpactor = () => {
      const width = window.innerWidth

      if (width >= 1024) {
        setFormfactor('full')
      } else if (width >= 600) {
        setFormfactor('medium')
      } else {
        setFormfactor('small')
      }
    }
    findFormpactor()

    window.addEventListener('resize', findFormpactor)
    return () => window.removeEventListener('resize', findFormpactor)
  }, [])

  const maketingEventTracker = useTrack()
  useEffect(() => {
    maketingEventTracker.eventAction('홈 화면 조회')
  }, [maketingEventTracker])

  const router = useRouter()
  const { target, country, isPaymentable, custom } = useSiteBlueprint()
  const disableRankMenu = custom?.menu?.ranking?.disableAll

  const mainData = useHomeMain()

  const level = useSelectStudyLevel() || ''
  const isLogin = useStudentIsLogin()
  const onClickMainLoginButton = () => {
    if (isLogin) {
      maketingEventTracker.eventAction('학습하기 버튼 클릭', {
        version: isGoTo8th() ? '8th' : '7th',
      })
      // 7차 - 8차 연동 부분 체크 - 8차 화면으로 이동
      if (isGoTo8th()) {
        // 8차 사이트는 직접 이동
        window.location.href = '/8th/forwarder'
        return
      }

      if (level !== 'PK') {
        router.push(SITE_PATH.LIBRARY.HOME)
      } else {
        router.push(SITE_PATH.BASIC.HOME)
      }
    } else {
      router.push(SITE_PATH.ACCOUNT.MAIN)
    }
  }
  const isEnabledTicket =
    platform.toLowerCase() !== 'android' && platform.toLowerCase() !== 'ios'

  if (!mainData) {
    return <main className="container"></main>
  }
  const { important, quickmenu, layout, extra } = mainData

  // 띠배너
  const bannerTime = Date.now()
  const bannerStartDate = getDate(important?.start)
  const bannerEndDate = getDate(important?.end)
  const bannerLink = important?.link
  const isBannerLinkExternal =
    bannerLink?.startsWith('http:') || bannerLink?.startsWith('https:')
  const bannerTarget = undefined

  const isShowBanner =
    important &&
    bannerTime - bannerStartDate.getTime() >= 0 &&
    bannerEndDate.getTime() - bannerTime >= 0

  const isHidodoBanner = country.korea && (target.private || target.school)

  // 퀵메뉴
  const activeQuickMenu = {
    title: quickmenu.title,
    items: [
      ...quickmenu.items.filter(
        (item) =>
          !disableRankMenu || (disableRankMenu && item.link !== '/ranking'),
      ),
    ],
  }
  const isQuickMenuAvail =
    activeQuickMenu && activeQuickMenu.items && activeQuickMenu.items.length > 0
  // 레이아웃
  const isLayoutAvail = layout && layout.length > 0
  const allCell: HomeLayout[] = []
  layout
    .filter((row) => row.length > 0)
    .forEach((row) => {
      row
        .filter(
          (row) =>
            !disableRankMenu || (disableRankMenu && row.link !== '/ranking'),
        )
        .forEach((item) => {
          allCell.push(item)
        })
    })

  return (
    <main className="container">
      {/* 띠 베너 */}
      {isShowBanner && (
        <NoticeBanner
          bgColor={important.bgColor}
          href={bannerLink}
          target={bannerTarget}
          isExternalLink={isBannerLinkExternal}>
          <div
            dangerouslySetInnerHTML={{
              __html: important.message,
            }}
          />
        </NoticeBanner>
      )}
      <div className={`${style.home_layout} ${isMobile ? style.mobile : ''}`}>
        {/* row 1: 슬라이드배너와 로그인 버튼 추가 */}
        <div className={style.row_banner}>
          {extra.slide.length > 0 && (
            <div className={style.slide_banner}>
              <MainBanner
                banner={extra.slide}
                onExternalLink={(url: string) => {
                  openWindow(url, {
                    external: true,
                    target: '_blank',
                  })
                }}
              />
            </div>
          )}
          <div>
            <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
            {isHidodoBanner && (
              <Link
                href="#"
                target=""
                onClick={(e) => {
                  e.preventDefault()
                  openWindow('https://gohidodo.com/', {
                    external: true,
                    target: '_blank',
                  })
                }}>
                <div className={style.hi_dodo_banner}>
                  <HiDodoBannerAni />
                </div>
              </Link>
            )}
          </div>
        </div>
        {isQuickMenuAvail && (
          <QuickMenuLayout
            isPaymentable={isPaymentable}
            quickmenu={activeQuickMenu}
          />
        )}
        {isLayoutAvail && (
          <div className={`${style.card_grid}`}>
            {allCell.map((col, i) => {
              const span = getSpanSize(col.size, formfactor)

              return (
                <div
                  key={`col_${i}_${i}`}
                  className={style.card_cell}
                  style={{
                    gridColumn: `span ${span}`,
                  }}>
                  <HomeMainCard
                    data={col}
                    extra={extra}
                    isEnabledTicket={isEnabledTicket}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

function getDate(dateText?: string): Date {
  if (dateText && dateText.length >= 19) {
    const year = Number(dateText.substring(0, 4))
    const month = Number(dateText.substring(5, 7))
    const day = Number(dateText.substring(8, 10))
    const hour = Number(dateText.substring(11, 13))
    const minute = Number(dateText.substring(14, 16))
    const second = Number(dateText.substring(17, 19))
    return new Date(year, month - 1, day, hour, minute, second)
  }
  return new Date(0)
}

function getSpanSize(
  spanList: number[],
  formfactor?: 'small' | 'medium' | 'full',
): number {
  if (spanList.length === 0 || !formfactor) {
    return 1
  }

  let index = 0
  if (formfactor === 'medium' && spanList.length > 1) {
    index = 1
  } else if (formfactor === 'full' && spanList.length > 2) {
    index = 2
  }
  return spanList[index]
}
