import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type Home = {
  important?: NoticeBanner
  quickmenu: HomeQuickMenu
  layout: HomeLayout[][]
  extra: HomeExtraData
  floatingmenu: { action: string; icon: string }[]
}

export type NoticeBanner = {
  start: string
  end: string
  message: string
  bgColor: string
  link: string
}

export type HomeQuickMenu = {
  title: string
  items: {
    title: string
    link: string
    icon: string
    bgColor: string
    option?: string
  }[]
}

export type HomeLayout = {
  type:
    | 'basic'
    | 'image'
    | 'newsboard'
    | 'customer-center'
    | 'pri-rg-membership'
    | 'vn-rg-membership'
    | 'channel'
    | 'donation'
    | 'pri-rg-shop'
    | 'pri-rg-partnership'
    | 'sch-rg-partnership'
  size: number[]
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
}

export type HomeExtraData = {
  notice: {
    title: string
    date: string
    link: string
    self: boolean
  }[]
  slide: { image: string; link: string; self: boolean }[]
  campaign: number
}

function makeHome(json?: any): Home {
  const important = json?.important
    ? {
        start: RenewType.renewString(json?.important?.start),
        end: RenewType.renewString(json?.important?.end),
        message: RenewType.renewString(json?.important?.message),
        bgColor: RenewType.renewString(json?.important?.bgColor),
        link: RenewType.renewString(json?.important?.link),
      }
    : undefined
  const quickmenu = {
    title: RenewType.renewString(json?.quickmenu?.title),
    items: json?.quickmenu?.items?.map((item: any) => {
      return {
        title: RenewType.renewString(item?.title),
        link: RenewType.renewString(item?.link),
        icon: RenewType.renewString(item?.icon),
        bgColor: RenewType.renewString(item?.bgColor),
        option: item?.option ? item.option : undefined,
      }
    }),
  }
  const layout = json?.layout?.map((row: unknown[]) => {
    return row.map((item: any) => {
      return {
        type: RenewType.renewString(item?.type),
        size:
          item?.size && item.size.length > 0
            ? item.size.map((s: any) => RenewType.renewNumber(s))
            : [],
        title: item?.title ? RenewType.renewString(item?.title) : undefined,
        titleColor: item?.titleColor
          ? RenewType.renewString(item?.titleColor)
          : undefined,
        sub: item?.sub ? RenewType.renewString(item?.sub) : undefined,
        subColor: item?.subColor
          ? RenewType.renewString(item?.subColor)
          : undefined,
        comment: item?.comment
          ? RenewType.renewString(item?.comment)
          : undefined,
        commentColor: item?.commentColor
          ? RenewType.renewString(item?.commentColor)
          : undefined,
        bgColor: item?.bgColor
          ? RenewType.renewString(item?.bgColor)
          : undefined,
        image: item?.image ? RenewType.renewString(item?.image) : undefined,
        icon: item?.icon ? RenewType.renewString(item?.icon) : undefined,
        title2: item?.title2 ? RenewType.renewString(item?.title2) : undefined,
        linkText: item?.linkText
          ? RenewType.renewString(item?.linkText)
          : undefined,
        linkText2: item?.linkText2
          ? RenewType.renewString(item?.linkText2)
          : undefined,
        link: item?.link ? RenewType.renewString(item?.link) : undefined,
        link2: item?.link2 ? RenewType.renewString(item?.link2) : undefined,
        cs:
          item?.cs && item?.cs?.length > 0
            ? item?.cs?.map((cs: any) => {
                return {
                  label: RenewType.renewString(cs.label),
                  link: RenewType.renewString(cs.link),
                  icon: RenewType.renewString(cs.icon),
                  color: RenewType.renewString(cs.color),
                }
              })
            : undefined,
      }
    })
  })
  const extra = {
    notice: json?.extra?.notice?.map((item: any) => {
      return {
        title: RenewType.renewString(item?.title),
        date: RenewType.renewString(item?.date),
        link: RenewType.renewString(item?.link),
        self: RenewType.renewBoolean(item?.self),
      }
    }),
    slide: json?.extra?.slide?.map((item: any) => {
      return {
        image: RenewType.renewString(item?.image),
        link: RenewType.renewString(item?.link),
        self: RenewType.renewBoolean(item?.self),
      }
    }),
    campaign: RenewType.renewNumber(json?.extra?.campaign),
  }
  const floatingmenu = json?.floatingmenu?.map((item: any) => {
    return {
      action: RenewType.renewString(item?.action),
      icon: RenewType.renewString(item?.icon),
    }
  })
  return {
    important,
    quickmenu,
    layout,
    extra,
    floatingmenu,
  }
}

function transform(json: any): HomeResponse {
  return makeHome(json)
}

export type HomeParams = {
  template: string
  platform: string
}

export type HomeResponse = Home

export async function getHome(input: HomeParams): Promise<HomeResponse> {
  const request = makeRequest(`api/home`, 'append-customer', {
    method: 'get',
    queryString: {
      template: input.template,
      platform: input.platform,
    },
  })
  return await execute(request, transform)
}
