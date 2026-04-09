import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ChangeStudentAvatarResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type ChangeStudentAvatarParams = {
  avatarId: string
}

export type ChangeStudentAvatarResponse = {
  success: boolean
}

export async function putChangeStudentAvatar(
  input: ChangeStudentAvatarParams,
): Promise<ChangeStudentAvatarResponse> {
  const request = makeRequest(`api/student/avatar`, {
    method: 'put',
    queryString: {
      avatarId: input.avatarId,
    },
  })
  return await execute(request, transform)
}
