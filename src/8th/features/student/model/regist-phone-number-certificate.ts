import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): RegistPhoneNumberCertificateResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type RegistPhoneNumberCertificateParams = {
  phoneNumber: string
  authCode: string
  update?: boolean
}

export type RegistPhoneNumberCertificateResponse = {
  success: boolean
}

export async function postRegistPhoneNumberCertificate(
  input: RegistPhoneNumberCertificateParams,
): Promise<RegistPhoneNumberCertificateResponse> {
  const request = makeRequest(`api/student/student-phone-cert`, {
    method: 'post',
    body: {
      phoneNumber: input.phoneNumber,
      authCode: input.authCode,
      update: input.update ? 'Y' : 'N',
    },
  })
  return await execute(request, transform)
}
