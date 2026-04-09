import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchBookPrekResponse {
  return {
    book: json.Books.map((item: any) => transformSearchBook(item)),
    page: transformPagination(json.Pagination),
  }
}

export type SearchBookPrekParams = {
  activity: string
  status?: string
  page?: number
}

export type SearchBookPrekResponse = {
  book: SearchBook[]
  page: Pagination
}

export async function getSearchBookPrek({
  activity,
  status = 'All',
  page = 1,
}: SearchBookPrekParams): Promise<SearchBookPrekResponse> {
  const request = makeRequest(`api/library/search/pre-k`, {
    method: 'get',
    queryString: {
      activity,
      status,
      page,
    },
  })
  return await execute(request, transform)
}
