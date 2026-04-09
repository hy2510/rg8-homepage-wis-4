import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = { studentId: string }

type Output = {}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/who', {
    method: 'get',
    queryString: {
      studentId: input.studentId,
    },
  })
  return await execute(request, (json): Output => {
    return {}
  })
}

export { action as getWho }
