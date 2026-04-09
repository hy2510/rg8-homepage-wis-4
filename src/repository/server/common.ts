'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'common'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function selfCustomer(token: string) {
  // MEMO - 개발서버 DB 하드코딩
  if (IS_DEV_DB) {
    return new Promise<{ ok: boolean; status: number; data: typeof customer }>(
      (resolve) => {
        resolve({ ok: true, status: 200, data: customer })
      },
    )
  }

  const request = makeRequest({
    token,
    path: getPath('customer'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function findCustomer(input: {
  homepageUrl?: string
  customerId?: string
}) {
  // MEMO - 개발서버 DB 하드코딩
  if (IS_DEV_DB) {
    if (input.homepageUrl) {
      const isApp =
        input.homepageUrl.indexOf('localhost') >= 0 ||
        input.homepageUrl.indexOf('dev.readinggate.com') >= 0
      if (isApp) {
        return new Promise<{
          ok: boolean
          status: number
          extra: any
          data?: typeof customer
        }>((resolve) => {
          resolve({ ok: true, status: 400, extra: '' })
        })
      }
    }
    return new Promise<{ ok: boolean; status: number; data: typeof customer }>(
      (resolve) => {
        resolve({ ok: true, status: 200, data: customer })
      },
    )
  }

  let requestPath = getPath(`find-customer?homepageUrl=${input.homepageUrl}`)
  if (!input.homepageUrl) {
    requestPath = getPath(`find-customer?customerId=${input.customerId}`)
  }
  const request = makeRequest({
    path: requestPath,
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function searchCustomer(input: {
  keyword?: string
  customerUse?: string
  countryCode?: string
}) {
  // MEMO - 개발서버 DB 하드코딩
  if (IS_DEV_DB) {
    let customersTMP = undefined
    if (
      input.customerUse === 'Private' ||
      (input.keyword && input.keyword.length > 1)
    ) {
      customersTMP = {
        Customers: [customerSearch],
      }
    } else {
      customersTMP = {
        Customers: [],
      }
    }
    const customers = customersTMP

    return new Promise<{ ok: boolean; status: number; data: typeof customers }>(
      (resolve) => {
        resolve({ ok: true, status: 200, data: customers })
      },
    )
  }

  const requestPath = getPath(
    `customer-search?keyword=${input.keyword}&customerUse=${input.customerUse}&countryCode=${input.countryCode}`,
  )

  const request = makeRequest({
    path: requestPath,
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

const Common = {
  selfCustomer,
  findCustomer,
  searchCustomer,
}
export default Common

/* ========================================================
  // MEMO: 개발서버 API 응답결과 하드코딩
  // customer = 개발 DB용 Customer 객체 (001104)
  // customerSearch = 개발 DB용 Customer검색 객체(001104)
   ======================================================== */
const IS_DEV_DB = process.env.DB_CONNECT_DEV === 'Y'
const customer = {
  Token:
    '3fbc5fddff318735f24fdd855d6bd420ff7105e046d8929e0f256149733dc790892757729c0310ad5bb0c34aa26d74d17f31e56c0c739a12965effc9ccad64084aa075d7db7500c2b04524b7d133e45e',
  Customer: {
    CustomerId: '001104',
    Name: '개인회원(DEV)',
    AreaCode: '003001',
    CustomerGroupCode: '002008',
    CustomerGroupName: '리딩게이트',
    CustomerUseCode: '008005',
    CustomerTypeCode: '',
    Round: '087',
    CustomerOldId: '100220',
    Postcode: '0-     ',
    Address: '경기도 성남시 수정구',
    DetailAddress: '창업로 43, A동 807~810호(글로벌비즈센터)',
    CellPhone: '',
    Telephone: '1599-0533',
    Fax: '',
    PayTypeCode: '',
    CeoName: '김용환',
    BusinessNo: '',
    LogoFilename:
      'https://wcfresource.a1edu.com/newsystem/image/acalogo/100220_top.png',
    BankCode: '',
    AccountNo: '0',
    Memo: '',
    ExpiredDate: '',
    UseYn: true,
    DeleteYn: false,
    SchoolYn: false,
    ViewPopupYn: true,
    ReportYn: true,
    StudyReportYn: true,
    MonthReportYn: true,
    YearReportYn: true,
    TeacherEvaluation: 'Fluency',
    AutoLevelUpYn: true,
    ViewVocaYn: true,
    ViewAssessmentYn: true,
    ViewLevelUpYn: true,
    LimitLevelYn: false,
    MinLevel: 0,
    MaxLevel: 0,
    UrlCode1: '',
    UrlCode2: '',
    ServiceYn: false,
    IniKeyCode: 'aoneedu001',
    CustomerUse: 'Private',
    SelfStudyYn: false,
    WholeSchoolYn: false,
    LanguageCode: 'ko-KR',
    ViewPbTypeSetupYn: true,
    ViewFullEasyYn: true,
    CountryCode: 'KR',
    MainBannerViewYn: true,
    UseEbookAniYn: true,
    StudentWorkSheetYn: true,
    ManagerWorkSheetYn: true,
    ViewRecommendBooksYn: true,
    NeedPayment: 'Y',
    StudyEBUseYn: true,
    StudyPBUseYn: true,
    StudyLCUseYn: false,
    StudyMSUseYn: false,
    StudyPDUseYn: false,
    StudyJNUseYn: false,
    StudyESUseYn: false,
    UseDodoAbcYn: 'A',
    UseSpeakYn: true,
    UseStudentNoYn: false,
    PreKMode: 'DP',
  },
}
const customerSearch = {
  Name: '개인회원(Dev)',
  CustomerId: '001104',
  HomepageUrl: 'https://dev.readinggate.com',
  CustomerUseCode: '008005',
  LogoFilename:
    'https://wcfresource.a1edu.com/newsystem/image/acalogo/100220_top.png',
  AppSvrUrl: 'http://app.readinggate.com',
  UseStudentNoYn: 'N',
  CountryCode: 'KR',
}
