'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useMemo } from 'react'
import AirBridge from '../airbridge/airbridge-lib'
import KakaoPixel from '../kakao-pixel/kakao-pixel'
import MetaPixel from '../meta-pixcel/meta-pixel'

const MarketingTrackerContext = React.createContext<
  | {
      pageView: (tag?: string) => void
      eventAction: (eventName: string, args?: any) => void
    }
  | undefined
>(undefined)

interface MaketingTracker {
  init: () => boolean
  pageView: (tag?: string) => void
  eventAction: (eventName: string, args?: any) => void
}
const trackingTools: MaketingTracker[] = [KakaoPixel, MetaPixel, AirBridge]

export default function MarketingTrackerContextProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParam = useSearchParams().toString()

  useEffect(() => {
    trackingTools.some((tool) => {
      const isInit = tool.init()
    })
  }, [])

  const action = useMemo(() => {
    return {
      pageView: (tag?: string) => {
        trackingTools.forEach((tool) => tool.pageView(tag))
      },
      eventAction: (eventName: string, args?: any) => {
        trackingTools.forEach((tool) => tool.eventAction(eventName, args))
      },
    }
  }, [])

  useEffect(() => {
    const path = `${pathname}${searchParam ? `?${searchParam}` : ''}`
    action.pageView()
  }, [pathname, searchParam, action])

  return (
    <MarketingTrackerContext.Provider value={action}>
      {children}
    </MarketingTrackerContext.Provider>
  )
}

export function useTrack() {
  const context = useContext(MarketingTrackerContext)
  if (!context) {
    throw Error('Tracker Context unbind.')
  }
  return context
}
