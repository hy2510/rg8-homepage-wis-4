import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): AdjustChangeResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type AdjustChangeParams = {
  command: 'pause' | 'release'
}

export type AdjustChangeResponse = {
  success: boolean
}

export async function putAdjustChange(
  input: AdjustChangeParams,
): Promise<AdjustChangeResponse> {
  const request = makeRequest(`api/payment/adjust`, {
    method: 'put',
    queryString: {
      command: input.command,
    },
  })
  return await execute(request, transform)
}
