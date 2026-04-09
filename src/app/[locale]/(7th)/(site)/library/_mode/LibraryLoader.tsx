import { useLibraryEbPbFilter } from '@/7th/_client/store/library/filter/selector'
import { useOnLoadLibraryHome } from '@/7th/_client/store/library/home/hook'
import {
  useLibraryHome,
  useLibraryHomeAction,
} from '@/7th/_client/store/library/home/selector'
import { useSelectStudyLevel } from '@/7th/_client/store/student/daily-learning/selector'
import { useStudentInfo } from '@/7th/_client/store/student/info/selector'
import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/7th/_context/CustomerContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import { getStudentLocalConfig } from '@/8th/features/student/model/student-local-config'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import BookReadingMode from './BookReadingMode'
import DodoABCMode from './DodoABCMode'
import LevelSelectMode from './LevelSelectMode'
import PreKMode from './PreKMode'

export function LibraryLoader() {
  const router = useRouter()
  const libraryHome = useLibraryHome()
  const mode = libraryHome.mode
  const { updateMode } = useLibraryHomeAction()
  const { studyOpen } = useSiteBlueprint()
  const { customerId } = useCustomerInfo()
  const { studentId } = useStudentInfo()

  const ebOption = useLibraryEbPbFilter('EB')
  const pbOption = useLibraryEbPbFilter('PB')

  const level = useSelectStudyLevel() || ''
  const [isShowLevelSelectMode, setShowLevelSelectMode] = useState(level === '')
  const bookType =
    (studyOpen.PB && level === '6C') || !studyOpen.EB ? 'PB' : 'EB'

  useEffect(() => {
    if (!mode && studentId && customerId) {
      const config = getStudentLocalConfig({
        studentId,
        customerId,
      })
      updateMode(config?.mode ? config.mode : 'level')
    }
  }, [mode, studentId, customerId, updateMode])

  const pkType = studyOpen.DodoABC ? 'Dodo' : 'PK'

  if (isShowLevelSelectMode) {
    return (
      <LevelSelectMode
        onSelectLevel={(level) => {
          if (level !== 'PK') {
            setShowLevelSelectMode(false)
          } else {
            router.replace(SITE_PATH.BASIC.HOME)
          }
        }}
      />
    )
  }

  const sort = bookType === 'EB' ? ebOption.sort : pbOption.sort
  const genre = bookType === 'EB' ? ebOption.genre : pbOption.genre
  const status = bookType === 'EB' ? ebOption.status : pbOption.status

  const libraryOption = {
    level,
    bookType,
    pkType: pkType as 'PK' | 'Dodo',
    sort,
    genre,
    status,
  }
  if (!studentId) {
    return <></>
  }
  if (level === 'PK') {
    // return <PreKLoading type={pkType} />
    libraryOption.level = bookType === 'EB' ? 'KA' : 'KC'
    return <BookReadingLoading option={libraryOption} />
  } else {
    return <BookReadingLoading option={libraryOption} />
  }
}

function PreKLoading({ type }: { type: 'Dodo' | 'PK' }) {
  const { loading, error } = useOnLoadLibraryHome({
    level: 'PK',
    pkType: type,
  })
  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Error . . . .</div>
  }
  if (type === 'Dodo') {
    return <DodoABCMode />
  } else {
    return <PreKMode />
  }
}

function BookReadingLoading({
  option,
}: {
  option: {
    level: string
    bookType: string
    pkType: 'PK' | 'Dodo'
    sort: string
    genre: string
    status: string
  }
}) {
  const newOption = { ...option }
  if (option.bookType === 'EB') {
    if (option.level === '6C') {
      newOption.level = '6B'
    }
  } else if (option.bookType === 'PB') {
    if (option.level === 'KA' || option.level === 'KB') {
      newOption.level = 'KC'
    }
  }
  const { loading, error } = useOnLoadLibraryHome(newOption)

  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Error . . . .</div>
  }

  return <BookReadingMode initLevel={newOption.level} />
}
