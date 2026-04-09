import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Home from '@/repository/server/home'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
  getParameters,
} from '../../../../_util'

export async function POST(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'boardId',
    'title',
    'content',
    'imageFileName',
    'imageFileOriginName',
    'deleteFile',
    'deleteImage',
    'registStaffId',
  )

  const boardId = parameter.getString('boardId')
  const title = parameter.getString('title')
  const content = parameter.getString('content')
  const imageFileName = parameter.getString('imageFileName') || undefined
  const imageFileOriginName =
    parameter.getString('imageFileOriginName') || undefined
  const registStaffId = parameter.getString('registStaffId')
  const deleteImageYn = parameter.getString('deleteImage', 'N')

  const [payload, status, error] = await executeRequestAction(
    Home.galleryModify(token, {
      boardId,
      title,
      content,
      imageFileName,
      imageFileOriginName,
      registStaffId,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function DELETE(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'boardId', 'registStaffId')

  const boardId = parameter.getString('boardId')
  const registStaffId = parameter.getString('registStaffId')

  const [payload, status, error] = await executeRequestAction(
    Home.galleryDelete(token, {
      boardId,
      registStaffId,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
