import { supportLanguages } from '@/localization/localize-config'

const HOME = {
  MAIN: '/home/main',
  NOTICE: '/home/main/rg-news/notice',
  NEWS_LETTER: '/home/main/rg-news/newsletter',
  NEW_CONTENTS: '/home/main/rg-news/new-contents',
  INFOGRAPHIC: '/home/main/rg-news/infographic',
  EVENT_CHALLENGE: '/home/main/rg-news/challenge',
  EVENT_SUPERSTAR: '/home/main/rg-news/superstar',
  EVENT_READING_CAMPAIN: '/home/main/rg-news/campaign',
  NEWS_POST: '/home/main/rg-news-post',
  GALLERY: '/home/main/rg-news/gallery',
  GALLERY_POST: '/home/main/rg-news-gallery',
  CUSTOMER_PARENT_REVIEW: '/home/customer-review/parent',
  CUSTOMER_STUDENT_REVIEW: '/home/customer-review/student',
  CUSTOMER_INTERVIEW: '/home/customer-review/interview',
  SNS_REVIEW: '/home/customer-review/sns',
  MEMBERSHIP_INTRODUCE: '/home/rg-membership/introduction',
  MEMBERSHIP_PAYMENT: '/home/rg-membership/payment/purchase',
  MEMBERSHIP_PAYMENT_HISTORY: '/home/rg-membership/payment/history',
  MEMBERSHIP_TICKET: '/home/rg-membership/payment/ticket',
  MEMBERSHIP_REFUND_POLICY: '/home/rg-membership/refund-policy',
  MEMBERSHIP_SERVICE_TERM: '/home/rg-membership/terms-of-service',
  MEMBERSHIP_PRIVACY_POLICY: '/home/rg-membership/privacy-policy',
  MEMBERSHIP_SCHOOL_PRIVACY_POLICY: '/home/rg-membership/school-privacy-policy',
  RG_PAYMENT: '/home/rg-payment/purchase',
  RG_PAYMENT_HISTORY: '/home/rg-payment/history',
  USER_GUIDE: '/home/user-guide',
  USER_GUIDE_VN: '/home/user-guide-vn',
  ABOUT_TO_SCHOOL: '/home/about-to-school',
  ABOUT_VN: '/home/about-vn',
  ABOUT_GLOBAL: '/home/about-global',
}
const ACCOUNT = {
  MAIN: '/account/account-list',
  SIGN_IN: '/account/sign-in',
  SIGN_IN_TOKEN: '/account/sign-in-token',
  SIGN_UP: '/account/sign-up',
  SIGN_UP_WELCOME: '/account/welcome',
  FORGOT_ID: '/account/forgot-id',
  FORGOT_PASSWORD: '/account/forgot-password',
  INFO: '/account/account-info',
  CHANGE_PASSWORD: '/account/change-password',
  SIGN_IN_PORTAL: '/account/sign-in-portal',
  GROUP_SEARCH: '/account/group-search',
}
const BASIC = {
  HOME: '/basic',
  PRE_K: '/basic/pre-k',
  DODO_ABC: '/basic/dodo-abc',
}
const LIBRARY = {
  HOME: '/library',
  TODO: '/library/assignment/to-do',
  TRY_AGAIN: '/library/assignment/try-again',
  FAVORITE: '/library/assignment/favorite',
  DODO_ABC_STUDY: '/library/dodo-abc/study',
  DODO_ABC_SONG: '/library/dodo-abc/song-n-chant',
  DODO_ABC_GAME: '/library/dodo-abc/game',
  PRE_K: '/library/pre-k',
  E_BOOK: '/library/e-book',
  P_BOOK: '/library/p-book-quiz',
  NEW_BOOK: '/library/new-books',
  SEARCH: '/library/search',
  SERIES: '/library/series',
  THEME: '/library/theme',
  MOVIE_BOOK: '/library/movie-book',
  WORKBOOK: '/library/workbook',
  SERIES_LIST: '/library/series-list',
  SERIES_LIST_EB: '/library/series-list/e-book',
  SERIES_LIST_PB: '/library/series-list/p-book-quiz',
  THEME_LIST: '/library/theme-list',
  THEME_LIST_EB: '/library/theme-list/e-book',
  THEME_LIST_PB: '/library/theme-list/p-book-quiz',
}
const REVIEW = {
  MAIN: '/review',
  SPEAK: '/review/speak',
  WRITE: '/review/write',
  QUICK: '/review/quick-view',
  DETAIL: '/review/detailed-view',
}
const RANKING = {
  MAIN: '/ranking',
  POINT: '/ranking/points-rank',
  CAHLLENGE: '/ranking/challenge-rank',
  LEVEL_MASTER_BOARD: '/ranking/level-master-board',
  HALL_OF_FAME: '/ranking/hall-of-fame-rank',
}
const CATALOG = {
  HOME: '/catalog',
  BASIC: '/catalog/dodo-abc',
  EBOOK: '/catalog/ebook',
  PBOOK_QUIZ: '/catalog/pbook-quiz',
  MOTIVATION: '/catalog/motivation',
  MOVIE_CONTENTS: '/catalog/movie-contents',
  AI_SPEAK: '/catalog/ai-speak',
}
const CATALOG_VI = {
  HOME: '/catalog-vi',
  BASIC: '/catalog-vi/dodo-abc',
  EBOOK: '/catalog-vi/ebook',
  PBOOK_QUIZ: '/catalog-vi/pbook-quiz',
  MOTIVATION: '/catalog-vi/motivation',
  MOVIE_CONTENTS: '/catalog-vi/movie-contents',
  AI_SPEAK: '/catalog-vi/ai-speak',
}

