import './rg-8th.css'
import {
  BodyPreloadScript,
  HeadPreloadScript,
} from '@/8th/shared/component/PreloadScript'
import { Viewport } from 'next'
import RootLayout from './_index/RootLayout'

export const metadata = {
  'apple-mobile-web-app-capable': 'yes',
  'apple-mobile-web-app-status-bar-style': 'white-translucent',
}
export const viewport: Viewport = {
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
}

export default async function StartLayout(props: {
  params: Promise<{
    locale: string
  }>
  children?: React.ReactNode
}) {
  const params = await props.params
  const { children } = props
  const locale = params.locale

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <HeadPreloadScript />
      </head>
      <body>
        <RootLayout locale={locale}>{children}</RootLayout>
        <BodyPreloadScript />
      </body>
    </html>
  )
}
