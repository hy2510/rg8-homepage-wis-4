import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '../../_util'

export async function POST(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(request, 'phoneNumber')
  const phoneNumber = parameter.getString('phoneNumber', '')

  const [payload, status, error] = await executeRequestAction(
    Student.studentPhoneNumberRequestKR(token, { phoneNumber }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
