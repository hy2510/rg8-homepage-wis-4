import {
  OverrideMutationOptions,
  OverrideQueryOptions,
} from '@/8th/shared/react-query/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getClassGroupList } from '../model/class-group-list'
import { getClassList } from '../model/class-list'
import { LoginParams, postLogin } from '../model/login'
import { LoginWithSSOParams, postLoginWithSSO } from '../model/login-with-sso'
import { deleteLogout } from '../model/logout'
import {
  TemporaryChangePasswordParams,
  postTemporaryChangePassword,
} from '../model/temporary-change-password'
import { accountKeys } from './account-key'

export function useClassGroupList(options?: OverrideQueryOptions) {
  return useQuery({
    ...options,
    queryKey: accountKeys.classGroupList(),
    queryFn: () => getClassGroupList(),
  })
}

export function useClassList(
  params: {
    classGroupId: string
  },
  options?: OverrideQueryOptions,
) {
  return useQuery({
    ...options,
    queryKey: accountKeys.classList(params),
    queryFn: () => getClassList(params),
  })
}

export function useLogin(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (input: LoginParams) => postLogin(input),
    onSuccess: (data, variables) => {
      if (data.success) {
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables)
      }
    },
  })
}

export function useLoginWithSSO(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (input: LoginWithSSOParams) => postLoginWithSSO(input),
    onSuccess: (data, variables) => {
      if (data.success) {
      }
      if (options?.onSuccess) {
        options.onSuccess(data, variables)
      }
    },
  })
}

export function useLogout(options?: OverrideMutationOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: () => deleteLogout(),
    onSuccess: (data, variables) => {
      queryClient.removeQueries({ queryKey: [] })

      if (options?.onSuccess) {
        options.onSuccess(data, variables)
      }
    },
  })
}

export function useTemporaryChangePassword(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (input: TemporaryChangePasswordParams) =>
      postTemporaryChangePassword(input),
  })
}
