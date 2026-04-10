'use client'

import { Assets } from '@/8th/assets/asset-library'
import CalendarModal from '@/8th/features/achieve/ui/modal/CalendarModal'
import LevelTestInfoModal from '@/8th/features/student/ui/modal/LevelTestInfoModal'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { useIsTabletLarge } from '@/8th/shared/context/ScreenModeContext'
import DropdownMenu from '@/8th/shared/ui/Dropdowns'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  DisplayNoneStyle,
  GlobalNavBarStyle,
  MenuItemStyle,
} from '../styled/SharedStyled'
import { openWindow } from '../utils/open-window'
import { Gap } from './Misc'
import AppUserGuideModal from './modal/app-user-guide/AppUserGuideModal'

/**
 * Daily RG ... More 까지
 */

const MP3_URL = {
  dodo: 'https://util.readinggate.com/Library/DodoABCWorkSheetMP3Info',
  pk: 'https://wcfresource.a1edu.com/NewSystem/AppMobile/webview/randing/prek_workbook_mp3/',
}

export default function GlobalNavBar() {
  // @Language 'common'
  const { t } = useTranslation()

  const { menu } = useCustomerConfiguration()

  const isGnbBottom = useIsTabletLarge('smaller')

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const [isLevelTestOpen, setLevelTestOpen] = useState(false)
  const [isShowAppUserGuideModal, setShowAppUserGuideModal] = useState(false)

  const pathname = usePathname()

  const router = useRouter()

  const dropdownItems: { text: string; onClick: () => void }[] = []
  if (menu.levelTest.open) {
    dropdownItems.push({
      text: 'Level Test',
      onClick: () => setLevelTestOpen(true),
    })
  }

  if (menu.activity.tryAgain.open) {
    dropdownItems.push({
      text: 'Try Again',
      onClick: () => router.push(SITE_PATH.NW82.TRYAGAIN),
    })
  }
  if (menu.account.setting.open) {
    dropdownItems.push({
      text: 'Setting',
      onClick: () => router.push(SITE_PATH.NW82.ACCOUNTINFO_SETTING),
    })
  }
  if (menu.eb.collections.workbooks.open) {
    dropdownItems.push({
      text: 'Workbook Units',
      onClick: () => router.push(`${SITE_PATH.NW82.EB_WORKBOOK}/ka`),
    })
  }
  if (menu.dodoAbcWorkbookMp3.open && menu.eb.readingLevel.level.dodoAbc.open) {
    dropdownItems.push({
      text: 'PK Workbook MP3',
      onClick: () =>
        openWindow(MP3_URL.dodo, {
          external: true,
          target: '_blank',
          feature: 'noopener, noreferrer',
        }),
    })
  }
  if (menu.pkWorkbookMp3.open && menu.eb.readingLevel.level.prekClassic.open) {
    dropdownItems.push({
      text: 'PK Classic Workbook MP3',
      onClick: () =>
        openWindow(MP3_URL.pk, {
          external: true,
          target: '_blank',
          feature: 'noopener, noreferrer',
        }),
    })
  }

  // 랭킹 메뉴 추가
  if (true) {
    dropdownItems.push({
      text: t('t8th229'),
      onClick: () => router.push(SITE_PATH.NW82.RANKING),
    })
  }

  // 이용 가이드 보기 안내 메뉴 추가
  if (true) {
    dropdownItems.push({
      text: t('t8th317'),
      onClick: () => setShowAppUserGuideModal(true),
    })
  }

  if (isGnbBottom) {
    // 더빙룸 메뉴 제거
    // dropdownItems.splice(3, 0, {
    //   text: 'Dubbing',
    //   onClick: () => router.push(SITE_PATH.NW82.EB_WORKBOOK),
    // })
  }

  return (
    <GlobalNavBarStyle zIndex={isDropdownOpen ? 1000 : 100}>
      <div className="logo-container">
        <Link
          href={'#'}
          onClick={() => (window.location.href = SITE_PATH.HOME.MAIN)}>
          <Image src={Assets.Image.AppLogo} alt="App Logo" className="logo" />
        </Link>
      </div>

      <div className="menu-container">
        {menu.dailyRg.open && (
          <MenuItem
            icon={Assets.Icon.Gnb.readingPath}
            text="RG PATH"
            isActive={pathname.includes(SITE_PATH.NW82.DAILY_RG)}
            linkUrl={SITE_PATH.NW82.DAILY_RG}
          />
        )}

        {menu.eb.open && (
          <MenuItem
            icon={Assets.Icon.Gnb.ebooks}
            text="LIBRARY"
            isActive={
              pathname.includes(SITE_PATH.NW82.EB) ||
              pathname.includes(SITE_PATH.NW82.PB)
            }
            linkUrl={SITE_PATH.NW82.EB}
          />
        )}

        {/* {menu.pb.open && (
          <MenuItem
            icon={Assets.Icon.Gnb.bookQuiz}
            text="P-BOOK QUIZ"
            isActive={pathname.includes(SITE_PATH.NW82.PB)}
            linkUrl={SITE_PATH.NW82.PB}
          />
        )} */}

        {menu.activity.open && (
          <MenuItem
            icon={Assets.Icon.Gnb.myActivity}
            text="MY PAGE"
            isActive={pathname.includes(SITE_PATH.NW82.ACTIVITY)}
            linkUrl={SITE_PATH.NW82.ACTIVITY}
          />
        )}

        {menu.calendar.open && (
          <DisplayNoneStyle hideOnLabtopS>
            {/* // 더빙룸 메뉴 제거
          <div className="divider" />
          <Gap size={10} />
          <MenuItem icon={Assets.Icon.Gnb.dubbing} text="DUBBING" /> 
          */}
            <Gap size={10} />
            <div className="divider" />
            <Gap size={10} />
            <MenuItemCalendar
              text="CALENDAR"
              onClick={() => setCalendarOpen(true)}
            />
          </DisplayNoneStyle>
        )}

        {dropdownItems.length > 0 && (
          <MenuItem
            icon={Assets.Icon.Gnb.more}
            text="MORE"
            isActive={false}
            isDropdown={true}
            onDropdownToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            isOpen={isDropdownOpen}
            dropdownItems={dropdownItems}
          />
        )}
      </div>
      {isCalendarOpen && (
        <CalendarModal onCloseModal={() => setCalendarOpen(false)} />
      )}
      {isLevelTestOpen && (
        <LevelTestInfoModal onCloseModal={() => setLevelTestOpen(false)} />
      )}
      {isShowAppUserGuideModal && (
        <AppUserGuideModal
          onCloseModal={() => setShowAppUserGuideModal(false)}
        />
      )}
    </GlobalNavBarStyle>
  )
}

