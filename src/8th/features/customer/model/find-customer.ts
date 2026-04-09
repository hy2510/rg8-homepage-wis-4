import { execute, makeRequest } from '@/8th/shared/http'

function transform(json: any): FindCustomerResponse {
  return JSON.stringify(json)
}

export type FindCustomerParams = {
  customerId: string
}

export type FindCustomerResponse = string

export async function getFindCustomer(
  input: FindCustomerParams,
): Promise<FindCustomerResponse> {
  const request = makeRequest(`api/customer/find`, {
    method: 'get',
    queryString: {
      customerId: input.customerId,
    },
  })
  return await execute(request, transform)
}
