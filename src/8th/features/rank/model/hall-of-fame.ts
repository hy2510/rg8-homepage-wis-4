import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type HallOfFameRank = {
  no: number
  hallOfFameId: string
  studentId: string
  studentName: string
  customerName: string
  gradeName: string
  rgPoint: number
  bookCount: number
  hallOfFameGrade: string
  registDate: string
}

function makeHallOfFameRank(json?: any): HallOfFameRank {
  return {
    no: RenewType.renewNumber(json?.No),
    hallOfFameId: RenewType.renewString(json?.HallOfFameId),
    studentId: RenewType.renewString(json?.StudentId),
    studentName: RenewType.renewString(json?.StudentName),
    customerName: RenewType.renewString(json?.CustomerName),
    gradeName: RenewType.renewString(json?.GradeName),
    rgPoint: RenewType.renewNumber(json?.RgPoint),
    bookCount: RenewType.renewNumber(json?.BookCount),
    hallOfFameGrade: RenewType.renewString(json?.HallOfFameGrade),
    registDate: RenewType.renewString(json?.RegistDate),
  }
}

function transform(json: any): HallOfFameRankResponse {
  return {
    user: json?.Me ? makeHallOfFameRank(json.Me) : undefined,
    list: json?.HallOfFame?.map((json: any) => {
      return makeHallOfFameRank(json)
    }),
  }
}

export type HallOfFameRankParams = {}

export type HallOfFameRankResponse = {
  user?: HallOfFameRank
  list: HallOfFameRank[]
}

export async function getHallOfFameRank(
  input?: HallOfFameRankParams,
): Promise<HallOfFameRankResponse> {
  const request = makeRequest(`api/ranking/hall-of-fame`, 'append-customer', {
    method: 'get',
  })
  return await execute(request, transform)
}
