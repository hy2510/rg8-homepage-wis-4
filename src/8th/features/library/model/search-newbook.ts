import { execute, makeRequest } from '@/8th/shared/http'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchBookNewContentsResponse {
  return {
    EB: json.EBook.map((item: any) => transformSearchBook(item)),
    PB: json.PBook.map((item: any) => transformSearchBook(item)),
  }
}

export type SearchBookNewContentsParams = {
  year: number
  month: number
}

export type SearchBookNewContentsResponse = {
  EB: SearchBook[]
  PB: SearchBook[]
}

export async function getSearchBookNewContents({
  year,
  month,
}: SearchBookNewContentsParams): Promise<SearchBookNewContentsResponse> {
  const request = makeRequest(`api/library/new-books`, {
    method: 'get',
    queryString: {
      year,
      month,
    },
  })
  return await execute(request, transform)
}
