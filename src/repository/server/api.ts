import 'server-only'
import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { execute as executeServer, makeRequest } from './utils'

export async function postLogin(data: {
  username: string
  password: string
}): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
  const request = makeRequest({
    path: 'login',
    option: {
      method: 'post',
      body: { id: data.username, pw: data.password },
    },
  })
  const response = await execute<{ accessToken: string; refreshToken: string }>(
    request,
    (json: any) => {
      return {
        accessToken: json.accessToken as string,
        refreshToken: json.refreshToken as string,
      }
    },
  )
  return response
}

export async function postRefreshToken(
  token: string,
  data: {
    refreshToken: string
  },
): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
  const request = makeRequest({
    path: 'demo/refresh',
    option: {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: { ...data },
    },
  })
  const response = await execute<{ accessToken: string; refreshToken: string }>(
    request,
    (json: any) => {
      return {
        accessToken: json.accessToken as string,
        refreshToken: json.refreshToken as string,
      }
    },
  )
  return response
}

export async function getCheckSession(token: string) {
  const requestPath = `study/check-session`
  const request = makeRequest({
    token,
    path: requestPath,
    option: {
      method: 'get',
    },
  })
  return await executeServer(request)
}
