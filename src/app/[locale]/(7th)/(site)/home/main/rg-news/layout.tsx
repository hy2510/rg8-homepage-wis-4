'use client'

import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import {
  BackLink,
  Margin,
  Nav,
  NavItem,
} from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const STYLE_ID = 'page_rg_news'

export default function Layout({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()
  const connectNotice = pathname.indexOf('notice') != -1

  const isMobile = useScreenMode() === 'mobile'
  const { country } = useSiteBlueprint()

  return (
    <main className="container compact">
      {isMobile && <Margin height={20} />}
      <BackLink href={SITE_PATH.HOME.MAIN} largeFont colorWhite>
        {t('t326')}
      </BackLink>
      <Margin height={20} />
      <div className={style.rg_news}>
        <Nav>
          <Link href={SITE_PATH.HOME.NOTICE}>
            <NavItem active={connectNotice}>{t('t325')}</NavItem>
          </Link>
          {country.korea && <MenuKorea />}
          {country.vietnam && <MenuVietnam />}
          {country.canada && <MenuCanada />}
        </Nav>
        {children}
      </div>
    </main>
  )
}

function MenuKorea() {
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()
  const connectNewsletter = pathname.indexOf('newsletter') != -1
  const connectNewContents = pathname.indexOf('new-contents') != -1
  const connectInfographic = pathname.indexOf('infographic') != -1
  const connectChallenge = pathname.indexOf('challenge') != -1
  const connectSuperstar = pathname.indexOf('superstar') != -1
  const connectCampaign = pathname.indexOf('campaign') != -1
  const connectGallery = pathname.indexOf('gallery') != -1

  const { isChallengeMenu, isNewsLetter, target } = useSiteBlueprint()
  return (
    <>
      {isNewsLetter && (
        <Link href={SITE_PATH.HOME.NEWS_LETTER}>
          <NavItem active={connectNewsletter}>{t('t327')}</NavItem>
        </Link>
      )}
      <Link href={SITE_PATH.HOME.NEW_CONTENTS}>
        <NavItem active={connectNewContents}>{t('t328')}</NavItem>
      </Link>
      <Link href={SITE_PATH.HOME.INFOGRAPHIC}>
        <NavItem active={connectInfographic}>{t('t329')}</NavItem>
      </Link>
      {isChallengeMenu && (
        <Link href={SITE_PATH.HOME.EVENT_CHALLENGE}>
          <NavItem active={connectChallenge}>{t('t330')}</NavItem>
        </Link>
      )}
      <Link href={SITE_PATH.HOME.EVENT_SUPERSTAR}>
        <NavItem active={connectSuperstar}>{t('t331')}</NavItem>
      </Link>
      <Link href={SITE_PATH.HOME.EVENT_READING_CAMPAIN}>
        <NavItem active={connectCampaign}>{t('t332')}</NavItem>
      </Link>
      {target.academy && (
        <Link href={SITE_PATH.HOME.GALLERY}>
          <NavItem active={connectGallery}>갤러리</NavItem>
        </Link>
      )}
    </>
  )
}

function MenuVietnam() {
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()
  const connectNewContents = pathname.indexOf('new-contents') != -1
  const connectGallery = pathname.indexOf('gallery') != -1

  const { target } = useSiteBlueprint()
  return (
    <>
      <Link href={SITE_PATH.HOME.NEW_CONTENTS}>
        <NavItem active={connectNewContents}>{t('t328')}</NavItem>
      </Link>
      {target.academy && (
        <Link href={SITE_PATH.HOME.GALLERY}>
          <NavItem active={connectGallery}>Gallery</NavItem>
        </Link>
      )}
    </>
  )
}

function MenuCanada() {
  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()
  const connectNewContents = pathname.indexOf('new-contents') != -1
  const connectCampaign = pathname.indexOf('campaign') != -1
  const connectGallery = pathname.indexOf('gallery') != -1

  const { target } = useSiteBlueprint()
  return (
    <>
      <Link href={SITE_PATH.HOME.NEW_CONTENTS}>
        <NavItem active={connectNewContents}>{t('t328')}</NavItem>
      </Link>
      <Link href={SITE_PATH.HOME.EVENT_READING_CAMPAIN}>
        <NavItem active={connectCampaign}>{t('t332')}</NavItem>
      </Link>
      {target.academy && (
        <Link href={SITE_PATH.HOME.GALLERY}>
          <NavItem active={connectGallery}>Gallery</NavItem>
        </Link>
      )}
    </>
  )
}
