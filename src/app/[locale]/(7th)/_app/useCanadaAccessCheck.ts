'use client'

import { useEffect, useState } from 'react'

export const revalidate = 0

export default function useCanadaAccessCheck(applicationType: string) {
  const [isChecked, setChecked] = useState<'ready' | 'loading' | 'finish'>(
    'ready',
  )
  const [state, setState] = useState<boolean | null>(null)

  useEffect(() => {
    if (applicationType === 'private' && isChecked === 'ready') {
      setChecked('loading')
      requestCheckLocation().then((data) => {
        setState(data)
        setChecked('finish')
        if (data === true && window && window.location) {
          window.location.href = 'https://canada.readinggate.com/'
        }
      })
    }
  }, [applicationType, isChecked])

  return state
}

async function requestCheckLocation(): Promise<boolean | null> {
  const RETRY_COUNT = 4

  const fetching = async (): Promise<boolean | null> => {
    const REQUEST_TIMEOUT = 15000 // 15초

    const controller = new AbortController()
    const signal = controller.signal
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, REQUEST_TIMEOUT)

    try {
      const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace', {
        signal,
      })
      clearTimeout(timeoutId)
      if (response.ok) {
        const value = await response.text()
        return value.indexOf('loc=CA') >= 0
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  let retry = 0
  let isFinish = false
  let result: boolean | null = null
  do {
    retry++
    result = await fetching()
    if (result !== null || (result === null && retry >= RETRY_COUNT)) {
      isFinish = true
    }
  } while (!isFinish)

  return result
}
