import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'

const AVATAR_ID_MAP: Record<string, string> = {
  '097971': 'dodo',
  '097972': 'koon',
  '097973': 'juju',
  '097974': 'bori',
  '097975': 'pang',
  '097976': 'momo',
  '097977': 'poopy',
  '097978': 'robo_cleaner',
  '097979': 'dori',
  '097980': 'erika',
  '097981': 'ella',
  '097982': 'poika',
}

function getAvatarIdKey(avatarId: string): string {
  const key = AVATAR_ID_MAP[avatarId]
  if (key) {
    return key
  }
  return 'dodo'
}
export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const [rawPayload, status, error] = await executeRequestAction(
    Student.studentAvatarList(token),
  )
  const payload = rawPayload
    ? {
        StudentAvatarId: rawPayload.StudentAvatarId,
        StudentAvatar: rawPayload.StudentAvatar.map((item: any) => {
          const id = getAvatarIdKey(item.AvatarId)
          return {
            AvatarId: item.AvatarId,
            Name: item.NameEng,
            ImageLarge: `https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/${id}_01.png`,
            ImageSmall: `https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/${id}_02.png`,
            ImageCircle: `https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/${id}_09.png`,
          }
        }),
      }
    : {
        StudentAvatarId: '097971',
        StudentAvatar: [
          {
            AvatarId: '097971',
            Name: 'Dodo',
            ImageLarge: `https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_01.png`,
            ImageSmall: `https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_02.png`,
            ImageCircle: `https://wcfresource.a1edu.com/newsystem/image/character/maincharacter/dodo_09.png`,
          },
        ],
      }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function PUT(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'avatarId')
  const avatarId = parameter.getString('avatarId', '').toLocaleLowerCase()

  if (!avatarId) {
    //Exception !
  }
  const [payload, status, error] = await executeRequestAction(
    Student.studentAvatarChange(token, { avatarId }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
