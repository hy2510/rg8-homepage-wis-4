import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'
import { Login } from './login'

function makeLogin(json: any): Login {
  return {
    success: RenewType.renewBoolean(json?.success),
    staff: RenewType.renewBoolean(json?.staff),
    student: RenewType.renewBoolean(json?.student),
  }
}

function transform(json: any): LoginWithSSOResponse {
  return makeLogin(json)
}

export type LoginWithSSOParams = {
  code: string
  i: number
  deviceType: string
  loginType: string
}

export type LoginWithSSOResponse = Login

export async function postLoginWithSSO(
  input: LoginWithSSOParams,
): Promise<LoginWithSSOResponse> {
  const request = makeRequest(
    `api/account/signin-with-code`,
    'append-customer',
    {
      method: 'post',
      body: {
        code: input.code,
        i: input.i,
        deviceType: input.deviceType,
        t: input.loginType,
      },
    },
  )
  return await execute(request, transform)
}
