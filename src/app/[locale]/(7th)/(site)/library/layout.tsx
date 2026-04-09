'use client'

import { useLoadedAchieveLevelBooks } from '@/7th/_client/store/achieve/level-books/selector'
import { useLoadedStudentDailyLearning } from '@/7th/_client/store/student/daily-learning/selector'
import { useStudentInfoFlagLogin } from '@/7th/_client/store/student/info/selector'
import { useScreenMode } from '@/7th/_ui/context/StyleContext'
import BookSearchBar from '@/7th/_ui/modules/library-book-search-bar/BookSearchBar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const isPC = useScreenMode() === 'pc'

  const isDailyLearningLoading = !useLoadedStudentDailyLearning()
  const isAchieveLevelLoading = !useLoadedAchieveLevelBooks()
  const [logoff, setLogoff] = useState<string>('')

  const loginStatus = useStudentInfoFlagLogin()

  useEffect(() => {
    if (logoff === 'go') {
      router.replace('/')
      setLogoff('redirect')
    }
  }, [logoff, router])

  if (loginStatus === 'off' && !logoff) {
    setLogoff('go')
    return <></>
  }

  if (isDailyLearningLoading || isAchieveLevelLoading) {
    return <></>
  }

  return (
    <div className="container compact">
      {isPC && <BookSearchBar />}
      {children}
    </div>
  )
}
