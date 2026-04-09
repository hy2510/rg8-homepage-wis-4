import { OverrideQueryOptions } from '@/8th/shared/react-query/types'
import { useQuery } from '@tanstack/react-query'
import { getDailySearchBook } from '../model/daily-search-books'
import { getDailySection } from '../model/daily-section'
import { getDailyStage } from '../model/daily-stage'
import { dailyKeys } from './daily-key'

export function useDailyStageList(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: dailyKeys.stageList(),
    queryFn: () => getDailyStage(),
  })
}

export function useDailySectionList(
  params: { stageId: string },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: dailyKeys.sectionListWithParam(params),
    queryFn: () => getDailySection(params),
  })
}

export function useDailyBookList(
  params: {
    stageId: string
    sectionId: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: dailyKeys.bookListWithParam(params),
    queryFn: () => getDailySearchBook(params),
  })
}
