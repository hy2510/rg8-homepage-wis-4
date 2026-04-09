import SITE_PATH, { CUSTOMER_CENTER_URL } from '@/app/site-path'
import { ENGLISH, KOREAN } from '@/localization/localize-config'
import { Customer } from './customer'

export interface SiteBlueprint {
  target: {
    private: boolean
    school: boolean
    academy: boolean
  }
  country: {
    korea: boolean
    vietnam: boolean
    indonesia: boolean
    canada: boolean
    outer: boolean
  }
  studyOpen: {
    EB: boolean
    PB: boolean
    LC: boolean
    MS: boolean
    PD: boolean
    JN: boolean
    ES: boolean
    PreK: boolean
    DodoABC: boolean
    Speak: boolean
  }
  studentOpen: {
    changeUserName: boolean
    nameMaxLangth: number
    userEmail: boolean
    phoneNumber: boolean
    reportSetting: boolean
    suspendSetting: boolean
    withdraw: boolean
  }
  main: {
    isHidodoBanner: boolean
    isSotialRgPost: boolean
  }
  isStudentNoLogin: boolean
  isChallengeMenu: boolean
  isNewsLetter: boolean
  isSnsMenuOpen: boolean
  isShowLevelMasterRanking: boolean
  isOnStudySetting: boolean
  isShowStudyEndInform: boolean
  isPaymentable: boolean
  paymentUrl: string
  isShowStudyEndDay: boolean
  customerCenterUrl: string
  customLogo?: string
  isFirstPreK: boolean
  custom?: ClientCustom
}
type ClientCustom = {
  // themeColor = 타이틀바 색상 #RGB
  themeColor?: string
  // logoBackgroundColor = 로고 배경 색상 #RGB(없애고 싶은 경우 투명 RGB코드 지정)
  logoBackgroundColor?: string
  // calendarTextColor = 헤더 달력 안에 글자 색 #RGB
  calendarTextColor?: string
  // signInAction = 로그인 후 이동할 페이지 지정
  signInAction?: string
  // signOutAction = 로그아웃 후 이동할 페이지 지정
  signOutAction?: string
  // homeLogoAction = 로고 클릭 시 이동할 페이지 지정
  homeLogoAction?: string
  // Footer 영역
  footer?: {
    // 홈 링크 숨기기
    hideHome?: boolean
    // 언어 선택
    supportLanguage?: string[]
  }
  // 메뉴
  menu?: {
    hideSignInButton?: boolean
    ranking?: {
      // 랭킹 메뉴 자체를 숨기기
      disableAll?: boolean
      // 명예의전당 숨기기
      hideHallOfFame?: boolean
    }
  }
  // 관리자 기능
  staff?: {
    noticeWritable?: boolean
    galleryWritable?: boolean
  }
}

