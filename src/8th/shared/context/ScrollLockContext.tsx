'use client'

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'

type SavedBodyStyle = {
  overflow: string
  position: string
  top: string
  width: string
}

type DeviceContextProps = {
  lock: () => void
  unlock: () => void
  getLockCount: () => number
}

export const ScrollLockContext = React.createContext<DeviceContextProps | null>(
  null,
)

export default function ScrollLockContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lockCountRef = useRef(0)
  const scrollYRef = useRef(0)
  const savedStyleRef = useRef<SavedBodyStyle | null>(null)

  const lock = useCallback(() => {
    const { body } = document

    if (lockCountRef.current === 0) {
      // 현재 스크롤 위치 저장
      scrollYRef.current = window.scrollY

      // 원래 스타일 저장
      savedStyleRef.current = {
        overflow: body.style.overflow,
        position: body.style.position,
        top: body.style.top,
        width: body.style.width,
      }

      // 스크롤 막기
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.top = `-${scrollYRef.current}px`
      body.style.width = '100%'
    }

    lockCountRef.current += 1
  }, [])

  const unlock = useCallback(() => {
    if (lockCountRef.current === 0) {
      return
    }

    lockCountRef.current -= 1

    if (lockCountRef.current > 0) {
      return
    }

    const { body } = document
    const savedStyle = savedStyleRef.current

    if (savedStyle) {
      // 원래 스타일 복원
      body.style.overflow = savedStyle.overflow
      body.style.position = savedStyle.position
      body.style.top = savedStyle.top
      body.style.width = savedStyle.width
    }

    window.scrollTo(0, scrollYRef.current)

    savedStyleRef.current = null
    scrollYRef.current = 0
  }, [])

  const value = useMemo(
    () => ({
      lock,
      unlock,
      getLockCount: () => lockCountRef.current,
    }),
    [lock, unlock],
  )

  return (
    <ScrollLockContext.Provider value={value}>
      {children}
    </ScrollLockContext.Provider>
  )
}

export function useLockBodyScroll(isLocked: boolean = true) {
  const context = useContext(ScrollLockContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }

  const { lock, unlock } = context
  useEffect(() => {
    if (!isLocked) return
    lock()
    return () => {
      unlock()
    }
  }, [isLocked, lock, unlock])
}
