import { ApiResponse } from '@/http/common/response'
import { UnpaidBalance, makeUnpaidBalance } from '../../object/unpaid-balance'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {}

type Output = UnpaidBalance[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/payment/unpaid-balance', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    if (!json) {
      return newInstance()
    }
    return json.Unpaid.map((item: any) => {
      return makeUnpaidBalance(item)
    })
  })
}

export { action as getUnpaidBalance }
export type { Output as UnpaidBalanceResponse }
function newInstance(): Output {
  return []
}
export { newInstance as newUnpaidBalance }
