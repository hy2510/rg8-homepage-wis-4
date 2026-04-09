import repository from '@/7th/_repository/client'
import { AdjustHistoryResponse } from '@/7th/_repository/client/payment/adjust/adjust-history'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useFetchAdjustHistory() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)

  const fetch = ({
    callback,
  }: {
    callback?: (isSuccess: boolean, payload?: AdjustHistoryResponse) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getAdjustHistory())

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

export function useFetchAdjustChange() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    isRequestPause,
    callback,
  }: {
    isRequestPause: boolean
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.putAdjustChange({
          command: isRequestPause ? 'pause' : 'release',
        }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false

        callback && callback(success)
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
