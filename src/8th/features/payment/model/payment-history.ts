import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type PaymentHistory = {
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

function transform(json: any): PaymentHistoryListResponse {
  return {
    history: json?.History?.map((item: any) => makePaymentHistory(item)),
  }
}

export type PaymentHistoryListParams = {}

export type PaymentHistoryListResponse = {
  history: PaymentHistory[]
}

export async function getPaymentHistoryList(
  input?: PaymentHistoryListParams,
): Promise<PaymentHistoryListResponse> {
  const request = makeRequest(`api/payment`, {
    method: 'get',
  })
  return await execute(request, transform)
}
