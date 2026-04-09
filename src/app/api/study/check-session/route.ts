import {
  deleteTokenWithCookie,
  getAuthorizationWithCookie,
  setTokenWithCookie,
} from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest, NextResponse } from 'next/server'
import { getCheckSession, postRefreshToken } from '@/repository/server/api'
import { ApiResponse } from '@/repository/server/utils'
import { RouteResponse, executeRequestAction } from '../../_util'

type TokenRefreshResult = {
  status: number
  message: string
  isActionPayload: boolean
  isDeleteToken: boolean
  token?: {
    accessToken: string
    refreshToken: string
    tag: string
  }
}

async function executeIfRefreshAfter(
  action: (token: string) => Promise<ApiResponse>,
): Promise<{
  tokenResult?: TokenRefreshResult
  actionResult?: [any, { status: number }, any]
}> {
  const authorization = await getAuthorizationWithCookie()
  const activeAccessToken = authorization.getActiveAccessToken()

  let actionResult: [any, { status: number }, any] | undefined = undefined
  let tokenResult: TokenRefreshResult | undefined = undefined

  let hasRefresh = !activeAccessToken
  if (!hasRefresh) {
    actionResult = await executeRequestAction(action(activeAccessToken!))
    if (actionResult[1].status === 401) {
      hasRefresh = true
    }
  }
  if (hasRefresh) {
    if (!authorization.token) {
      tokenResult = {
        status: 400,
        message: 'Not found token.',
        isDeleteToken: false,
        isActionPayload: false,
      }
    } else if (!authorization.isValidateToken()) {
      tokenResult = {
        status: 400,
        message: 'Invalid token.',
        isDeleteToken: true,
        isActionPayload: false,
      }
    }
    if (!tokenResult) {
      const { accessToken, refreshToken } = authorization.token!
      const resRefresh = await postRefreshToken(accessToken, {
        refreshToken,
      })
      if (resRefresh.ok) {
        const token = {
          ...resRefresh.data!,
          tag: 'tag-blabla',
        }
        tokenResult = {
          status: 200,
          message: 'success',
          isDeleteToken: false,
          isActionPayload: true,
          token,
        }
        actionResult = await executeRequestAction(action(token.accessToken))
        if (actionResult[1].status === 401) {
          tokenResult.isDeleteToken = true
        }
      }
    }
  }
  return {
    tokenResult,
    actionResult,
  }
}

function tokenResultWrapResponse(
  tokenResult: TokenRefreshResult,
  response?: NextResponse,
): NextResponse {
  let newResponse: NextResponse | undefined = undefined
  let tokenFlag: 'stay' | 'update' | 'delete' = 'stay'

  if (tokenResult.isDeleteToken) {
    tokenFlag = 'delete'
  } else if (tokenResult.token) {
    tokenFlag = 'update'
  }
  if (tokenFlag === 'update') {
    newResponse = setTokenWithCookie(response!, tokenResult!.token!)
  } else if (tokenFlag === 'delete') {
    newResponse = deleteTokenWithCookie(
      NextResponse.json(
        { message: tokenResult!.message },
        { status: tokenResult!.status },
      ),
    )
  } else {
    newResponse = NextResponse.json(
      { message: tokenResult.message },
      { status: tokenResult.status },
    )
  }

  return newResponse
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const actionCheckSession = (token: string) => getCheckSession(token)
  const res = await executeIfRefreshAfter(actionCheckSession)

  let response: NextResponse | undefined = undefined

  if (res.actionResult) {
    const [payload, status, error] = res.actionResult
    if (error) {
      return RouteResponse.commonError()
    }
    if (payload.code === 1001) {
      response = RouteResponse.response({ isPass: false }, { status: 200 })
    } else {
      response = RouteResponse.response(payload, status)
    }
  } else {
    return RouteResponse.commonError()
  }

  if (res.tokenResult) {
    return tokenResultWrapResponse(res.tokenResult, response)
  } else if (!response) {
    return RouteResponse.commonError()
  } else {
    return response
  }
}
