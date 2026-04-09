import { commonGet } from '@/app/api/study/pre-k/common-api'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return await commonGet(`quiz/new`, request.nextUrl.search)
}
