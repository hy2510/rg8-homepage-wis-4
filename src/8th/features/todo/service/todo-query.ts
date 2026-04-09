import { dailyKeys } from '@/8th/features/daily/service/daily-key'
import {
  BookDetailInfo,
  getBookDetailInfo,
} from '@/8th/features/library/model/book-info'
import { libraryKeys } from '@/8th/features/library/service/library-key'
import {
  OverrideMutationOptions,
  OverrideQueryOptions,
} from '@/8th/shared/react-query/types'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { postStudyMode } from '../model/study-mode'
import { postTodoAdd } from '../model/todo-add'
import { getTodoBook } from '../model/todo-book'
import { deleteTodoDelete } from '../model/todo-delete'
import { deleteTodoDeleteAll } from '../model/todo-delete-all'
import { todoKeys } from './todo-key'

export function useTodoList(
  params: {
    sortColumn?: string
  } = {
    sortColumn: 'RegistDate',
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: todoKeys.list(params),
    queryFn: () => getTodoBook(params),
    placeholderData: keepPreviousData,
  })
}

export function useTodoBookDetailInfo(
  params: {
    levelRoundId: string
    studyId?: string
    studentHistoryId?: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: todoKeys.bookInfoWithStudyId(
      params.levelRoundId,
      params.studyId || null,
    ),
    queryFn: () => getBookDetailInfo(params),
  })
}

export function useAddTodoList(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: {
      levelRoundIds: string[]
      studentHistoryId: string
    }) => postTodoAdd(input),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.search() })
      queryClient.invalidateQueries({ queryKey: dailyKeys.bookList() })
      queryClient.invalidateQueries({ queryKey: todoKeys.list() })
      queryClient.invalidateQueries({ queryKey: libraryKeys.bookInfo() })
      options?.onSuccess?.(data, variables)
    },
  })
}

export function useAddTodo(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: async (input: {
      levelRoundId: string
      studentHistoryId: string
    }) => {
      const addTodo = await postTodoAdd({
        levelRoundIds: [input.levelRoundId],
        studentHistoryId: input.studentHistoryId,
      })
      if (!addTodo.success) {
        throw new Error('Failed to add todo')
      }
      return await getBookDetailInfo({
        levelRoundId: input.levelRoundId,
        studentHistoryId: input.studentHistoryId,
      })
    },
    // onMutate: (variables) => {
    //   const beforeData = queryClient.getQueryData(
    //     libraryKeys.bookInfo(variables.levelRoundId),
    //   )
    //   const tempData = {
    //     ...beforeData!,
    //     studyId: '__NEW_STUDY_ID__',
    //   }
    //   queryClient.setQueryData(
    //     libraryKeys.bookInfo(variables.levelRoundId),
    //     tempData,
    //   )
    //   options?.onMutate?.(variables)
    //   return { beforeData }
    // },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
        data,
      )
      queryClient.invalidateQueries({ queryKey: libraryKeys.search() })
      queryClient.invalidateQueries({ queryKey: dailyKeys.bookList() })
      queryClient.invalidateQueries({ queryKey: todoKeys.list() })
      options?.onSuccess?.(data, variables)
    },
    // onError: (error, variables, context) => {
    //   queryClient.setQueryData(
    //     libraryKeys.bookInfo(variables.levelRoundId),
    //     context?.beforeData,
    //   )
    //   options?.onError?.(error, variables)
    // },
  })
}

export function useDeleteTodo(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: async (input: {
      studyId: string
      levelRoundId: string
      studentHistoryId: string
    }) => {
      const delTodo = await deleteTodoDelete({ studyIds: [input.studyId] })
      if (!delTodo.success) {
        throw new Error('Failed to delete todo')
      }

      return await getBookDetailInfo({
        levelRoundId: input.levelRoundId,
        studentHistoryId: input.studentHistoryId,
      })
    },
    // onMutate: (variables) => {
    //   const beforeData = queryClient.getQueryData(
    //     libraryKeys.bookInfo(variables.levelRoundId),
    //   )
    //   const tempData = {
    //     ...beforeData!,
    //     studyId: undefined,
    //   }
    //   queryClient.setQueryData(
    //     libraryKeys.bookInfo(variables.levelRoundId),
    //     tempData,
    //   )
    //   options?.onMutate?.(variables)
    //   return { beforeData }
    // },
    onSuccess: async (data, variables) => {
      queryClient.setQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
        data,
      )
      queryClient.removeQueries({
        queryKey: todoKeys.bookInfoWithStudyId(
          variables.levelRoundId,
          variables.studyId,
        ),
      })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: libraryKeys.search() }),
        queryClient.invalidateQueries({ queryKey: dailyKeys.bookList() }),
        queryClient.invalidateQueries({ queryKey: todoKeys.list() }),
      ])
      options?.onSuccess?.(data, variables)
    },
    // onError: (error, variables, context) => {
    //   queryClient.setQueryData(
    //     libraryKeys.bookInfo(variables.levelRoundId),
    //     context?.beforeData,
    //   )
    //   options?.onError?.(error, variables)
    // },
  })
}