const NW82 = {
  DAILY_RG: '/8th/daily',
  DAILY_RESULT: '/8th/daily/list',

  LIBRARY: '/8th/library',
  EB: '/8th/library/eb',
  EB_LEVEL: '/8th/library/eb/level',
  EB_SERIES: '/8th/library/eb/series',
  EB_THEME: '/8th/library/eb/theme',
  EB_THEME_FIND: '/8th/library/eb/theme/find',
  EB_MOVIE: '/8th/library/eb/movie',
  EB_NEWBOOK: '/8th/library/eb/newbook',
  EB_WORKBOOK: '/8th/library/eb/workbook',
  EB_SEARCH: '/8th/library/eb/search',
  EB_SERIES_FIND: '/8th/library/eb/series/find',
  EB_SCHOOL_SUBJECTS: '/8th/library/eb/school-subject',
  EB_KINDER: '/8th/library/kinder',
  EB_PREK: '/8th/library/kinder/prek',
  EB_DODOABC: '/8th/library/kinder/dodoabc',
  PB: '/8th/library/pb',
  PB_LEVEL: '/8th/library/pb/level',
  PB_SERIES: '/8th/library/pb/series',
  PB_SERIES_FIND: '/8th/library/pb/series/find',
  PB_SEARCH: '/8th/library/pb/search',
  PB_THEME_FIND: '/8th/library/pb/theme/find',
  PB_THEME: '/8th/library/pb/theme',
  PB_NEWBOOK: '/8th/library/pb/newbook',
  NEWBOOK: '/8th/library/newbook',
  ACTIVITY: '/8th/activity',
  TODO: '/8th/activity/todo',
  FAVORITE: '/8th/activity/favorite',
  TRYAGAIN: '/8th/activity/tryagain',
  REVIEW: '/8th/activity/result',
  REVIEW_WRITE: '/8th/activity/result/write',
  REVIEW_SPEAK: '/8th/activity/result/speak',
  RANKING: '/8th/ranking',
  ACCOUNTINFO: '/8th/accountinfo',
  ACCOUNTINFO_SETTING: '/8th/accountinfo/setting',
}

export const STAFF_PATH = {
  MAIN: '/staff',
  MIRAGE: '/mirage',
  NOTICE: {
    MAIN: '/staff/board/notice',
    WRITE: '/staff/board/notice/write',
  },
  GALLERY: {
    MAIN: '/staff/board/gallery',
    WRITE: '/staff/board/gallery/write',
  },
}

