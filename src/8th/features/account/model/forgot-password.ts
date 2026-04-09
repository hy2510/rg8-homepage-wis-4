import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type ForgotPassword = {
  code: number
  email: string
  success: boolean
}

function makeForgotPassword(json: any): ForgotPassword {
  return {
    code: RenewType.renewNumber(json.code),
    email: RenewType.renewString(json.email),
    success: RenewType.renewBoolean(json.success),
  }
}

function transform(json: any): ForgotPasswordResponse {
  return makeForgotPassword(json)
}

export type ForgotPasswordParams = {
  type: 'Email' | 'Id'
  keyword: string
}

export type ForgotPasswordResponse = {
  code: number
  email: string
  success: boolean
}

export async function getForgotPassword(
  input: ForgotPasswordParams,
): Promise<ForgotPasswordResponse> {
  const request = makeRequest(
    `api/account/forgot/password`,
    'append-customer',
    {
      method: 'get',
      queryString: {
        type: input.type,
        keyword: input.keyword,
      },
    },
  )
  return await execute(request, transform)
}
