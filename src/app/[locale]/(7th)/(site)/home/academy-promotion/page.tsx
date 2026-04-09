import { headers } from 'next/headers'
import Common from '@/repository/server/common'
import Home from '@/repository/server/home'
import PromotionDetail from './_cpnt/PromotionDetail'

async function sendToRefererData() {
  const asyncHeaders = headers()
  const header = await asyncHeaders

  const ua = header.get('user-agent') || ''
  const host = header.get('x-forwarded-host') || ''
  const referer = header.get('referer') || ''
  const ip = getIpAddrss(header.get('x-forwarded-for') || '')

  // MEMO: 사이트 주소가 guest2.readinggate.com에 한에서만 서버로 요청을 보냄
  if (
    referer &&
    referer.indexOf(host) < 0 &&
    host &&
    host.indexOf('guest2.readinggate') >= 0 &&
    ip &&
    ip !== 'localhost'
  ) {
    if (!host.startsWith('https') && !host.startsWith('http')) {
      const homepageUrl = 'https://' + host

      const urlResponse = await Common.findCustomer({ homepageUrl })
      if (urlResponse.ok && urlResponse.data && urlResponse.data.Token) {
        const customerToken = urlResponse.data.Token

        const res = await Home.saveMarketingReferer(customerToken, {
          userIp: ip,
          userAgent: ua,
          referer: referer,
        })
      }
    }
  }
}

export default async function Page() {
  await sendToRefererData()

  return <PromotionDetail />
}

function getIpAddrss(xForwardedFor: string) {
  let ipv4 = ''
  const targetIp = xForwardedFor.split(',')[0].trim()
  if (targetIp === '::1') {
    ipv4 = 'localhost'
  } else if (targetIp.startsWith('::ffff:')) {
    ipv4 = targetIp.substring(7)
  } else {
    ipv4 = targetIp
  }
  if (ipv4 === '127.0.0.1') {
    ipv4 = 'localhost'
  }
  return ipv4
}
