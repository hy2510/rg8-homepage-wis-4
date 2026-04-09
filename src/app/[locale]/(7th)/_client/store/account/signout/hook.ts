import repository from '@/7th/_repository/client'
import { SignoutResponse } from '@/7th/_repository/client/account/signout'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibraryHomeAction } from '../../library/home/selector'
import { useStudentInfoAction } from '../../student/info/selector'

export function useFetchSignout() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const studentClear = useStudentInfoAction().clear
  const { updateMode } = useLibraryHomeAction()

  const fetch = ({
    callback,
  }: {
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SignoutResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.deleteSignout({}))

      if (res.isSuccess) {
        studentClear()
        updateMode('')
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
