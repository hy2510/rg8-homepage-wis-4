import 'server-only'
import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bookcode: string }> },
) {
  const { bookcode } = await params
  const searchParams = req.nextUrl.searchParams
  const localeGet = searchParams.get('locale')
  const locale = localeGet === 'ko' ? 'ko' : 'en'
  const cdnUrl = `https://wcfresource.a1edu.com/newsystem/publishedbook/page/${locale}/${bookcode}.html`
  const res = await fetch(cdnUrl, {
    next: {
      revalidate: 3600,
      tags: [
        'data:cdn',
        'publishedbook',
        `publishedbook:page`,
        `publishedbook:${bookcode}`,
      ],
    },
  })
  return new Response(await res.text(), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  })
}
