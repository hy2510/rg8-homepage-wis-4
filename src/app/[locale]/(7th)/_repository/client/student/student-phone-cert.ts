import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  phoneNumber: string
  authCode: string
  update?: boolean
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/student-phone-cert', {
    method: 'post',
    body: {
      phoneNumber: input.phoneNumber,
      authCode: input.authCode,
      update: input.update ? 'Y' : 'N',
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json?.success || false,
    }
  })
}

export { action as postStudentPhoneCert }
