import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  phoneNumber: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/student-phone-request', {
    method: 'post',
    body: {
      phoneNumber: input.phoneNumber,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json?.success || false,
    }
  })
}

export { action as postStudentPhoneRequest }
