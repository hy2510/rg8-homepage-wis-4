import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type Login = { success: boolean; staff?: boolean; student?: boolean }

function makeLogin(json: any): Login {
  return {
    success: RenewType.renewBoolean(json?.success),
    staff: RenewType.renewBoolean(json?.staff),
    student: RenewType.renewBoolean(json?.student),
  }
}

function transform(json: any): LoginResponse {
  return makeLogin(json)
}

export type LoginParams = {
  id: string
  password: string
  deviceType: string
  loginType: string
}

export type LoginResponse = Login

export async function postLogin(input: LoginParams): Promise<LoginResponse> {
  const request = makeRequest(`api/account/signin`, 'append-customer', {
    method: 'post',
    body: {
      deviceType: input.deviceType,
      id: input.id,
      password: input.password,
      t: input.loginType,
    },
  })
  return await execute(request, transform)
}
