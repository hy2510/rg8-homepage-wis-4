import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Home from '@/repository/server/home'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ writeType: string }> },
) {
  const params = await props.params
  const customer = await getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }

  const parameter = await getParameters(request, 'page')
  const page = parameter.getString('page', '1')

  const [payload, status, error] = await executeRequestAction(
    Home.customerReviewList(customer, { writeType: params.writeType, page }),
  )

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
