import { default as Repository } from '@/7th/_repository/client'
import { useEffect } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibrarySeriesListAction } from './selector'

export function useOnLoadLibrarySeriesList({
  bookType,
}: {
  bookType?: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibrarySeriesListAction()

  useEffect(() => {
    async function fetching(bookType: string) {
      const newOption = {
        bookType,
        isAll: true,
      }

      const res = await fetcher.response(
        Repository.getCategorySeries(newOption),
      )

      if (res.isSuccess) {
        action.setSeriesList(newOption, res.payload)
      } else {
        setError(error)
      }
      setLoading(false)
    }
    if (bookType) {
      fetching(bookType)
    } else {
      setError('BookType Not Support')
    }
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookType])

  return {
    loading,
    error,
  }
}

export function useFetchLibrarySeriesList() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibrarySeriesListAction()

  const fetch = ({
    bookType,
    level,
    isAll,
  }: {
    bookType: string
    level?: string
    isAll?: boolean
  }) => {
    async function fetching() {
      const newOption = {
        bookType,
        level,
        isAll,
      }

      const res = await fetcher.response(
        Repository.getCategorySeries(newOption),
      )

      if (res.isSuccess) {
        action.setSeriesList(newOption, res.payload)
      } else {
        setError(error)
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
