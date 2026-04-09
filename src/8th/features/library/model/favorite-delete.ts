import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): FavoriteDeleteResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type FavoriteDeleteParams = {
  levelRoundIds: string[]
}

export type FavoriteDeleteResponse = {
  success: boolean
}

export async function deleteFavoriteDelete(
  input: FavoriteDeleteParams,
): Promise<FavoriteDeleteResponse> {
  const request = makeRequest(`api/library/favorite`, {
    method: 'delete',
    queryString: {
      levelRoundIds: input.levelRoundIds.join('|'),
    },
  })
  return await execute(request, transform)
}
