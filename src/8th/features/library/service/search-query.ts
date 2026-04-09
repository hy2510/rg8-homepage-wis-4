import { OverrideQueryOptions } from '@/8th/shared/react-query/types'
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { getSearchDodoABCBook } from '../model/search-dodoabc'
import { getSearchBookFavorite } from '../model/search-favorite'
import { getSearchBookKeyword } from '../model/search-keyword'
import { getSearchBookLevel } from '../model/search-level'
import { getSearchBookMovie } from '../model/search-movie'
import { getSearchBookNewContents } from '../model/search-newbook'
import { getSearchBookPrek } from '../model/search-pk'
import { getSearchBookSeries } from '../model/search-series'
import { getSearchBookTheme } from '../model/search-theme'
import { getSearchBookTryAgain } from '../model/search-try-again'
import { getSearchBookWorkbook } from '../model/search-workbook'
import { libraryKeys } from './library-key'

export function useSearchBookLevel(
  params: {
    bookType: 'EB' | 'PB'
    level: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('level', params),
    queryFn: () => {
      let mode = undefined
      if (params.status === 'Easy' || params.status === 'Full') {
        mode = params.status.toUpperCase()
      }
      return getSearchBookLevel({
        bookType: params.bookType,
        level: params.level,
        page: params.page,
        sort: params.sort,
        genre: params.genre,
        status: mode ? 'All' : params.status,
        mode: mode,
      })
    },
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookSeries(
  params: {
    bookType: 'EB' | 'PB'
    keyword: string
    level?: string
    status?: string
    genre?: string
    sort?: string
    page?: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('series', params),
    queryFn: () =>
      getSearchBookSeries({
        ...params,
        keyword: encodeURIComponent(params.keyword),
      }),
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookTheme(
  params: {
    bookType: 'EB' | 'PB'
    keyword: string
    level?: string
    status?: string
    genre?: string
    sort?: string
    page?: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('theme', params),
    queryFn: () => getSearchBookTheme(params),
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookMovie(
  params: {
    level: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('movie', params),
    queryFn: () => getSearchBookMovie(params),
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookWorkbook(
  params: {
    level: string
    volume?: number
    page?: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('workbook', params),
    queryFn: () => getSearchBookWorkbook(params),
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookKeyword(
  params: {
    bookType: 'EB' | 'PB'
    keyword: string
    page?: number
    type?: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('keyword', params),
    queryFn: () => getSearchBookKeyword(params),
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookKeywordInfinite(
  params: {
    bookType: 'EB' | 'PB'
    keyword: string
    page?: number
    type?: string
  },
  options?: OverrideQueryOptions,
) {
  return useInfiniteQuery({
    ...options,
    queryKey: [...libraryKeys.searchWithType('keyword', params), 'infinite'],
    queryFn: ({ pageParam }) =>
      getSearchBookKeyword({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || !lastPage.page) return undefined
      const current = lastPage.page.page
      const max = lastPage.page.totalPages
      if (current < max) return current + 1
      return undefined
    },
  })
}

export function useSearchBookNewContents(
  params: { year: number; month: number },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('newbook', params),
    queryFn: () => getSearchBookNewContents(params),
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookDodoABC(
  params: { activity: string; status?: string },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('dodoabc', params),
    queryFn: () => getSearchDodoABCBook(params),
    placeholderData: keepPreviousData,
  })
}

export function useSearchBookPreK(
  params: { activity: string; status?: string; page?: number },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('prek', params),
    queryFn: () => getSearchBookPrek(params),
    placeholderData: keepPreviousData,
  })
}

export function useSearchFavoriteBook(
  params: { status?: string; page?: number } = { status: 'All', page: 1 },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('favorite', params),
    queryFn: () => getSearchBookFavorite(params),
  })
}

export function useSearchTryAgainBook(
  params: { page?: number },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.searchWithType('tryagain', params),
    queryFn: () => getSearchBookTryAgain(params),
    placeholderData: keepPreviousData,
  })
}
