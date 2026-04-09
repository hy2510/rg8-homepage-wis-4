import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type PurchaseProductList = {
  currency: string
  payType: string[]
  product: Product[]
}

export type Product = {
  id: string
  name: string
  value: number
  fee: number
  totalFee: number
  discount: Discount[]
  event?: {
    name: string
    discountfee: number
    gift?: string
  }
}

type Discount = {
  type: string
  name: string
  fee: number
}

export function makePurchaseProductList(json?: any): PurchaseProductList {
  return {
    currency: RenewType.renewString(json?.currency),
    payType: [...json?.payType?.map((item: string) => item)],
    product: [
      ...json.product.map((product: any): Product => {
        return {
          id: RenewType.renewString(product?.id),
          name: RenewType.renewString(product?.name),
          value: RenewType.renewNumber(product?.value),
          fee: RenewType.renewNumber(product?.fee),
          totalFee: RenewType.renewNumber(product?.totalFee),
          discount: [
            ...product?.discount?.map((discount: any): Discount => {
              return {
                type: RenewType.renewString(discount?.type),
                name: RenewType.renewString(discount?.name),
                fee: RenewType.renewNumber(discount?.fee),
              }
            }),
          ],
          event: product?.event
            ? {
                name: RenewType.renewString(product.event.name),
                discountfee: RenewType.renewNumber(product.event.discountfee),
                gift: product.event.gift
                  ? RenewType.renewString(product.event.gift)
                  : undefined,
              }
            : undefined,
        }
      }),
    ],
  }
}

function transform(json: any): PurchaseProductListResponse {
  return makePurchaseProductList(json)
}

export type PurchaseProductListParams = {
  type: 'direct' | 'directvn' | 'ios' | 'android'
}

export type PurchaseProductListResponse = PurchaseProductList

export async function getPurchaseProductList(
  input: PurchaseProductListParams,
): Promise<PurchaseProductListResponse> {
  const request = makeRequest(`api/payment/purchase-product`, {
    method: 'get',
    queryString: {
      type: input.type,
    },
  })
  return await execute(request, transform)
}
