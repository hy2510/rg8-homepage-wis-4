'use client'

import { useAchieveLevelBooks } from '@/7th/_client/store/achieve/level-books/selector'
import { useLibraryEbPbFilter } from '@/7th/_client/store/library/filter/selector'
import { useLibraryHome } from '@/7th/_client/store/library/home/selector'
import {
  useFetchLibraryLevel,
  useOnLoadLibraryLevel,
} from '@/7th/_client/store/library/level/hook'
import { useLibraryLevel } from '@/7th/_client/store/library/level/selector'
import { useSelectStudyLevel } from '@/7th/_client/store/student/daily-learning/selector'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import SITE_PATH from '@/app/site-path'
import { SearchLevelBookListTemplate } from '../_cpnt/SearchBookListTemplate'

const STYLE_ID = 'page_p_book_quiz'

export default function Page() {
  const home = useLibraryHome()
  const settingLevel = useSelectStudyLevel()

  let levelFinder = undefined
  if (
    home.level &&
    home.level !== 'PK' &&
    home.level !== 'KA' &&
    home.level !== 'KB'
  ) {
    levelFinder = home.level
  }
  if (!levelFinder && settingLevel) {
    if (
      settingLevel !== 'PK' &&
      settingLevel !== 'KA' &&
      settingLevel !== 'KB'
    ) {
      levelFinder = settingLevel
    }
  }

  const level = levelFinder || 'KC'
  const bookType = 'PB'
  const { sort, status, genre } = useLibraryEbPbFilter('PB')

  const { loading } = useOnLoadLibraryLevel({
    level,
    bookType,
    sort,
    genre,
    status,
  })
  if (loading) {
    return <LoadingScreen />
  }
  return <PBookLayout />
}

function PBookLayout() {
  const style = useStyle(STYLE_ID)

  const BookType = 'PB'

  const { fetch } = useFetchLibraryLevel()
  const { option, payload: books } = useLibraryLevel()

  const mainClassName = style.pbook_quiz
  const backLink = SITE_PATH.LIBRARY.HOME
  const title = 'pBook Quiz'
  const filter = useLibraryEbPbFilter(BookType)
  const levelBooks = useAchieveLevelBooks().payload[BookType]
  const level = option.level

  const updateBook = (params: {
    level?: string
    page?: number
    sort?: string
    genre?: string
    status?: string
    mode?: 'full' | 'easy'
  }) => {
    fetch(params)
  }

  return (
    <SearchLevelBookListTemplate
      mainClassName={mainClassName}
      backLink={backLink}
      title={title}
      bookType={BookType}
      level={level}
      levelList={levelBooks}
      filter={filter}
      books={books}
      onSearchOptionChanged={updateBook}
    />
  )
}
