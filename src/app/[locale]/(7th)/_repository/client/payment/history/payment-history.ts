import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  PaymentHistory,
  makePaymentHistory,
} from '../../object/payment-history'
import { makeRequest } from '../../utils'

type Input = {}

type Output = PaymentHistory[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/payment', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return [
      ...json.History?.map((item: any) => {
        return makePaymentHistory(item)
      }),
    ]
  })
}

export { action as getPaymentHistory }
export type { Output as PaymentHistoryResponse }
function newInstance(): Output {
  return []
}
export { newInstance as newPaymentHistory }
