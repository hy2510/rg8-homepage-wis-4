import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'
import { searchBook } from '../search-book'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'year', 'month')
  const today = new Date()
  const year = parameter.getNumber('year', today.getFullYear())
  const month = parameter.getNumber('month', today.getMonth() + 1)

  return searchBook({
    searchRequest: Library.newBooks(token, { year, month }),
    isSearchNewBook: true,
  })
}
