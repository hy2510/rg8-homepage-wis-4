import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type ForgotId = {
  loginId: string
  studentName: string
  registDate: string
}

function makeForgotId(json?: any): ForgotId {
  return {
    loginId: RenewType.renewString(json?.LoginId),
    studentName: RenewType.renewString(json?.StudentName),
    registDate: RenewType.renewString(json?.RegistDate),
  }
}

function transform(json: any): ForgotIdResponse {
  return {
    list: json.ID.map((item: any) => makeForgotId(item)),
  }
}

export type ForgotIdParams = {
  type: 'Email' | 'Phone'
  keyword: string
}

export type ForgotIdResponse = {
  list: ForgotId[]
}

export async function getForgotId(
  input: ForgotIdParams,
): Promise<ForgotIdResponse> {
  const request = makeRequest(`api/account/forgot/id`, 'append-customer', {
    method: 'get',
    queryString: {
      type: input.type,
      keyword: input.keyword,
    },
  })
  return await execute(request, transform)
}
