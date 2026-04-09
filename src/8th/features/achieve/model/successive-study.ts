import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type SuccessiveStudy = {
  straightDayCount: number
  achievedDate: string
}

function makeSuccessiveStudy(json?: any): SuccessiveStudy {
  return {
    straightDayCount: RenewType.renewNumber(json?.StraightDayCount),
    achievedDate: RenewType.renewString(json?.AchievedDate),
  }
}

function transform(json: any): SuccessiveStudysResponse {
  return {
    list: json?.Study?.map((item: any) => makeSuccessiveStudy(item)),
  }
}

export type SuccessiveStudysParams = {}

export type SuccessiveStudysResponse = {
  list: SuccessiveStudy[]
}

export async function getSuccessiveStudy(
  input?: SuccessiveStudysParams,
): Promise<SuccessiveStudysResponse> {
  const request = makeRequest(`api/achievement/successive-study`, {
    method: 'get',
  })
  return await execute(request, transform)
}
