import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type RegistTicket = {
  result: TicketResult[]
  final: boolean
}

export interface TicketResult {
  ticket: string
  code: number
}

function makeRegistTicket(json: any): RegistTicket {
  return {
    final: RenewType.renewBoolean(json?.final),
    result: [
      ...json?.result?.map((item: any): TicketResult => {
        return {
          ticket: RenewType.renewString(item.ticket),
          code: RenewType.renewNumber(item.code),
        }
      }),
    ],
  }
}

function transform(json: any): RegistTicketResponse {
  return makeRegistTicket(json)
}

export type RegistTicketParams = {
  tickets: string[]
}

export type RegistTicketResponse = RegistTicket

export async function putRegistTicket(
  input: RegistTicketParams,
): Promise<RegistTicketResponse> {
  const request = makeRequest(`api/payment/ticket`, {
    method: 'put',
    body: {
      tickets: [...input.tickets],
    },
  })
  return await execute(request, transform)
}
