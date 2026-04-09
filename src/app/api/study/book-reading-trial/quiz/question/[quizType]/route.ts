import { RouteResponse } from '@/app/api/_util'
import { commonGet } from '@/app/api/study/book-reading-trial/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ quizType: string }> },
) {
  const params = await props.params
  const searchParams = request.nextUrl.searchParams

  const bookcode = searchParams.get('bookcode') || ''

  const res = await commonGet(bookcode, `${params.quizType}.json`)

  if (res.ok) {
    const data = await res.json()
    if (
      params.quizType === 'vocabulary-2' ||
      params.quizType === 'listening-activity-3' ||
      params.quizType === 'listening-activity-4'
    ) {
      if (data.Quiz.length > 0) {
        const newQuizShuffle = [...data.Quiz].sort(() => Math.random() - 0.5)
        data.Quiz = newQuizShuffle
      }
    }
    return RouteResponse.response(data, { status: res.status })
  }
  return res
}
