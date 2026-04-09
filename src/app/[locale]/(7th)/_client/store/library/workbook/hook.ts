import repository from '@/7th/_repository/client'
import { useEffect } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibraryWorkbook, useLibraryWorkbookAction } from './selector'

export function useOnLoadLibraryWorkbook({
  level,
  volume = 1,
}: {
  level: string
  volume?: number
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setWorkbook } = useLibraryWorkbookAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const option = {
        level,
        volume,
        page: 1,
      }
      const res = await fetcher.response(repository.getSearchWorkbook(option))

      if (res.isSuccess) {
        setWorkbook(option, res.payload)
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

export function useFetchLibraryWorkbook() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setWorkbook } = useLibraryWorkbookAction()
  const { option } = useLibraryWorkbook()

  const fetch = ({
    level: inLevel,
    volume: inVolume,
    page: inPage,
  }: {
    level?: string
    volume?: number
    page?: number
  }) => {
    async function fetching() {
      setLoading(true)

      const targetLevel = inLevel || option.level
      const isReloadPage = targetLevel !== option.level

      const volume = isReloadPage ? 1 : inVolume || option.volume
      const page = isReloadPage ? 1 : inPage || option.page
      const newOption = {
        level: targetLevel,
        volume,
        page,
      }
      const res = await fetcher.response(
        repository.getSearchWorkbook(newOption),
      )
      if (res.isSuccess) {
        setWorkbook(
          {
            level: targetLevel,
            volume,
            page,
          },
          res.payload,
        )
      } else {
        setWorkbook(option)
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
