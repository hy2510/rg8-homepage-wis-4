import { ApiResponse, getInvalidTokenPayload } from '@/http/common/response'
import {
  execute as commonExecute,
  makeRequest as commonMakeRequest,
} from '@/http/common/utils'
import { HttpRequest, HttpRequestOption } from '@/http/core/request'

// MEMO: Client에서 '/' 경로는 호스트 URL 이후 경로로 설정됨. (eg: http://localhost:3000/~~~~)
export const CLIENT_API_BASE_URL = '/'

const clientRefreshRequest = makeRequest('api/login/refresh', {
  method: 'post',
})

export function makeRequest(
  path: string,
  option?: HttpRequestOption,
): HttpRequest
export function makeRequest(
  path: string,
  customer?: 'append-customer',
  option?: HttpRequestOption,
): HttpRequest
export function makeRequest(
  path: string,
  customerOrOption?: 'append-customer' | HttpRequestOption,
  rawOption?: HttpRequestOption,
): HttpRequest {
  const isCustomer = customerOrOption === 'append-customer'
  let option =
    rawOption ??
    (typeof customerOrOption === 'object' ? customerOrOption : undefined)

  if (isCustomer) {
    const customerToken = getCustomerToken()

    if (option) {
      if (option.headers) {
        option.headers = {
          ...option.headers,
          customer: customerToken,
        }
      } else {
        option.headers = {
          customer: customerToken,
        }
      }
    } else {
      option = {
        headers: {
          customer: customerToken,
        },
      }
    }
  } else {
    if (!option || !option.headers) {
      if (!option) {
        option = {
          headers: {},
        }
      } else {
        option.headers = {}
      }
    }
  }

  if (!option.cache) {
    option.cache = 'no-cache'
  }
  option.headers = {
    ...option.headers,
    timeoffset: new Date().getTimezoneOffset() * -1,
  }
  return commonMakeRequest(CLIENT_API_BASE_URL, path, option)
}

export async function execute<T>(
  request: HttpRequest,
  transform?: (rawJson: any) => T,
): Promise<T> {
  let hasRefresh = isPendingRefreshTokenState()
  let response: ApiResponse<T>

  if (!hasRefresh) {
    response = await commonExecute(request, transform)
    hasRefresh = response.status === 401
  }
  if (hasRefresh) {
    const isRefreshed = await refreshCookieToken()
    if (isRefreshed) {
      response = await commonExecute(request, transform)
    } else {
      response = getInvalidTokenPayload()
    }
  }
  return validateResponse(response!)
}

function validateResponse<T>(response: ApiResponse<T>): T {
  if (!response.ok) {
    if (response.result.code === 999999) {
      throw new ErrorResponse(
        JSON.stringify(response.result),
        response.result.code,
        'Internal Server Error',
      )
    } else {
      throw new ErrorResponse(
        JSON.stringify(response.result),
        response.result.code,
        response.result.message,
        response.extra,
      )
    }
  }
  const data = response.data
  if (!data) {
    throw new ErrorResponse(
      JSON.stringify({ code: 400, message: 'Empty Data Response' }),
      400,
      'Empty Data Response',
    )
  }
  return data
}

function isPendingRefreshTokenState(): boolean {
  const refreshManager = getRefreshTokenManager()
  return refreshManager?.status === 'pending'
}

async function refreshCookieToken(): Promise<boolean> {
  const refreshManager = getRefreshTokenManager()

  if (refreshManager) {
    if (refreshManager.status === 'on') {
      refreshManager.status = 'pending'

      const response = await commonExecute(clientRefreshRequest)
      refreshManager.status = 'finish'
      const result = response.ok

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500))

      refreshManager.watcher.forEach((watch: (bool: boolean) => void) => {
        watch(result)
      })
      refreshManager.watcher.splice(0, refreshManager.watcher.length)
      refreshManager.status = 'on'
      if (result) {
        return true
      } else {
        publisherRejectRefreshToken()
        return false
      }
    } else if (refreshManager.status === 'pending') {
      const response = await new Promise<boolean>((resolve) => {
        refreshManager.watcher.push((bool: boolean) => {
          resolve(bool)
        })
      })
      return response
    }
  } else {
    const response = await commonExecute(clientRefreshRequest)
    if (response.ok) {
      return true
    } else {
      return false
    }
  }
  return false
}

let refreshRejectEventListener: (() => void) | undefined = undefined
const _REFRASH: RefreshTokenManager = {
  status: 'on',
  watcher: [],
}

function getRefreshTokenManager(): RefreshTokenManager {
  return _REFRASH
}

function publisherRejectRefreshToken() {
  if (refreshRejectEventListener) {
    refreshRejectEventListener()
  }
}

export function registRejectRefreshToken(rejectCallback: () => void) {
  refreshRejectEventListener = rejectCallback
}

export function unregistRejectRefreshToken() {
  refreshRejectEventListener = undefined
}

let customerToken: string = ''
export function setCustomerToken(token: string) {
  customerToken = token
}

export function getCustomerToken() {
  return customerToken
}

type RefreshTokenStatus = 'on' | 'pending' | 'finish'
type RefreshTokenManager = {
  status: RefreshTokenStatus
  watcher: ((bool: boolean) => void)[]
}

export class ErrorResponse extends Error {
  public code: number
  public errorMessage: string
  public extra?: unknown

  constructor(rawJson: string, code: number, message: string, extra?: unknown) {
    super(rawJson)
    this.code = code
    this.errorMessage = message
    this.extra = extra
  }
}
