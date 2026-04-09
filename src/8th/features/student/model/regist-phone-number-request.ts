import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): RegistPhoneNumberRequestResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type RegistPhoneNumberRequestParams = {
  phoneNumber: string
}

export type RegistPhoneNumberRequestResponse = {
  success: boolean
}

export async function postRegistPhoneNumberRequest(
  input: RegistPhoneNumberRequestParams,
): Promise<RegistPhoneNumberRequestResponse> {
  const request = makeRequest(`api/student/student-phone-request`, {
    method: 'post',
    body: {
      phoneNumber: input.phoneNumber,
    },
  })
  return await execute(request, transform)
}
