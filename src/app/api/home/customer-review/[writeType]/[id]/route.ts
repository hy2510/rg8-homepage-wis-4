import { RouteResponse, executeRequestAction } from '@/app/api/_util'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Home from '@/repository/server/home'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ writeType: string; id: string }> },
) {
  const params = await props.params
  const customer = await getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }

  const [payload, status, error] = await executeRequestAction(
    Home.customerReviewDetail(customer, {
      writeType: params.writeType,
      id: params.id,
    }),
  )

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
