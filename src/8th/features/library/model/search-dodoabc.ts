import { execute, makeRequest } from '@/8th/shared/http'
import { SearchBook, transformSearchBook } from '@/8th/shared/model/search-book'

function transform(json: any): SearchDodoABCResponse {
  return {
    book: json.Books.map((item: any) => transformSearchBook(item)),
  }
}

export type SearchDodoABCParams = {
  activity: string
  status?: string
}

export type SearchDodoABCResponse = {
  book: SearchBook[]
}

export async function getSearchDodoABCBook({
  activity,
  status = 'All',
}: SearchDodoABCParams): Promise<SearchDodoABCResponse> {
  const request = makeRequest(`api/library/search/dodoabc`, {
    method: 'get',
    queryString: {
      activity,
      status,
    },
  })
  return await execute(request, transform)
}
