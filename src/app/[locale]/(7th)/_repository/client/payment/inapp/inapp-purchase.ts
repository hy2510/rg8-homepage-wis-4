import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {
  platform: 'android' | 'ios'
  productId: string
  receipt: string
}

type Output = {
  code: number
  message: string
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/payment/inapp', {
    method: 'post',
    body: {
      platform: input.platform,
      productId: input.productId,
      receipt: input.receipt,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      code: json.code,
      message: json.message,
    }
  })
}

export { action as postInappPurchase }
