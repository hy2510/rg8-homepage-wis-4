'use client'

import { useApplicationType } from '@/7th/__root/ApplicationContext'
import { useStudentAvatar } from '@/7th/_client/store/student/avatar/selector'
import { useStudentContinuousStudy } from '@/7th/_client/store/student/continuous-study/selector'
import { useSelectStudyLevel } from '@/7th/_client/store/student/daily-learning/selector'
import {
  useStudentInfo,
  useStudentIsLogin,
} from '@/7th/_client/store/student/info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import {
  useScreenMode,
  useStyle,
  useThemeMode,
} from '@/7th/_ui/context/StyleContext'
import StreakFire from '@/7th/_ui/modules/StreakFire'
import BookSearchBar from '@/7th/_ui/modules/library-book-search-bar/BookSearchBar'
import SITE_PATH from '@/app/site-path'
import {
  isAvailable8thCustomer,
  updateSiteBridge,
} from '@/external/site-7-8-bridge'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { CalendarModal } from './CalendarModal'
import { CONTINUOUS_SETTING, MyRgModal } from './MyRgModal'
import { NoticeModal } from './NoticeModal'
import { QuestModal } from './QuestModal'
import { StreakModal } from './StreakModal'

const STYLE_ID = 'global_header'

const MENU = {
  home: {
    key: '/home',
    href: SITE_PATH.HOME.MAIN,
    icon: '/src/images/@global-header/home.svg',
    mobileIconOn: '/src/images/@global-header/home_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/home_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/home_on_mobile_white.svg',
    mobileDarkIconOff: '/src/images/@global-header/home_off_mobile_white.svg',
    name: '홈',
  },
  about: {
    key: '/about',
    href: SITE_PATH.HOME.MAIN,
    icon: '/src/images/@global-header/about_rg.svg',
    mobileIconOn: '/src/images/@global-header/about_rg_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/about_rg_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/about_rg_on_mobile_white.svg',
    mobileDarkIconOff:
      '/src/images/@global-header/about_rg_off_mobile_white.svg',
    name: '소개',
  },
  trial: {
    key: '/trial',
    href: SITE_PATH.HOME.MAIN,
    icon: '/src/images/@global-header/trial.svg',
    mobileIconOn: '/src/images/@global-header/trial_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/trial_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/trial_on_mobile_white.svg',
    mobileDarkIconOff: '/src/images/@global-header/trial_off_mobile_white.svg',
    name: '체험',
  },
  study: {
    key: '/library',
    href: SITE_PATH.LIBRARY.HOME,
    icon: '/src/images/@global-header/study_room.svg',
    mobileIconOn: '/src/images/@global-header/study_room_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/study_room_off_mobile.svg',
    mobileDarkIconOn:
      '/src/images/@global-header/study_room_on_mobile_white.svg',
    mobileDarkIconOff:
      '/src/images/@global-header/study_room_off_mobile_white.svg',
    name: '학습',
  },
  review: {
    key: '/review',
    href: SITE_PATH.REVIEW.MAIN,
    icon: '/src/images/@global-header/review.svg',
    mobileIconOn: '/src/images/@global-header/review_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/review_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/review_on_mobile_white.svg',
    mobileDarkIconOff: '/src/images/@global-header/review_off_mobile_white.svg',
    name: '리뷰',
  },
  ranking: {
    key: '/ranking',
    href: SITE_PATH.RANKING.MAIN,
    icon: '/src/images/@global-header/ranking.svg',
    mobileIconOn: '/src/images/@global-header/ranking_on_mobile.svg',
    mobileIconOff: '/src/images/@global-header/ranking_off_mobile.svg',
    mobileDarkIconOn: '/src/images/@global-header/ranking_on_mobile_white.svg',
    mobileDarkIconOff:
      '/src/images/@global-header/ranking_off_mobile_white.svg',
    name: '랭킹',
  },
  basic: {
    key: '/basic',
    href: SITE_PATH.BASIC.HOME,
    icon: '/src/images/@global-header/kids.svg',
    mobileIconOn: '/src/images/@global-header/kids_m_on.svg',
    mobileIconOff: '/src/images/@global-header/kids_m_off.svg',
    mobileDarkIconOn: '/src/images/@global-header/kids_m_on_white.svg',
    mobileDarkIconOff: '/src/images/@global-header/kids_m_off_white.svg',
    name: '기초',
  },
}

