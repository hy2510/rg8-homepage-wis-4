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
    'notifyId',
    'title',
    'content',
    'attachFileName',
    'attachFileOriginName',
    'imageFileName',
    'imageFileOriginName',
    'deleteFile',
    'deleteImage',
    'registStaffId',
  )

  const notifyId = parameter.getString('notifyId')
  const title = parameter.getString('title')
  const content = parameter.getString('content')
  const attachFileName = parameter.getString('attachFileName') || undefined
  const attachFileOriginName =
    parameter.getString('attachFileOriginName') || undefined
  const imageFileName = parameter.getString('imageFileName') || undefined
  const imageFileOriginName =
    parameter.getString('imageFileOriginName') || undefined
  const registStaffId = parameter.getString('registStaffId')
  const deleteFileYn = parameter.getString('deleteFile', 'N')
  const deleteImageYn = parameter.getString('deleteImage', 'N')

  const [payload, status, error] = await executeRequestAction(
    Home.noticeModify(token, {
      notifyId,
      title,
      content,
      attachFileName,
      attachFileOriginName,
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

  const parameter = await getParameters(request, 'notifyId', 'registStaffId')

  const notifyId = parameter.getString('notifyId')
  const registStaffId = parameter.getString('registStaffId')

  const [payload, status, error] = await executeRequestAction(
    Home.noticeDelete(token, {
      notifyId,
      registStaffId,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
