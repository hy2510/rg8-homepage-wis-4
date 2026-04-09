import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchBookMovieResponse {
  return {
    book: json.Books.map((item: any) => transformSearchBook(item)),
    page: transformPagination(json.Pagination),
    download: json.ExcelDownload,
  }
}

export type SearchBookMovieParams = {
  level: string
  page?: number
  sort?: string
  genre?: string
  status?: string
}

export type SearchBookMovieResponse = {
  book: SearchBook[]
  page: Pagination
  download?: string
}

export async function getSearchBookMovie({
  level,
  page = 1,
  sort = '',
  genre = '',
  status = '',
}: SearchBookMovieParams): Promise<SearchBookMovieResponse> {
  const request = makeRequest(`api/library/search/movie`, {
    method: 'get',
    queryString: {
      level,
      sort,
      genre,
      status,
      page,
    },
  })
  return await execute(request, transform)
}
