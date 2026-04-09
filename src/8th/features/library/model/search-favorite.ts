import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchBookFavoriteResponse {
  return {
    book: json.Books.map((item: any) => transformSearchBook(item)),
    page: transformPagination(json.Pagination),
    download: json.ExcelDownload,
  }
}

export type SearchBookFavoriteParams = {
  status?: string
  page?: number
}

export type SearchBookFavoriteResponse = {
  book: SearchBook[]
  page: Pagination
  download?: string
}

export async function getSearchBookFavorite({
  status = 'All',
  page = 1,
}: SearchBookFavoriteParams): Promise<SearchBookFavoriteResponse> {
  const request = makeRequest(`api/library/favorite`, {
    method: 'get',
    queryString: {
      status,
      page,
    },
  })
  return await execute(request, transform)
}
