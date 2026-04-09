import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type SearchCustomer = {
  name: string
  customerId: string
  homepageUrl: string
  customerUseCode: string
  logoFilename: string
  useStudentNoYn: boolean
  countryCode: string
}

function makeSearchCustomer(json?: any): SearchCustomer {
  return {
    name: RenewType.renewString(json?.Name),
    customerId: RenewType.renewString(json?.CustomerId),
    homepageUrl: RenewType.renewString(json?.HomepageUrl),
    customerUseCode: RenewType.renewString(json?.CustomerUseCode),
    logoFilename: RenewType.renewString(json?.LogoFilename),
    useStudentNoYn: RenewType.renewBoolean(json?.UseStudentNoYn),
    countryCode: RenewType.renewString(json?.CountryCode),
  }
}

function transform(json: any): SearchCustomerResponse {
  return {
    customers: json?.Customers?.map((item: any) => makeSearchCustomer(item)),
  }
}

export type SearchCustomerParams = {
  keyword?: string
  type?: string
  countryCode?: string
}

export type SearchCustomerResponse = {
  customers: SearchCustomer[]
}

export async function getSearchCustomer(
  input: SearchCustomerParams,
): Promise<SearchCustomerResponse> {
  const request = makeRequest(`api/customer/search`, {
    method: 'get',
    queryString: {
      keyword: input.keyword,
      type: input.type,
      countryCode: input.countryCode,
    },
  })
  return await execute(request, transform)
}
