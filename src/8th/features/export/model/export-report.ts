import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ExportReportResponse {
  return RenewType.renewString(json?.Url)
}

export type ExportReportParams = {
  studyIds: string[]
  studentHistoryIds: string[]
}

export type ExportReportResponse = string

export async function getExportReport(
  input: ExportReportParams,
): Promise<ExportReportResponse> {
  const request = makeRequest(`api/export/student-report`, {
    method: 'get',
    queryString: {
      studyIds: input.studyIds.join('|'),
      studentHistoryIds: input.studentHistoryIds.join('|'),
    },
  })
  return await execute(request, transform)
}
