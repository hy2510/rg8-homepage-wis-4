import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type UnpaidBalance = {
  requestId: string
  requestTypeCode: string
  requestTypeName: string
  classId: string
  className: string
  startDate: string
  fee: number
}

function makeUnpaidBalance(json?: any): UnpaidBalance {
  return {
    requestId: RenewType.renewString(json?.RequestId),
    requestTypeCode: RenewType.renewString(json?.RequestTypeCode),
    requestTypeName: RenewType.renewString(json?.RequestTypeName),
    classId: RenewType.renewString(json?.ClassId),
    className: RenewType.renewString(json?.ClassName),
    startDate: RenewType.renewString(json?.StartDate),
    fee: RenewType.renewNumber(json?.Fee),
  }
}

function transform(json: any): UnpaidBalanceListResponse {
  return {
    list: json?.Unpaid?.map((item: any) => makeUnpaidBalance(item)),
  }
}

export type UnpaidBalanceListParams = {}

export type UnpaidBalanceListResponse = {
  list: UnpaidBalance[]
}

export async function getUnpaidBalanceList(
  input?: UnpaidBalanceListParams,
): Promise<UnpaidBalanceListResponse> {
  const request = makeRequest(`api/payment/unpaid-balance`, {
    method: 'get',
  })
  return await execute(request, transform)
}
