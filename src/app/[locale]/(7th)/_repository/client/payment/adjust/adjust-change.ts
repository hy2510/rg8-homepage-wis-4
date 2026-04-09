import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../../utils'

type Input = {
  command: 'pause' | 'release'
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/payment/adjust', {
    method: 'put',
    queryString: {
      command: input.command,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as putAdjustChange }
export type { Output as AdjustChangeResponse }
function newInstance(): Output {
  return {
    success: false,
  }
}
export { newInstance as newAdjustChange }
