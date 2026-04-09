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

  const parameter = await getParameters(request, 'level', 'volume', 'page')
  const level = parameter.getString('level').toUpperCase()
  const volume = parameter.getNumber('volume', 1)
  const page = parameter.getNumber('page', 1)

  const keyword = `${level.toUpperCase()}-${volume > 9 ? volume : `0${volume}`}`

  return searchBook({
    searchRequest: Library.searchWorkbook(token, {
      level,
      keyword,
      page,
    }),
    downloadRequest: Export.searchExcel(token, {
      studyTypeCode: '001006',
      level,
      searchType: 'WorkBook',
      searchText: keyword,
      genre: 'All',
      status: 'All',
      sort: 'Round',
    }),
  })
}
