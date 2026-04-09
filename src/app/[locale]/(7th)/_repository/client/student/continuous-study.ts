import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {}

type Output = {
  continuous: number
  continuous6th: number
  todayStudyYn: boolean
  continuousViewType: '6' | '7'
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/continuous-study', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      continuous: json?.ContinuousStudy || 0,
      continuous6th: json?.ContinuousStudy6th || 0,
      todayStudyYn: json?.TodayStudyYn || false,
      continuousViewType: json?.ContinuousStudyViewType === '6' ? '6' : '7',
    }
  })
}

export { action as getContinuousStudy }
export type { Output as ContinuousStudyResponse }

function newInstance(): Output {
  return {
    continuous: 0,
    continuous6th: 0,
    todayStudyYn: false,
    continuousViewType: '7',
  }
}
export { newInstance as newContinuousStudy }