interface MenuItemProps {
  icon?: StaticImageData
  text?: string
  isActive?: boolean
  isDropdown?: boolean
  onDropdownToggle?: () => void
  isOpen?: boolean
  dropdownItems?: { text: string; onClick: () => void }[]
  linkUrl?: string
  onClick?: () => void
}

function MenuItem({
  icon,
  text,
  isActive,
  isDropdown,
  onDropdownToggle,
  isOpen,
  dropdownItems,
  linkUrl,
  onClick,
}: MenuItemProps) {
  const isGnbBottom = useIsTabletLarge('smaller')

  const [dropDownPosition, setDropDownPosition] = useState<
    'topRight' | 'rightCenter' | 'rightBottom'
  >('topRight')

  useEffect(() => {
    let mediaQuery: MediaQueryList | undefined = undefined
    const handleChange = () => {
      if (mediaQuery && !isGnbBottom) {
        if (mediaQuery.matches) {
          setDropDownPosition('rightBottom')
        } else {
          setDropDownPosition('rightCenter')
        }
      }
    }

    if (window && isDropdown) {
      if (isGnbBottom) {
        setDropDownPosition('topRight')
      } else {
        const query = `(max-height: 699px)`
        mediaQuery = window.matchMedia(query)
        if (mediaQuery) {
          handleChange()
          mediaQuery.addEventListener('change', handleChange)
        }
      }
    }
    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [isDropdown, isGnbBottom])

  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (linkUrl) {
      router.push(linkUrl)
    } else if (isDropdown && onDropdownToggle) {
      onDropdownToggle()
    }
  }

  return (
    <MenuItemStyle
      className={isActive ? 'is-active' : ''}
      onClick={handleClick}>
      <div className="menu-item-icon">
        <Image
          src={icon as StaticImageData}
          alt={text || ''}
          width={34}
          height={34}
        />
      </div>

      <div className="menu-item-text">{text}</div>

      {isDropdown && isOpen && dropdownItems && (
        <DropdownMenu
          items={dropdownItems}
          isOpen={isOpen}
          onClose={() => {
            if (onDropdownToggle) {
              onDropdownToggle()
            }
          }}
          position={dropDownPosition}
        />
      )}
    </MenuItemStyle>
  )
}

function MenuItemCalendar({
  text,
  onClick,
}: {
  text: string
  onClick?: () => void
}) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const dayNumber = new Date().getDate()

  return (
    <MenuItemStyle onClick={handleClick}>
      <div
        className="menu-item-icon"
        style={{ position: 'relative', display: 'inline-block' }}>
        <Image
          src={Assets.Icon.Gnb.calendar}
          alt={text || ''}
          width={34}
          height={34}
        />
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 0,
            width: 34,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <span
            style={{
              color: '#8A2BE2',
              fontWeight: '900',
              padding: '0',
              fontSize: 11,
            }}>
            {dayNumber}
          </span>
        </div>
      </div>

      <div className="menu-item-text">{text}</div>
    </MenuItemStyle>
  )
}
