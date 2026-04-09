'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useLatestContentUrl } from '../_cpnt/StaticBoardContext'

export default function Page() {
  const url = useLatestContentUrl()
  const router = useRouter()

  useEffect(() => {
    if (url) {
      router.replace(url)
    }
  }, [url])
  return <></>
}
