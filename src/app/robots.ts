import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const asyncHeaders = headers()
  const header = await asyncHeaders
  const findHost = header.get('host') || ''

  // 한국 개인회원
  if (
    findHost.includes('www.readinggate.com') ||
    findHost.includes('localhost')
  ) {
    return {
      rules: [
        {
          userAgent: '*',
          allow: ['/ko/', '/ko/home/rg-membership/introduction'],
          disallow: [
            '/ko/home/rg-membership/',
            '/ko/basic/',
            '/ko/library/',
            '/ko/review/',
            '/ko/account/',
          ],
        },
      ],
    }
  } else if (findHost.includes('vn.readinggate.com')) {
    return {
      rules: [
        {
          userAgent: '*',
          allow: ['/vi/', '/vi/home/rg-membership/introduction'],
          disallow: [
            '/vi/home/rg-membership/',
            '/vi/basic/',
            '/vi/library/',
            '/vi/review/',
            '/vi/account/',
          ],
        },
      ],
    }
  }

  // 기본값: 모두 차단
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  }
}
