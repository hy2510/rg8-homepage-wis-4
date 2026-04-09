import repository from '@/7th/_repository/client'
import { CategorySeriesResponse } from '@/7th/_repository/client/library/category/category-series'
import { CategoryThemeResponse } from '@/7th/_repository/client/library/category/category-theme'
import { SearchLevelBookResponse } from '@/7th/_repository/client/library/search/search-level'
import { useEffect } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import {
  useLibraryEbPbFilter,
  useLibraryFilterAction,
} from '../filter/selector'
import { useLibraryHome, useLibraryHomeAction } from './selector'

export function useOnLoadLibraryHome({
  level,
  bookType = 'EB',
  pkType = 'PK',
  sort = '',
  genre = '',
  status = '',
}: {
  level: string
  bookType?: string
  pkType?: 'PK' | 'Dodo'
  sort?: string
  genre?: string
  status?: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const {
    setLibraryPreKBook,
    setLibraryPKType,
    setLibraryDodoAbcBook,
    setLibraryHomeEBPB,
  } = useLibraryHomeAction()
  const { setEbPbFilter } = useLibraryFilterAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)

      if (level === 'PK') {
        setLibraryPKType(pkType)
        const activity = pkType === 'PK' ? 'Alphabet' : 'Study-Alphabet'
        const option = {
          status: status || 'All',
          activity,
        }

        if (pkType === 'PK') {
          const res = await fetcher.response(
            repository.getSearchPreKBook({ activity, status }),
          )
          if (res.isSuccess) {
            setLibraryPreKBook(option, res.payload)
          } else {
            setError(res.error)
          }
        } else {
          const res = await fetcher.response(
            repository.getSearchDodoABCBook({ activity, status }),
          )
          if (res.isSuccess) {
            setLibraryDodoAbcBook(option, res.payload)
          } else {
            setError(res.error)
          }
        }
      } else {
        const option = {
          level,
          bookType,
          page: 1,
          sort: sort || 'Preference',
          genre: genre || 'All',
          status: status || 'All',
        }
        /* 2024-10-11 : 상무님 지시사항으로 홈화면에서 Series / Theme 제거 
         
        const res = await Promise.all([
          fetcher.response(repository.getSearchLevelBook(option)),
          fetcher.response(repository.getCategoryTheme({ level, bookType })),
          fetcher.response(repository.getCategorySeries({ level, bookType })),
        ])
        */
        const res = await Promise.all([
          fetcher.response(repository.getSearchLevelBook(option)),
          { isSuccess: true, error: undefined, payload: [] },
          { isSuccess: true, error: undefined, payload: [] },
        ])

        let isSuccess = true
        let error: any = undefined
        for (let i = 0; i < res.length; i++) {
          if (!res[i].isSuccess) {
            isSuccess = false
            error = res[i].error
          }
        }
        if (isSuccess) {
          const payload: [
            SearchLevelBookResponse,
            CategoryThemeResponse,
            CategorySeriesResponse,
          ] = [res[0].payload!, res[1].payload!, res[2].payload!]
          setLibraryHomeEBPB(option, payload)
          const filterOption = {
            sort: option.sort,
            genre: option.genre,
            status: option.status,
            mode: undefined,
          }
          setEbPbFilter(bookType, filterOption)
        } else {
          setError(error)
        }
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

export function useFetchLibraryHomeChangeLevel() {
  const home = useLibraryHome()
  const level = home.level
  const bookType = home.bookType as 'EB' | 'PB'
  const {
    fetch: wrapFetch,
    loading,
    error,
  } = useFetchLibraryHomeChangeBookTypeAndLevel()

  const fetch = ({
    level: inLevel,
    callback,
  }: {
    level: string
    callback?: (isSuccess: boolean, payload?: any, error?: unknown) => void
  }) => {
    async function fetching() {
      wrapFetch({ bookType, level: inLevel, callback })
    }
    if (level !== inLevel) {
      fetching()
    }
  }
  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchLibraryHomeChangeBookType() {
  const home = useLibraryHome()
  const level = home.level
  const bookType = home.bookType as 'EB' | 'PB'
  const {
    fetch: wrapFetch,
    loading,
    error,
  } = useFetchLibraryHomeChangeBookTypeAndLevel()

  const fetch = ({
    bookType: inBookType,
    callback,
  }: {
    bookType: string
    callback?: (isSuccess: boolean, payload?: any, error?: unknown) => void
  }) => {
    async function fetching() {
      if (inBookType === 'EB' && level === '6C') {
        return
      }
      if (inBookType === 'PB' && (level === 'KA' || level === 'KB')) {
        return
      }
      wrapFetch({ bookType: inBookType, level, callback })
    }
    if (bookType !== inBookType) {
      fetching()
    }
  }
  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchLibraryHomeChangeBookTypeAndLevel() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setLibraryHomeEBPB } = useLibraryHomeAction()
  const home = useLibraryHome()
  const level = home.level
  const bookType = home.bookType as 'EB' | 'PB'
  const page = home.EBPB.option.page
  const ebFilter = useLibraryEbPbFilter('EB')
  const pbFilter = useLibraryEbPbFilter('PB')
  const { setEbPbFilter } = useLibraryFilterAction()

  const fetch = ({
    bookType: inBookType,
    level: inLevel,
    callback,
  }: {
    bookType: string
    level: string
    callback?: (isSuccess: boolean, payload?: any, error?: unknown) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const oldOption = {
        level,
        bookType,
        page,
      }
      const newOption = {
        level: inLevel,
        bookType: inBookType,
        mode: undefined,
        page: 1,
      }
      setLibraryHomeEBPB(newOption)
      const newFilter = inBookType === 'EB' ? ebFilter : pbFilter
      const searchOption = {
        ...newOption,
        ...newFilter,
      }
      /* 2024-10-11 : 상무님 지시사항으로 홈화면에서 Series / Theme 제거
       
      const res = await Promise.all([
        fetcher.response(repository.getSearchLevelBook(searchOption)),
        fetcher.response(
          repository.getCategoryTheme({ level: inLevel, bookType: inBookType }),
        ),
        fetcher.response(
          repository.getCategorySeries({
            level: inLevel,
            bookType: inBookType,
          }),
        ),
      ])
      */
      const res = await Promise.all([
        fetcher.response(repository.getSearchLevelBook(searchOption)),
        { isSuccess: true, error: undefined, payload: [] },
        { isSuccess: true, error: undefined, payload: [] },
      ])

      let isSuccess = true
      let error: any = undefined
      for (let i = 0; i < res.length; i++) {
        if (!res[i].isSuccess) {
          isSuccess = false
          error = res[i].error
        }
      }
      if (isSuccess) {
        const payload: [
          SearchLevelBookResponse,
          CategoryThemeResponse,
          CategorySeriesResponse,
        ] = [res[0].payload!, res[1].payload!, res[2].payload!]
        setLibraryHomeEBPB(newOption, payload)
        const filterOption = {
          sort: searchOption.sort,
          genre: searchOption.genre,
          status: searchOption.status,
          mode: undefined,
        }
        setEbPbFilter(searchOption.bookType, filterOption)
        callback && callback(true, payload)
      } else {
        setLibraryHomeEBPB(oldOption)
        setError(error)
        callback && callback(false, undefined, error)
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

export function useFetchLibraryHomeBooks() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setLibraryLevelBook } = useLibraryHomeAction()
  const { setEbPbFilter } = useLibraryFilterAction()
  const home = useLibraryHome()
  const level = home.level
  const bookType = home.bookType as 'EB' | 'PB'
  const filter = useLibraryEbPbFilter(bookType)

  const option = useLibraryHome().EBPB.option

  const fetch = ({
    page = 1,
    sort,
    genre,
    status,
    mode,
  }: {
    page?: number
    sort?: string
    genre?: string
    status?: string
    mode?: 'full' | 'easy'
  }) => {
    async function fetching() {
      setLoading(true)
      const oldFilter = filter
      const oldOption = option

      const newOption = {
        level,
        bookType,
        sort: oldFilter.sort,
        genre: oldFilter.genre,
        status: oldFilter.status,
        mode,
        page,
      }
      if (page <= 1) {
        newOption.sort = sort || oldFilter.sort
        newOption.genre = genre || oldFilter.genre
        newOption.status = status || oldFilter.status
        newOption.page = 1
      }

      setLibraryLevelBook(newOption)
      const res = await fetcher.response(
        repository.getSearchLevelBook({ ...newOption }),
      )

      if (res.isSuccess) {
        setLibraryLevelBook(newOption, res.payload)
        const option = {
          sort: newOption.sort,
          genre: newOption.genre,
          status: newOption.status,
          mode: newOption.mode,
        }
        setEbPbFilter(bookType, option)
      } else {
        setLibraryLevelBook({
          level,
          bookType,
          page: oldOption.page,
        })
        setEbPbFilter(bookType, oldFilter)
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

export function useFetchLibraryHomePreK() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setLibraryPreKBook, setLibraryDodoAbcBook } = useLibraryHomeAction()

  const pkType = useLibraryHome().pkType as 'PK' | 'Dodo'
  const option = useLibraryHome()[pkType].option

  const fetch = ({
    activity: inActivity,
    type: inType,
    status: inStatus,
  }: {
    activity?: string
    type?: string
    status?: string
  }) => {
    async function fetching() {
      setLoading(true)
      let targetType: 'PK' | 'Dodo' = 'PK'
      if (inType) {
        targetType = inType as 'PK' | 'Dodo'
      } else {
        targetType = pkType as 'PK' | 'Dodo'
      }
      const { activity, status } = option

      let targetActivity = activity
      if (inActivity) {
        targetActivity = inActivity
      }
      if (!targetActivity) {
        if (targetType === 'PK') {
          targetActivity = 'Alphabet'
        } else if (targetType === 'Dodo') {
          targetActivity = 'Study-Alphabet'
        }
      }
      let targetStatus = status
      if (inStatus) {
        targetStatus = inStatus
      }

      let res
      if (targetType === 'PK') {
        const res = await fetcher.response(
          repository.getSearchPreKBook({
            activity: targetActivity,
            status: targetStatus,
          }),
        )
        if (res.isSuccess) {
          setLibraryPreKBook(
            {
              activity: targetActivity,
              status: targetStatus,
            },
            res.payload,
          )
        } else {
          setLibraryPreKBook({ activity, status })
          setError(res.error)
        }
      } else {
        const res = await fetcher.response(
          repository.getSearchDodoABCBook({
            activity: targetActivity,
            status: targetStatus,
          }),
        )
        if (res.isSuccess) {
          setLibraryDodoAbcBook(
            {
              activity: targetActivity,
              status: targetStatus,
            },
            res.payload,
          )
        } else {
          setLibraryPreKBook({ activity, status })
          setError(res.error)
        }
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
