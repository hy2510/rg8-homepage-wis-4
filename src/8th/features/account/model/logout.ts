import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type Logout = { success: boolean }

function makeLogout(json: any): Logout {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

function transform(json: any): LogoutResponse {
  return makeLogout(json)
}

export type LogoutParams = {}

export type LogoutResponse = {
  success: boolean
}

export async function deleteLogout(
  input?: LogoutParams,
): Promise<LogoutResponse> {
  const request = makeRequest(`api/account/signout`, {
    method: 'delete',
  })
  return await execute(request, transform)
}
