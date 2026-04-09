import { RouteResponse } from '@/app/api/_util'

export async function commonGet(bookcode: string, path: string) {
  const cdnUrl = `https://wcfresource.a1edu.com/newsystem/publishedbook/data/${bookcode}/${path}`
  const res = await fetch(cdnUrl, {
    next: {
      revalidate: 3600,
      tags: [
        'data:cdn',
        'publishedbook',
        `publishedbook:quiz`,
        `publishedbook:${bookcode}`,
      ],
    },
  })

  if (res.ok) {
    return res
  }
  return RouteResponse.commonError()
}
