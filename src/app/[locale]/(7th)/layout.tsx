import './globals.scss'
import { BodyPreloadScript, HeadPreloadScript } from '@/7th/_app/PreloadScript'
import { Viewport } from 'next'
import RootBodyLayout from './__root/RootBodyLayout'

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

export default async function LanguageLayout(props: {
  params: Promise<{
    locale: string
  }>
  children?: React.ReactNode
}) {
  const { locale } = await props.params
  const { children } = props

  return (
    <html lang={locale}>
      <head>
        <HeadPreloadScript />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <RootBodyLayout locale={locale}>{children}</RootBodyLayout>
        <BodyPreloadScript />
      </body>
    </html>
  )
}
