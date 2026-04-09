import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type CategoryTheme = {
  name: string
  code: string
  imagePath: string
}

function makeCategoryTheme(json: any): CategoryTheme {
  return {
    name: RenewType.renewString(json?.Name),
    code: RenewType.renewString(json?.Code),
    imagePath: RenewType.renewString(json?.ImagePath),
  }
}

function transform(json: any): CategoryThemeResponse {
  return {
    category: json.Category.map((item: any) => makeCategoryTheme(item)),
  }
}

export type CategoryThemeParams = {
  bookType: string
  level?: string
  isAll?: boolean
}

export type CategoryThemeResponse = {
  category: CategoryTheme[]
}

export async function getCategoryTheme(
  input: CategoryThemeParams,
): Promise<CategoryThemeResponse> {
  const request = makeRequest(`api/library/category/theme`, {
    method: 'get',
    queryString: {
      bookType: input.bookType,
      level: input.level,
      isAll: input.isAll,
    },
  })
  return await execute(request, transform)
}
