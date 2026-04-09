import { commonGet } from '@/app/api/study/book-reading-trial/common-api'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ bookType: string }> },
) {
  const params = await props.params
  const searchParams = request.nextUrl.searchParams

  const bookcode = searchParams.get('bookcode') || ''

  return await commonGet(bookcode, 'book-info.json')
}
