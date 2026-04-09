import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ChangeSmsAgreeResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type ChangeSmsAgreeParams = {
  isReceive: boolean
}

export type ChangeSmsAgreeResponse = {
  success: boolean
}

export async function postChangeSmsAgree(
  input: ChangeSmsAgreeParams,
): Promise<ChangeSmsAgreeResponse> {
  const request = makeRequest(`api/student/change-sms-agree`, {
    method: 'post',
    body: {
      studyReportYn: input.isReceive,
      eventInformationYn: input.isReceive,
    },
  })
  return await execute(request, transform)
}
