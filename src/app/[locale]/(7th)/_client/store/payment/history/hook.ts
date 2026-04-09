import repository from '@/7th/_repository/client'
import { PaymentHistory } from '@/7th/_repository/client/object/payment-history'
import { PaymentHistoryResponse } from '@/7th/_repository/client/payment/history/payment-history'
import { useEffect, useState } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useOnLoadPaymentHistory() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const [payload, setPayload] = useState<PaymentHistory[]>([])

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getPaymentHistory())

      if (res.isSuccess && res.payload) {
        setPayload(res.payload)
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
    payload,
    error,
  }
}

export function useFetchPaymentHistory() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    callback,
  }: {
    callback?: (isSuccess: boolean, payload?: PaymentHistoryResponse) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getPaymentHistory())

      if (res.isSuccess && res.payload) {
        const payload = res.payload

        callback && callback(true, payload)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}
