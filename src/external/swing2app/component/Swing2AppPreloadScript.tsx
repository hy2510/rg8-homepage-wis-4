import Script from 'next/script'

const SWING2APP_WEBAPP_INTERFACE_URL =
  'https://pcdn2.swing2app.co.kr/swing_public_src/v3/2024_07_23_001/js/swing_app_on_web.js'
const SWING2APP_WEBAPP_CUSTOM_INTERFACE_URL =
  'https://pcdn2.swing2app.co.kr/swing_public_src/custom_proj/reading_gate_proj/js/reading_gate_inapp_api_handler.js?date=20241111_v9'

export default function Swing2AppPreloadScript() {
  return (
    <>
      <Script
        strategy={'beforeInteractive'}
        src={SWING2APP_WEBAPP_INTERFACE_URL}></Script>
      <Script
        strategy={'beforeInteractive'}
        src={SWING2APP_WEBAPP_CUSTOM_INTERFACE_URL}></Script>
    </>
  )
}
