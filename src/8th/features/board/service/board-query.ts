import { OverrideQueryOptions } from '@/8th/shared/react-query/types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getBoardCustomerReviewDetail } from '../model/board-customer-review-detail'
import { getBoardCustomerReviewList } from '../model/board-customer-review-list'
import { getBoardGalleryDetail } from '../model/board-gallery-detail'
import { getBoardGalleryList } from '../model/board-gallery-list'
import { getBoardNoticeDetail } from '../model/board-notice-detail'
import { getBoardNoticeList } from '../model/board-notice-list'
import { getHome } from '../model/home'

export function useHome(
  params: {
    template: string
    platform: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: ['home'],
    queryFn: () => getHome(params),
  })
}

export function useBoardNoticeList(
  params: {
    page: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: ['board', 'notice', 'list'],
    queryFn: () => getBoardNoticeList(params),
    placeholderData: keepPreviousData,
  })
}

export function useBoardNoticeDetail(
  params: {
    notifyId: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: ['board', 'notice', 'detail'],
    queryFn: () => getBoardNoticeDetail(params),
  })
}

export function useBoardGalleryList(
  params: {
    page: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: ['board', 'gallery', 'list'],
    queryFn: () => getBoardGalleryList(params),
    placeholderData: keepPreviousData,
  })
}

export function useBoardGalleryDetail(
  params: {
    boardId: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: ['board', 'gallery', 'detail'],
    queryFn: () => getBoardGalleryDetail(params),
  })
}

export function useBoardCustomerReviewList(
  params: {
    writeType: string
    page: number
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: ['board', 'customer-review', 'list'],
    queryFn: () => getBoardCustomerReviewList(params),
    placeholderData: keepPreviousData,
  })
}

export function useBoardCustomerReviewDetail(
  params: {
    writeType: string
    id: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: ['board', 'customer-review', 'detail'],
    queryFn: () => getBoardCustomerReviewDetail(params),
  })
}
