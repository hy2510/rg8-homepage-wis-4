import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'
import {
  SearchBookResponse,
  convertSearchBook,
  newSearchBook,
} from './search-book'

type Input = {
  page?: number
}

type Output = SearchBookResponse

async function action({ page = 1 }: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/library/search/try-again?page=${page}`, {
    method: 'get',
  })
  return await executeWithAuth(request, convertSearchBook)
}

export { action as getSearchTryAgain }
export type { Output as SearchTryAgainResponse }

function newInstance(): Output {
  return newSearchBook()
}
export { newInstance as newSearchTryAgain }
