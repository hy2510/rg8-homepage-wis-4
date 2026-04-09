import { RouteResponse } from '@/app/api/_util'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ step: string }> },
) {
  return RouteResponse.response([], { status: 200 })
}
