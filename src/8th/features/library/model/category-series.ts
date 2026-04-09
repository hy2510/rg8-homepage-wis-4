import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type SearchSeriesCategory = {
  name: string
  code: string
  imagePath: string
  bookLevelMin: string
  bookLevelMax: string
  color: string
}

function makeSearchSeriesCategory(json: any): SearchSeriesCategory {
  return {
    name: RenewType.renewString(json?.Name),
    code: RenewType.renewString(json?.Code),
    imagePath: RenewType.renewString(json?.ImagePath),
    bookLevelMin: RenewType.renewString(json?.BookLevelMin),
    bookLevelMax: RenewType.renewString(json?.BookLevelMax),
    color: RenewType.renewString(json?.Color),
  }
}

function transform(json: any): CategorySeriesResponse {
  return {
    category: json.Category.map((item: any) => makeSearchSeriesCategory(item)),
  }
}

export type CategorySeriesParams = {
  bookType: string
  level?: string
  isAll?: boolean
}

export type CategorySeriesResponse = {
  category: SearchSeriesCategory[]
}

export async function getCategorySeries(
  input: CategorySeriesParams,
): Promise<CategorySeriesResponse> {
  const request = makeRequest(`api/library/category/series`, {
    method: 'get',
    queryString: {
      bookType: input.bookType,
      level: input.level,
      isAll: input.isAll,
    },
  })
  return await execute(request, transform)
}
