import 'server-only'
import AirBridgeHeaderScript from '@/external/marketing-tracker/airbridge/AirBridgeComponent'
import { GoogleTagManagerHeaderScript } from '@/external/marketing-tracker/google-tagmanager/GoogleTagManagerComponent'
import { KakaoPixelHeaderScript } from '@/external/marketing-tracker/kakao-pixel/KakaoPixelComponent'
import { MetaPixelHeaderScript } from '@/external/marketing-tracker/meta-pixcel/MetaPixelComponent'
import { NaverSearchAdvisorMeta } from '@/external/marketing-tracker/naver-search-advisor/NaverSearchAdvisorComponent'
import Swing2AppPreloadScript from '@/external/swing2app/component/Swing2AppPreloadScript'
import { headers } from 'next/headers'

const MARKETING_TRACKING_YN = process.env.MARKETING_TRACKING === 'Y'

async function getHost() {
  const asyncHeaders = headers()
  const header = await asyncHeaders

  const findHost = header.get('host') || ''
  return findHost
}

export async function HeadPreloadScript() {
  const findHost = await getHost()

  // 개인회원 사이트만 이슈트래킹을 실시
  const isTrackerOn =
    MARKETING_TRACKING_YN &&
    (findHost.includes('www.readinggate.com') ||
      findHost.includes('vn.readinggate.com') ||
      findHost.includes('localhost'))

  const isAirBridgeOn =
    MARKETING_TRACKING_YN &&
    (findHost.includes('apps.readinggate.com') ||
      findHost.includes('www.readinggate.com') ||
      findHost.includes('vn.readinggate.com') ||
      findHost.includes('localhost'))

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        rel="stylesheet"
      />
      {isTrackerOn && (
        <>
          <GoogleTagManagerHeaderScript />
          <MetaPixelHeaderScript />
          <KakaoPixelHeaderScript />
          <NaverSearchAdvisorMeta />
        </>
      )}
      {isAirBridgeOn && <AirBridgeHeaderScript />}
    </>
  )
}

export function BodyPreloadScript() {
  return (
    <>
      <Swing2AppPreloadScript />
    </>
  )
}
