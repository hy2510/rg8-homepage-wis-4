import { OverrideMutationOptions } from '@/8th/shared/react-query/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { putChangeContinuousStudyType } from '../model/change-continuous-study-type'
import {
  ContinuousStudyResponse,
  getContinuousStudy,
} from '../model/continuous-study'
import { getLevelTestInfo } from '../model/level-test-info'
import {
  StudentDailyLearningResponse,
  getStudentDailyLearning,
} from '../model/student-daily-learning'
import { getStudentDailyLearningHistory } from '../model/student-daily-learning-history'
import { putStudyLearningLevelChange } from '../model/study-learning-level-change'
import { putStudyLearningSettingChange } from '../model/study-learning-setting-change'
import { getTodayStudyLearning } from '../model/today-study-learning'
import { studentKeys } from './student-key'

export function useLevelTestInfo() {
  return useQuery({
    queryKey: studentKeys.levelTestInfo(),
    queryFn: () => getLevelTestInfo(),
  })
}

export function useContinuousStudy() {
  return useQuery({
    queryKey: studentKeys.continuousStudy(),
    queryFn: () => getContinuousStudy(),
  })
}

export function useTodayStudyLearning() {
  return useQuery({
    queryKey: studentKeys.dailyLearningToday(),
    queryFn: () => getTodayStudyLearning(),
  })
}

export function useStudentDailyLearning() {
  return useQuery({
    queryKey: studentKeys.dailyLearningSetting(),
    queryFn: () => getStudentDailyLearning(),
  })
}

export function useStudentDailyLearningHistory() {
  return useQuery({
    queryKey: studentKeys.dailyLearningHistory(),
    queryFn: () => getStudentDailyLearningHistory(),
  })
}

export function useChangeStudyLearningLevel(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  studentKeys.dailyLearningSetting()

  return useMutation({
    ...options,
    mutationFn: (level: string) => putStudyLearningLevelChange({ level }),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(
        studentKeys.dailyLearningSetting(),
      ) as StudentDailyLearningResponse | undefined
      const originData = currentData?.settingLevelName || 'PK'
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
    onSuccess: (data, variables, context) => {
      const currentData = queryClient.getQueryData(
        studentKeys.dailyLearningSetting(),
      ) as StudentDailyLearningResponse | undefined
      queryClient.setQueryData(studentKeys.dailyLearningSetting(), {
        ...currentData,
        settingLevelName: variables,
      })
      options?.onSuccess?.(data, variables)
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(
        studentKeys.dailyLearningSetting(),
      ) as StudentDailyLearningResponse | undefined

      const originData = context?.beforeData || 'PK'
      queryClient.setQueryData(studentKeys.dailyLearningSetting(), {
        ...currentData,
        settingLevelName: originData,
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeDailyLearning(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: {
      type: 'Books' | 'Points'
      level: string
      value: number
    }) => putStudyLearningSettingChange(input),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: studentKeys.dailyLearningSetting(),
      })
      queryClient.invalidateQueries({
        queryKey: studentKeys.dailyLearningHistory(),
      })
      options?.onSuccess?.(data, variables)
    },
  })
}

export function useChangeContinuousStudyType(
  options?: OverrideMutationOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: { viewType: '6' | '7' }) =>
      putChangeContinuousStudyType(input),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(
        studentKeys.continuousStudy(),
      ) as ContinuousStudyResponse | undefined

      const originData = currentData?.continuousViewType || '6'
      queryClient.setQueryData(studentKeys.continuousStudy(), {
        ...currentData,
        continuousViewType: variables.viewType,
      })
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(
        studentKeys.continuousStudy(),
      ) as ContinuousStudyResponse | undefined

      const originData = context?.beforeData || '6'
      queryClient.setQueryData(studentKeys.continuousStudy(), {
        ...currentData,
        continuousViewType: originData,
      })
      options?.onError?.(error, variables)
    },
  })
}
