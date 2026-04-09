'use client'

import { useDevicePlatform } from '@/7th/__root/ApplicationContext'
import { useStudentIsLogin } from '@/7th/_client/store/student/info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
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

  const { target, country } = useSiteBlueprint()
  const isMobile = useScreenMode() === 'mobile'

  return (
    <main className={`${style.rg_membership} container`}>
      {isMobile && <div></div>}
      <NavBar>
        {country.korea && target.private && <MenuPrivateKorea />}
        {country.korea && target.school && <MenuSchoolKorea />}
        {country.vietnam && target.private && <MenuPrivateVietnam />}
      </NavBar>
      <div className={style.contents_box}>{children}</div>
    </main>
  )
}

function MenuPrivateVietnam() {
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()
  const isLogin = useStudentIsLogin()

  const platform = useDevicePlatform()
  const isAppLaunch = platform === 'Android' || platform === 'iOS'

  return (
    <>
      {isLogin && (
        <>
          <NavItem
            active={pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_PAYMENT) != -1}
            href={SITE_PATH.HOME.MEMBERSHIP_PAYMENT}>
            {/* 이용권 구매 */}
            {t('t732')}
          </NavItem>
          {!isAppLaunch && (
            <NavItem
              active={pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_TICKET) != -1}
              href={SITE_PATH.HOME.MEMBERSHIP_TICKET}>
              {/* 티켓 등록 */}
              {t('t713')}
            </NavItem>
          )}
          <NavItem
            active={
              pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_PAYMENT_HISTORY) != -1
            }
            href={SITE_PATH.HOME.MEMBERSHIP_PAYMENT_HISTORY}>
            {/* 구매 내역 */}
            {t('t734')}
          </NavItem>
        </>
      )}
    </>
  )
}

function MenuPrivateKorea() {
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()
  const isLogin = useStudentIsLogin()

  const platform = useDevicePlatform()
  const isAppLaunch = platform === 'Android' || platform === 'iOS'

  return (
    <>
      {!isAppLaunch && (
        // MEMO : App 결제인 경우, 멤버쉽 소개 화면 보여주지 않음
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_INTRODUCE) != -1}
          href={SITE_PATH.HOME.MEMBERSHIP_INTRODUCE}>
          {t('t335')}
        </NavItem>
      )}
      {isLogin && (
        <>
          <NavItem
            active={pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_PAYMENT) != -1}
            href={SITE_PATH.HOME.MEMBERSHIP_PAYMENT}>
            {/* 이용권 구매 */}
            {t('t732')}
          </NavItem>
          {!isAppLaunch && (
            <NavItem
              active={pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_TICKET) != -1}
              href={SITE_PATH.HOME.MEMBERSHIP_TICKET}>
              {/* 티켓 등록 */}
              {t('t713')}
            </NavItem>
          )}
          <NavItem
            active={
              pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_PAYMENT_HISTORY) != -1
            }
            href={SITE_PATH.HOME.MEMBERSHIP_PAYMENT_HISTORY}>
            {/* 구매 내역 */}
            {t('t734')}
          </NavItem>
        </>
      )}
      <NavItem
        active={pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_REFUND_POLICY) != -1}
        href={SITE_PATH.HOME.MEMBERSHIP_REFUND_POLICY}>
        {t('t336')}
      </NavItem>
      <NavItem
        active={pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_SERVICE_TERM) != -1}
        href={SITE_PATH.HOME.MEMBERSHIP_SERVICE_TERM}>
        {t('t297')}
      </NavItem>
      <NavItem
        active={
          pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_PRIVACY_POLICY) != -1
        }
        href={SITE_PATH.HOME.MEMBERSHIP_PRIVACY_POLICY}>
        {t('t299')}
      </NavItem>
    </>
  )
}

function MenuSchoolKorea() {
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()

  return (
    <>
      <NavItem
        active={
          pathname.indexOf(SITE_PATH.HOME.MEMBERSHIP_SCHOOL_PRIVACY_POLICY) !=
          -1
        }
        href={SITE_PATH.HOME.MEMBERSHIP_SCHOOL_PRIVACY_POLICY}>
        {t('t299')}
      </NavItem>
    </>
  )
}
