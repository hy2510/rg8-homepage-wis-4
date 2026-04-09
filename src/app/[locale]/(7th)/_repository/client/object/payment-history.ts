import RenewType from '@/util/string-utils'

export interface PaymentHistory {
  startDate: string
  receiptDate: string
  className: string
  requestTypeName: string
  memo: string
  receiptTypeName: string
  fee: number
  receiptFee: number
}

export function makePaymentHistory(json?: any): PaymentHistory {
  return {
    startDate: RenewType.renewString(json?.StartDate),
    receiptDate: RenewType.renewString(json?.ReceiptDate),
    className: RenewType.renewString(json?.ClassName),
    requestTypeName: RenewType.renewString(json?.RequestTypeName),
    memo: RenewType.renewString(json?.Memo),
    receiptTypeName: RenewType.renewString(json?.ReceiptTypeName),
    fee: RenewType.renewNumber(json?.Fee),
    receiptFee: RenewType.renewNumber(json?.ReceiptFee),
  }
}
