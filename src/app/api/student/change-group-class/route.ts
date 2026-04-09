import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '../../_util'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const [payload, status, error] = await executeRequestAction(
    Student.changeableClassGroupInfo(token),
  )
  if (payload.ClassList && payload.ClassList.length > 0) {
    payload.ClassList = payload.ClassList.filter(
      (cls: any) => cls.ClassName.indexOf('미편성') < 0,
    )
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function POST(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'studentHistoryId',
    'newClassId',
  )
  const studentHistoryId = parameter.getString('studentHistoryId', '')
  const newClassId = parameter.getString('newClassId', '')

  const [payload, status, error] = await executeRequestAction(
    Student.changeClass(token, { studentHistoryId, newClassId }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
