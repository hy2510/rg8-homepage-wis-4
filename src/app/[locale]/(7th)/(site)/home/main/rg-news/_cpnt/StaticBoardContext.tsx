'use client'

import { openWindow } from '@/7th/_function/open-window'
import { useScreenMode } from '@/7th/_ui/context/StyleContext'
import RgNewsPostBoard from '@/7th/_ui/modules/home-rg-news-components/RgNewsPostBoard'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'

type StaticBoard = {
  id: string
  title: string
  url: string
  originUrl: string
}
const StaticBoardContext = React.createContext<{
  setCurrent?: (id: string) => void
  setItems?: (items: StaticBoard[]) => void
  current: string
  items: StaticBoard[]
}>({ current: '', items: [] })

export default function StaticBoardProvider({
  boards,
  children,
}: {
  boards: StaticBoard[]
  children?: React.ReactNode
}) {
  const [current, setCurrent] = useState<string>('')
  const [items, setItems] = useState<StaticBoard[]>(boards)

  return (
    <StaticBoardContext.Provider
      value={{
        current,
        setCurrent,
        items,
        setItems,
      }}>
      <RgNewsPostBoard current={current} post={items}>
        <BoardDetail />
        {children}
      </RgNewsPostBoard>
    </StaticBoardContext.Provider>
  )
}

export function useChangeBoard() {
  const context = useContext(StaticBoardContext)
  if (!context) {
    throw new Error('useChangeBoard must be used within a StaticBoardProvider')
  }
  return context.setCurrent
}

export function useLatestContentUrl() {
  const context = useContext(StaticBoardContext)
  if (!context) {
    throw new Error('useChangeBoard must be used within a StaticBoardProvider')
  }
  if (context.items.length > 0) {
    return context.items[0].url
  }
  return undefined
}

function BoardDetail() {
  const router = useRouter()

  const context = useContext(StaticBoardContext)
  const isMobile = useScreenMode() === 'mobile'

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(600)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'height') {
        setHeight(event.data.height)
      } else if (event.data?.type === 'scrollTo') {
        const windowBound = {
          left: window?.pageXOffset || 0,
          top: window?.pageYOffset || 0,
        }
        const iframeBound = iframeRef?.current?.getBoundingClientRect()

        const offsetX = windowBound.left + (iframeBound?.left || 0)
        // GHeader의 Position이 Fixed이므로 Y값을 해당(GHeader의 Height) 값만큼 빼주어야 함.
        const offsetY =
          windowBound.top + (iframeBound?.top || 0) - (isMobile ? 60 : 78)

        const x = offsetX + (event.data?.x || 0)
        const y = offsetY + (event.data?.y || 0)
        window.scrollTo(x, y)
      } else if (event.data?.type === 'href' && event.data.href) {
        const link = event.data.href as string
        const isExternal = link.startsWith('http:') || link.startsWith('https:')
        if (isExternal) {
          openWindow(link, {
            target: '_blank',
            external: true,
          })
        } else {
          router.push(link)
        }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isMobile, router])

  if (!context || !context.current) {
    return <></>
  }
  const myBoard = context.items.find((board) => board.id === context.current)
  if (!myBoard) {
    return <h2>Contents Not Found !</h2>
  }

  return (
    <div>
      <iframe
        ref={iframeRef}
        width={'100%'}
        frameBorder="0"
        scrolling="no"
        src={myBoard.originUrl}
        style={{
          backgroundColor: 'transparent',
          height: `${height}px`,
        }}
      />
    </div>
  )
}
