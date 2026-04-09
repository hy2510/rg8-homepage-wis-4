import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchBookLevelResponse {
  return {
    book: json.Books.map((item: any) => transformSearchBook(item)),
    page: transformPagination(json.Pagination),
    download: json.ExcelDownload,
  }
}

export type SearchBookLevelParams = {
  bookType: string
  level: string
  page?: number
  sort?: string
  genre?: string
  status?: string
  mode?: string
}

export type SearchBookLevelResponse = {
  book: SearchBook[]
  page: Pagination
  download?: string
}

export async function getSearchBookLevel({
  bookType,
  level,
  page = 1,
  sort = '',
  genre = '',
  status = '',
  mode = undefined,
}: SearchBookLevelParams): Promise<SearchBookLevelResponse> {
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
  return await execute(request, transform)
}
