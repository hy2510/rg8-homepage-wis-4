import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { Event, makeEvent } from '../object/event'
import { makeRequestWithCustomer } from '../utils'

type Input = {}

type Output = Event[]

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/readingking', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    return json.Event.map((item: any): Event => makeEvent(item))
  })
}

export { action as getReadingKingEventList }
export type { Output as EventListResponse }

function newInstance(): Output {
  return []
}
export { newInstance as newReadingKingEventList }
