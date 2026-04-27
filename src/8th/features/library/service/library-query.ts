import {
  OverrideMutationOptions,
  OverrideQueryOptions,
} from '@/8th/shared/react-query/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { historyKeys } from '../../review/service/history-key'
import { todoKeys } from '../../todo/service/todo-key'
import { BookDetailInfo, getBookDetailInfo } from '../model/book-info'
import { getCategoryContinue } from '../model/category-continue'
import {
  CategorySeriesParams,
  getCategorySeries,
} from '../model/category-series'
import { getCategoryTheme } from '../model/category-theme'
import { postFavoriteAdd } from '../model/favorite-add'
import { deleteFavoriteDelete } from '../model/favorite-delete'
import { deleteFavoriteDeleteAll } from '../model/favorite-delete-all'
import { libraryKeys } from './library-key'

export function useCategorySeries(
  params: {
    bookType: 'EB' | 'PB'
    level?: string
  },
  options?: OverrideQueryOptions,
) {
  const req: CategorySeriesParams = {
    bookType: params.bookType,
    level: params.level,
    isAll: !params.level,
  }
  return useQuery({
    ...options,
    queryKey: libraryKeys.category('series', params),
    queryFn: () => getCategorySeries(req),
  })
}

export function useCategoryTheme(
  params: {
    bookType: 'EB' | 'PB'
    level?: string
  },
  options?: OverrideQueryOptions,
) {
  const req: CategorySeriesParams = {
    bookType: params.bookType,
    level: params.level,
    isAll: !params.level,
  }
  return useQuery({
    ...options,
    queryKey: libraryKeys.category('theme', params),
    queryFn: () => getCategoryTheme(req),
  })
}

export function useBookDetailInfo(
  params: {
    levelRoundId: string
    studyId?: string
    studentHistoryId?: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.bookInfoWithKey(params.levelRoundId),
    queryFn: () => getBookDetailInfo(params),
  })
}

export function useAddFavoriteList(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: { levelRoundIds: string[] }) =>
      postFavoriteAdd({ levelRoundIds: input.levelRoundIds }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: libraryKeys.searchWithType('favorite'),
      })
      queryClient.invalidateQueries({ queryKey: libraryKeys.bookInfo() })
      options?.onSuccess?.(data, variables)
    },
  })
}

