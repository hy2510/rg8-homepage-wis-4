import { execute, makeRequest } from '@/8th/shared/http'

function makeTemporaryChangePassword(json: any): { success: boolean } {
  return {
    success: json.success,
  }
}

function transform(json: any): TemporaryChangePasswordResponse {
  return makeTemporaryChangePassword(json)
}

export type TemporaryChangePasswordParams = {
  hash: string
  newPassword: string
}

export type TemporaryChangePasswordResponse = {
  success: boolean
}

export async function postTemporaryChangePassword(
  input: TemporaryChangePasswordParams,
): Promise<TemporaryChangePasswordResponse> {
  const request = makeRequest(`api/account/change-password`, {
    method: 'post',
    body: {
      hash: input.hash,
      newPassword: input.newPassword,
    },
  })
  return await execute(request, transform)
}
