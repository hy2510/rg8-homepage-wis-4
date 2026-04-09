import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Payment from '@/repository/server/payment'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '../../_util'

export async function PUT(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(request, 'tickets')
  const tickets = parameter.raw['tickets'] as string[]

  const status = {
    status: 200,
  }
  const resultPayload: {
    result: { code: number; ticket: string }[]
    final: boolean
  } = {
    result: [],
    final: false,
  }
  let final = true
  let error: any = undefined

  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i]
    const [lPayload, lStatus, lError] = await executeRequestAction(
      Payment.registTicket(token, { ticketNum: ticket }),
    )
    const code = lPayload.code
    if (code === 0 && i < tickets.length - 1) {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
    }

    resultPayload.result.push({ code, ticket })
    if (
      (status.status >= 200 || status.status < 300) &&
      (lStatus.status < 200 || lStatus.status >= 300)
    ) {
      status.status = lStatus.status
    }
    if (!error) {
      error = lError
    }
    if (final) {
      final = code === 0
    }
  }
  resultPayload.final = final

  return RouteResponse.response(resultPayload, status)
}
