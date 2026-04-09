import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'
import { searchBook } from '../../search-book'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const parameter = await getParameters(
    request,
    'bookType',
    'searchText',
    'searchType',
    'page',
  )
  const bookType = parameter.getString('bookType').toUpperCase()
  const searchText = parameter.getString('searchText', '')
  const searchType = undefined //parameter.getString('searchType', 'LibrarySearchAll')
  const page = parameter.getNumber('page', 1)

  return searchBook({
    searchRequest: Library.searchKeyword(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      searchText,
      searchType,
      page,
    }),
  })
}