const PARAMS_PATH = [
  `${ACCOUNT.SIGN_IN_PORTAL}/[param]`,
  `${HOME.NEWS_LETTER}/[param]`,
  `${HOME.NEW_CONTENTS}/[param]`,
  `${HOME.INFOGRAPHIC}/[param]`,
  `${HOME.EVENT_CHALLENGE}/[param]`,
  `${HOME.EVENT_SUPERSTAR}/[param]`,
  `${HOME.EVENT_READING_CAMPAIN}/[param]`,
  `${HOME.NEWS_POST}/[param]`,
  `${HOME.GALLERY_POST}/[param]`,
  `${HOME.CUSTOMER_PARENT_REVIEW}/[param]`,
  `${HOME.CUSTOMER_STUDENT_REVIEW}/[param]`,
]

export function isValidatePath(path: string): boolean {
  let isStartWithLocale = false
  for (let i = 0; i < supportLanguages.length; i++) {
    if (path.startsWith(`/${supportLanguages[i]}`)) {
      isStartWithLocale = true
    }
  }

  const searchPath = (
    isStartWithLocale
      ? path.indexOf('/', 1) >= 0
        ? path.substring(path.indexOf('/', 1))
        : ''
      : path
  ).split('?')[0]
  if (searchPath === '') {
    return true
  }
  let isContainPath = false
  const entries = Object.entries(SITE_PATH)
  for (let i = 0; i < entries.length; i++) {
    const item = entries[i]
    const itemValue = item[1]
    const type = typeof itemValue
    if (type === 'object') {
      const paths = Object.values(itemValue)
      for (let j = 0; j < paths.length; j++) {
        const p = paths[j]
        isContainPath = p === searchPath
        if (isContainPath) {
          break
        }
      }
    }
    if (isContainPath) {
      break
    }
  }
  if (!isContainPath) {
    const paramPattern = /^\[[a-zA-Z0-9-_]+\]$/
    let patternMatch = false
    for (let i = 0; i < PARAMS_PATH.length; i++) {
      const pathDiv = searchPath.split('/')
      const paramPathDiv = PARAMS_PATH[i].split('/')
      patternMatch =
        pathDiv.length > 0 && pathDiv.length === paramPathDiv.length

      if (patternMatch) {
        for (let j = 0; j < pathDiv.length; j++) {
          const p1 = pathDiv[j]
          const p2 = paramPathDiv[j]
          if (paramPattern.test(p2)) {
            continue
          }
          patternMatch = p1 === p2
          if (!patternMatch) {
            break
          }
        }
        if (patternMatch) {
          break
        }
      }
    }
    isContainPath = patternMatch
  }
  return isContainPath
}

export function getValidatePath(path: string): string {
  const isContainPath = isValidatePath(path)
  if (!isContainPath) {
    return HOME.MAIN
  }
  return path
}

export const CUSTOMER_CENTER_URL = {
  private:
    'https://ossified-smell-f52.notion.site/RG-a8fc674ab32f458ca70d659e1916e34c',
  school:
    'https://ossified-smell-f52.notion.site/bcdb1eaf03a34c34a4a0567eec292601',
  academy:
    'https://ossified-smell-f52.notion.site/44d6a2eb4c1c4199bc5745077033b1ea',
  vietnam:
    'https://concrete-meteor-3e2.notion.site/RGVN-CSKH-1204e876aa85808a9d7ccd04783ec488',
}

export const EXTERNAL_URL = {
  kakaoChannel: 'https://pf.kakao.com/_iUbiM/chat',
  academyPromotion: 'https://guest2.readinggate.com/ko/home/academy-promotion',
  googlePlay:
    'https://play.google.com/store/apps/details?id=com.a1edu.readinggate',
  appleAppStore: 'https://apps.apple.com/kr/app/id1207688674',
}

const SITE_PATH = {
  HOME,
  ACCOUNT,
  BASIC,
  LIBRARY,
  REVIEW,
  RANKING,
  CATALOG,
  CATALOG_VI,
  NW82,
}
export default SITE_PATH
