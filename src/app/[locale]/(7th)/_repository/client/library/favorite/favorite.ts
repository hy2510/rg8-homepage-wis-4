import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'
import {
  SearchBookResponse,
  convertSearchBook,
  newSearchBook,
} from '../search/search-book'

type Input = {
  status?: string
  page?: number
}

type Output = SearchBookResponse

async function action(input?: Input): Promise<ApiResponse<Output>> {
  const status = input?.status || 'All'

  const request = makeRequest('api/library/favorite', {
    method: 'get',
    queryString: {
      status,
      page: input?.page || 1,
    },
  })
  return await executeWithAuth(request, convertSearchBook)
}

export { action as getFavorite }
export type { Output as FavoriteResponse }

function newInstance(): Output {
  return newSearchBook()
}
export { newInstance as newFavorite }
