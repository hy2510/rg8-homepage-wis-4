import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import RenewType from '@/util/string-utils'

export type BoardCustomerReviewList = {
  id: string
  rowNum: number
  writer: string
  school: string
  grade: string
  level: string
  hallOfFame: string
  hallOfFameId: string
  parentYn: boolean
  title: string
  regDate: string
  visit: number
  searchText: string
  topYn: boolean
  prevID: string
  nextID: string
}

function makeBoardCustomerReviewList(json?: any): BoardCustomerReviewList {
  return {
    id: RenewType.renewString(json?.Id),
    rowNum: RenewType.renewNumber(json?.RowNum),
    writer: RenewType.renewString(json?.Writer),
    school: RenewType.renewString(json?.School),
    grade: RenewType.renewString(json?.Grade),
    level: RenewType.renewString(json?.Level),
    hallOfFame: RenewType.renewString(json?.HallOfFame),
    hallOfFameId: RenewType.renewString(json?.HallOfFameId),
    parentYn: RenewType.renewBoolean(json?.ParentYn),
    title: RenewType.renewString(json?.Title),
    regDate: RenewType.renewString(json?.RegDate),
    visit: RenewType.renewNumber(json?.Visit),
    searchText: RenewType.renewString(json?.SearchText),
    topYn: RenewType.renewBoolean(json?.TopYn),
    prevID: RenewType.renewString(json?.PrevID),
    nextID: RenewType.renewString(json?.NextID),
  }
}

function transform(json: any): BoardCustomerReviewListResponse {
  return {
    board: json?.Board?.map((item: any) => makeBoardCustomerReviewList(item)),
    page: transformPagination(json?.Pagination),
  }
}

export type BoardCustomerReviewListParams = { writeType: string; page: number }

export type BoardCustomerReviewListResponse = {
  board: BoardCustomerReviewList[]
  page: Pagination
}

export async function getBoardCustomerReviewList(
  input: BoardCustomerReviewListParams,
): Promise<BoardCustomerReviewListResponse> {
  const request = makeRequest(
    `api/home/customer-review/${input.writeType}`,
    'append-customer',
    {
      method: 'get',
      queryString: {
        page: input.page,
      },
    },
  )
  return await execute(request, transform)
}
