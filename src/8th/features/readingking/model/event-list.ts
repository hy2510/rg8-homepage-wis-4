import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type ReadingKingEvent = {
  eventId: string
  eventTitle: string
  startDate: string
  endDate: string
}

function makeReadingKingEvent(json?: any): ReadingKingEvent {
  return {
    eventId: RenewType.renewString(json?.EventId),
    eventTitle: RenewType.renewString(json?.EventTitle),
    startDate: RenewType.renewString(json?.StartDate),
    endDate: RenewType.renewString(json?.EndDate),
  }
}

function transform(json: any): ReadingKingEventResponse {
  return {
    list: json?.Event?.map((item: any) => makeReadingKingEvent(item)),
  }
}

export type ReadingKingEventParams = {}

export type ReadingKingEventResponse = {
  list: ReadingKingEvent[]
}

export async function getReadingKingEventList(
  input?: ReadingKingEventParams,
): Promise<ReadingKingEventResponse> {
  const request = makeRequest(`api/readingking`, 'append-customer', {
    method: 'get',
  })
  return await execute(request, transform)
}
