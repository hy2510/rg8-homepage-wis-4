import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): FavoriteDeleteAllResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type FavoriteDeleteAllParams = {}

export type FavoriteDeleteAllResponse = {
  success: boolean
}

export async function deleteFavoriteDeleteAll(
  input?: FavoriteDeleteAllParams,
): Promise<FavoriteDeleteAllResponse> {
  const request = makeRequest(`api/library/favorite`, {
    method: 'delete',
    queryString: {
      isAll: 'Y',
    },
  })
  return await execute(request, transform)
}
