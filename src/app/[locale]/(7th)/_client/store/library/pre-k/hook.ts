import repository from '@/7th/_repository/client'
import { useEffect } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibraryFilterAction, useLibraryPKFilter } from '../filter/selector'
import { useLibraryLevelPreK, useLibraryPreKLevelAction } from './selector'

export function useOnLoadLibraryLevelPreK({
  status = 'All',
}: {
  status?: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setLibraryPreK } = useLibraryPreKLevelAction()
  const filter = useLibraryPKFilter()

  const oldOption = useLibraryLevelPreK().option

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const option = {
        activity: filter.activity || 'All',
        status: oldOption.status || '',
        page: 1,
      }
      const res = await fetcher.response(repository.getSearchPreKBook(option))

      if (res.isSuccess) {
        setLibraryPreK(undefined, res.payload)
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

export function useFetchLibraryLevelPreK() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setLibraryPreK } = useLibraryPreKLevelAction()
  const filter = useLibraryPKFilter()
  const { setPkFilter } = useLibraryFilterAction()

  const option = useLibraryLevelPreK().option

  const fetch = ({
    activity: inActivity,
    page: inPage,
    status: inStatus,
    isInit,
  }: {
    activity?: string
    page?: number
    status?: string
    isInit?: boolean
  }) => {
    if (isInit) {
      setLibraryPreK({ activity: 'All', status: 'All', page: 1 })
    }
    async function fetching() {
      setLoading(true)
      const activity = inActivity || filter.activity
      const status = inStatus || option.status
      const page = inPage || 1

      const newOption = {
        activity,
        status,
        page,
      }
      const res = await fetcher.response(
        repository.getSearchPreKBook(newOption),
      )
      if (res.isSuccess) {
        setLibraryPreK(newOption, res.payload)
        setPkFilter({ activity })
      } else {
        setLibraryPreK(option)
        setPkFilter({ activity: filter.activity })
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
