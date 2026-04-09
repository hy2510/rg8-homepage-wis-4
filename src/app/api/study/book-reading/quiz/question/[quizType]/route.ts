import { commonGet } from '@/app/api/study/book-reading/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ quizType: string }> },
) {
  const params = await props.params
  return await commonGet(`quiz/${params.quizType}`, request.nextUrl.search)
}
