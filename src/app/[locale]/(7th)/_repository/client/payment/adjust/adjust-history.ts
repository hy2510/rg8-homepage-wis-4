import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { AdjustHistory, makeAdjustHistory } from '../../object/adjust-history'
import { makeRequest } from '../../utils'

type Input = {}

type Output = AdjustHistory[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/payment/adjust', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return [
      ...json.History?.map((item: any) => {
        return makeAdjustHistory(item)
      }),
    ]
  })
}

export { action as getAdjustHistory }
export type { Output as AdjustHistoryResponse }
function newInstance(): Output {
  return []
}
export { newInstance as newAdjustHistory }
