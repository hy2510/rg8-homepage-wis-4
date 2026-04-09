import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type ReadingKingTrophy = {
  prizeTitle: string
  prizeGrade: number
  registDate: string
}

function makeReadingKingTrophy(json?: any): ReadingKingTrophy {
  return {
    prizeTitle: RenewType.renewString(json?.PrizeTitle),
    prizeGrade: RenewType.renewNumber(json?.PrizeGrade),
    registDate: RenewType.renewString(json?.PrizeDate),
  }
}

function transform(json: any): ReadingKingTrophyResponse {
  return {
    list: json?.ReadingKing?.map((item: any) => makeReadingKingTrophy(item)),
  }
}

export type ReadingKingTrophyParams = {}

export type ReadingKingTrophyResponse = {
  list: ReadingKingTrophy[]
}

export async function getReadingKingTrophy(
  input?: ReadingKingTrophyParams,
): Promise<ReadingKingTrophyResponse> {
  const request = makeRequest(`api/achievement/readingking-trophy`, {
    method: 'get',
  })
  return await execute(request, transform)
}
