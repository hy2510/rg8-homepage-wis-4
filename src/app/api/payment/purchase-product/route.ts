import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Payment from '@/repository/server/payment'
import { RouteResponse, executeRequestAction, getParameters } from '../../_util'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'type')
  const pType = parameter.getString('type', '')

  const [payload, status, error] = await executeRequestAction(
    Payment.purchaseProductList(token, pType),
  )
  if (error) {
    return RouteResponse.commonError()
  }

  return RouteResponse.response(payload, status)
}
