import { OverrideQueryOptions } from '@/8th/shared/react-query/types'
import { useQuery } from '@tanstack/react-query'
import { getHallOfFameRank } from '../model/hall-of-fame'
import { getLevelMasterRank } from '../model/level-master'
import { getPointRank } from '../model/point'
import { getReadingKingRank } from '../model/readingking'
import { getReadingKingGroupRank } from '../model/readingking-group'
import { rankKeys } from './rank-key'

export function useHallOfFameRank(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: rankKeys.hallOfFame(),
    queryFn: () => getHallOfFameRank(),
  })
}

export function useLevelMasterRank(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: rankKeys.levelMaster(),
    queryFn: () => getLevelMasterRank(),
  })
}

export function usePointRank(
  params: { type: 'monthly' | 'total' },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: rankKeys.point(params.type),
    queryFn: () => getPointRank(params),
  })
}

export function useReadingKingRank(
  params: {
    eventId: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: rankKeys.readingKing(params.eventId),
    queryFn: () => getReadingKingRank(params),
  })
}

export function useReadingKingGroupRank(
  params: {
    eventId: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: rankKeys.readingKingGroup(params.eventId),
    queryFn: () => getReadingKingGroupRank(params),
  })
}
