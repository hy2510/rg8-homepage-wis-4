import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type Avatar = {
  avatarId: string
  name: string
  imageLarge: string
  imageSmall: string
  imageCircle: string
}

function makeAvatar(json: any): Avatar {
  return {
    avatarId: RenewType.renewString(json?.AvatarId),
    name: RenewType.renewString(json?.Name),
    imageLarge: RenewType.renewString(json?.ImageLarge),
    imageSmall: RenewType.renewString(json?.ImageSmall),
    imageCircle: RenewType.renewString(json?.ImageCircle),
  }
}

function transform(json: any): StudentAvatarListResponse {
  return {
    avatarId: RenewType.renewString(json?.StudentAvatarId),
    list: json?.StudentAvatar?.map((item: any) => makeAvatar(item)),
  }
}

export type StudentAvatarListParams = {}

export type StudentAvatarListResponse = {
  avatarId: string
  list: Avatar[]
}

export async function getStudentAvatarList(
  input?: StudentAvatarListParams,
): Promise<StudentAvatarListResponse> {
  const request = makeRequest(`api/student/avatar`, {
    method: 'get',
  })
  return await execute(request, transform)
}
