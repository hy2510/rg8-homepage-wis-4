'use client'

import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { openDownloadLink } from '@/7th/_function/open-window'
import { SearchBookResponse } from '@/7th/_repository/client/library/search/search-book'
import PaginationBar from '@/7th/_ui/common/PaginationBar'
import { BackLink } from '@/7th/_ui/common/common-components'
import VocaPrintOptions from '@/7th/_ui/modules/library-book-cover/VocaPrintOptions'
import { BookCover } from '@/7th/_ui/modules/library-book-cover/book-cover'
import LevelSelector from '@/7th/_ui/modules/library-explore-level-selector/level-selector'
import { BookList } from '@/7th/_ui/modules/library-find-book-list/book-list'
import StudyLevelBox from '@/7th/_ui/modules/library-find-study-level-selector/StudyLevelBox'
import StudyLevelTitle from '@/7th/_ui/modules/library-find-study-level-selector/StudyLevelTitle'
import { LibraryFindTop } from '@/7th/_ui/modules/library-find-top/library-find-top'
import LibrarySearchFilter, {
  LibraryFilterOption,
} from '@/7th/_ui/modules/library-set-fliter/LibrarySearchFilter'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useExport, { useSupportExportActionSearch } from '../_fn/use-export'
import StudentHistorySelectModal from './StudentHistorySelectModal'

