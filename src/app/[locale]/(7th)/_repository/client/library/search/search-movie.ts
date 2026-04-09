import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'
import {
  SearchBookResponse,
  convertSearchBook,
  newSearchBook,
} from './search-book'

type Input = {
  level: string
  page?: number
  sort?: string
  genre?: string
  status?: string
}

type Output = SearchBookResponse

async function action({
  level,
  page = 1,
  sort = '',
  genre = '',
  status = '',
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/movie?level=${level}&sort=${sort}&genre=${genre}&status=${status}&page=${page}`,
    {
      method: 'get',
    },
  )
  return await executeWithAuth(request, convertSearchBook)
}

export { action as getSearchMovieBook }
export type { Output as SearchMovieBookResponse }

function newInstance(): Output {
  return newSearchBook()
}
export { newInstance as newSearchMovie }
