import { findEventCategory } from './airbridge-event-list'

const AIR_BRIDGE_APP_NAME = 'readinggatemarketing'
const AIR_BRIDGE_WEB_TOKEN = '37d33bb625364ea48d9afb78384a1916'
export const HEADER_INCLUDE_SCRIPT = `(function(a_,i_,r_,_b,_r,_i,_d,_g,_e){if(!a_[_b]){var n=function(){var c=i_.createElement(r_);c.onerror=function(){h.queue.filter(function(a){return 0<=_d.indexOf(a[0])}).forEach(function(a){a=a[1];a=a[a.length-1];"function"===typeof a&&a("error occur when load airbridge")})};c.async=1;c.src=_r;"complete"===i_.readyState?i_.head.appendChild(c):a_.addEventListener("load",function k(){a_.removeEventListener("load",k);i_.head.appendChild(c)})},h={queue:[],get isSDKEnabled(){return!1}};_i.concat(_d).forEach(function(c){var a=c.split("."),k=a.pop();a.reduce(function(p,q){return p[q]=p[q]||{}},h)[k]=function(){h.queue.push([c,arguments])}});a_[_b]=h;"undefined"!==typeof i_.documentMode&&(_r=_r.replace(/^https:/,""));0<_g?(_b=new (a_.XDomainRequest||a_.XMLHttpRequest),_i=function(){},_b.open("GET",_r),_b.timeout=_g,_b.onload=function(){n()},_b.onerror=_i,_b.onprogress=_i,_b.ontimeout=_i,_b.send()):n()}})(window,document,"script","airbridge","https://static.airbridge.io/sdk/latest/airbridge.min.js","init startTracking stopTracking openBanner setBanner setDownload setDownloads openDeeplink setDeeplinks sendWeb setUserAgent setMobileAppData setUserID clearUserID setUserEmail clearUserEmail setUserPhone clearUserPhone setUserAttribute removeUserAttribute clearUserAttributes setUserAlias removeUserAlias clearUserAlias clearUser setUserId setUserAttributes addUserAlias setDeviceAlias removeDeviceAlias clearDeviceAlias setDeviceIFV setDeviceIFA setDeviceGAID events.send events.signIn events.signUp events.signOut events.purchased events.addedToCart events.productDetailsViewEvent events.homeViewEvent events.productListViewEvent events.searchResultViewEvent".split(" "),["events.wait","fetchResource","createTouchpoint","createTrackingLink"],0);`

// 에어브릿지 표준 이벤트 목록
// https://help.airbridge.io/ko/guides/airbridge-event-types#%EC%8A%A4%ED%83%A0%EB%8B%A4%EB%93%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%AA%A9%EB%A1%9D

interface IfAirBridgeEventArguments {
  label?: string
  action?: string
  value?: number
  semanticAttributes?: {
    currency?: string
    transactionID?: string
    products?: {
      productID: string
      name: string
    }[]
  }
  customAttributes?: any
}
interface IfAirBridge {
  airbridge: any
  init: () => boolean
  pageView: (tag?: string) => void
  eventAction: (eventName: string, args?: IfAirBridgeEventArguments) => void
}

const AirBridge: IfAirBridge = {
  airbridge: undefined,
  init: function (): boolean {
    if (this.airbridge) {
      return true
    }

    const _window = window as any
    if (_window && _window.airbridge) {
      _window.airbridge.init(
        {
          app: AIR_BRIDGE_APP_NAME,
          webToken: AIR_BRIDGE_WEB_TOKEN,
          shareCookieSubdomain: false,
        },
        (err: unknown, instance: any) => {
          if (!err && !!instance) {
            this.airbridge = instance
          }
        },
      )
    }
    return false
  },
  pageView: function () {
    if (this.airbridge) {
    }
  },
  eventAction: function (eventName: string, args?: any) {
    if (this.airbridge && eventName) {
      const category = findEventCategory(eventName)
      if (category) {
        if (args) {
          this.airbridge.events.send(category, {
            customAttributes: args,
          })
        } else {
          this.airbridge.events.send(category)
        }
      }
    }
  },
}

export default AirBridge
