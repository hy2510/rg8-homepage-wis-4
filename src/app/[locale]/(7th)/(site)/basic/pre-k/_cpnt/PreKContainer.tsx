'use client'

import { useAchieveLevelBooks } from '@/7th/_client/store/achieve/level-books/selector'
import { useFetchLibraryLevelPreK } from '@/7th/_client/store/library/pre-k/hook'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import PreKLayout from './PreKLayout'

const StudyKeys = [
  'PK(AlphabetLand)',
  'PK(PhonicsLand)',
  'PK(WordLand)',
  'PK(StoryLand)',
]
const StudyActivity = ['Alphabet', 'Phonics', 'Word', 'Story']
export type StudyProgressInfo = {
  activityName: string
  books: number
  completedBooks: number
  totalBooks: number
}

export default function PreKContainer({
  activity: defaultActivity,
}: {
  activity: string
}) {
  const router = useRouter()
  const replaceActivity = useCallback(
    (activityName: string) => {
      router.replace(`${SITE_PATH.BASIC.PRE_K}?activity=${activityName}`)
    },
    [router],
  )
  const { PreK: isPreKOpen } = useSiteBlueprint().studyOpen

  const activityDataRef = useRef<string>('')
  const { loading: fetchLoading, fetch: updateBook } =
    useFetchLibraryLevelPreK()
  const levelBooks = useAchieveLevelBooks().payload.PreK

  const studyProgress = useMemo(() => {
    const progress: StudyProgressInfo[] = []
    for (let j = 0; j < StudyKeys.length; j++) {
      const key = StudyKeys[j]
      for (let i = 0; i < levelBooks.length; i++) {
        if (levelBooks[i].levelName === key) {
          progress.push({
            activityName: StudyActivity[j],
            ...levelBooks[i],
          })
          break
        }
      }
    }
    return progress
  }, [levelBooks])

  // defaultActivity가 없을 경우 기본값으로 리다이렉트
  useEffect(() => {
    if (defaultActivity === '') {
      let targetActivity: string = ''
      for (let i = 0; i < studyProgress.length; i++) {
        const prog = studyProgress[i]
        targetActivity = prog.activityName
        if (prog.totalBooks > prog.completedBooks) {
          break
        }
      }
      if (targetActivity === '') {
        targetActivity = 'Alphabet'
      }
      replaceActivity(targetActivity)
      return
    }
    // 유효한 활동이 있으면 시작 활동으로 설정
  }, [defaultActivity, replaceActivity, studyProgress, router])

  // 활동 변경 시 책 목록 업데이트
  useEffect(() => {
    if (defaultActivity && defaultActivity !== activityDataRef.current) {
      updateBook({
        activity: defaultActivity,
        isInit: activityDataRef.current === '',
      })
      activityDataRef.current = defaultActivity
    }
  }, [defaultActivity])

  // defaultActivity가 비어있으면 로딩 상태 표시
  if (defaultActivity === '') {
    return <></>
  }

  if (!isPreKOpen) {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    )
  }

  const onChangeActivity = (activity: string) => {
    replaceActivity(activity)
  }

  return (
    <PreKLayout
      loading={fetchLoading}
      progress={studyProgress}
      startActivity={defaultActivity}
      onChangeActivity={onChangeActivity}
    />
  )
}
