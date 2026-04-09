export type OverrideQueryOptions = {
  enabled?: boolean
  staleTime?: number
  gcTime?: number
  refetchInterval?: number
  refetchIntervalInBackground?: boolean
  refetchOnMount?: boolean
  refetchOnReconnect?: boolean
  refetchOnWindowFocus?: boolean
  retry?: number
  retryOnMount?: boolean
  retryDelay?: number
}

export type OverrideMutationOptions<TData = any, TVariables = any> = {
  gcTime?: number
  retry?: number
  retryDelay?: number
  onMutate?: (data: TVariables) => void
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    variables: TVariables,
  ) => void
  onSuccess?: (data: TData | undefined, variables: TVariables) => void
  onError?: (error: Error | null, variables: TVariables) => void
}
