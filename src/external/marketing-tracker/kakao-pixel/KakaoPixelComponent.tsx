import Script from 'next/script'
import { KAKAO_PIXEL_SDK } from './kakao-pixel'

export function KakaoPixelHeaderScript() {
  return <Script strategy={'beforeInteractive'} src={KAKAO_PIXEL_SDK}></Script>
}
