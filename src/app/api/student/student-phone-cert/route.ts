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

  const parameter = await getBodyParameters(
    request,
    'phoneNumber',
    'authCode',
    'update',
  )
  const phoneNumber = parameter.getString('phoneNumber', '')
  const authCode = parameter.getString('authCode', '')
  const update = parameter.getString('update', 'N')

  const [payload, status, error] = await executeRequestAction(
    Student.studentPhoneNumberCert(token, {
      phoneNumber,
      certification: authCode,
    }),
  )
  let resultPayload: any = payload
  let resultStatus = status
  if (payload.success && update === 'Y') {
    const [payload2, status2, error2] = await executeRequestAction(
      Student.changePhoneNumber(token, {
        phoneNumber,
      }),
    )
    resultPayload = payload2
    resultStatus = status2
    if (error2) {
      return RouteResponse.commonError()
    }
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(resultPayload, resultStatus)
}
