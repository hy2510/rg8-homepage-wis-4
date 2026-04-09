import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchBookTryAgainResponse {
  return {
    book: json.Books.map((item: any) => transformSearchBook(item)),
    page: transformPagination(json.Pagination),
    download: json.ExcelDownload,
  }
}

export type SearchBookTryAgainParams = {
  page?: number
}

export type SearchBookTryAgainResponse = {
  book: SearchBook[]
  page: Pagination
  download?: string
}

export async function getSearchBookTryAgain({
  page = 1,
}: SearchBookTryAgainParams): Promise<SearchBookTryAgainResponse> {
  const request = makeRequest(`api/library/search/try-again`, {
    method: 'get',
    queryString: {
      page,
    },
  })
  return await execute(request, transform)
}