export function useAddFavorite(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: { levelRoundId: string }) =>
      postFavoriteAdd({ levelRoundIds: [input.levelRoundId] }),
    onMutate: (variables) => {
      const bookInfo = queryClient.getQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
      )
      if (bookInfo) {
        queryClient.setQueryData(
          libraryKeys.bookInfoWithKey(variables.levelRoundId),
          {
            ...bookInfo,
            bookMarkYn: true,
          },
        )
      }

      const queryKey = todoKeys.bookInfoWithKey(variables.levelRoundId)
      const bookInfos = queryClient.getQueriesData({ queryKey })
      queryClient.setQueriesData({ queryKey }, (old: BookDetailInfo) => ({
        ...old,
        bookMarkYn: true,
      }))

      const historyBookInfoQueryKey = historyKeys.bookInfoParent()
      const historyBookInfoDatas = queryClient.getQueriesData({
        queryKey: historyBookInfoQueryKey,
        predicate: (query) => {
          const key = query.queryKey
          const queryKeySerial = historyBookInfoQueryKey.join('-')
          const keySerial = key.join('-')
          return (
            Array.isArray(key) &&
            keySerial.startsWith(queryKeySerial) &&
            !!key[historyBookInfoQueryKey.length] &&
            key.length === historyBookInfoQueryKey.length + 1
          )
        },
      })
      historyBookInfoDatas?.forEach(([queryKey, data]) => {
        if (
          !!data &&
          typeof data === 'object' &&
          'levelRoundId' in data &&
          data.levelRoundId === variables.levelRoundId
        ) {
          queryClient.setQueryData(queryKey, {
            ...data,
            bookMarkYn: true,
          })
        }
      })

      return {
        beforeData: bookInfo,
        todoBeforeData: bookInfos,
        historyBeforeData: historyBookInfoDatas,
      }
    },
    onSuccess: (data, variables) => {
      const bookInfo = queryClient.getQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
      )
      if (bookInfo) {
        queryClient.setQueryData(
          libraryKeys.bookInfoWithKey(variables.levelRoundId),
          {
            ...bookInfo,
            bookMarkYn: true,
          },
        )
      }

      queryClient.setQueriesData(
        {
          queryKey: todoKeys.bookInfoWithKey(variables.levelRoundId),
        },
        (old: BookDetailInfo) => ({
          ...old,
          bookMarkYn: true,
        }),
      )

      const historyBookInfoQueryKey = historyKeys.bookInfoParent()
      const historyBookInfoDatas = queryClient.getQueriesData({
        queryKey: historyBookInfoQueryKey,
        predicate: (query) => {
          const key = query.queryKey
          const queryKeySerial = historyBookInfoQueryKey.join('-')
          const keySerial = key.join('-')
          return (
            Array.isArray(key) &&
            keySerial.startsWith(queryKeySerial) &&
            !!key[historyBookInfoQueryKey.length] &&
            key.length === historyBookInfoQueryKey.length + 1
          )
        },
      })
      historyBookInfoDatas?.forEach(([queryKey, data]) => {
        if (
          !!data &&
          typeof data === 'object' &&
          'levelRoundId' in data &&
          data.levelRoundId === variables.levelRoundId
        ) {
          queryClient.setQueryData(queryKey, {
            ...data,
            bookMarkYn: true,
          })
        }
      })

      queryClient.invalidateQueries({
        queryKey: libraryKeys.searchWithType('favorite'),
      })
      options?.onSuccess?.(data, variables)
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
        context?.beforeData,
      )

      context?.todoBeforeData?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })

      context?.historyBeforeData?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useDeleteFavorite(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: { levelRoundId: string }) =>
      deleteFavoriteDelete({ levelRoundIds: [input.levelRoundId] }),
    onMutate: (variables) => {
      const bookInfo = queryClient.getQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
      )
      if (bookInfo) {
        queryClient.setQueryData(
          libraryKeys.bookInfoWithKey(variables.levelRoundId),
          {
            ...bookInfo,
            bookMarkYn: false,
          },
        )
      }
      options?.onMutate?.(variables)

      const queryKey = todoKeys.bookInfoWithKey(variables.levelRoundId)
      const bookInfos = queryClient.getQueriesData({ queryKey })
      queryClient.setQueriesData({ queryKey }, (old: BookDetailInfo) => ({
        ...old,
        bookMarkYn: false,
      }))

      const historyBookInfoQueryKey = historyKeys.bookInfoParent()
      const historyBookInfoDatas = queryClient.getQueriesData({
        queryKey: historyBookInfoQueryKey,
        predicate: (query) => {
          const key = query.queryKey
          const queryKeySerial = historyBookInfoQueryKey.join('-')
          const keySerial = key.join('-')
          return (
            Array.isArray(key) &&
            keySerial.startsWith(queryKeySerial) &&
            !!key[historyBookInfoQueryKey.length] &&
            key.length === historyBookInfoQueryKey.length + 1
          )
        },
      })
      historyBookInfoDatas?.forEach(([queryKey, data]) => {
        if (
          !!data &&
          typeof data === 'object' &&
          'levelRoundId' in data &&
          data.levelRoundId === variables.levelRoundId
        ) {
          queryClient.setQueryData(queryKey, {
            ...data,
            bookMarkYn: false,
          })
        }
      })

      return {
        beforeData: bookInfo,
        todoBeforeData: bookInfos,
        historyBeforeData: historyBookInfoDatas,
      }
    },
    onSuccess: (data, variables) => {
      const bookInfo = queryClient.getQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
      )
      if (bookInfo) {
        queryClient.setQueryData(
          libraryKeys.bookInfoWithKey(variables.levelRoundId),
          {
            ...bookInfo,
            bookMarkYn: false,
          },
        )
      }

      queryClient.setQueriesData(
        {
          queryKey: libraryKeys.bookInfoWithKey(variables.levelRoundId),
        },
        (old: BookDetailInfo) => ({
          ...old,
          bookMarkYn: false,
        }),
      )

      const historyBookInfoQueryKey = historyKeys.bookInfoParent()
      const historyBookInfoDatas = queryClient.getQueriesData({
        queryKey: historyBookInfoQueryKey,
        predicate: (query) => {
          const key = query.queryKey
          const queryKeySerial = historyBookInfoQueryKey.join('-')
          const keySerial = key.join('-')
          return (
            Array.isArray(key) &&
            keySerial.startsWith(queryKeySerial) &&
            !!key[historyBookInfoQueryKey.length] &&
            key.length === historyBookInfoQueryKey.length + 1
          )
        },
      })
      historyBookInfoDatas?.forEach(([queryKey, data]) => {
        if (
          !!data &&
          typeof data === 'object' &&
          'levelRoundId' in data &&
          data.levelRoundId === variables.levelRoundId
        ) {
          queryClient.setQueryData(queryKey, {
            ...data,
            bookMarkYn: false,
          })
        }
      })

      queryClient.invalidateQueries({
        queryKey: libraryKeys.searchWithType('favorite'),
      })
      options?.onSuccess?.(data, variables)
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
        context?.beforeData,
      )
      context?.todoBeforeData?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      context?.historyBeforeData?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      queryClient.invalidateQueries({
        queryKey: libraryKeys.searchWithType('favorite'),
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useDeleteFavoriteList(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (input: { levelRoundIds: string[] }) =>
      deleteFavoriteDelete({ levelRoundIds: input.levelRoundIds }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: libraryKeys.searchWithType('favorite'),
      })
      queryClient.invalidateQueries({ queryKey: libraryKeys.bookInfo() })
      options?.onSuccess?.(data, variables)
    },
  })
}

export function useDeleteAllFavorite(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: void) => deleteFavoriteDeleteAll(),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: libraryKeys.searchWithType('favorite'),
      })
      options?.onSuccess?.(data, variables)
    },
  })
}

export function useCategoryContinue(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: libraryKeys.category('continue'),
    queryFn: () => getCategoryContinue(),
  })
}
