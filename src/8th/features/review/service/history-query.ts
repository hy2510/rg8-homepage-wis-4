import { getBookDetailInfo } from '@/8th/features/library/model/book-info'
import { OverrideQueryOptions } from '@/8th/shared/react-query/types'
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { getHistorySpeak } from '../model/history-speak'
import { getHistoryStudy } from '../model/history-study'
import { historyKeys } from './history-key'

export function useHistoryReading(
  params: {
    startDate?: string
    endDate?: string
    keyword?: string
    status: string
    page?: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: historyKeys.reading(params),
    queryFn: () => getHistoryStudy(params),
    placeholderData: keepPreviousData,
  })
}

export function useHistoryReadingInfinite(
  params: {
    startDate?: string
    endDate?: string
    keyword?: string
    status: string
    page?: number
  },
  options?: OverrideQueryOptions,
) {
  return useInfiniteQuery({
    ...options,
    queryKey: [...historyKeys.reading(params), 'infinite'],
    queryFn: ({ pageParam }) => getHistoryStudy({ ...params, page: pageParam }),
    placeholderData: keepPreviousData,
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

export function useHistorySpeaking(
  params: {
    startDate: string
    endDate: string
    status: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: historyKeys.speaking(params),
    queryFn: () => getHistorySpeak(params),
    placeholderData: keepPreviousData,
  })
}

export function useHistoryWriting(
  params: {
    startDate?: string
    endDate?: string
    keyword?: string
    page?: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: historyKeys.writing(params),
    queryFn: () => getHistoryStudy({ ...params, status: 'Writing' }),
    placeholderData: keepPreviousData,
  })
}

export function useHistoryBookDetailInfo(
  params: {
    studyId: string
    studentHistoryId: string
    levelRoundId: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: historyKeys.bookInfo(params.studyId),
    queryFn: () => getBookDetailInfo(params),
  })
}
