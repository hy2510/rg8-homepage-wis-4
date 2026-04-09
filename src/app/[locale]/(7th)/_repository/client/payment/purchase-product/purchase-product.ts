import { ApiResponse } from '@/http/common/response'
import {
  PurchaseProduct,
  makePurchaseProduct,
} from '../../object/purchase-product'
import { executeWithAuth, makeRequest } from '../../utils'

type Input = {
  type: string
}

type Output = PurchaseProduct

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/payment/purchase-product', {
    method: 'get',
    queryString: {
      type: input.type,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return makePurchaseProduct(json)
  })
}

export { action as getPurchaseProduct }
export type { Output as PurchaseProductResponse }
function newInstance(): Output {
  return {
    currency: '',
    payType: [],
    product: [],
  }
}
export { newInstance as newPurchaseProduct }
