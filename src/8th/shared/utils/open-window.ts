type OpenConfig = {
  target?: '_blank' | '_parent' | '_self' | '_top' | '_unfencedTop'
  feature?: string
  external?: boolean
}

const setting = {
  platform: 'browswer',
}

export function setPlatform(platform: string) {
  setting.platform = platform
}

export function openWindow(url: string, config?: OpenConfig) {
  if (window) {
    const myWindow = window as any
    if (config) {
      if (
        setting.platform !== 'browswer' &&
        config.external &&
        myWindow.swingWebViewPlugin?.app?.methods?.doExternalOpen
      ) {
        myWindow.swingWebViewPlugin.app.methods.doExternalOpen(url)
      } else {
        const target = config?.target || '_blank'
        const feature = config?.feature || undefined
        myWindow.open(url, target, feature)
      }
    } else {
      const target = '_blank'
      const feature = undefined
      myWindow.open(url, target, feature)
    }
  }
}

export function openDownloadLink(url: string) {
  if (window) {
    const myWindow = window as any
    const target = '_blank'
    const feature = undefined
    myWindow.open(url, target, feature)
  }
}
