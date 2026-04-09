import { commonGet } from '@/app/api/study/book-reading/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ step: string }> },
) {
  const params = await props.params
  return await commonGet(`record/${params.step}`, request.nextUrl.search)
}
