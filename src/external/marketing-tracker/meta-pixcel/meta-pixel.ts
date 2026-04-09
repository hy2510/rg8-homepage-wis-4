// Meta Pixel
const META_PIXEL_ID = '1774173015979703'
export const HEADER_INCLUDE_SCRIPT = `  
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
`
export const BODY_INCLUDE_NO_SCRIPT = `
<img
  height="1"
  width="1"
  style="display:none"
  src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"
  />`

// EventName은 Meta에서 정의된 표준 이벤트가 있으며, 이벤트에 따라 보내야하는 args가 각각 있다.
// https://developers.facebook.com/docs/meta-pixel/reference#standard-events
interface IfMetaPixel {
  fbq: any
  init: () => boolean
  pageView: (tag?: string) => void
  eventAction: (eventName: string, args?: any) => void
}

const MetaPixel: IfMetaPixel = {
  fbq: undefined,
  init: function () {
    if (this.fbq) {
      return true
    }
    const _window = window as any
    if (_window && _window.fbq) {
      this.fbq = _window.fbq
    }
    if (this.fbq) {
      this.fbq('init', META_PIXEL_ID)
    }
    return !!this.fbq
  },
  pageView: function () {
    if (this.fbq) {
      this.fbq('track', 'PageView')
    }
  },
  eventAction: function (eventName: string, args?: any) {
    if (this.fbq && eventName) {
      let trackName = ''
      if (eventName === '회원가입') {
        trackName = 'CompleteRegistration'
      } else if (eventName === '로그인') {
        trackName = 'Lead'
      } else if (eventName === '상품구매') {
        trackName = 'Purchase'
      }
      if (trackName) {
        if (args) {
          this.fbq('track', trackName, args)
        } else {
          this.fbq('track', trackName)
        }
      }
    }
  },
}
export default MetaPixel
