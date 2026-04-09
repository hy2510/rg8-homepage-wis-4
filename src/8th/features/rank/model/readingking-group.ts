import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type ReadingKingGroupRank = {
  num: number
  customerName: string
  customerId: string
  rgPoint: number
  bookCount: number
  averageRgPoint: number
  totalRank: number
}

function makeReadingKingGroupRank(json?: any): ReadingKingGroupRank {
  return {
    num: RenewType.renewNumber(json?.Num),
    customerName: RenewType.renewString(json?.CustomerName),
    customerId: RenewType.renewString(json?.CustomerId),
    rgPoint: RenewType.renewNumber(json?.RgPoint),
    bookCount: RenewType.renewNumber(json?.BookCount),
    averageRgPoint: RenewType.renewNumber(json?.AverageRgPoint),
    totalRank: RenewType.renewNumber(json?.TotalRank),
  }
}

function transform(json: any): ReadingKingGroupRankResponse {
  return {
    me: json?.Me ? makeReadingKingGroupRank(json.Me) : undefined,
    list: json?.Rank?.map((json: any) => {
      return makeReadingKingGroupRank(json)
    }),
  }
}

export type ReadingKingGroupRankParams = {
  eventId: string
}

export type ReadingKingGroupRankResponse = {
  me?: ReadingKingGroupRank
  list: ReadingKingGroupRank[]
}

export async function getReadingKingGroupRank(
  input: ReadingKingGroupRankParams,
): Promise<ReadingKingGroupRankResponse> {
  const request = makeRequest(
    `api/ranking/readingking/group`,
    'append-customer',
    {
      method: 'get',
      queryString: {
        eventId: input.eventId,
      },
    },
  )
  return await execute(request, transform)
}
