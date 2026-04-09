import Script from 'next/script'
import {
  BODY_INCLUDE_NO_SCRIPT,
  HEADER_INCLUDE_SCRIPT,
} from './google-tag-manager'

export function GoogleTagManagerHeaderScript() {
  return (
    <Script
      id={'google-tag-mgr-sdk'}
      strategy={'beforeInteractive'}
      dangerouslySetInnerHTML={{
        __html: HEADER_INCLUDE_SCRIPT,
      }}></Script>
  )
}

export function GoogleTagManagerBodyNoScript() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: BODY_INCLUDE_NO_SCRIPT,
      }}></noscript>
  )
}
