import { useCallback, useEffect, useRef, useState } from 'react'

export const BASE_TIME = 60 * 10
export function useCountDown({
  timeset,
  autoStart = false,
  format = 'mm:ss',
}: {
  timeset: number
  autoStart?: boolean
  format?: 'mm:ss' | 's'
}) {
  const [on, setOn] = useState(autoStart)
  const [timeDelta, setTimeDelta] = useState(0)
  const refTimeMemo = useRef<number>(Date.now())

  useEffect(() => {
    let id: NodeJS.Timeout | undefined
    if (on) {
      refTimeMemo.current = Date.now()
      id = setInterval(() => {
        const nowTime = Date.now()
        const timeDelta = Math.floor((nowTime - refTimeMemo.current) / 1000)
        setTimeDelta(timeDelta)
        if (timeDelta >= timeset) {
          setOn(false)
        }
      }, 1000)
    }
    return () => {
      if (id) {
        clearInterval(id)
      }
    }
  }, [on, timeset])

  const stop = useCallback(() => {
    setOn(false)
  }, [setOn])

  const start = useCallback(() => {
    setOn(true)
  }, [setOn])

  const reset = useCallback(() => {
    refTimeMemo.current = Date.now()
    setTimeDelta(0)
    setOn(true)
  }, [setOn])

  const currentTime = timeset - timeDelta

  let timeText = currentTime.toString()
  if (format === 'mm:ss') {
    const minute = Math.floor(currentTime / 60)
    const second = currentTime % 60
    timeText = `${minute > 9 ? minute : `0${minute}`}:${second > 9 ? second : `0${second}`}`
  }

  return {
    currentTime,
    timeText,
    stop,
    start,
    reset,
  }
}
