import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'
import {
  SearchBookResponse,
  convertSearchBook,
  newSearchBook,
} from './search-book'

type Input = {
  bookType: string
  level: string
  page?: number
  sort?: string
  genre?: string
  status?: string
  mode?: string
}

type Output = SearchBookResponse

async function action({
  bookType,
  level,
  page = 1,
  sort = '',
  genre = '',
  status = '',
  mode = undefined,
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/library/search/level`, {
    method: 'get',
    queryString: {
      bookType,
      level,
      sort,
      genre,
      status,
      mode,
      page,
    },
  })
  return await executeWithAuth(request, convertSearchBook)
}

export { action as getSearchLevelBook }
export type { Output as SearchLevelBookResponse }

function newInstance(): Output {
  return newSearchBook()
}
export { newInstance as newSearchLevel }
