import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Payment from '@/repository/server/payment'
import { RouteResponse, executeRequestAction } from '../../_util'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const [payload, status, error] = await executeRequestAction(
    Payment.unpaidBalance(token),
  )
  if (error) {
    return RouteResponse.commonError()
  }

  const newPayload = {
    Unpaid: payload.Unpaid.map((item: any) => {
      delete item.RequestTypeNameEng
      delete item.StudentId
      delete item.StudentName
      delete item.StudentNameEng
      delete item.Telephone
      delete item.StudentCellPhone
      delete item.ParentCellPhone
      delete item.StatusCode
      delete item.StatusName
      delete item.ReceiptId
      delete item.LoginId
      delete item.VBankName
      delete item.VBankNum
      return item
    }),
  }

  return RouteResponse.response(newPayload, status)
}