export function useDeleteTodoList(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (input: { studyIds: string[] }) => deleteTodoDelete(input),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.search() })
      queryClient.invalidateQueries({ queryKey: dailyKeys.bookList() })
      queryClient.invalidateQueries({ queryKey: todoKeys.list() })
      queryClient.invalidateQueries({ queryKey: libraryKeys.bookInfo() })
      options?.onSuccess?.(data, variables)
    },
  })
}

export function useDeleteAllTodo(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: async (input: void) => deleteTodoDeleteAll(),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.search() })
      queryClient.invalidateQueries({ queryKey: dailyKeys.bookList() })
      queryClient.invalidateQueries({ queryKey: todoKeys.list() })
      queryClient.invalidateQueries({ queryKey: libraryKeys.bookInfo() })
      options?.onSuccess?.(data, variables)
    },
  })
}

export function useStudyModeSet(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: async (input: {
      levelRoundId: string
      studyId: string
      studentHistoryId: string
      classId: string
      mode: string
    }) => postStudyMode(input),
    onMutate: (variables) => {
      const bookInfo = queryClient.getQueryData(
        libraryKeys.bookInfoWithKey(variables.levelRoundId),
      )
      if (bookInfo) {
        queryClient.setQueryData(
          libraryKeys.bookInfoWithKey(variables.levelRoundId),
          {
            ...bookInfo,
            studyMode: variables.mode,
          },
        )
      }
      return { beforeData: bookInfo }
    },
    onSuccess: (data, variables) => {
      options?.onSuccess?.(data, variables)
    },
  })
}

export function useStudyStart(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: async (input: {
      type: 'study' | 'speak'
      bookInfo: BookDetailInfo
      studentHistoryId?: string
      mode?: 'full' | 'easy'
    }): Promise<{
      type: 'mode' | 'study' | 'speak'
      isAdd: boolean
      bookInfo: BookDetailInfo
    }> => {
      let isAdd = false
      let bookInfoItem = input.bookInfo
      if (!bookInfoItem.studyId) {
        const levelRoundId = bookInfoItem.levelRoundId
        const studentHistoryId =
          input.studentHistoryId || bookInfoItem.studentHistoryId
        const addTodo = await postTodoAdd({
          levelRoundIds: [levelRoundId],
          studentHistoryId,
        })
        if (!addTodo.success) {
          throw new Error('Failed to add todo')
        }
        const newBookInfo = await getBookDetailInfo({
          levelRoundId,
          studentHistoryId,
        })
        bookInfoItem = { ...newBookInfo }
        isAdd = true
      }

      let nextType: 'study' | 'mode' | 'speak' | undefined = undefined
      if (input.type !== 'speak') {
        let nextMode: 'full' | 'easy' | undefined = input.mode

        if (!nextMode) {
          const { studyMode } = bookInfoItem

          const isModeSetableEasy =
            !!studyMode &&
            studyMode.startsWith('select:') &&
            studyMode.indexOf('easy') >= 0
          const isModeSetableFull =
            !!studyMode &&
            studyMode.startsWith('select:') &&
            studyMode.indexOf('full') >= 0

          if (isModeSetableEasy !== isModeSetableFull) {
            nextMode = isModeSetableEasy ? 'easy' : 'full'
          } else if (!isModeSetableEasy && !isModeSetableFull) {
            nextType = 'study'
          } else {
            nextType = 'mode'
          }
        }
        if (nextMode) {
          const { classId, studyId, levelRoundId } = bookInfoItem
          const studentHistoryId =
            input.studentHistoryId || bookInfoItem.studentHistoryId

          const modeResult = await postStudyMode({
            classId,
            studyId,
            studentHistoryId,
            levelRoundId,
            mode: nextMode,
          })
          if (!modeResult.success) {
            throw new Error('Failed to set study mode')
          }
          bookInfoItem = { ...bookInfoItem, studyMode: nextMode }
          nextType = 'study'
        }
      } else {
        nextType = 'speak'
      }
      return { type: nextType!, isAdd, bookInfo: bookInfoItem }
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        libraryKeys.bookInfoWithKey(variables.bookInfo.levelRoundId),
        data.bookInfo,
      )
      if (data.isAdd) {
        queryClient.invalidateQueries({ queryKey: libraryKeys.search() })
        queryClient.invalidateQueries({ queryKey: dailyKeys.bookList() })
        queryClient.invalidateQueries({ queryKey: todoKeys.list() })
      }
      options?.onSuccess?.(data, variables)
    },
  })
}
