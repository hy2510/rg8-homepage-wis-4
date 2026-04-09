import { default as Repository } from '@/7th/_repository/client'
import { useEffect } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibraryThemeListAction } from './selector'

export function useOnLoadLibraryThemeList({ bookType }: { bookType?: string }) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useLibraryThemeListAction()

  useEffect(() => {
    async function fetching(bookType: string) {
      const newOption = {
        bookType,
        isAll: true,
      }

      const res = await fetcher.response(Repository.getCategoryTheme(newOption))

      if (res.isSuccess) {
        action.setThemeList(newOption, res.payload)
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

export function useFetchLibraryThemeList() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useLibraryThemeListAction()

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

      const res = await fetcher.response(Repository.getCategoryTheme(newOption))

      if (res.isSuccess) {
        action.setThemeList(newOption, res.payload)
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
