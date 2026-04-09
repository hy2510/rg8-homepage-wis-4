import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  BoardCustomerReview,
  makeBoardCustomerReview,
} from '../object/board-customer-review'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  writeType: string
  id: string
}

type Output = BoardCustomerReview

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    `api/home/customer-review/${input.writeType}/${input.id}`,
    {
      method: 'get',
    },
  )
  return await execute(request, (json): Output => {
    return makeBoardCustomerReview(json)
  })
}

function newInstance(): Output {
  return makeBoardCustomerReview()
}
export {
  action as getBoardCustomerReview,
  newInstance as newBoardCustomerReview,
}
export type { Output as BoardCustomerReviewResponse }
