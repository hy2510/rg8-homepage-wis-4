import {
  getAuthorizationWithCookie,
  setTokenWithCookie,
} from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest, NextResponse } from 'next/server'
import Account from '@/repository/server/account'
import { RouteResponse, executeRequestAction, getParameters } from '../../_util'

export async function PUT(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'uid')
  const uid = parameter.getString('uid')

  const [payload, status, error] = await executeRequestAction(
    Account.mriage(token, { uid }),
  )
  if (status.status >= 200 && status.status < 300) {
    const token = {
      accessToken: payload.token.accessToken,
      refreshToken: payload.token.refreshToken,
      tag: 'tag',
    }
    return setTokenWithCookie(
      NextResponse.json({ success: true }, status),
      token,
    )
  }

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.commonError()
}
