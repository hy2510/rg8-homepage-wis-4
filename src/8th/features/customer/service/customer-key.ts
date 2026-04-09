export const customerKeys = {
  findCustomer: (params: { customerId: string }) =>
    ['customer', 'find', params] as const,
  searchCustomer: (params: {
    type?: string
    keyword?: string
    countryCode?: string
  }) => ['customer', 'search-customer', params] as const,
}
export type CustomerKeys = typeof customerKeys
