import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Account from '@/repository/server/account'
import { RouteResponse, executeRequestAction } from '../_util'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const [payload, status, error] = await executeRequestAction(
    Account.staffMe(token),
  )
  if (status.status >= 200 && status.status < 300) {
    return RouteResponse.response(payload, status)
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.commonError()
}
