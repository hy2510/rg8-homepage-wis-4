// Kakao Pixel
const KAKAO_PIXEL_ID = '3205572353230354028'
export const KAKAO_PIXEL_SDK = '//t1.daumcdn.net/kas/static/kp.js'

// EventName은 Kakao에서 정의된 표준 이벤트가 있으며, 이벤트에 따라 보내야하는 args가 각각 있다.
// https://kakaobusiness.gitbook.io/main/tool/pixel-sdk/install#id-2.-and-sdk
interface IfKakaoPixel {
  kakaoPixel: any
  init: () => boolean
  pageView: (tag?: string) => void
  eventAction: (eventName: string, args?: any) => void
}

const KakaoPixel: IfKakaoPixel = {
  kakaoPixel: undefined,
  init: function () {
    if (this.kakaoPixel) {
      return true
    }
    const _window = window as any
    if (_window && _window.kakaoPixel) {
      this.kakaoPixel = _window.kakaoPixel
    }
    return !!this.kakaoPixel
  },
  pageView: function () {
    if (this.kakaoPixel) {
      this.kakaoPixel(KAKAO_PIXEL_ID).pageView()
    }
  },
  eventAction: function (eventName: string, args?: any) {
    if (this.kakaoPixel && eventName) {
      if (eventName === '회원가입') {
        this.kakaoPixel(KAKAO_PIXEL_ID).completeRegistration(args || undefined)
      } else if (eventName === '상품구매') {
        this.kakaoPixel(KAKAO_PIXEL_ID).purchase(args || undefined)
      } else if (eventName === '로그인') {
        this.kakaoPixel(KAKAO_PIXEL_ID).login(args || undefined)
      }
    }
  },
}
export default KakaoPixel
