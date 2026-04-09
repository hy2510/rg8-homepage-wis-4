import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {
  cause: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/withdraw', {
    method: 'post',
    body: { cause: input.cause },
  })
  return await executeWithAuth(request, (json): Output => {
    return { success: json.success }
  })
}

export { action as postWithdraw }
export type { Output as WithdrawResponse }
