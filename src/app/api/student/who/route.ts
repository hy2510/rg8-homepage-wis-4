import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = await getAuthorizationWithCookie()
  if (!token) {
    return RouteResponse.response({}, { status: 403 })
  } else if (!token.isLogin()) {
    return RouteResponse.response({}, { status: 403 })
  }

  const parameter = await getParameters(request, 'studentId')
  const studentId = parameter.getString('studentId', '')

  if (!studentId) {
    return RouteResponse.response({}, { status: 403 })
  }

  const uid = token.getTokenUserDetails()?.uid

  if (!!uid && studentId === uid) {
    return RouteResponse.response({}, { status: 200 })
  } else {
    return RouteResponse.response({}, { status: 403 })
  }
}
