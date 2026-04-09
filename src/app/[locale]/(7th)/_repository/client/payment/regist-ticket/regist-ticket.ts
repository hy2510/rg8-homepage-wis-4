import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { RegistTicket, makeRegistTicket } from '../../object/regist-ticket'
import { makeRequest } from '../../utils'

type Input = { tickets: string[] }

type Output = RegistTicket

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/payment/ticket', {
    method: 'put',
    body: {
      tickets: [...input.tickets],
    },
  })
  return await execute(request, (json): Output => {
    return makeRegistTicket(json)
  })
}

export { action as putRegistTicket }
export type { Output as RegistTicketResponse }
function newInstance(): Output {
  return {
    final: false,
    result: [],
  }
}
export { newInstance as newRegistTicket }
