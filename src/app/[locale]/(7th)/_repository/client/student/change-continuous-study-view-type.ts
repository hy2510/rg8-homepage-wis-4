import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {
  viewType: '6' | '7'
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/continuous-study', {
    method: 'put',
    queryString: {
      viewType: input.viewType,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as putChangeContinuousStudyViewType }
export type { Output as ChangeContinuousStudyViewTypeResponse }

function newInstance(): Output {
  return {
    success: false,
  }
}
export { newInstance as newChangeContinuousSudyViewType }
