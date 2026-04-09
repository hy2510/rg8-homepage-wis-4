import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ExportVocabularyResponse {
  return RenewType.renewString(json?.Url)
}

export type ExportVocabularyParams = {
  levelRoundIds: string[]
  studentHistoryId: string
}

export type ExportVocabularyResponse = string

export async function getExportVocabulary(
  input: ExportVocabularyParams,
): Promise<ExportVocabularyResponse> {
  const request = makeRequest(`api/export/vocabulary`, {
    method: 'get',
    queryString: {
      levelRoundIds: input.levelRoundIds.join('|'),
      studentHistoryId: input.studentHistoryId,
    },
  })
  return await execute(request, transform)
}
