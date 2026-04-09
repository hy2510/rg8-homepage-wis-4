import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Home from '@/repository/server/home'
import { RouteResponse, executeRequestAction, getParameters } from '../../_util'

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

  const parameter = await getParameters(request, 'page')
  const page = parameter.getString('page', '1')

  const [payload, status, error] = await executeRequestAction(
    Home.noticeList({ token, customer }, { page }),
  )

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
