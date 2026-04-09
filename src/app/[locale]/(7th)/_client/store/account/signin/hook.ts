import repository from '@/7th/_repository/client'
import { SigninResponse } from '@/7th/_repository/client/account/signin'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'

export function useFetchSignin() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    id,
    password,
    deviceType,
    loginType,
    callback,
  }: {
    id: string
    password: string
    deviceType: string
    loginType: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SigninResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postSignin({
          id,
          password,
          deviceType,
          loginType,
        }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
    success,
    reset,
  }
}

export function useFetchSigninWithSSO() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    code,
    i,
    deviceType,
    loginType,
    callback,
  }: {
    code: string
    i: number
    deviceType: string
    loginType: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SigninResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postSigninWithCode({
          code,
          i,
          deviceType,
          loginType,
        }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
    success,
    reset,
  }
}

export function useFetchChangePassword() {
  const { loading, setLoading, error, setError, success, setSuccess, reset } =
    useFetchBasicState()

  const fetch = ({
    hash,
    newPassword,
    callback,
  }: {
    hash: string
    newPassword: string
    callback?: (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SigninResponse
      reset?: () => void
    }) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postAccountChangePassword({
          hash,
          newPassword,
        }),
      )

      if (res.isSuccess) {
        setSuccess(true)
        callback &&
          callback({
            loading: false,
            success: true,
            error: undefined,
            payload: res.payload,
            reset,
          })
      } else {
        setError(res.error)
        callback &&
          callback({
            loading: false,
            success: false,
            error: res.error,
            payload: undefined,
            reset,
          })
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
    success,
    reset,
  }
}
