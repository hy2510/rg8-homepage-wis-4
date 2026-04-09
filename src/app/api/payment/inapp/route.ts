import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Payment from '@/repository/server/payment'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '../../_util'
import {
  androidValidateInappConsumeReceipt,
  iosValidateInappReceipt,
} from './swing2app-inapp'

const IOS_INAPP_USE_SEND_BOX = process.env.IOS_INAPP_MODE_SENDBOX === 'Y'

export async function POST(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'platform',
    'productId',
    'receipt',
  )
  const platform = parameter.getString('platform') as 'android' | 'ios'
  const productId = parameter.getString('productId', '')
  const receiptStr = parameter.getString('receipt')

  let success = false
  let receipt = ''
  let key = ''
  let code = 0
  let message = ''

  try {
    const parsedReceipt = JSON.parse(receiptStr)
    if (platform === 'android') {
      if (
        !Array.isArray(parsedReceipt) ||
        parsedReceipt.length === 0 ||
        !parsedReceipt[0].orderId ||
        !parsedReceipt[0].purchaseToken ||
        !parsedReceipt[0].productId ||
        parsedReceipt[0].productId !== productId
      ) {
        throw new Error('Android Receipt ERROR.')
      }
      const orderId = parsedReceipt[0].orderId
      const purchaseToken = parsedReceipt[0].purchaseToken

      /*
       * 2024-11-19 : 안드로이드 인앱 결제 방식을 구독상품에서 1회성 상품으로 변경 처리
       * 3회이상 연속구매 불가능 이슈 및 구글 수수료율 차이 발생으로 구독상품은 사용하지 않음.
      const validateResult = await androidValidateInappSubscribeReceipt({
        purchaseToken,
        productId,
        orderId,
      })
      */
      const validateResult = await androidValidateInappConsumeReceipt({
        purchaseToken,
        productId,
        orderId,
      })

      success = validateResult.success
      if (success) {
        receipt = receiptStr
        key = `${orderId}_7th`
      } else {
        code = validateResult.code
        message = validateResult.message
      }
    } else if (platform === 'ios') {
      if (!parsedReceipt.receipt || !parsedReceipt.transactionId) {
        throw new Error('ios Receipt ERROR.')
      }
      const transactionId = parsedReceipt.transactionId
      const isSendbox = IOS_INAPP_USE_SEND_BOX

      const validateResult = await iosValidateInappReceipt({
        transactionId,
        isSendbox,
      })

      success = validateResult.success
      if (success) {
        receipt = parsedReceipt.receipt
        key = validateResult.extra
      } else {
        code = validateResult.code
        message = validateResult.message
      }
    }
  } catch (error) {
    return RouteResponse.commonError()
  }

  if (!success) {
    return RouteResponse.response({ code, message }, { status: 400 })
  }

  const [payload, status, error] = await executeRequestAction(
    Payment.inappPurchase(token, platform, { productId, receipt, key }),
  )

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
