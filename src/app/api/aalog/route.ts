import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import { logwrite } from './logserve'

// @@ FIXME : MEMO : 7-8차 사용량 분석용도의 소스코드
const LOG_ACTIVE = process.env.LOG_ACTIVE === 'Y'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'serialize')
  const serialize = parameter.getString('serialize', '')

  if (LOG_ACTIVE) {
    logwrite(`${serialize}|${Date.now()}`)
  }

  return RouteResponse.response({ success: true }, { status: 201 })
}
