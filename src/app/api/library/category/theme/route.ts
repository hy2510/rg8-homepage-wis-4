import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'bookType', 'level', 'isAll')
  const bookType = parameter.getString('bookType').toUpperCase() as 'EB' | 'PB'
  const level = parameter.getString('level').toUpperCase()
  const allYn = parameter.getString('isAll', 'false') === 'true'

  const [payload, status, error] = await executeRequestAction(
    Library.categoryTheme(token, { bookType, level, allYn }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
