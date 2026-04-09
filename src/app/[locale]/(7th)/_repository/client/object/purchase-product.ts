import RenewType from '@/util/string-utils'

export interface PurchaseProduct {
  currency: string
  payType: string[]
  product: Product[]
}

export interface Product {
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

interface Discount {
  type: string
  name: string
  fee: number
}

export function makePurchaseProduct(json?: any): PurchaseProduct {
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
