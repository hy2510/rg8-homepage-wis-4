import {
  OverrideMutationOptions,
  OverrideQueryOptions,
} from '@/8th/shared/react-query/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getFindCustomer } from '../model/find-customer'
import { getSearchCustomer } from '../model/search-customer'
import { customerKeys } from './customer-key'

export function useFindCustomer(
  params: {
    customerId: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: customerKeys.findCustomer(params),
    queryFn: () => getFindCustomer(params),
  })
}

export function useSearchCustomer(
  params: {
    keyword?: string
    type?: string
    countryCode?: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: customerKeys.searchCustomer(params),
    queryFn: () => getSearchCustomer(params),
  })
}

export function useFindCustomerAction(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (params: { customerId: string }) => getFindCustomer(params),
  })
}
