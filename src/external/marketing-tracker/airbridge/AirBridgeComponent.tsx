import Script from 'next/script'
import { HEADER_INCLUDE_SCRIPT } from './airbridge-lib'

export default function AirBridgeHeaderScript() {
  return (
    <Script
      id={'airbridge-sdk'}
      strategy={'beforeInteractive'}
      dangerouslySetInnerHTML={{
        __html: HEADER_INCLUDE_SCRIPT,
      }}></Script>
  )
}
