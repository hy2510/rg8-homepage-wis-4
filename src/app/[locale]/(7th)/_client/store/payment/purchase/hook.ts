import Repository from '@/7th/_repository/client'
import { PurchaseProduct } from '@/7th/_repository/client/object/purchase-product'
import { UnpaidBalance } from '@/7th/_repository/client/object/unpaid-balance'
import { useEffect, useState } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useOnLoadProductList(type: string) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [payload, setPayload] = useState<PurchaseProduct>()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        Repository.getPurchaseProduct({ type }),
      )

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
  }, [type])

  return {
    loading,
    payload,
    error,
  }
}

export function useUnpaidBalanceList() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [payload, setPayload] = useState<UnpaidBalance[]>()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(Repository.getUnpaidBalance())

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