export function SearchLevelBookListTemplate({
  mainClassName,
  backLink,
  title,
  bookType,
  level,
  levelList,
  filter,
  books,
  onSearchOptionChanged,
}: {
  mainClassName: string
  backLink: string
  title: string
  bookType: 'EB' | 'PB'
  level: string
  levelList: {
    totalBooks: number
    completedBooks: number
    levelName: string
  }[]
  filter: {
    sort: string
    status: string
    genre: string
    mode?: string
  }
  books: SearchBookResponse
  onSearchOptionChanged?: (params: {
    level?: string
    page?: number
    sort?: string
    genre?: string
    status?: string
    mode?: 'full' | 'easy'
  }) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const { target } = useSiteBlueprint()

  const updateBook = (
    isSelectModeClose: boolean,
    params: {
      level?: string
      page?: number
      sort?: string
      genre?: string
      status?: string
      mode?: 'full' | 'easy'
    },
  ) => {
    if (isSelectModeClose) {
      setSelectMode(false)
    }
    onSearchOptionChanged && onSearchOptionChanged(params)
  }

  const [isShowLevelSelector, setShowLevelSelector] = useState(false)

  const bookFilter = [
    {
      group: 'status',
      title: t('t344'),
      option: [
        {
          id: 'All',
          label: t('t345'),
          enabled: filter.status === 'All',
        },
        {
          id: 'Before',
          label: t('t346'),
          enabled: filter.status === 'Before',
        },
        {
          id: 'Complete',
          label: t('t347'),
          enabled: filter.status === 'Complete',
        },
      ],
    },
    {
      group: 'sort',
      title: t('t348'),
      option: [
        { id: 'Round', label: t('t356'), enabled: filter.sort === 'Round' },
        {
          id: 'Preference',
          label: t('t349'),
          enabled: filter.sort === 'Preference',
        },
        {
          id: 'ReadCount',
          label: t('t350'),
          enabled: filter.sort === 'ReadCount',
        },
        {
          id: 'RegistDate',
          label: t('t351'),
          enabled: filter.sort === 'RegistDate',
        },
        {
          id: 'RgPoint',
          label: t('t352'),
          enabled: filter.sort === 'RgPoint',
        },
      ],
    },
    {
      group: 'genre',
      title: t('t353'),
      option: [
        { id: 'All', label: t('t354'), enabled: filter.genre === 'All' },
        {
          id: 'Fiction',
          label: 'Fiction',
          enabled: filter.genre === 'Fiction',
        },
        {
          id: 'Nonfiction',
          label: 'Non-Fiction',
          enabled: filter.genre === 'Nonfiction',
        },
      ],
    },
  ]
  if (level && level.length > 1 && !target.academy) {
    const firstLv = Number(level.substring(0, 1))
    if (!isNaN(firstLv) && firstLv >= 2) {
      bookFilter[0].option.forEach((opt) => {
        if (opt.id === 'All') {
          opt.enabled = filter.status === 'All' && !filter.mode
        } else if (opt.id === 'Before') {
          opt.enabled = filter.status === 'Before' && !filter.mode
        } else if (opt.id === 'Complete') {
          opt.enabled = filter.status === 'Complete' && !filter.mode
        }
      })
      bookFilter[0].option.push({
        id: 'full',
        label: t('t530'),
        enabled: filter.mode === 'full',
      })
      bookFilter[0].option.push({
        id: 'easy',
        label: t('t531'),
        enabled: filter.mode === 'easy',
      })
    }
  }

  const onFilterChanged = (filterOption: LibraryFilterOption[]) => {
    const findOptionId = (group: LibraryFilterOption) => {
      let value: string | undefined = undefined
      const option = group.option.filter((opt) => opt.enabled)
      if (option.length > 0) {
        value = option[0].id
      }
      return value
    }
    let sort: string | undefined = undefined
    let genre: string | undefined = undefined
    let status: string | undefined = undefined
    let mode: 'full' | 'easy' | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
        if (status === 'full' || status === 'easy') {
          mode = status
          status = filter.status
        }
      } else if (group.group === 'genre') {
        genre = findOptionId(group)
      } else if (group.group === 'sort') {
        sort = findOptionId(group)
      }
    })
    updateBook(true, { page: 1, sort, genre, status, mode })
  }

  const onChangeLevel = (level: string) => {
    updateBook(true, { level, mode: undefined })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const totalCount = books.page.totalRecords
  const onPageClick = (page: number) => {
    const mode = filter.mode as 'full' | 'easy' | undefined
    updateBook(false, { page, mode })
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  const {
    isSelectMode,
    setSelectMode,
    selectedItemCount,
    isSelectedItem,
    setItemSelectedChange,
    onExportAction,
    isSelectStudentHistory,
    targetStudentHistoryList,
    targetStudentHistoryId,
    onSelectStudentHistory,
    isSettingVocabularyOption,
    onVocabularyOption,
    onExportCancel,
  } = useExport()

  const supportExportAction = useSupportExportActionSearch()

  const downloadExcelUrl = totalCount > 0 ? books.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      openDownloadLink(downloadExcelUrl)
    }
  }

  return (
    <main className={mainClassName}>
      <BackLink href={backLink} largeFont>
        {title}
      </BackLink>
      <StudyLevelBox>
        <StudyLevelTitle
          level={level}
          onClick={() => {
            setShowLevelSelector(true)
          }}
        />
        <LibrarySearchFilter
          optionList={bookFilter}
          onOptionChange={onFilterChanged}
        />
        {isShowLevelSelector && (
          <LevelSelector
            _viewLevelSelector={setShowLevelSelector}
            bookType={bookType}
            level={level}
            ebLevelList={levelList}
            pbLevelList={levelList}
            onLevelClick={({ level }) => {
              onChangeLevel(level)
              setShowLevelSelector(false)
            }}
          />
        )}
      </StudyLevelBox>
      <BookList
        count={totalCount}
        isExportMode={isSelectMode}
        toggleExportMode={() => {
          setSelectMode(!isSelectMode)
        }}
        supportExportAction={supportExportAction}
        exportCount={selectedItemCount}
        onExportClick={onExportAction}
        onDownloadClick={
          downloadExcelUrl ? onBookListExcelDownload : undefined
        }>
        {books.book.map((book, i) => {
          const earnPoint = book.getableRgPoint
          const bookCode = book.levelName

          const isExportChecked = isSelectedItem(book.levelRoundId)

          return (
            <BookCover
              key={`book-cover-${i}-${book.surfaceImagePath}`}
              id={book.levelRoundId}
              target={`library`}
              bookImgSrc={book.surfaceImagePath}
              bookCode={bookCode}
              earnPoint={earnPoint}
              title={book.topicTitle}
              author={book.author}
              isBookInfo={bookInfo === book.levelRoundId}
              passedCount={book.rgPointCount}
              isMovieBook={!!book.animationPath}
              isAssignedTodo={!book.addYn}
              onClickBookDetail={() => {
                setBookInfo(bookInfo ? undefined : book.levelRoundId)
              }}
              levelRoundId={book.levelRoundId}
              isExportMode={isSelectMode}
              isExportChecked={isExportChecked}
              onExportCheckedChange={setItemSelectedChange}
              grade={book.recommendedAge}
            />
          )
        })}
      </BookList>
      <PaginationBar
        page={currentPage}
        maxPage={maxPage}
        onPageClick={onPageClick}
      />
      {isSelectStudentHistory && (
        <StudentHistorySelectModal
          studentHistoryList={targetStudentHistoryList}
          defaultStudentHistoryId={targetStudentHistoryId}
          onCloseModal={onExportCancel}
          onSelectStudentHistoryId={onSelectStudentHistory}
        />
      )}
      {isSettingVocabularyOption && (
        <VocaPrintOptions
          visibleType="modal"
          onClick={(option) => {
            onVocabularyOption(option)
          }}
          onCancel={() => {
            onExportCancel()
          }}
        />
      )}
    </main>
  )
}

