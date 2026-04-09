'use client'

import { useEffect } from 'react'

export default function useSwing2AppConnect({
  platform,
  updatePlatform,
  iOSBackgroundColor = '#ffffff',
}: {
  platform: string
  updatePlatform: (platform: {
    platform: string
    info?: string
    tag?: string
  }) => void
  iOSBackgroundColor?: string
}) {
  useEffect(() => {
    if (platform === 'unknown') {
      const swingWebViewPlugin = (window as any).swingWebViewPlugin
      const currentPlatform =
        swingWebViewPlugin?.app?.methods?.getCurrentPlatform()

      if (currentPlatform === 'android' || currentPlatform === 'ios') {
        const platform = currentPlatform === 'android' ? 'Android' : 'iOS'

        swingWebViewPlugin.app.methods.getAppVersion(function (value: any) {
          const appVersion = JSON.parse(value)
          let appVer = ''
          let device = ''

          if (currentPlatform === 'android') {
            // console.log('model : ' + appVersion.model)
            // console.log('sdk_version : ' + appVersion.sdk_version)
            // console.log('version_release : ' + appVersion.version_release)
            // console.log('manufacturer : ' + appVersion.manufacturer)
            // console.log('app_version : ' + appVersion.app_version)
            // console.log('radio_version : ' + appVersion.radio_version)
            // console.log('package_name : ' + appVersion.package_name)
            // console.log('uuid : ' + appVersion.uuid)

            appVer = appVersion.version_release
            device = `${appVersion.sdk_version}_${appVersion.version_release}; ${appVersion.manufacturer}/${appVersion.model}`
          } else if (currentPlatform === 'ios') {
            // console.log('model : ' + appVersion.model)
            // console.log('name : ' + appVersion.name)
            // console.log('systemVersion : ' + appVersion.systemVersion)
            // console.log('appVersion : ' + appVersion.appVersion)
            // console.log('bundleVersion : ' + appVersion.bundleVersion)
            // console.log('bundleID : ' + appVersion.bundleID)
            // console.log('uuid : ' + appVersion.uuid)

            appVer = appVersion.appVersion
            device = `${appVersion.systemVersion}; ${appVersion.model}`
          }

          updatePlatform({
            platform,
            info: device,
            tag: `v${appVer}`,
          })
        })

        if (currentPlatform === 'ios') {
          swingWebViewPlugin.app.ui.setIosBackColor(iOSBackgroundColor)
        }
      } else {
        updatePlatform({
          platform: 'Web',
        })
      }
    }
  }, [platform, updatePlatform, iOSBackgroundColor])
}
