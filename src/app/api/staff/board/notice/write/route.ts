import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Home from '@/repository/server/home'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '../../../../_util'

export async function POST(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'title',
    'content',
    'attachFileName',
    'attachFileOriginName',
    'imageFileName',
    'imageFileOriginName',
  )

  const title = parameter.getString('title')
  const content = parameter.getString('content')
  const attachFileName = parameter.getString('attachFileName') || undefined
  const attachFileOriginName =
    parameter.getString('attachFileOriginName') || undefined
  const imageFileName = parameter.getString('imageFileName') || undefined
  const imageFileOriginName =
    parameter.getString('imageFileOriginName') || undefined

  const [payload, status, error] = await executeRequestAction(
    Home.noticePost(token, {
      title,
      content,
      attachFileName,
      attachFileOriginName,
      imageFileName,
      imageFileOriginName,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
