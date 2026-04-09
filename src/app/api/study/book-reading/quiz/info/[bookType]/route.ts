import { commonGet } from '@/app/api/study/book-reading/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ bookType: string }> },
) {
  const params = await props.params
  return await commonGet(`${params.bookType}`, request.nextUrl.search)
}
