import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): EventPrizeUpdateResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type EventPrizeUpdateParams = {
  eventId: string
  eventPrizeId: string
}

export type EventPrizeUpdateResponse = {
  success: boolean
}

export async function postEventPrizeUpdate(
  input: EventPrizeUpdateParams,
): Promise<EventPrizeUpdateResponse> {
  const request = makeRequest(`api/readingking/prize`, {
    method: 'post',
    body: {
      eventId: input.eventId,
      eventPrizeId: input.eventPrizeId,
    },
  })
  return await execute(request, transform)
}
