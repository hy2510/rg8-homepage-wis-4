import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Home from '@/repository/server/home'
import { RouteResponse, executeRequestAction, getParameters } from '../_util'

type SlideBanner = {
  SlidingBannerId: string
  Priority: number
  SlidingBannerType: string
  ImagePath: string
  LinkUrl: string
  MessageData: string
  DeleteYn: boolean
  NewBrowser: string
}
type Notice = {
  NotifyId: string
  Title: string
  ReadCount: number
  StartDate: string
  EndDate: string
  PrevNotifyId: string
  NextNotifyId: string
  RegistDate: string
}

type MainTemplate = {
  important?: {
    start: string
    end: string
    message: string
    bgColor?: string
    link?: string
  }
  quickmenu: {
    title: string
    items: {
      title: string
      link: string
      icon: string
      bgColor?: string
      option?: string
    }[]
  }
  layout: {
    type:
      | 'basic'
      | 'image'
      | 'sotial'
      | 'newsboard'
      | 'pri-rg-membership'
      | 'vn-rg-membership'
      | 'pri-rg-shop'
      | 'sch-rg-shop'
      | 'sch-rg-shop-workbook'
      | 'pri-rg-partnership'
      | 'pri-customer-center'
      | 'sch-customer-center'
      | 'aca-customer-center'
      | 'vn-customer-center'
      | 'vn-aca-customer-center'
      | 'global-aca-customer-center'
    size?: 1 | 2 | 3 | 4
    title?: string
    titleColor?: string
    sub?: string
    subColor?: string
    comment?: string
    commentColor?: string
    bgColor?: string
    image?: string
    icon?: string
    title2?: string
    linkText?: string
    linkText2?: string
    link?: string
    link2?: string
    cs?: { label: string; link: string; icon?: string; color?: string }[]
  }[][]
  extra: {
    notice: {
      title: string
      date: string
      link: string
      self: boolean
    }[]
    slide: { image: string; link: string; self: boolean }[]
    campaign: number
  }
}

const STATIC_HOME_PAGE_RESOURCE = process.env.STATIC_HOME_PAGE_RESOURCE
export async function GET(request: NextRequest) {
  const customer = await getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }
  const parameter = await getParameters(request, 'template', 'platform')
  const template = parameter.getString('template')
  const platform = parameter.getString('platform', 'Web').toLowerCase()

  let homeData: MainTemplate

  let dataTemplateId = 'private-kr'
  if (template === 'school') {
    dataTemplateId = 'school-kr'
  } else if (template === 'academy') {
    dataTemplateId = 'academy-kr'
  } else if (template === 'academy_vn') {
    dataTemplateId = 'academy-vn'
  } else if (template === 'academy_ca') {
    dataTemplateId = 'academy-can'
  } else if (template === 'private_vn') {
    dataTemplateId = 'private-vn'
  }

  try {
    const jsonRes = await fetch(
      `${STATIC_HOME_PAGE_RESOURCE}/home/json/${dataTemplateId}.json`,
      { next: { revalidate: 600, tags: ['data:cdn', `home`] } },
    )

    if (!jsonRes.ok) {
      return RouteResponse.commonError()
    }
    const homeDataJson = await jsonRes.json()
    homeData = {
      ...homeDataJson,
      extra: { notice: [], slide: [], campaign: 0 },
    } as MainTemplate
  } catch (error) {
    return RouteResponse.commonError()
  }

  const [noticePayload, noticeStatus, noticeError] = await executeRequestAction(
    Home.noticeMainList(customer),
  )
  if (
    noticeError ||
    (noticeStatus.status < 200 && noticeStatus.status >= 300) ||
    !noticePayload.Board
  ) {
    return RouteResponse.commonError()
  }
  const [slidePayload, slideStatus, slideError] = await executeRequestAction(
    Home.slidingBanner(customer),
  )
  if (
    slideError ||
    (slideStatus.status < 200 && slideStatus.status >= 300) ||
    !slidePayload.Banner
  ) {
    return RouteResponse.commonError()
  }

  const [campaignPayload, campaignStatus, campaignError] =
    await executeRequestAction(Home.statisticRead())
  if (
    campaignError ||
    (campaignStatus.status < 200 && campaignStatus.status >= 300) ||
    !campaignPayload
  ) {
    return RouteResponse.commonError()
  }
  homeData.extra.campaign = Number(campaignPayload.TotalBooks)

  const slideBannerList = slidePayload.Banner.filter((item: any) => {
    return true
  })
  const slideBanner: { image: string; link: string; self: boolean }[] =
    slideBannerList.map(
      (bnr: SlideBanner): { image: string; link: string; self: boolean } => {
        let self = bnr.NewBrowser !== 'Y'
        let link = bnr.LinkUrl || '#'
        if (self) {
          const linkUrl = bnr.LinkUrl
          if (linkUrl.startsWith('/News/LibraryBoardNotice')) {
            const data = linkUrl.split('no=')
            if (data.length === 2) {
              link = `/home/main/rg-news-post/${data[1]}`
            }
          } else if (linkUrl.startsWith('/News/NewBooks')) {
            link = `/home/main/rg-news/new-contents`
          } else if (linkUrl.startsWith('/Community/BringInInstitution')) {
            link = 'https://util.readinggate.com/Community/BringInInstitution'
            self = false
          }
        }
        return {
          image: bnr.ImagePath,
          link,
          self,
        }
      },
    )
  homeData.extra.slide.push(...slideBanner)

  const mainNotice: {
    title: string
    date: string
    link: string
    self: boolean
  }[] = noticePayload.Board.filter((_: unknown, i: number) => i < 5).map(
    (
      board: Notice,
    ): {
      title: string
      date: string
      link: string
      self: true
    } => {
      return {
        title: board.Title,
        date: board.RegistDate.substring(0, 10),
        link: `/home/main/rg-news-post/${board.NotifyId}`,
        self: true,
      }
    },
  )
  homeData.extra.notice.push(...mainNotice)

  return RouteResponse.response(homeData, noticeStatus)
}
