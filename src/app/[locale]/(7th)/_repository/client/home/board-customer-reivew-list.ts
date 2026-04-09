import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  BoardCustomerReviewList,
  makeBoardCustomerReviewList,
} from '../object/board-customer-review-list'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  writeType: string
  page?: number
}

type Output = {
  board: BoardCustomerReviewList[]
  page: {
    page: number
    size: number
    totalPages: number
    totalRecords: number
  }
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    `api/home/customer-review/${input.writeType}`,
    {
      method: 'get',
      queryString: {
        page: input.page,
      },
    },
  )
  return await execute(request, (json): Output => {
    return {
      board: json.Board.map(
        (item: any): BoardCustomerReviewList =>
          makeBoardCustomerReviewList(item),
      ),
      page: {
        page: Number(json.Pagination.Page),
        size: Number(json.Pagination.RecordPerPage),
        totalPages: Number(json.Pagination.TotalPages),
        totalRecords: Number(json.Pagination.TotalRecords),
      },
    }
  })
}

function newInstance(): Output {
  return {
    board: [],
    page: {
      page: 0,
      size: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  }
}
export {
  action as getBoardCustomerReviewList,
  newInstance as newBoardCustomerReviewList,
}
export type { Output as BoardCustomerReviewListResponse }
