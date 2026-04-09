import repository from '@/7th/_repository/client'
import { SearchCustomerResponse } from '@/7th/_repository/client/customer/search-customer'
import { useEffect, useState } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useFetchSearchCustomer() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    keyword,
    type,
    callback,
  }: {
    keyword: string
    type?: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SearchCustomerResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getSearchCustomer({ keyword, type }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
    success,
    reset,
  }
}

export function useOnLoadSearchPrivateCustomer() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const [payload, setPayload] = useState<SearchCustomerResponse>([])

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getSearchCustomer({ type: 'Private' }),
      )

      if (res.isSuccess && res.payload) {
        const COUNTRY_ORDER = ['KR', 'VN']

        const orderCustomers: SearchCustomerResponse = []
        res.payload.forEach((customer) => {
          const isIncludeCountry = COUNTRY_ORDER.includes(customer.countryCode)
          if (!isIncludeCountry) {
            orderCustomers.push(customer)
          }
        })
        COUNTRY_ORDER.reverse().forEach((code) => {
          const items = res.payload?.find((item) => item.countryCode === code)
          if (items) {
            orderCustomers.unshift(items)
          }
        })
        if (orderCustomers.length > 0) {
          const korCountry = orderCustomers.find(
            (item) => item.countryCode === 'KR',
          )
          if (korCountry) {
            const outerCountry = { ...korCountry, name: 'Other' }
            orderCustomers.push(outerCountry)
          }
        }
        setPayload(orderCustomers)
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
    payload,
  }
}

export function useFetchSearchPrivateCustomer() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    callback,
  }: {
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SearchCustomerResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getSearchCustomer({ type: 'Private' }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
    success,
    reset,
  }
}
