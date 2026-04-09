import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ExportWorkSheetResponse {
  return RenewType.renewString(json?.Url)
}

export type ExportWorkSheetParams = {
  levelNames: string[]
}

export type ExportWorkSheetResponse = string

export async function getExportWorkSheet(
  input: ExportWorkSheetParams,
): Promise<ExportWorkSheetResponse> {
  const request = makeRequest(`api/export/worksheet`, {
    method: 'get',
    queryString: {
      levelNames: input.levelNames.join('|').replace(/-/g, '').toUpperCase(),
    },
  })
  return await execute(request, transform)
}
