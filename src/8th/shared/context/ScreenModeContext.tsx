'use client'

import React, { useContext, useEffect, useState } from 'react'

type ScreenMode = 'desktop' | 'tablet-large' | 'tablet-small' | 'phone'
const SCREEN_MODE_QUERY_MAP: {
  mode: ScreenMode
  //   query: string
  width: number
}[] = [
  {
    mode: 'desktop',
    width: 99999,
  },
  {
    mode: 'tablet-large',
    width: 1200,
  },
  {
    mode: 'tablet-small',
    width: 768,
  },
  {
    mode: 'phone',
    width: 480,
  },
]

function findScreenMode(): ScreenMode {
  let screenMode: ScreenMode = 'desktop'
  const lastIndex = SCREEN_MODE_QUERY_MAP.length - 1
  SCREEN_MODE_QUERY_MAP.forEach(({ mode, width }, i) => {
    let query
    if (i === lastIndex) {
      query = `(max-width: ${width}px)`
    } else {
      query = `(min-width: ${SCREEN_MODE_QUERY_MAP[i + 1].width + 1}px) and (max-width: ${width}px)`
    }
    const result = window?.matchMedia(query).matches || false
    if (result) {
      screenMode = mode
    }
  })
  return screenMode
}

interface ScreenModeContextAttribute {
  mode: ScreenMode
}
interface ScreenModeContextProps extends ScreenModeContextAttribute {}

const ScreenModeContext = React.createContext<
  ScreenModeContextProps | undefined
>(undefined)

export default function ScreenModeContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentScreenMode, setCurrentScreenMode] =
    useState<ScreenMode>('desktop')

  useEffect(() => {
    const screenModeCheck = () => {
      const mode = findScreenMode()
      setCurrentScreenMode(mode)
    }
    screenModeCheck()
    window?.addEventListener('resize', screenModeCheck)
    return () => {
      window?.removeEventListener('resize', screenModeCheck)
    }
  }, [])

  return (
    <ScreenModeContext.Provider value={{ mode: currentScreenMode }}>
      {children}
    </ScreenModeContext.Provider>
  )
}

function isScreenMode(
  currentScreenMode: ScreenMode,
  targetScreenMode: ScreenMode,
  includeOption?: 'bigger' | 'smaller',
): boolean {
  if (currentScreenMode === targetScreenMode) {
    return true
  }
  if (!!includeOption) {
    const currentModeOption = SCREEN_MODE_QUERY_MAP.find(
      (mode) => mode.mode === currentScreenMode,
    )?.width
    const findTargetModeOption = SCREEN_MODE_QUERY_MAP.find(
      (mode) => mode.mode === targetScreenMode,
    )?.width

    if (!!currentModeOption && !!findTargetModeOption) {
      if (includeOption === 'bigger') {
        return findTargetModeOption < currentModeOption
      } else {
        return findTargetModeOption > currentModeOption
      }
    }
  }
  return false
}

export function useScreenMode(): ScreenMode {
  return useContext(ScreenModeContext)?.mode || 'desktop'
}

export function useIsDesktop(includeOption?: 'bigger' | 'smaller'): boolean {
  return isScreenMode(useScreenMode(), 'desktop', includeOption)
}

export function useIsTabletLarge(
  includeOption?: 'bigger' | 'smaller',
): boolean {
  return isScreenMode(useScreenMode(), 'tablet-large', includeOption)
}

export function useIsTabletSmall(
  includeOption?: 'bigger' | 'smaller',
): boolean {
  return isScreenMode(useScreenMode(), 'tablet-small', includeOption)
}

export function useIsPhone(includeOption?: 'bigger' | 'smaller'): boolean {
  return isScreenMode(useScreenMode(), 'phone', includeOption)
}
