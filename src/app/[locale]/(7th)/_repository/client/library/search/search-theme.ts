import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'
import {
  SearchBookResponse,
  convertSearchBook,
  newSearchBook,
} from './search-book'

type Input = {
  level: string
  bookType: string
  sort: string
  status: string
  genre: string
  keyword: string
  page: number
}

type Output = SearchBookResponse

async function action({
  bookType,
  keyword,
  level,
  status = 'All',
  genre = 'All',
  sort = 'Preference',
  page = 1,
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/library/search/theme`, {
    method: 'get',
    queryString: {
      searchText: keyword,
      bookType,
      level: level || undefined,
      sort,
      genre,
      status,
      page,
    },
  })
  return await executeWithAuth(request, convertSearchBook)
}

export { action as getSearchThemeBook }
export type { Output as SearchThemeBookResponse }

function newInstance(): Output {
  return newSearchBook()
}
export { newInstance as newThemeSeriesBook }
