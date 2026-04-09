import { OverrideQueryOptions } from '@/8th/shared/react-query/types'
import { useQuery } from '@tanstack/react-query'
import { getCalendarAttend } from '../model/calendar-attend'
import { getCalendarStudy } from '../model/calendar-study'
import { getLevelBooks } from '../model/level-books'
import { getLevelMasters } from '../model/level-masters'
import { getLevelPoints } from '../model/level-points'
import { getLevelTest } from '../model/level-test'
import { getReadingKingTrophy } from '../model/readingking-trophy'
import { getSuccessiveDailyGoals } from '../model/successive-daily-goals'
import { getSuccessiveStudy } from '../model/successive-study'
import { achieveKeys } from './achieve-key'

export function useLevelBooks(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.levelBooks(),
    queryFn: () => getLevelBooks(),
  })
}

export function useLevelMasters(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.levelMasters(),
    queryFn: () => getLevelMasters(),
  })
}

export function useLevelPoints(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.levelPoints(),
    queryFn: () => getLevelPoints(),
  })
}

export function useLevelTest(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.levelTest(),
    queryFn: () => getLevelTest(),
  })
}

export function useReadingKingTrophy(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.readingKingTrophy(),
    queryFn: () => getReadingKingTrophy(),
  })
}

export function useSuccessiveDailyGoal(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.successiveDailyGoals(),
    queryFn: () => getSuccessiveDailyGoals(),
  })
}

export function useSuccessiveStudy(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.successiveStudy(),
    queryFn: () => getSuccessiveStudy(),
  })
}

export function useCalendarAttend(
  params: {
    year: number
    month: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.calendarAttend(params),
    queryFn: () => getCalendarAttend(params),
  })
}

export function useCalendarStudy(
  params: {
    year: number
    month: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: achieveKeys.calendarStudy(params),
    queryFn: () => getCalendarStudy(params),
  })
}
