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

const STYLE_ID = 'page_e_book'

export default function Page() {
  const home = useLibraryHome()
  const settingLevel = useSelectStudyLevel()

  let levelFinder = undefined
  if (home.level && home.level !== 'PK' && home.level !== '6C') {
    levelFinder = home.level
  } else if (home.level === '6C') {
    levelFinder = '6B'
  }
  if (!levelFinder && settingLevel) {
    if (settingLevel !== 'PK' && settingLevel !== '6C') {
      levelFinder = settingLevel
    } else if (settingLevel === '6C') {
      levelFinder = '6B'
    }
  }

  const level = levelFinder || 'KA'
  const bookType = 'EB'
  const { sort, status, genre } = useLibraryEbPbFilter('EB')

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
  return <EBookLayout />
}

/*
  level;  
    level,
    page,
    sort, = Round Preference ReadCount RgPoint RegistDate
    status, = All Before Complete
    genre = All Fiction NonFiction
  movie;
    level,
    page,
    sort, = Round Preference ReadCount RgPoint RegistDate
    status, = All Before Complete
    genre = All Fiction NonFiction
  series; theme;
    bookType,
    level,
    keyword, = Theme, Series Code
    page,
    sort, = Round Preference ReadCount RgPoint RegistDate
    status, = All Before Complete
    genre = All Fiction NonFiction
  try-again;
    page
  favorite;
    page,
    status = All Before Complete
  */

function EBookLayout() {
  const style = useStyle(STYLE_ID)

  const BookType = 'EB'

  const { fetch } = useFetchLibraryLevel()
  const { option, payload: books } = useLibraryLevel()

  const mainClassName = style.ebook
  const backLink = SITE_PATH.LIBRARY.HOME
  const title = 'eBook'
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