export function makeSiteBlueprint(customer: Customer): SiteBlueprint {
  const {
    customerUse,
    countryCode,
    useStudentNoYn,
    studyEBUseYn,
    studyPBUseYn,
    studyLCUseYn,
    studyMSUseYn,
    studyPDUseYn,
    studyJNUseYn,
    studyESUseYn,
    useSpeakYn,
    needPayment,
    preKMode,
  } = customer

  const type = customerUse.toLocaleLowerCase() as
    | 'academy'
    | 'school'
    | 'private'

  const target = {
    private: type === 'private',
    school: type === 'school',
    academy: type === 'academy',
  }
  const country = {
    korea: countryCode === 'KR',
    vietnam: countryCode === 'VN',
    indonesia: countryCode === 'ID',
    canada: countryCode === 'CA',
    outer: false,
  }
  country.outer =
    !country.korea && !country.vietnam && !country.indonesia && !country.canada
  const isPaymentable = needPayment === 'Y'
  const paymentUrl = target.private
    ? SITE_PATH.HOME.MEMBERSHIP_PAYMENT
    : SITE_PATH.HOME.RG_PAYMENT

  let customerCenterUrl: string = CUSTOMER_CENTER_URL.private
  if (country.korea) {
    customerCenterUrl = CUSTOMER_CENTER_URL[type]
  } else if (country.vietnam) {
    customerCenterUrl = CUSTOMER_CENTER_URL.vietnam
  }

  const isPrivateSchoolOnly = target.private || target.school
  const isKoreaPrivateOnly = target.private && country.korea

  let custom: ClientCustom | undefined = undefined
  if (customer.customerId === '002399' || customer.customerId === '002420') {
    // 002399: 정철어학원(데모), 002420: 정철어학원
    custom = {
      themeColor: '#1a1a1a',
      logoBackgroundColor: '#001a1a1a',
      calendarTextColor: '#1a1a1a',
      signInAction: SITE_PATH.LIBRARY.HOME,
      signOutAction: 'https://jungchul.kr/learning/storybook',
      homeLogoAction: '/signoff',
      footer: {
        hideHome: true,
        supportLanguage: [KOREAN, ENGLISH],
      },
      menu: {
        hideSignInButton: true,
        ranking: {
          hideHallOfFame: true,
        },
      },
      staff: {
        noticeWritable: false,
        galleryWritable: false,
      },
    }
  } else if (customer.customerId === '002428') {
    // 002428: 서울도성초등학교
    custom = {
      menu: {
        ranking: {
          disableAll: true,
        },
      },
    }
  } else if (customer.customerId === '002473') {
    // 002473: 서울고현초등학교
    custom = {
      menu: {
        ranking: {
          disableAll: true,
        },
      },
    }
  } else if (customer.customerId === '002443') {
    // 002443: 밍월드런던 영어학원
    custom = {
      menu: {
        ranking: {
          disableAll: true,
        },
      },
    }
  }
  return {
    target,
    country,
    // LC, MS, PD, JN, ES 모두 비활성화 (7차 학습프로그램 부제)
    studyOpen: {
      EB: studyEBUseYn,
      PB: studyPBUseYn,
      LC: studyLCUseYn && false,
      MS: studyMSUseYn && false,
      PD: studyPDUseYn && false,
      JN: studyJNUseYn && false,
      ES: studyESUseYn && false,
      PreK: preKMode.includes('P'),
      DodoABC: preKMode.includes('D'),
      Speak: useSpeakYn,
    },
    studentOpen: {
      changeUserName: target.private,
      nameMaxLangth: target.private && country.korea ? 10 : -1,
      userEmail: target.private,
      phoneNumber: target.private,
      reportSetting: target.private,
      suspendSetting: target.private,
      withdraw: target.private,
    },
    main: {
      isHidodoBanner: target.private,
      isSotialRgPost: true,
    },
    isStudentNoLogin: useStudentNoYn,
    isChallengeMenu: isPrivateSchoolOnly,
    isNewsLetter: isPrivateSchoolOnly && country.korea,
    isSnsMenuOpen: isKoreaPrivateOnly,
    isShowLevelMasterRanking: isPrivateSchoolOnly,
    isOnStudySetting: isPrivateSchoolOnly,
    isShowStudyEndInform: target.private,
    isPaymentable,
    paymentUrl,
    isShowStudyEndDay: target.private,
    customLogo:
      !target.private && customer.logoFilename
        ? customer.logoFilename
        : undefined,
    customerCenterUrl,
    isFirstPreK: preKMode.length > 0 && preKMode.indexOf('P') === 0,
    custom,
  }
}

export function newSiteBlueprint(): SiteBlueprint {
  return {
    target: {
      private: false,
      school: false,
      academy: false,
    },
    country: {
      korea: false,
      vietnam: false,
      indonesia: false,
      canada: false,
      outer: true,
    },
    studyOpen: {
      EB: false,
      PB: false,
      LC: false,
      MS: false,
      PD: false,
      JN: false,
      ES: false,
      PreK: false,
      DodoABC: false,
      Speak: false,
    },
    studentOpen: {
      changeUserName: false,
      nameMaxLangth: -1,
      userEmail: false,
      phoneNumber: false,
      reportSetting: false,
      suspendSetting: false,
      withdraw: false,
    },
    main: {
      isHidodoBanner: false,
      isSotialRgPost: false,
    },
    isStudentNoLogin: false,
    isChallengeMenu: false,
    isNewsLetter: false,
    isSnsMenuOpen: false,
    isShowLevelMasterRanking: false,
    isOnStudySetting: false,
    isShowStudyEndInform: false,
    isShowStudyEndDay: false,
    isPaymentable: false,
    paymentUrl: '',
    customerCenterUrl: '',
    isFirstPreK: false,
  }
}
