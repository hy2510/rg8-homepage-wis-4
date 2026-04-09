import { execute, makeRequest } from '@/8th/shared/http'
import { Pagination, transformPagination } from '@/8th/shared/model/pagination'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchBookWorkbookResponse {
  return {
    book: json.Books.map((item: any) => transformSearchBook(item)),
    page: transformPagination(json.Pagination),
    download: json.ExcelDownload,
  }
}

export type SearchBookWorkbookParams = {
  level: string
  volume?: number
  page?: number
}

export type SearchBookWorkbookResponse = {
  book: SearchBook[]
  page: Pagination
  download?: string
}

export async function getSearchBookWorkbook({
  level,
  volume = 1,
  page = 1,
}: SearchBookWorkbookParams): Promise<SearchBookWorkbookResponse> {
  const request = makeRequest(`api/library/search/workbook`, {
    method: 'get',
    queryString: {
      level,
      volume,
      page,
    },
  })
  return await execute(request, transform)
}
