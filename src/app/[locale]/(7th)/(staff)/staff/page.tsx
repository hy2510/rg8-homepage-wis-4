'use client'

import { STAFF_PATH } from '@/app/site-path'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const searchParams = useSearchParams()
  const open = searchParams.get('open')
  const router = useRouter()

  useEffect(() => {
    if (!open) {
      router.replace(STAFF_PATH.NOTICE.MAIN)
    }
  }, [open, router])
}
