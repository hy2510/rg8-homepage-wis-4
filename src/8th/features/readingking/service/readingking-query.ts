import {
  OverrideMutationOptions,
  OverrideQueryOptions,
} from '@/8th/shared/react-query/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getReadingKingEventDetail } from '../model/event-detail'
import { getReadingKingEventList } from '../model/event-list'
import { getReadingKingEventPrize } from '../model/event-prize-list'
import { postEventPrizeUpdate } from '../model/event-prize-update'
import { readingkingKeys } from './readingking-key'

export function useReadingKingEventList(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: readingkingKeys.eventList(),
    queryFn: () => getReadingKingEventList(),
  })
}

export function useReadingKingEventDetail(
  params: { eventId: string },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: readingkingKeys.eventDetail(params.eventId),
    queryFn: () => getReadingKingEventDetail(params),
  })
}

export function useReadingKingEventPrize(
  params: { eventId: string },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: readingkingKeys.eventPrizeList(params.eventId),
    queryFn: () => getReadingKingEventPrize(params),
  })
}

export function useReadingKingEventPrizeUpdate(
  options?: OverrideMutationOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (params: { eventId: string; eventPrizeId: string }) =>
      postEventPrizeUpdate(params),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: readingkingKeys.eventDetail(variables.eventId),
      })
      options?.onSuccess?.(data, variables)
    },
  })
}
