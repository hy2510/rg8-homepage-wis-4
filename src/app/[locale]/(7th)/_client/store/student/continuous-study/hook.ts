import repository from '@/7th/_repository/client'
import { useEffect } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentContinuousStudyAction } from './selector'

export function useOnLoadStudentContinuousStudy() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setContinuousStudy } = useStudentContinuousStudyAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getContinuousStudy())

      if (res.isSuccess) {
        setContinuousStudy(res.payload)
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
  }
}

export function useFetchStudentContinuousStudy() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setContinuousStudy } = useStudentContinuousStudyAction()

  const fetch = () => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getContinuousStudy())

      if (res.isSuccess) {
        setContinuousStudy(res.payload)
      } else {
        setError(res.error)
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

export function useFetchUpdateStudentContinuousStudyViewType() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setContinuousStudyViewType } = useStudentContinuousStudyAction()

  const fetch = ({
    viewType,
    callback,
  }: {
    viewType: '6' | '7'
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.putChangeContinuousStudyViewType({ viewType }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false
        callback && callback(success)
        setContinuousStudyViewType(viewType)
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
