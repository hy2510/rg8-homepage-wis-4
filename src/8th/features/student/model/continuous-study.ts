import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type ContinuousStudy = {
  continuous: number
  continuous6th: number
  todayStudyYn: boolean
  continuousViewType: '6' | '7'
}

function makeContinuousStudy(json: any): ContinuousStudy {
  return {
    continuous: RenewType.renewNumber(json?.ContinuousStudy),
    continuous6th: RenewType.renewNumber(json?.ContinuousStudy6th),
    todayStudyYn: RenewType.renewBoolean(json?.TodayStudyYn),
    continuousViewType: json?.ContinuousStudyViewType === '6' ? '6' : '7',
  }
}

function transform(json: any): ContinuousStudyResponse {
  return makeContinuousStudy(json)
}

export type ContinuousStudyParams = {}

export type ContinuousStudyResponse = ContinuousStudy

export async function getContinuousStudy(
  input?: ContinuousStudyParams,
): Promise<ContinuousStudyResponse> {
  const request = makeRequest(`api/student/continuous-study`, {
    method: 'get',
  })
  return await execute(request, transform)
}
