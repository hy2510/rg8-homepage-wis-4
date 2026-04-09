import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchBookSeriesResponse {
  return {
    book: json.Books.map((item: any) => transformSearchBook(item)),
    page: transformPagination(json.Pagination),
    download: json.ExcelDownload,
  }
}

export type SearchBookSeriesParams = {
  bookType: string
  keyword: string
  level?: string
  status?: string
  genre?: string
  sort?: string
  page?: number
}

export type SearchBookSeriesResponse = {
  book: SearchBook[]
  page: Pagination
  download?: string
}

export async function getSearchBookSeries({
  bookType,
  keyword,
  level,
  status = 'All',
  genre = 'All',
  sort = 'Preference',
  page = 1,
}: SearchBookSeriesParams): Promise<SearchBookSeriesResponse> {
  const request = makeRequest(`api/library/search/series`, {
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
  return await execute(request, transform)
}
