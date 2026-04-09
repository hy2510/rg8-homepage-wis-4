import { OverrideMutationOptions } from '@/8th/shared/react-query/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { putChangeStudentAvatar } from '../model/change-student-avatar'
import { postChangeStudySetting } from '../model/change-study-setting'
import { StudentResponse } from '../model/student'
import {
  StudentAvatarListResponse,
  getStudentAvatarList,
} from '../model/student-avatar-list'
import { getStudentEarnReadingUnit } from '../model/student-earn-reading-unit'
import {
  StudentLocalConfig,
  getStudentLocalConfig,
  updateStudentLocalConfig,
} from '../model/student-local-config'
import { studentKeys } from './student-key'

export function useStudentEarnReadingUnit() {
  return useQuery({
    queryKey: studentKeys.studentEarnReadingUnit(),
    queryFn: () => getStudentEarnReadingUnit(),
  })
}

export function useStudentAvatarList() {
  return useQuery({
    queryKey: studentKeys.studentAvatarList(),
    queryFn: () => getStudentAvatarList(),
  })
}

export function useChangeStudySettingAll(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: {
      startScreen?: string
      isEbkListenRepeat?: boolean
      isEb1ListenRepeat?: boolean
      isViewStep3Hint?: boolean
      isViewStep2Skip?: boolean
      studyReadingUnitId?: string
    }) =>
      postChangeStudySetting({
        type: 'All',
        startScreen: input.startScreen,
        isEbkListenRepeat: input.isEbkListenRepeat,
        isEb1ListenRepeat: input.isEb1ListenRepeat,
        isViewStep3Hint: input.isViewStep3Hint,
        isViewStep2Skip: input.isViewStep2Skip,
        studyReadingUnitId: input.studyReadingUnitId,
      }),
  })
}

export function useChangeStudySettingStartScreen(
  options?: OverrideMutationOptions,
) {
  return useMutation({
    ...options,
    mutationFn: (input: { startScreen: string }) =>
      postChangeStudySetting({
        type: 'StartScreen',
        startScreen: input.startScreen,
      }),
  })
}

export function useChangeStudySettingViewStep3Hint(
  options?: OverrideMutationOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (flag: boolean) =>
      postChangeStudySetting({
        type: 'ViewStep3Hint',
        isViewStep3Hint: flag,
      }),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = currentData?.student?.viewStep3Hint || false
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          viewStep3Hint: variables,
        },
      })
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = context?.beforeData || false
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          viewStep3Hint: originData,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeStudySettingViewStep2Skip(
  options?: OverrideMutationOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (flag: boolean) =>
      postChangeStudySetting({
        type: 'ViewStep2Skip',
        isViewStep2Skip: flag,
      }),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = currentData?.student?.viewStep2Skip || false
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          viewStep2Skip: variables,
        },
      })
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = context?.beforeData || false
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          viewStep2Skip: originData,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeStudySettingEBKListenRepeat(
  options?: OverrideMutationOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (flag: boolean) =>
      postChangeStudySetting({
        type: 'EBKListenRepeat',
        isEbkListenRepeat: flag,
      }),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = currentData?.student?.eBKListenRepeat || false
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          eBKListenRepeat: variables,
        },
      })
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = context?.beforeData || false
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          eBKListenRepeat: originData,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeStudySettingEB1ListenRepeat(
  options?: OverrideMutationOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (flag: boolean) =>
      postChangeStudySetting({
        type: 'EB1ListenRepeat',
        isEb1ListenRepeat: flag,
      }),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = currentData?.student?.eB1ListenRepeat || false
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          eB1ListenRepeat: variables,
        },
      })
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = context?.beforeData || false
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          eB1ListenRepeat: originData,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeStudySettingReadingUnit(
  options?: OverrideMutationOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (readingUnitId: string) =>
      postChangeStudySetting({
        type: 'StudyReadingUnitId',
        studyReadingUnitId: readingUnitId,
      }),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = currentData?.student?.studyReadingUnitId || ''
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          studyReadingUnitId: variables,
        },
      })
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = context?.beforeData || ''
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          studyReadingUnitId: originData,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeStudentAvatar(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (avatarId: string) => putChangeStudentAvatar({ avatarId }),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(
        studentKeys.studentAvatarList(),
      ) as StudentAvatarListResponse | undefined

      const originData = currentData?.avatarId
      queryClient.setQueryData(studentKeys.studentAvatarList(), {
        ...currentData,
        avatarId: variables,
      })
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(
        studentKeys.studentAvatarList(),
      ) as StudentAvatarListResponse | undefined
      const originData = context?.beforeData
      queryClient.setQueryData(studentKeys.studentAvatarList(), {
        ...currentData,
        avatarId: originData,
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeStudySettings(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({
      hint,
      chance,
    }: {
      hint: boolean | 'none'
      chance: boolean | 'none'
    }) => {
      const promiseHint =
        hint === 'none'
          ? undefined
          : postChangeStudySetting({
              type: 'ViewStep2Skip',
              isViewStep2Skip: hint,
            })
      const promiseChance =
        chance === 'none'
          ? undefined
          : postChangeStudySetting({
              type: 'ViewStep3Hint',
              isViewStep3Hint: chance,
            })
      return Promise.all([promiseHint, promiseChance])
    },
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originHintData = currentData?.student?.viewStep2Skip || false
      const originChanceData = currentData?.student?.viewStep3Hint || false

      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          viewStep2Skip: variables,
          viewStep3Hint: variables,
        },
      })
      options?.onMutate?.(variables)
      return { beforeData: { hint: originHintData, chance: originChanceData } }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = context?.beforeData || { hint: false, chance: false }

      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          viewStep2Skip: originData.hint,
          viewStep3Hint: originData.chance,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeListenAndRepeat(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({
      levelK,
      level1,
    }: {
      levelK: boolean | 'none'
      level1: boolean | 'none'
    }) => {
      const promiseLevelK =
        levelK === 'none'
          ? undefined
          : postChangeStudySetting({
              type: 'EBKListenRepeat',
              isEbkListenRepeat: levelK,
            })
      const promiseLevel1 =
        level1 === 'none'
          ? undefined
          : postChangeStudySetting({
              type: 'EB1ListenRepeat',
              isEb1ListenRepeat: level1,
            })
      return Promise.all([promiseLevelK, promiseLevel1])
    },
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originDataLevelK = currentData?.student?.eBKListenRepeat || false
      const originDataLevel1 = currentData?.student?.eB1ListenRepeat || false

      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          eBKListenRepeat: variables.levelK,
          eB1ListenRepeat: variables.level1,
        },
      })
      options?.onMutate?.(variables)
      return {
        beforeData: {
          levelK: originDataLevelK,
          level1: originDataLevel1,
        },
      }
    },
    onError: (error, variables, context) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = context?.beforeData || {
        levelK: false,
        level1: false,
      }
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          eBKListenRepeat: originData.levelK,
          eB1ListenRepeat: originData.level1,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useStudentLocalConfig(params: {
  customerId: string
  studentId: string
}) {
  return getStudentLocalConfig(params)
}

export function useUpdateStudentLocalConfig() {
  return (
    update: {
      customerId: string
      studentId: string
    } & Partial<StudentLocalConfig>,
  ) => {
    updateStudentLocalConfig(update)
  }
}
