import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type AdjustHistory = {
  startDate: string
  endDate: string
}

export function makeAdjustHistory(json?: any): AdjustHistory {
  return {
    startDate: RenewType.renewString(json?.StartDate),
    endDate: RenewType.renewString(json?.EndDate),
  }
}

function transform(json: any): AdjustHistoryListResponse {
  return {
    history: json?.History?.map((item: any) => makeAdjustHistory(item)),
  }
}

export type AdjustHistoryListParams = {}

export type AdjustHistoryListResponse = {
  history: AdjustHistory[]
}

export async function getAdjustHistoryList(
  input?: AdjustHistoryListParams,
): Promise<AdjustHistoryListResponse> {
  const request = makeRequest(`api/payment/adjust`, {
    method: 'get',
  })
  return await execute(request, transform)
}
