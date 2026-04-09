import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ExportBookListResponse {
  return RenewType.renewString(json?.Url)
}

export type ExportBookListParams = {
  levelRoundIds: string[]
}

export type ExportBookListResponse = string

export async function getExportBookList(
  input: ExportBookListParams,
): Promise<ExportBookListResponse> {
  const request = makeRequest(`api/export/book-list`, {
    method: 'get',
    queryString: {
      levelRoundIds: input.levelRoundIds.join('|'),
    },
  })
  return await execute(request, transform)
}
