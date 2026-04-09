import { ApiResponse } from '@/http/common/response'
import {
  EarnReadingUnit,
  makeEarnReadingUnit,
} from '../object/earn-reading-unit'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {}

type Output = EarnReadingUnit[]
async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/earn-reading-unit', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return json?.ReadingUnit?.map((item: any) => {
      return makeEarnReadingUnit(item)
    })
  })
}

export { action as getStudentEarnReadingUnit }
function newInstance(): Output {
  return []
}
export { newInstance as newStudentEarnReadingUnit }
export type { Output as EarnReadingUnitResponse }
