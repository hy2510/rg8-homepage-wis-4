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
  const [payload, status, error] = await executeRequestAction(
    Payment.adjustHistory(token),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function PUT(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'command')
  const command = parameter.getString('command', 'pause').toLocaleLowerCase()

  const [payload, status, error] = await executeRequestAction(
    command === 'pause'
      ? Payment.adjustPause(token)
      : Payment.adjustRelease(token),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