export function SearchThemeSeriesBookListTemplate({
  mainClassName,
  headerClassName,
  backLink,
  title,
  subject,
  bookType,
  filter,
  books,
  onSearchOptionChanged,
}: {
  mainClassName: string
  headerClassName: string
  backLink: string
  title: string
  subject: string
  bookType: 'EB' | 'PB'
  filter: {
    sort: string
    status: string
    genre: string
  }
  books: SearchBookResponse
  onSearchOptionChanged?: (params: {
    level?: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  }) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const updateBook = (
    isSelectModeClose: boolean,
    params: {
      level?: string
      page?: number
      sort?: string
      genre?: string
      status?: string
    },
  ) => {
    if (isSelectModeClose) {
      setSelectMode(false)
    }
    onSearchOptionChanged && onSearchOptionChanged(params)
  }

  const [isShowLevelSelector, setShowLevelSelector] = useState(false)

  const bookFilter = [
    {
      group: 'status',
      title: t('t344'),
      option: [
        { id: 'All', label: t('t345'), enabled: filter.status === 'All' },
        {
          id: 'Before',
          label: t('t346'),
          enabled: filter.status === 'Before',
        },
        {
          id: 'Complete',
          label: t('t347'),
          enabled: filter.status === 'Complete',
        },
      ],
    },
    // {
    //   group: 'd2',
    //   title: t('t528'),
    //   option: [
    //     { id: '11', label: t('t529'), enabled: false },
    //     { id: '21', label: t('t530'), enabled: false },
    //     { id: '31', label: t('t531'), enabled: false },
    //   ],
    // },
    {
      group: 'sort',
      title: t('t348'),
      option: [
        { id: 'Round', label: t('t356'), enabled: filter.sort === 'Round' },
        {
          id: 'Preference',
          label: t('t349'),
          enabled: filter.sort === 'Preference',
        },
        {
          id: 'ReadCount',
          label: t('t350'),
          enabled: filter.sort === 'ReadCount',
        },
        {
          id: 'RegistDate',
          label: t('t351'),
          enabled: filter.sort === 'RegistDate',
        },
        {
          id: 'RgPoint',
          label: t('t352'),
          enabled: filter.sort === 'RgPoint',
        },
      ],
    },
    {
      group: 'genre',
      title: t('t353'),
      option: [
        { id: 'All', label: t('t354'), enabled: filter.genre === 'All' },
        {
          id: 'Fiction',
          label: 'Fiction',
          enabled: filter.genre === 'Fiction',
        },
        {
          id: 'Nonfiction',
          label: 'Non-Fiction',
          enabled: filter.genre === 'Nonfiction',
        },
      ],
    },
  ]

  const onFilterChanged = (filterOption: LibraryFilterOption[]) => {
    const findOptionId = (group: LibraryFilterOption) => {
      let value: string | undefined = undefined
      const option = group.option.filter((opt) => opt.enabled)
      if (option.length > 0) {
        value = option[0].id
      }
      return value
    }
    let sort: string | undefined = undefined
    let genre: string | undefined = undefined
    let status: string | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
      } else if (group.group === 'genre') {
        genre = findOptionId(group)
      } else if (group.group === 'sort') {
        sort = findOptionId(group)
      }
    })
    updateBook(true, { page: 1, sort, genre, status })
  }

  const onChangeLevel = (level: string) => {
    updateBook(true, { level })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const totalCount = books.page.totalRecords
  const onPageClick = (page: number) => {
    updateBook(false, { page: page })
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  const {
    isSelectMode,
    setSelectMode,
    selectedItemCount,
    isSelectedItem,
    setItemSelectedChange,
    onExportAction,
    isSelectStudentHistory,
    targetStudentHistoryList,
    targetStudentHistoryId,
    onSelectStudentHistory,
    isSettingVocabularyOption,
    onVocabularyOption,
    onExportCancel,
  } = useExport()

  const supportExportAction = useSupportExportActionSearch()

  const downloadExcelUrl = totalCount > 0 ? books.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      openDownloadLink(downloadExcelUrl)
    }
  }
  const isAvailableBackLink = !!backLink

  return (
    <main className={mainClassName}>
      <div className={headerClassName}>
        <BackLink
          href={isAvailableBackLink ? backLink : ''}
          onClick={
            isAvailableBackLink
              ? undefined
              : () => {
                  router.back()
                }
          }
          largeFont>
          {title}
        </BackLink>
        <LibrarySearchFilter
          optionList={bookFilter}
          onOptionChange={onFilterChanged}
        />
      </div>
      <LibraryFindTop title={subject} />
      <BookList
        count={totalCount}
        isExportMode={isSelectMode}
        toggleExportMode={() => {
          setSelectMode(!isSelectMode)
        }}
        supportExportAction={supportExportAction}
        exportCount={selectedItemCount}
        onExportClick={onExportAction}
        onDownloadClick={
          downloadExcelUrl ? onBookListExcelDownload : undefined
        }>
        {books.book.map((book, i) => {
          const earnPoint = book.getableRgPoint
          const bookCode = book.levelName

          const isExportChecked = isSelectedItem(book.levelRoundId)

          return (
            <BookCover
              key={`book-cover-${i}-${book.surfaceImagePath}`}
              id={book.levelRoundId}
              target={`library`}
              bookImgSrc={book.surfaceImagePath}
              bookCode={bookCode}
              earnPoint={earnPoint}
              title={book.topicTitle}
              author={book.author}
              isBookInfo={bookInfo === book.levelRoundId}
              passedCount={book.rgPointCount}
              isMovieBook={!!book.animationPath}
              isAssignedTodo={!book.addYn}
              onClickBookDetail={() => {
                setBookInfo(bookInfo ? undefined : book.levelRoundId)
              }}
              levelRoundId={book.levelRoundId}
              isExportMode={isSelectMode}
              isExportChecked={isExportChecked}
              onExportCheckedChange={setItemSelectedChange}
              grade={book.recommendedAge}
            />
          )
        })}
      </BookList>
      <PaginationBar
        page={currentPage}
        maxPage={maxPage}
        onPageClick={onPageClick}
      />
      {isSelectStudentHistory && (
        <StudentHistorySelectModal
          studentHistoryList={targetStudentHistoryList}
          defaultStudentHistoryId={targetStudentHistoryId}
          onCloseModal={onExportCancel}
          onSelectStudentHistoryId={onSelectStudentHistory}
        />
      )}
      {isSettingVocabularyOption && (
        <VocaPrintOptions
          visibleType="modal"
          onClick={(option) => {
            onVocabularyOption(option)
          }}
          onCancel={() => {
            onExportCancel()
          }}
        />
      )}
    </main>
  )
}
