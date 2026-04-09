import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type DailySection = {
  sectionId: string
  sectionName: string
  totalBooks: number
  completeBooks: number
  sectionCompleteYn: boolean
  bookLevel: string
}

function makeDailySection(json: any): DailySection {
  return {
    sectionId: RenewType.renewString(json?.SectionId),
    sectionName: RenewType.renewString(json?.SectionName),
    totalBooks: RenewType.renewNumber(json?.TotalBooks),
    completeBooks: RenewType.renewNumber(json?.CompleteBooks),
    sectionCompleteYn: RenewType.renewBoolean(json?.SectionCompleteYn),
    bookLevel: RenewType.renewString(json?.BookLevel),
  }
}

function transform(json: any): DailySectionResponse {
  return {
    list: json?.Section?.map((item: any) => makeDailySection(item)),
  }
}

export type DailySectionParams = {
  stageId: string
}

export type DailySectionResponse = {
  list: DailySection[]
}

export async function getDailySection(
  input?: DailySectionParams,
): Promise<DailySectionResponse> {
  const request = makeRequest(`api/daily/section`, {
    method: 'get',
    queryString: {
      stageId: input?.stageId,
    },
  })
  return await execute(request, transform)
}
