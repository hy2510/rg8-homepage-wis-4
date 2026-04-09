'use client'

import {
  useFetchLibraryWorkbook,
  useOnLoadLibraryWorkbook,
} from '@/7th/_client/store/library/workbook/hook'
import { useLibraryWorkbook } from '@/7th/_client/store/library/workbook/selector'
import { useSelectStudyLevel } from '@/7th/_client/store/student/daily-learning/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { openDownloadLink } from '@/7th/_function/open-window'
import PaginationBar from '@/7th/_ui/common/PaginationBar'
import {
  BackLink,
  Dropdown,
  DropdownItem,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import VocaPrintOptions from '@/7th/_ui/modules/library-book-cover/VocaPrintOptions'
import { BookCover } from '@/7th/_ui/modules/library-book-cover/book-cover'
import { BookList } from '@/7th/_ui/modules/library-find-book-list/book-list'
import StudyLevelBox from '@/7th/_ui/modules/library-find-study-level-selector/StudyLevelBox'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import StudentHistorySelectModal from '../_cpnt/StudentHistorySelectModal'
import useExport, { useSupportExportActionSearch } from '../_fn/use-export'

const STYLE_ID = 'page_e_book'

const WORKBOOK_LEVEL_LIST = [
  {
    level: 'PK',
    count: 20,
  },
  {
    level: 'KA',
    count: 10,
  },
  {
    level: 'KB',
    count: 10,
  },
  {
    level: 'KC',
    count: 10,
  },
  {
    level: '1A',
    count: 10,
  },
  {
    level: '1B',
    count: 10,
  },
  {
    level: '1C',
    count: 10,
  },
  {
    level: '2A',
    count: 10,
  },
  {
    level: '2B',
    count: 10,
  },
  {
    level: '2C',
    count: 10,
  },
]

export default function Page() {
  const { studyOpen } = useSiteBlueprint()
  const settingLevel = useSelectStudyLevel()

  let levelFinder = ''
  let volumeFinder = 1
  if (!levelFinder && settingLevel) {
    const containFilter = WORKBOOK_LEVEL_LIST.filter(
      (item) => item.level === settingLevel,
    )
    if (containFilter.length === 1) {
      if (containFilter[0].level !== 'PK' || studyOpen.PreK) {
        levelFinder = containFilter[0].level
        volumeFinder = 1
      }
    }
  }
  if (!levelFinder) {
    if (studyOpen.PreK) {
      levelFinder = WORKBOOK_LEVEL_LIST[0].level
    } else {
      levelFinder = WORKBOOK_LEVEL_LIST[1].level
    }
    volumeFinder = 1
  }

  const level = levelFinder
  const volume = volumeFinder || 1
  const levelList = WORKBOOK_LEVEL_LIST.filter(
    (item) => item.level !== 'PK' || (item.level === 'PK' && studyOpen.PreK),
  )

  const { loading } = useOnLoadLibraryWorkbook({
    level,
    volume,
  })
  if (loading) {
    return <LoadingScreen />
  }
  return <EBookLayout levelList={levelList} />
}

function EBookLayout({
  levelList,
}: {
  levelList: { level: string; count: number }[]
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  const { fetch } = useFetchLibraryWorkbook()
  const { option, payload: books } = useLibraryWorkbook()

  const mainClassName = style.ebook
  const backLink = SITE_PATH.LIBRARY.HOME
  const title = 'Workbook'
  const level = option.level

  const currentItem = levelList.filter((item) => item.level === level)[0]
  const levels = levelList.map((item) => item.level)
  const volumes = Array.from({ length: currentItem.count }, (_, i) => i + 1)

  const updateBook = (
    isSelectModeClose: boolean,
    params: {
      level?: string
      volume?: number
      page?: number
    },
  ) => {
    if (isSelectModeClose) {
      setSelectMode(false)
    }
    fetch(params)
  }

  const onChangeLevel = (level: string) => {
    updateBook(true, { level })
  }

  const onChangeVolume = (volume: number) => {
    updateBook(true, { volume })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const totalCount = books.page.totalRecords
  const onPageClick = (page: number) => {
    updateBook(false, { page })
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Dropdown title={option.level}>
            {levels.map((level) => {
              return (
                <DropdownItem
                  key={level}
                  onClick={() => {
                    onChangeLevel(level)
                  }}>
                  {level}
                </DropdownItem>
              )
            })}
          </Dropdown>
          <Dropdown title={`${option.volume}`}>
            {volumes.map((i) => {
              return (
                <DropdownItem
                  key={`step_${i}`}
                  onClick={() => onChangeVolume(i)}>
                  {i}
                </DropdownItem>
              )
            })}
          </Dropdown>
        </div>
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
