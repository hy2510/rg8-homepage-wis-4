import repository from '@/7th/_repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

// FIXME : 회원 탈퇴 기능 피룡
export function useFetchStudentWithdraw() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    cause,
    callback,
  }: {
    cause: string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.postWithdraw({ cause }))

      if (res.isSuccess) {
        callback && callback(true)
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
