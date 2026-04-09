import { ApiResponse } from '@/http/common/response'
import { StudyReport, makeStudyReport } from '../object/study-report'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {
  startDate?: string
  endDate?: string
  keyword?: string
  status: string
  page?: number
}

type Output = {
  history: StudyReport[]
  summary: {
    totalCount: number
    passCount: number
    failCount: number
    studyDays: number
    totalPoints: number
  }
  page: {
    page: number
    size: number
    totalPages: number
    totalRecords: number
  }
  download?: string
  performanceReport?: string
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(`api/history/study`, {
    method: 'get',
    queryString: {
      startDate: input.startDate || '',
      endDate: input.endDate || '',
      keyword: input.keyword || '',
      status: input.status,
      page: input.page,
    },
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      history: json.History.map((item: any) => {
        return makeStudyReport(item)
      }),
      summary: {
        totalCount: Number(json.Summary.TotalCount),
        passCount: Number(json.Summary.PassedCount),
        failCount: Number(json.Summary.FailedCount),
        studyDays: Number(json.Summary.StudyDays),
        totalPoints: Number(json.Summary.TotalPoints),
      },
      page: {
        page: Number(json.Pagination.Page),
        size: Number(json.Pagination.RecordPerPage),
        totalPages: Number(json.Pagination.TotalPages),
        totalRecords: Number(json.Pagination.TotalRecords),
      },
      download: json.ExcelDownload,
      performanceReport: json.PerformanceReport,
    }
  })
}

export { action as getStudyReport }
export type { Output as StudyReportResponse }

function newInstance(): Output {
  return {
    history: [],
    summary: {
      totalCount: 0,
      passCount: 0,
      failCount: 0,
      studyDays: 0,
      totalPoints: 0,
    },
    page: {
      page: 0,
      size: 0,
      totalPages: 0,
      totalRecords: 0,
    },
  }
}
export { newInstance as newStudyReport }
