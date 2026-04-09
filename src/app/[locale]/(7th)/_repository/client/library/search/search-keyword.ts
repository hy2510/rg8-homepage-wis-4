import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'
import {
  SearchBookResponse,
  convertSearchBook,
  newSearchBook,
} from './search-book'

type Input = {
  bookType: string
  keyword: string
  page: number
}

type Output = SearchBookResponse

async function action({
  bookType,
  keyword,
  page = 1,
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/keyword?bookType=${bookType}&searchText=${keyword}&page=${page}`,
    {
      method: 'get',
    },
  )
  return await executeWithAuth(request, convertSearchBook)
}

export { action as getSearchKeywordBook }
export type { Output as SearchKeywordBookResponse }

function newInstance(): Output {
  return newSearchBook()
}
export { newInstance as newSearchLevel }
