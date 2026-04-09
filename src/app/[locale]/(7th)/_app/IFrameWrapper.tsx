'use client'

import { useScreenMode } from '@/7th/_ui/context/StyleContext'
import { useRef, useState } from 'react'

export default function IFrameWrapper({
  pcUrl,
  mobileUrl,
}: {
  pcUrl: string
  mobileUrl: string
}) {
  const isMobile = useScreenMode() === 'mobile'

  const { iframeRef, onIframeLoad, height } = useRefIframeHeight()

  return (
    <div>
      <iframe
        width={'100%'}
        frameBorder="0"
        scrolling="no"
        ref={iframeRef}
        onLoad={onIframeLoad}
        src={isMobile ? mobileUrl : pcUrl}
        style={{
          backgroundColor: 'transparent',
          height: `${height + 20}px`,
        }}
      />
    </div>
  )
}

export function useRefIframeHeight(): {
  iframeRef: React.RefObject<HTMLIFrameElement>
  onIframeLoad: () => void
  height: number
} {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [isIframeOnLoaded, setIframeOnLoaded] = useState(false)
  const [iframeHeight, setIframeHeight] = useState(0)
  const adjustIframeHeight = () => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentWindow) {
      const height = iframe.contentWindow.document.body.scrollHeight
      setIframeHeight(height)
    }
    setIframeOnLoaded(true)
  }
  const scrollHeight = isIframeOnLoaded
    ? iframeHeight
    : iframeRef.current?.contentWindow?.document?.body?.scrollHeight || 0

  return {
    iframeRef: iframeRef as unknown as React.RefObject<HTMLIFrameElement>,
    onIframeLoad: adjustIframeHeight,
    height: scrollHeight,
  }
}
