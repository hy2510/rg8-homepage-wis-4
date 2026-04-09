import { RouteResponse, executeRequestAction } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import ReadingKing from '@/repository/server/readingking'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  let customer = undefined
  if (!token) {
    customer = await getCustomerWithHeader()
    if (!customer) {
      return RouteResponse.invalidCustomerToken()
    }
  }
  const [payload, status, error] = await executeRequestAction(
    ReadingKing.eventList({ accessToken: token, customer }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
