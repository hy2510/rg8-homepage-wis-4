import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'
import {
  SearchBookResponse,
  convertSearchBook,
  newSearchBook,
} from './search-book'

type Input = {
  level: string
  volume?: number
  page?: number
}

type Output = SearchBookResponse

async function action({
  level,
  volume = 1,
  page = 1,
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/workbook?level=${level}&volume=${volume}&page=${page}`,
    {
      method: 'get',
    },
  )
  return await executeWithAuth(request, convertSearchBook)
}

export { action as getSearchWorkbook }
export type { Output as SearchWorkbookResponse }

function newInstance(): Output {
  return newSearchBook()
}
export { newInstance as newSearchWorkbook }
