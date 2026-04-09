import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Export from '@/repository/server/export'
import Library from '@/repository/server/library'
import { searchBook } from '../../search-book'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'page')
  const page = parameter.getNumber('page', 1)

  return searchBook({
    searchRequest: Library.searchTryAgain(token, {
      page,
    }),
    downloadRequest: Export.searchExcel(token, {
      status: 'Fail',
    }),
  })
}
