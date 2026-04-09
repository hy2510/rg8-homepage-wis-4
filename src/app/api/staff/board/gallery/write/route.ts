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
    'imageFileName',
    'imageFileOriginName',
  )

  const title = parameter.getString('title')
  const content = parameter.getString('content')
  const imageFileName = parameter.getString('imageFileName')
  const imageFileOriginName = parameter.getString('imageFileOriginName')

  const [payload, status, error] = await executeRequestAction(
    Home.galleryPost(token, {
      title,
      content,
      imageFileName,
      imageFileOriginName,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
