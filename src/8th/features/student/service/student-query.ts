import { OverrideMutationOptions } from '@/8th/shared/react-query/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { postChangeGroupClass } from '../model/change-group-class'
import { postChangePassword } from '../model/change-password'
import { postChangeSmsAgree } from '../model/change-sms-agree'
import { putChangeStudentName } from '../model/change-student-name'
import { getChangeableGroupClassInfo } from '../model/changeable-group-class-info'
import { postRegistPhoneNumberCertificate } from '../model/regist-phone-number-certificate'
import { postRegistPhoneNumberRequest } from '../model/regist-phone-number-request'
import { StudentResponse, getStudent } from '../model/student'
import { getStudentHistoryList } from '../model/student-history-list'
import { studentKeys } from './student-key'

export function useStudent() {
  return useQuery({
    queryKey: studentKeys.info(),
    queryFn: () => getStudent(),
  })
}

export function useStudentHistoryList() {
  return useQuery({
    queryKey: studentKeys.historyList(),
    queryFn: () => getStudentHistoryList(),
  })
}

export function useChangeStudentName(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: { studentName: string }) => putChangeStudentName(input),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = currentData?.student?.name
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          name: variables.studentName,
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
          name: originData,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangePassword(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (input: { oldPassword: string; newPassword: string }) =>
      postChangePassword(input),
  })
}

export function useRegistPhoneNumberRequest(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (input: { phoneNumber: string }) =>
      postRegistPhoneNumberRequest(input),
  })
}

export function useRegistPhoneNumberCertificate(
  options?: OverrideMutationOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: {
      phoneNumber: string
      authCode: string
      update?: boolean
    }) => postRegistPhoneNumberCertificate(input),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined
      const originData = currentData?.student?.parentCellPhone
      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          parentCellPhone: variables.phoneNumber,
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
          parentCellPhone: originData,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeSmsAgree(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: { isReceive: boolean }) => postChangeSmsAgree(input),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined
      const originData =
        currentData?.student?.smsStudyReportYn &&
        currentData?.student?.smsEventInfomationYn

      queryClient.setQueryData(studentKeys.info(), {
        ...currentData,
        student: {
          ...currentData?.student,
          smsStudyReportYn: variables.isReceive,
          smsEventInfomationYn: variables.isReceive,
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
          smsStudyReportYn: originData,
          smsEventInfomationYn: originData,
        },
      })
      options?.onError?.(error, variables)
    },
  })
}

export function useChangeLibraryFilter(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (input: {
      bookType: 'EB' | 'PB'
      status: string
      sort: string
      genre: string
    }) => new Promise((resolve) => resolve(input)),
    onMutate: (variables) => {
      const currentData = queryClient.getQueryData(studentKeys.info()) as
        | StudentResponse
        | undefined

      const originData = {
        status: '',
        genre: '',
        sort: '',
      }
      if (variables.bookType === 'EB') {
        originData.status = currentData?.student?.libraryStatusName || ''
        originData.genre = currentData?.student?.libraryGenreName || ''
        originData.sort = currentData?.student?.libraryFindSortName || ''
      } else {
        originData.status = currentData?.student?.libraryPBStatusName || ''
        originData.genre = currentData?.student?.libraryPBGenreName || ''
        originData.sort = currentData?.student?.libraryPBFindSortName || ''
      }

      if (variables.bookType === 'EB') {
        queryClient.setQueryData(studentKeys.info(), {
          ...currentData,
          student: {
            ...currentData?.student,
            libraryStatusName: `Status${variables.status}`,
            libraryGenreName: `Genre${variables.genre}`,
            libraryFindSortName: `${variables.sort}`,
          },
        })
      } else {
        queryClient.setQueryData(studentKeys.info(), {
          ...currentData,
          student: {
            ...currentData?.student,
            libraryPBStatusName: `Status${variables.status}`,
            libraryPBGenreName: `Genre${variables.genre}`,
            libraryPBFindSortName: `${variables.sort}`,
          },
        })
      }
      options?.onMutate?.(variables)
      return { beforeData: originData }
    },
  })
}

export function useChangeableGroupClassInfo() {
  return useQuery({
    queryKey: studentKeys.changeableGroupClassInfo(),
    queryFn: () => getChangeableGroupClassInfo(),
  })
}

export function useChangeGroupClass(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (input: {
      studentHistoryId: string
      newClassId: string
      workDate?: string
      registStaffId?: string
    }) => postChangeGroupClass(input),
  })
}
