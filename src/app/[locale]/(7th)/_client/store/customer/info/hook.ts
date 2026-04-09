import repository from '@/7th/_repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useFetchFindCustomer() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    customerId,
    callback,
  }: {
    customerId: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: string
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.getFindCustomer({ customerId }),
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
