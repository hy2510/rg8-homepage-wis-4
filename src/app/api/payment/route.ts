import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Payment from '@/repository/server/payment'
import { RouteResponse, executeRequestAction } from '../_util'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const [payload, status, error] = await executeRequestAction(
    Payment.history(token),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  const newPayload: {
    History: {
      StartDate: string
      ReceiptDate: string
      Memo: string
      ReceiptTypeName: string
      Fee: number
      ReceiptFee: number
    }[]
  } = {
    History: payload.History.map((item: any) => {
      /*
051019	기타
051020	티켓
051021	Android(In-App)
051022	iOS(In-App)
051023	KakaoPay
051024	PayPal
051025	VnPay
*/

      let ReceiptTypeName = 'etc'
      if (item.ReceiptTypeCode) {
        const code = item.ReceiptTypeCode
        switch (code) {
          case '051015':
          case '051018':
            ReceiptTypeName = 'card'
            break
          case '051016':
          case '051017':
            ReceiptTypeName = 'bank'
            break
          case '051020':
            ReceiptTypeName = 'ticket'
            break
          case '051021':
            ReceiptTypeName = 'android'
            break
          case '051022':
            ReceiptTypeName = 'ios'
            break
          case '051023':
            ReceiptTypeName = 'kakaopay'
            break
          case '051024':
            ReceiptTypeName = 'paypal'
            break
          case '051025':
            ReceiptTypeName = 'vnpay'
            break
        }
      }
      return {
        StartDate: item.StartDate,
        ReceiptDate: item.ReceiptDate,
        ClassName: item.ClassName,
        RequestTypeName: item.RequestTypeName,
        Memo: item.Memo,
        ReceiptTypeName,
        Fee: item.Fee,
        ReceiptFee: item.ReceiptFee,
      }
    }),
  }
  return RouteResponse.response(newPayload, status)
}
