import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ChangePasswordResponse {
  return {
    success: RenewType.renewBoolean(json.success),
    code: RenewType.renewNumber(json.code),
  }
}

export type ChangePasswordParams = {
  oldPassword: string
  newPassword: string
}

export type ChangePasswordResponse = {
  success: boolean
  code: number
}

export async function postChangePassword(
  input: ChangePasswordParams,
): Promise<ChangePasswordResponse> {
  const request = makeRequest(`api/student/change-password`, {
    method: 'post',
    body: {
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
    },
  })
  return await execute(request, transform)
}
