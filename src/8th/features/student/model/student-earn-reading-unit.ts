import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type StudentEarnReadingUnit = {
  id: string
  readingUnitId: string
  name: string
  image: string
}

function makeStudentEarnReadingUnit(json: any): StudentEarnReadingUnit {
  return {
    id: RenewType.renewString(json?.id),
    readingUnitId: RenewType.renewString(json?.ReadingUnitId),
    name: RenewType.renewString(json?.Name),
    image: RenewType.renewString(json?.Image),
  }
}

function transform(json: any): StudentEarnReadingUnitResponse {
  return {
    list: json?.ReadingUnit?.map((item: any) => {
      return makeStudentEarnReadingUnit(item)
    }),
  }
}

export type StudentEarnReadingUnitParams = {}

export type StudentEarnReadingUnitResponse = {
  list: StudentEarnReadingUnit[]
}

export async function getStudentEarnReadingUnit(
  input?: StudentEarnReadingUnitParams,
): Promise<StudentEarnReadingUnitResponse> {
  const request = makeRequest(`api/student/earn-reading-unit`, {
    method: 'get',
  })
  return await execute(request, transform)
}
