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

  const parameter = await getParameters(request, 'activity', 'status')
  const activity = parameter.getString('activity') as any
  const pStatus = parameter.getString('status', 'All') as any

  return searchBook({
    searchRequest: Library.searchDodoABCBook(token, {
      activity,
      status: pStatus,
    }),
  })
}
