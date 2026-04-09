import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): PurchaseInappResponse {
  return {
    code: RenewType.renewNumber(json.code),
    message: RenewType.renewString(json.message),
  }
}

export type PurchaseInappParams = {
  platform: 'android' | 'ios'
  productId: string
  receipt: string
}

export type PurchaseInappResponse = {
  code: number
  message: string
}

export async function postPurchaseInapp(
  input: PurchaseInappParams,
): Promise<PurchaseInappResponse> {
  const request = makeRequest(`api/payment/inapp`, {
    method: 'post',
    body: {
      platform: input.platform,
      productId: input.productId,
      receipt: input.receipt,
    },
  })
  return await execute(request, transform)
}
