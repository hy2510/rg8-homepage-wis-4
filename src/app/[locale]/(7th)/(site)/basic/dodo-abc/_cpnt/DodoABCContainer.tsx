'use client'

import { useAchieveLevelBooks } from '@/7th/_client/store/achieve/level-books/selector'
import { useFetchLibraryLevelDodoAbc } from '@/7th/_client/store/library/dodo-abc/hook'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import DodoABCLayout from './DodoABCLayout'

const StudyKeys = [
  '(Alphabet)',
  '(Phonics 1)',
  '(Phonics 2)',
  '(Sight Words 1)',
  '(Sight Words 2)',
]
const StudyActivity = [
  'Study-Alphabet',
  'Study-Phonics-1',
  'Study-Phonics-2',
  'Study-Sight-Words-1',
  'Study-Sight-Words-2',
]

const SongKeys = [
  '(Song & Chant > Alphabet Chant)',
  '(Song & Chant > Phonics Chant)',
  '(Song & Chant > Nursery Rhyme)',
]
const SongActivity = [
  'Song-Alphabet-Chant',
  'Song-Phonics-Chant',
  'Song-Nursery-Rhyme',
]

const GameKeys = [
  '(Game > Alphabet)',
  '(Game > Phonics)',
  '(Game > Sight Words 1)',
  '(Game > Sight Words 2)',
]
const GameActivity = [
  'Game-Alphabet',
  'Game-Phonics',
  'Game-Sight-Words-1',
  'Game-Sight-Words-2',
]

export type DodoABCType = 'Study' | 'Song' | 'Game'
export type StudyProgressInfo = {
  activityName: string
  books: number
  completedBooks: number
  totalBooks: number
}

export default function DodoABCContainer({
  activity: defaultActivity,
}: {
  activity: string
}) {
  const router = useRouter()
  const replaceActivity = useCallback(
    (activityName: string) => {
      router.replace(`${SITE_PATH.BASIC.DODO_ABC}?activity=${activityName}`)
    },
    [router],
  )
  const { DodoABC: isDodoABCOpen } = useSiteBlueprint().studyOpen

  const activityDataRef = useRef<string>('')
  const { loading: fetchLoading, fetch: updateBook } =
    useFetchLibraryLevelDodoAbc()
  const levelBooks = useAchieveLevelBooks().payload.DodoABC

  const { studyProgress, gameProgress, songProgress } = useMemo(() => {
    const getProgress = (type: DodoABCType): StudyProgressInfo[] => {
      let targetKeys: string[]
      let targetActivitys: string[]
      if (type === 'Game') {
        targetKeys = GameKeys
        targetActivitys = GameActivity
      } else if (type === 'Song') {
        targetKeys = SongKeys
        targetActivitys = SongActivity
      } else {
        targetKeys = StudyKeys
        targetActivitys = StudyActivity
      }
      const progress: StudyProgressInfo[] = []
      for (let j = 0; j < targetKeys.length; j++) {
        const key = targetKeys[j]
        for (let i = 0; i < levelBooks.length; i++) {
          if (levelBooks[i].levelName.indexOf(key) > 0) {
            progress.push({
              activityName: targetActivitys[j],
              ...levelBooks[i],
            })
            break
          }
        }
      }
      return progress
    }
    const studyProgress = getProgress('Study')
    const gameProgress = getProgress('Game')
    const songProgress = getProgress('Song')

    return {
      studyProgress,
      gameProgress,
      songProgress,
    }
  }, [levelBooks])

  const studyType = useMemo(() => {
    if (defaultActivity === '') {
      return 'Study'
    }
    let targetType: DodoABCType = 'Study'
    if (StudyActivity.find((activity) => activity === defaultActivity)) {
      targetType = 'Study'
    } else if (SongActivity.find((activity) => activity === defaultActivity)) {
      targetType = 'Song'
    } else if (GameActivity.find((activity) => activity === defaultActivity)) {
      targetType = 'Game'
    }
    return targetType
  }, [defaultActivity])

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
        targetActivity = 'Study-Alphabet'
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

  if (!isDodoABCOpen) {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    )
  }

  const onChangeStudyType = (newStudyType: DodoABCType) => {
    if (newStudyType === 'Study') {
      const activity = StudyActivity.find(
        (activity) => activity === defaultActivity,
      )
      replaceActivity(activity || StudyActivity[0])
    } else if (newStudyType === 'Song') {
      const activity = SongActivity.find(
        (activity) => activity === defaultActivity,
      )
      replaceActivity(activity || SongActivity[0])
    } else if (newStudyType === 'Game') {
      const activity = GameActivity.find(
        (activity) => activity === defaultActivity,
      )
      replaceActivity(activity || GameActivity[0])
    }
  }

  const onChangeActivity = (activity: string) => {
    replaceActivity(activity)
  }

  let progress: StudyProgressInfo[] = []
  if (studyType === 'Study') {
    progress = studyProgress
  } else if (studyType === 'Song') {
    progress = songProgress
  } else if (studyType === 'Game') {
    progress = gameProgress
  }

  return (
    <DodoABCLayout
      loading={fetchLoading}
      studyType={studyType}
      startActivity={defaultActivity}
      progress={progress}
      onChangeStudyType={onChangeStudyType}
      onChangeActivity={onChangeActivity}
    />
  )
}
