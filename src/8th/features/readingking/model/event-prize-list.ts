import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type ReadingKingEventPrize = {
  eventId: string
  eventPrizeId: string
  prizePoint: number
  prizeTitle: string
  prizeDays: number
}

function makeReadingKingEventPrize(json?: any): ReadingKingEventPrize {
  return {
    eventId: RenewType.renewString(json?.EventId),
    eventPrizeId: RenewType.renewString(json?.EventPrizeId),
    prizePoint: RenewType.renewNumber(json?.PrizePoint),
    prizeTitle: RenewType.renewString(json?.PrizeTitle),
    prizeDays: RenewType.renewNumber(json?.PrizeDays),
  }
}

function transform(json: any): ReadingKingEventPrizeResponse {
  return {
    list: json?.EventPrize?.map((item: any) => makeReadingKingEventPrize(item)),
  }
}

export type ReadingKingEventPrizeParams = {
  eventId: string
}

export type ReadingKingEventPrizeResponse = {
  list: ReadingKingEventPrize[]
}

export async function getReadingKingEventPrize(
  input: ReadingKingEventPrizeParams,
): Promise<ReadingKingEventPrizeResponse> {
  const request = makeRequest(`api/readingking/prize`, {
    method: 'get',
    queryString: {
      eventId: input.eventId,
    },
  })
  return await execute(request, transform)
}
