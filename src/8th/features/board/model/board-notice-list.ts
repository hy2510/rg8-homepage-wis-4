import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import RenewType from '@/util/string-utils'

export type BoardNoticeList = {
  notifyId: string
  title: string
  readCount: number
  startDate: string
  endDate: string
  prevNotifyId: string
  nextNotifyId: string
  registDate: string
  totalCount: number
}

function makeBoardNoticeList(json?: any): BoardNoticeList {
  return {
    notifyId: RenewType.renewString(json?.NotifyId),
    title: RenewType.renewString(json?.Title),
    readCount: RenewType.renewNumber(json?.ReadCount),
    startDate: RenewType.renewString(json?.StartDate),
    endDate: RenewType.renewString(json?.EndDate),
    prevNotifyId: RenewType.renewString(json?.PrevNotifyId),
    nextNotifyId: RenewType.renewString(json?.NextNotifyId),
    registDate: RenewType.renewString(json?.RegistDate),
    totalCount: RenewType.renewNumber(json?.TotalCount),
  }
}

function transform(json: any): BoardNoticeListResponse {
  return {
    board: json.Board.map((item: any) => makeBoardNoticeList(item)),
    page: transformPagination(json?.Pagination),
    writable: RenewType.renewBoolean(json?.Writable),
  }
}

export type BoardNoticeListParams = {
  page: number
}

export type BoardNoticeListResponse = {
  board: BoardNoticeList[]
  page: Pagination
  writable?: boolean
}

export async function getBoardNoticeList(
  input: BoardNoticeListParams,
): Promise<BoardNoticeListResponse> {
  const request = makeRequest(`api/home/notice`, 'append-customer', {
    method: 'get',
    queryString: {
      page: input.page,
    },
  })
  return await execute(request, transform)
}