// 공통상단
export default function Gheader() {
  // @Language 'common'
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'
  const appType = useApplicationType()
  const isShowSignUp = appType === 'private'

  const [modalViewName, setModalViewName] = useState<
    ModalViewNameType | undefined
  >(undefined)

  const logOnStatus = useStudentIsLogin()
  const level = useSelectStudyLevel() || undefined

  const onCloseModal = useCallback(() => {
    setModalViewName(undefined)
  }, [])
  const onShowModal = useCallback((name: ModalViewNameType) => {
    setModalViewName(name)
  }, [])

  const pathname = usePathname()
  const { customLogo, custom } = useSiteBlueprint()

  const styleDodoABC = `${pathname.indexOf(SITE_PATH.BASIC.DODO_ABC) != -1 ? ` ${style.dodo_abc}` : ''}`

  useEffect(() => {
    if (modalViewName) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [modalViewName])

  const styleCatalog = `${pathname.indexOf(SITE_PATH.CATALOG.HOME) != -1 || pathname.indexOf(SITE_PATH.CATALOG_VI.HOME) != -1 ? style.about : ''}`

  let headerColorStyle: CSSProperties | undefined = undefined
  const logoBgStyle: CSSProperties = {
    width: 'auto',
    height: 'auto',
    maxWidth: isMobile ? '120px' : '250px',
    maxHeight: isMobile ? '40px' : '52px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: '2.5px 5px',
    display: 'block',
  }
  if (custom) {
    if (custom.themeColor) {
      headerColorStyle = {
        backgroundColor: custom.themeColor,
      }
    }
    if (custom.logoBackgroundColor) {
      logoBgStyle.backgroundColor = custom.logoBackgroundColor
    }
  }

  const onClickGoTo8th = () => {
    updateSiteBridge('nw')
    window.location.href = `/${language}/8th/forwarder`
  }

  const isAvailable8thCustomerFlag = logOnStatus && isAvailable8thCustomer()

  if (appType === 'app' && !logOnStatus) {
    return <></>
  }
  return (
    <>
      <div
        className={`${style.global_header}${styleDodoABC} ${styleCatalog}`}
        style={headerColorStyle}>
        <div className={`${style.global_header_container} container`}>
          <div className={style.company_logo}>
            <Link href={custom?.homeLogoAction || SITE_PATH.HOME.MAIN}>
              {customLogo ? (
                <Image
                  alt=""
                  src={customLogo}
                  width={240}
                  height={80}
                  style={logoBgStyle}
                />
              ) : (
                <Image
                  alt=""
                  src="/src/images/@global-header/company_logo_white.svg"
                  width={48}
                  height={40}
                  style={{ display: 'block' }}
                />
              )}
            </Link>
          </div>
          <GNBMenu
            pathname={pathname}
            isLogOn={logOnStatus}
            isMobile={isMobile}
            isShowSignUp={isShowSignUp}
            onClick={onShowModal}
            studyLevel={level}
          />
        </div>
      </div>
      <div className={style.global_header_back_spcae}></div>
      {modalViewName === 'calendar' && (
        <CalendarModal onCloseModal={onCloseModal} />
      )}
      {modalViewName === 'streak' && (
        <StreakModal onCloseModal={onCloseModal} />
      )}
      {modalViewName === 'quest' && <QuestModal onCloseModal={onCloseModal} />}
      {modalViewName === 'notice' && (
        <NoticeModal onCloseModal={onCloseModal} />
      )}
      {modalViewName === 'my' && <MyRgModal onCloseModal={onCloseModal} />}
      {isAvailable8thCustomerFlag && (
        <Link
          href={'#'}
          prefetch={false}
          onClick={(e) => {
            e.preventDefault()
            onClickGoTo8th()
          }}>
          <div className="go_to_8th_bar">
            <div className="title">
              <span>🎉 {t('t933')}</span>
              <span className="icon"></span>
            </div>
            <div className="description">{t('t934')}</div>
          </div>
        </Link>
      )}
    </>
  )
}

type ModalViewNameType = 'calendar' | 'streak' | 'quest' | 'notice' | 'my'
function GNBMenu({
  pathname,
  isLogOn,
  isMobile,
  isShowSignUp,
  studyLevel,
  onClick,
}: {
  pathname: string
  isLogOn: boolean
  isMobile: boolean
  isShowSignUp?: boolean
  studyLevel?: string
  onClick: (name: ModalViewNameType) => void
}) {
  if (isLogOn) {
    return (
      <>
        <GnbLogOn
          pathname={pathname}
          isMobile={isMobile}
          studyLevel={studyLevel}
          onClick={onClick}
        />
        {isMobile && <GnbLogOnMobile pathname={pathname} />}
      </>
    )
  } else {
    return (
      <>
        <GnbLogOff
          pathname={pathname}
          isMobile={isMobile}
          isShowSignUp={isShowSignUp}
        />
        {isMobile && <GnbLogOffMobile pathname={pathname} />}
      </>
    )
  }
}

function GnbLogOn({
  pathname,
  isMobile,
  studyLevel,
  onClick,
}: {
  pathname: string
  isMobile?: boolean
  studyLevel?: string
  onClick: (name: ModalViewNameType) => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { custom } = useSiteBlueprint()
  const disableRankMenu = custom?.menu?.ranking?.disableAll

  const { userAvatar } = useStudentAvatar()
  const studentPoint = useStudentInfo().rgPoint
  let medalStyle = ''
  if (studentPoint >= 50000) {
    medalStyle = style.titanium
  } else if (studentPoint >= 40000) {
    medalStyle = style.platinum
  } else if (studentPoint >= 30000) {
    medalStyle = style.gold
  } else if (studentPoint >= 20000) {
    medalStyle = style.silver
  } else if (studentPoint >= 10000) {
    medalStyle = style.bronze
  }

  const onClickMy = () => {
    onClick('my')
  }

  return (
    <>
      {!isMobile && (
        <div className={style.gnb_log_off}>
          <GnbButton
            active={pathname.indexOf(MENU.basic.key) != -1}
            imgSrc={MENU.basic.icon}
            menuName={t('t557')} // 기초
            href={MENU.basic.href}
          />
          <GnbButton
            active={pathname.indexOf(MENU.study.key) != -1}
            imgSrc={MENU.study.icon}
            menuName={t('t558')} // 도서
            href={MENU.study.href}
          />
          <GnbButton
            active={pathname.indexOf(MENU.review.key) != -1}
            imgSrc={MENU.review.icon}
            menuName={t('t032')}
            href={MENU.review.href}
          />
          {!disableRankMenu && (
            <GnbButton
              active={pathname.indexOf(MENU.ranking.key) != -1}
              imgSrc={MENU.ranking.icon}
              menuName={t('t033')}
              href={MENU.ranking.href}
            />
          )}
        </div>
      )}
      <div className={style.option_buttons}>
        <OptionButton
          isCalendar
          onClick={() => {
            onClick('calendar')
          }}
        />
        <OptionButton
          isStreak
          imgSrc="/src/images/@global-header/streak.svg"
          onClick={() => {
            onClick('streak')
          }}
        />
        <OptionButton
          imgSrc="/src/images/@global-header/quest.svg"
          onClick={() => {
            onClick('quest')
          }}
        />
        {/* 
        * FIXME: 2024-03-14 결정사항: 알림기능 부제로 인하여 아이콘 숨김 처리
      <OptionButton
        imgSrc="/src/images/@global-header/notice.svg"
        onClick={() => {
          onClick('notice')
        }}
        isNotice={true}
      /> 
      */}
        <div className={style.user_avatar_area}>
          {/* 명예의 전당 수상자 왕관 : titanium, platinum, gold, silver, bronze */}
          <div
            className={`${style.vip} ${medalStyle}`}
            onClick={onClickMy}
            style={{ cursor: 'pointer' }}></div>
          <OptionButton
            isAvatar
            imgSrc={userAvatar.imageCircle}
            onClick={onClickMy}
          />
          {/* 학습자의 레벨 */}
          {studyLevel && (
            <div
              className={style.user_level}
              onClick={onClickMy}
              style={{ cursor: 'pointer' }}>
              {studyLevel}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// 공통하단 > 로그온 상태의 메뉴 (모바일)
const GnbLogOnMobile = ({ pathname }: { pathname: string }) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { custom } = useSiteBlueprint()
  const disableRankMenu = custom?.menu?.ranking?.disableAll

  const [searchOn, _searchOn] = useState(false)

  /*
  useEffect(() => {
    if (searchOn) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [])
  */
  const isDarkMode = useThemeMode() === 'dark'

  return (
    <div className={style.gnb_log_on_mobile}>
      <MenuButton
        active={pathname.indexOf(MENU.basic.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.basic.mobileDarkIconOff : MENU.basic.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.basic.mobileDarkIconOn : MENU.basic.mobileIconOn
        }
        name={t('t557')} // 기초
        href={MENU.basic.href}
      />
      <MenuButton
        active={pathname.indexOf(MENU.study.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.study.mobileDarkIconOff : MENU.study.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.study.mobileDarkIconOn : MENU.study.mobileIconOn
        }
        name={t('t558')} // 도서
        href={MENU.study.href}
      />
      <SearchButton
        searchOn={searchOn}
        onChangeSearchState={(isOn) => {
          _searchOn(isOn)
        }}
      />
      <MenuButton
        active={pathname.indexOf(MENU.review.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.review.mobileDarkIconOff : MENU.review.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.review.mobileDarkIconOn : MENU.review.mobileIconOn
        }
        name={t('t032')}
        href={MENU.review.href}
      />
      <MenuButton
        active={pathname.indexOf(MENU.ranking.key) != -1}
        imgSrcBtnOff={
          isDarkMode
            ? MENU.ranking.mobileDarkIconOff
            : MENU.ranking.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.ranking.mobileDarkIconOn : MENU.ranking.mobileIconOn
        }
        name={t('t033')}
        href={MENU.ranking.href}
        isGone={disableRankMenu}
      />
    </div>
  )
}

function GnbLogOff({
  pathname,
  isMobile,
  isShowSignUp,
}: {
  pathname: string
  isMobile?: boolean
  isShowSignUp?: boolean
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const { custom } = useSiteBlueprint()

  return (
    <>
      {!isMobile && (
        <div className={style.gnb_log_on}>
          {/* 
          Logoff 상태에서 상단 메뉴 숨김처리
          <GnbButton
            active={pathname.indexOf(MENU.home.key) != -1}
            imgSrc={MENU.home.icon}
            menuName={t('t028')}
            href={MENU.home.href}
          />
          <GnbButton
            active={pathname.indexOf(MENU.about.key) != -1}
            imgSrc={MENU.about.icon}
            menuName={t('t029')}
            href={MENU.about.href}
          />
          <GnbButton
            active={pathname.indexOf(MENU.trial.key) != -1}
            imgSrc={MENU.trial.icon}
            menuName={t('t030')}
            href={MENU.trial.href}
          /> */}
        </div>
      )}
      <div className={style.sign_buttons}>
        {!custom?.menu?.hideSignInButton && (
          <Link href={SITE_PATH.ACCOUNT.MAIN}>{t('t214')}</Link>
        )}
        {isShowSignUp && (
          <Link href={SITE_PATH.ACCOUNT.SIGN_UP}>{t('t267')}</Link>
        )}
      </div>
    </>
  )
}

// 공통하단 > 로그오프 상태의 메뉴 (모바일)
const GnbLogOffMobile = ({ pathname }: { pathname: string }) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const isDarkMode = useThemeMode() === 'dark'

  return (
    <div className={style.gnb_log_off_mobile}>
      {/*
      <MenuButton
        active={pathname.indexOf(MENU.home.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.home.mobileDarkIconOff : MENU.home.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.home.mobileDarkIconOn : MENU.home.mobileIconOn
        }
        name={t('t028')}
        href={MENU.home.href}
      />
      <MenuButton
        active={pathname.indexOf(MENU.about.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.about.mobileDarkIconOff : MENU.about.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.about.mobileDarkIconOn : MENU.about.mobileIconOn
        }
        name={t('t029')}
        href={MENU.about.href}
      />
      <MenuButton
        active={pathname.indexOf(MENU.trial.key) != -1}
        imgSrcBtnOff={
          isDarkMode ? MENU.trial.mobileDarkIconOff : MENU.trial.mobileIconOff
        }
        imgSrcBtnOn={
          isDarkMode ? MENU.trial.mobileDarkIconOn : MENU.trial.mobileIconOn
        }
        name={t('t030')}
        href={MENU.trial.href}
      />
       */}
    </div>
  )
}

// 공통상단 > 메뉴 버튼
const GnbButton = ({
  menuName,
  active,
  href,
  imgSrc,
}: {
  menuName: string
  active: boolean
  href: string
  imgSrc: string
}) => {
  const style = useStyle(STYLE_ID)
  return (
    <Link href={href}>
      <div className={`${style.gnb_button} ${active && style.active}`}>
        <Image alt="" src={imgSrc} width={24} height={24} />
        <span>{menuName}</span>
      </div>
    </Link>
  )
}

// 옵션 버튼
const OptionButton = ({
  isCalendar,
  isAvatar,
  isStreak,
  isNotice,
  onClick,
  imgSrc = '',
}: {
  isCalendar?: boolean
  isStreak?: boolean
  isAvatar?: boolean
  isNotice?: boolean
  onClick: () => void
  imgSrc?: string
}) => {
  const style = useStyle(STYLE_ID)

  const date = new Date()
  const today = ('0' + date.getDate()).slice(-2)
  const monthNames = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ]
  const mon = monthNames[date.getMonth()]

  const {
    continuous: continuousDay,
    isTodayActive,
    isViewModeNewType,
  } = useStudentContinuousStudy()

  const { custom } = useSiteBlueprint()
  let calendarStyle: CSSProperties | undefined = undefined
  if (custom && custom.calendarTextColor) {
    calendarStyle = {
      color: custom.calendarTextColor,
    }
  }

  return (
    <>
      {isCalendar ? (
        <div className={style.option_button} onClick={onClick}>
          <div className={style.calendar}>
            <div className={style.date}>
              <div className={style.month} style={calendarStyle}>
                {mon}
              </div>
              <div className={style.today} style={calendarStyle}>
                {today}
              </div>
            </div>
            <div className={style.calendar_icon}>
              <Image
                alt=""
                src="/src/images/@global-header/calendar.svg"
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>
      ) : isStreak ? (
        <>
          <div
            className={`${style.option_button} ${!isViewModeNewType ? style.streak_realistic : ''}`}
            onClick={() => {
              isViewModeNewType && onClick()
            }}>
            <div className={style.streak}>
              {!continuousDay ? (
                <>
                  <div className={style.txt_days}></div>
                  <Image
                    alt=""
                    src={'/src/images/@global-header/streak.svg'}
                    width={28}
                    height={28}
                  />
                </>
              ) : (
                <>
                  <div className={style.txt_days} style={{ color: '#fff' }}>
                    {continuousDay >= CONTINUOUS_SETTING.CONTINUOUS_MAX_DAY
                      ? 'Max'
                      : continuousDay}
                  </div>

                  {isViewModeNewType ? (
                    <div
                      className={`${style.streak_fire} ${isTodayActive ? style.today_completed : ''}`}>
                      <StreakFire />
                    </div>
                  ) : (
                    <Image
                      alt=""
                      src={`/src/images/@global-header/${isTodayActive ? 'streak_on' : 'streak'}.svg`}
                      width={28}
                      height={28}
                      style={{ opacity: isTodayActive ? '1' : '0.5' }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </>
      ) : isAvatar ? (
        <div
          className={`${style.option_button} ${style.avatar}`}
          onClick={onClick}>
          <Image alt="" src={imgSrc} width={40} height={40} />
        </div>
      ) : (
        <div className={style.option_button} onClick={onClick}>
          {/* 새로운 알림이 있을 때 표시되는 점 */}
          {isNotice && <div className={style.new_dot}></div>}
          <Image alt="" src={imgSrc} width={26} height={26} />
        </div>
      )}
    </>
  )
}

const SearchButton = ({
  searchOn,
  onChangeSearchState,
}: {
  searchOn: boolean
  onChangeSearchState?: (isOn: boolean) => void
}) => {
  const style = useStyle(STYLE_ID)

  const imgSrc = searchOn
    ? '/src/images/delete-icons/x_white.svg'
    : '/src/images/search-icons/search_white.svg'
  const imgSize = searchOn ? 28 : 24
  return (
    <div className={style.search_button}>
      <div
        className={`${style.search_toggle} ${searchOn && style.active}`}
        onClick={() => onChangeSearchState && onChangeSearchState(!searchOn)}>
        <Image src={imgSrc} width={imgSize} height={imgSize} alt="" />
      </div>
      {searchOn && (
        <div className={style.search_area}>
          {/* 검색필드 */}
          {/* 아이콘들 */}
          <BookSearchBar
            isMobile={true}
            onCloseBookSearchPopup={() =>
              onChangeSearchState && onChangeSearchState(false)
            }
          />
        </div>
      )}
    </div>
  )
}

const MenuButton = ({
  imgSrcBtnOff,
  imgSrcBtnOn,
  name,
  active,
  href,
  isGone,
}: {
  imgSrcBtnOff: string
  imgSrcBtnOn: string
  name: string
  active: boolean
  href: string
  isGone?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  if (isGone) {
    return (
      <Image
        src={
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
        }
        width={24}
        height={24}
        alt=""
      />
    )
  }

  const imgSrc = active ? imgSrcBtnOn : imgSrcBtnOff
  return (
    <Link href={href}>
      <div className={style.menu_button}>
        <Image src={imgSrc} width={24} height={24} alt="" />
        <div className={`${style.menu_name} ${active && style.active}`}>
          {name}
        </div>
      </div>
    </Link>
  )
}
