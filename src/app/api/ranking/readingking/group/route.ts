import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Ranking from '@/repository/server/ranking'

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

  const parameter = await getParameters(request, 'eventId')
  const eventId = parameter.getString('eventId', '')

  if (!eventId) {
    return RouteResponse.commonError()
  }

  const [payload, status, error] = await executeRequestAction(
    Ranking.readingkingGroup(token, customer, { eventId }),
  )

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
