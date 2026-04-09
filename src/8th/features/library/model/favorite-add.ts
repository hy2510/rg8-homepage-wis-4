import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): FavoriteAddResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type FavoriteAddParams = {
  levelRoundIds: string[]
}

export type FavoriteAddResponse = {
  success: boolean
}

export async function postFavoriteAdd(
  input: FavoriteAddParams,
): Promise<FavoriteAddResponse> {
  const request = makeRequest(`api/library/favorite`, {
    method: 'post',
    body: {
      levelRoundIds: input.levelRoundIds.join('|'),
    },
  })
  return await execute(request, transform)
}
