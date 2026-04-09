import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
  getExceptionResponsePayload,
} from '@/app/api/_util'
import { createAuthorization } from '@/authorization/server/authorize'
import { setTokenWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest, NextResponse } from 'next/server'
import Account from '@/repository/server/account'

export async function POST(request: NextRequest) {
  const customer = await getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }
  const parameter = await getBodyParameters(
    request,
    'code',
    'i',
    'deviceType',
    't',
  )

  const code = parameter.getString('code')
  const i = parameter.getString('i')
  const deviceType = parameter.getString('deviceType')
  const t = parameter.getString('t', 'student')

  const xffIp = request.headers.get('x-forwarded-for') || undefined
  let ipv4 = 'missing'
  if (xffIp) {
    const targetIp = xffIp.split(',')[0].trim()
    if (targetIp === '::1') {
      ipv4 = 'localhost'
    } else if (targetIp.startsWith('::ffff:')) {
      ipv4 = targetIp.substring(7)
    } else {
      ipv4 = targetIp
    }
    if (ipv4 === '127.0.0.1') {
      ipv4 = 'localhost'
    } else if (ipv4 === '115.91.169.228') {
      ipv4 = 'office'
    }
  }

  const [payload, status, error] = await executeRequestAction(
    Account.signinWithCode(customer, {
      code,
      i,
      ipv4,
      deviceType: `${deviceType}/SSO`,
    }),
  )

  if (status.status >= 200 && status.status < 300) {
    const token = {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      tag: 'tag',
    }
    const authorization = createAuthorization(token)
    const user = authorization.getTokenUserDetails()
    if (user?.role === 'staff' || user?.role === 'admin') {
      if (t === 'student') {
        const hash = btoa(JSON.stringify(token))
        const nextResponse = NextResponse.json(
          {
            code: 2002,
            extra: {
              hash,
            },
          },
          { status: 400 },
        )
        return nextResponse
      } else {
        const nextResponse = setTokenWithCookie(
          NextResponse.json(
            { success: true, staff: true, student: !!user.uid },
            { status: 200 },
          ),
          token,
        )
        return nextResponse
      }
    } else if (payload.isChangePassword) {
      const hash = btoa(JSON.stringify(token))
      return NextResponse.json(
        {
          code: 2001,
          extra: {
            hash,
          },
        },
        { status: 400 },
      )
    } else {
      const nextResponse = setTokenWithCookie(
        NextResponse.json(
          { success: true, staff: false, student: true },
          { status: 200 },
        ),
        token,
      )
      return nextResponse
    }
  } else if (status.status >= 400 && status.status < 500) {
    const exceptionBody = getExceptionResponsePayload(payload)
    const exceptionMessage = exceptionBody.message
    if (
      exceptionMessage === 'password mismatch' ||
      exceptionMessage === 'id not found'
    ) {
      const code = exceptionMessage === 'password mismatch' ? 3000 : 3001
      const nextResponse = NextResponse.json({ code }, status)
      return nextResponse
    } else if (
      exceptionMessage === 'Invalid Code.' ||
      exceptionMessage === 'Login Code Timeout.'
    ) {
      const code = 3100
      const nextResponse = NextResponse.json({ code }, status)
      return nextResponse
    }
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return NextResponse.json({ code: 9998 }, { status: 500 })
}
