import Script from 'next/script'
import { BODY_INCLUDE_NO_SCRIPT, HEADER_INCLUDE_SCRIPT } from './meta-pixel'

export function MetaPixelHeaderScript() {
  return (
    <Script
      id={'meta-pixel-sdk'}
      strategy={'beforeInteractive'}
      dangerouslySetInnerHTML={{
        __html: HEADER_INCLUDE_SCRIPT,
      }}></Script>
  )
}

export function MetaPixelBodyNoScript() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: BODY_INCLUDE_NO_SCRIPT,
      }}></noscript>
  )
}
