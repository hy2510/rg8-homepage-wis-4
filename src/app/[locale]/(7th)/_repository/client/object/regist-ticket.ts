import RenewType from '@/util/string-utils'

export interface RegistTicket {
  result: TicketResult[]
  final: boolean
}

export interface TicketResult {
  ticket: string
  code: number
}

export function makeRegistTicket(json?: any): RegistTicket {
  return {
    final: RenewType.renewBoolean(json?.final),
    result: [
      ...json?.result?.map((item: any): TicketResult => {
        return {
          ticket: item.ticket,
          code: item.code,
        }
      }),
    ],
  }
}
