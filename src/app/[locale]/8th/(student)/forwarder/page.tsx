'use client'

import { useStudent } from '@/8th/features/student/service/student-query'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const student = useStudent()

  const screen = student.data?.student.startScreen

  useEffect(() => {
    if (screen) {
      let screenPath = ''
      if (screen === 'DailyRG') {
        screenPath = SITE_PATH.NW82.DAILY_RG
      } else if (screen === 'eBook') {
        screenPath = SITE_PATH.NW82.EB
      } else if (screen === 'pBook') {
        screenPath = SITE_PATH.NW82.PB
      } else if (screen === 'Todo') {
        screenPath = SITE_PATH.NW82.TODO
      } else {
        screenPath = SITE_PATH.NW82.DAILY_RG
      }
      router.replace(screenPath)
    }
  }, [screen, router])

  if (student.isLoading) {
    return null
  }
  if (student.error) {
    return <div>Error: {student.error.message}</div>
  }

  return null
}
