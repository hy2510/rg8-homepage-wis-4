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
  const parameter = await getParameters(
    request,
    'bookType',
    'level',
    'searchText',
    'status',
    'genre',
    'sort',
    'page',
  )
  const level = parameter.getString('level', '').toUpperCase()
  const bookType = parameter.getString('bookType').toUpperCase()
  const searchText = parameter.getString('searchText', '')
  const pStatus = parameter.getString('status', 'All')
  const genre = parameter.getString('genre', 'All')
  const sort = parameter.getString('sort')
  const page = parameter.getNumber('page', 1)

  return searchBook({
    searchRequest: Library.searchSeries(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      level: level || undefined,
      searchText,
      page: page,
      genre,
      sort,
      status: pStatus,
    }),
    downloadRequest: Export.searchExcel(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      level: level || undefined,
      searchType: 'SeriesName',
      searchText,
      genre,
      sort,
      status: pStatus,
    }),
    filterUpdateRequest: Library.changeFilter(token, {
      type: bookType,
      genre,
      sort,
      status: pStatus,
    }),
  })
}
