'use client'

import { useLevelBooks } from '@/8th/features/achieve/service/achieve-query'
import { useSearchBookMovie } from '@/8th/features/library/service/search-query'
import BookItem, {
  SkeletonBookItem,
} from '@/8th/features/library/ui/component/BookItem'
import ActionBar, {
  ActionBarDropdownItem,
} from '@/8th/features/library/ui/component/LibraryActionBar'
import BookInfoModal from '@/8th/features/library/ui/modal/BookInfoModal'
import PrintVocabularyModal from '@/8th/features/library/ui/modal/PrintVocabularyModal'
import SelectStudentHistoryModal from '@/8th/features/library/ui/modal/SelectStudentHistoryModal'
import {
  useStudent,
  useStudentHistoryList,
} from '@/8th/features/student/service/student-query'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import {
  ExportActionType,
  PickItemType,
  useExportItems,
  useSortItems,
  useStatusAndGenreItems,
} from '@/8th/shared/hook/useActionBarDropdownOption'
import {
  VocabularyOption,
  useExportPanelSearch,
} from '@/8th/shared/hook/useExportPanel'
import {
  BookListEmptyStateStyle,
  BookListStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { SelectBox } from '@/8th/shared/ui/Misc'
import Pagenation from '@/8th/shared/ui/Pagenation'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import { convertEBPBFilter } from '@/8th/shared/utils/convert'
import { openDownloadLink, openWindow } from '@/8th/shared/utils/open-window'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchMovieBookList({
  booktype,
  level,
}: {
  booktype: string
  level: string
}) {
  return (
    <LibraryBookListDependency
      booktype={booktype as 'EB' | 'PB'}
      level={level}
    />
  )
}

function LibraryBookListDependency({
  booktype,
  level,
}: {
  booktype: 'EB' | 'PB'
  level: string
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const student = useStudent()

  if (student.isLoading) {
    return <></>
  }

  const { status, genre, sort } = convertEBPBFilter(
    student.data?.student?.libraryStatusName || 'All',
    student.data?.student?.libraryGenreName || 'All',
    student.data?.student?.libraryFindSortName || 'Round',
  )

  return (
    <>
      <SubPageNavHeader
        title={t('t8th006')}
        parentPath={booktype === 'EB' ? SITE_PATH.NW82.EB : SITE_PATH.NW82.PB}
        libraryBookType={booktype}
      />
      <LibraryBookList
        bookType={booktype}
        level={level}
        initialOption={{ status, genre, sort }}
      />
    </>
  )
}

type SearchBookExportType =
  | 'none'
  | 'Vocabulary'
  | 'ToDo'
  | 'Favorite'
  | 'BookList'

function LibraryBookList({
  bookType,
  level,
  initialOption,
}: {
  bookType: 'EB' | 'PB'
  level: string
  initialOption: {
    status: string
    genre: string
    sort: string
  }
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const { setting } = useCustomerConfiguration()

  const router = useRouter()

  const [movieSearch, setMovieSearch] = useState<{
    bookType: 'EB' | 'PB'
    level: string
    status: string
    genre: string
    sort: string
    page: number
    mode?: string
  }>({
    bookType,
    level,
    status: initialOption.status,
    genre: initialOption.genre,
    sort: initialOption.sort,
    page: 1,
  })

  const search = useSearchBookMovie(movieSearch)
  const levels = useLevelBooks()
  const levelOptions =
    levels.data?.movie
      ?.filter((item) => !item.levelName.includes('PK'))
      .map((item) => ({ key: item.levelName, label: item.levelName })) || []

  const [exportMode, setExportMode] = useState<SearchBookExportType>('none')

  const [vocabularyOption, setVocabularyOption] = useState<boolean>(false)

  const {
    selectedItemCount,
    setSelectItemChange,
    resetSelectedItem,
    isSelectedItem,
    onActionAddTodo,
    onActionAddFavorite,
    onActionVocabulary,
    onActionBookList,
  } = useExportPanelSearch()

  const [bookInfo, setBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
      }
    | undefined
  >(undefined)

  const statusItems = useStatusAndGenreItems(
    movieSearch.status,
    movieSearch.genre,
  )
  const sortItems = useSortItems(movieSearch.sort)

  const student = useStudent()
  const studentHistory = useStudentHistoryList()
  const defaultStudentHistoryId =
    studentHistory.data?.list && studentHistory.data?.list.length > 0
      ? studentHistory.data.list[0].studentHistoryId
      : undefined
  const bookWizardStudentHistoryCount =
    studentHistory.data?.list?.filter((item) => item.isBookWizard).length || 0
  const defaultBookWizardStudentHistoryId =
    bookWizardStudentHistoryCount > 0
      ? studentHistory.data?.list?.filter((item) => item.isBookWizard)[0]
          .studentHistoryId
      : undefined
  const isBookWizard = bookWizardStudentHistoryCount > 0
  const [isSelectStudentHistory, setSelectStudentHistory] =
    useState<boolean>(false)

  const exportOption: {
    action: ExportActionType
    pick?: PickItemType[]
  } = {
    action: 'default',
    pick: [],
  }
  if (isBookWizard && setting.printVocabulary) {
    exportOption.action = 'default'
  } else {
    exportOption.action = 'exclude'
    const pick = exportOption.pick || []
    if (!isBookWizard) {
      pick.push('ToDo')
    }
    if (!setting.printVocabulary) {
      pick.push('Vocabulary')
    }
    exportOption.pick = pick
  }
  const exportItems = useExportItems(exportOption)

  if (studentHistory.isLoading) {
    return <div></div>
  }

  if (search.isLoading) {
    return (
      <BookListStyle>
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonBookItem key={`skeleton-${index}`} />
        ))}
      </BookListStyle>
    )
  }

  const isExportMode = exportMode !== 'none'
  const onChangeExportMode = (
    item: 'none' | 'Vocabulary' | 'ToDo' | 'Favorite' | 'BookList',
  ) => {
    setExportMode(item)
    if (item === 'none') {
      resetSelectedItem()
    }
  }
  const onConfirmVocabularyOption = (vocabularyOption: VocabularyOption) => {
    if (!defaultStudentHistoryId) {
      return
    }

    onActionVocabulary(
      {
        studentHistoryId: defaultStudentHistoryId,
        vocabularyOption,
      },
      (success, url, error) => {
        if (success) {
          onChangeExportMode('none')
          setVocabularyOption(false)
          openWindow(url, {
            external: true,
            target: '_blank',
            feature: 'noopener, noreferrer',
          })
        } else if (error) {
          alert(error)
        } else {
          onChangeExportMode('none')
          setVocabularyOption(false)
        }
      },
    )
  }
  const onConfirmExport = () => {
    if (selectedItemCount > 0 && defaultStudentHistoryId) {
      if (
        exportMode === 'ToDo' &&
        isBookWizard &&
        bookWizardStudentHistoryCount > 1
      ) {
        setSelectStudentHistory(true)
      } else {
        onConfirmExportWithStudentHistoryId(
          defaultBookWizardStudentHistoryId || defaultStudentHistoryId,
        )
      }
    }
  }
  const onConfirmExportWithStudentHistoryId = (studentHistoryId: string) => {
    if (selectedItemCount > 0) {
      if (exportMode === 'Vocabulary') {
        setVocabularyOption(true)
      } else if (exportMode === 'ToDo') {
        onActionAddTodo(studentHistoryId, (success, error) => {
          if (success) {
            alert(t('t8th010'))
            onChangeExportMode('none')
          } else if (error) {
            try {
              const errorPayload = JSON.parse((error as any).message) as {
                message: string
              }
              alert(errorPayload.message)
            } catch (e) {
              alert('도서 추가 실패 Error')
            }
          } else {
            onChangeExportMode('none')
          }
        })
      } else if (exportMode === 'Favorite') {
        onActionAddFavorite((success, error) => {
          if (success) {
            alert(t('t8th011'))
            onChangeExportMode('none')
          } else if (error) {
            try {
              const errorPayload = JSON.parse((error as any).message) as {
                message: string
              }
              alert(errorPayload.message)
            } catch (e) {
              alert('Favorite 추가 실패 Error')
            }
          } else {
            onChangeExportMode('none')
          }
        })
      } else if (exportMode === 'BookList') {
        onActionBookList((success, url, error) => {
          if (success) {
            openWindow(url, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
            onChangeExportMode('none')
          } else if (error) {
            alert(error)
          } else {
            onChangeExportMode('none')
          }
        })
      }
    }
  }

  const onStatusItemClick = (item: ActionBarDropdownItem) => {
    if (item.key.startsWith('Status')) {
      const value = item.key.substring(6)
      if (value.startsWith('Mode')) {
        //TODO: 8차 신규 피쳐, 검색 조건 다양화 필요
        let status = 'All'
        switch (value) {
          case 'ModeEasy':
            status = 'Easy'
            break
          case 'ModeFull':
            status = 'Full'
            break
          case 'Mode1stCompleteOrBefore':
            status = '1stCompleteOrBefore'
            break
          case 'Mode1StComplete':
            status = '1stComplete'
            break
          case 'Mode2ndComplete':
            status = '2ndComplete'
            break
          default:
            break
        }
        setMovieSearch({ ...movieSearch, status, page: 1 })
      } else if (movieSearch.status !== value) {
        setMovieSearch({
          ...movieSearch,
          status: value,
          page: 1,
        })
      }
    } else if (item.key.startsWith('Genre')) {
      const value = item.key.substring(5)
      if (movieSearch.genre !== value) {
        setMovieSearch({ ...movieSearch, genre: value, page: 1 })
      }
    }
  }

  const onSortItemClick = (item: ActionBarDropdownItem) => {
    const value = item.key.substring(4)
    setMovieSearch({ ...movieSearch, sort: value })
  }

  const onExportItemClick = (item: ActionBarDropdownItem) => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }

    if (item.key !== 'ExportAllBooksList') {
      setExportMode(item.key.substring(6) as SearchBookExportType)
    } else {
      if (downloadExcelUrl) {
        openDownloadLink(downloadExcelUrl)
      }
    }
  }

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  const actionBarTitle = statusItems
    .filter((item) => item.isActive && !!item.label)
    .reduce((title, item) => {
      if (item.key.startsWith('Status')) {
        return item.label as string
      } else if (item.key.startsWith('Genre') && item.key !== 'GenreAll') {
        return title ? `${title} / ${item.label}` : (item.label as string)
      }
      return title
    }, '')
  const searchCount = search.data?.page?.totalRecords || 0
  const downloadExcelUrl = searchCount > 0 ? search.data?.download : undefined

  const onLevelChangeMovie = (level: string) => {
    if (level === movieSearch.level) {
      return
    }
    router.replace(`${SITE_PATH.NW82.EB_MOVIE}/${level}`)
  }

  const currentPage = search.data?.page?.page || 0
  const maxPage = search.data?.page?.totalPages || 0
  const onPageClick = (page: number) => {
    setMovieSearch({ ...movieSearch, page: page })
  }

  return (
    <>
      <ActionBar
        title={actionBarTitle}
        count={searchCount}
        headerContent={
          <HeaderContent
            level={level}
            levelOptions={levelOptions}
            onLevelChange={onLevelChangeMovie}
          />
        }
        dropdowns={[
          {
            title: t('t8th012'),
            isActiveMakerVisible: true,
            items: statusItems,
            onItemClick: onStatusItemClick,
          },
          {
            title: t('t8th013'),
            isActiveMakerVisible: true,
            items: sortItems,
            onItemClick: onSortItemClick,
          },
          {
            title: t('t8th014'),
            items: exportItems,
            onItemClick: onExportItemClick,
          },
        ]}
        exportPanel={{
          isOpen: isExportMode,
          title: `${t('t8th014')} / ${exportItems.find((item) => item.key === `Export${exportMode}`)?.label || exportMode}`,
          count: selectedItemCount,
          onCancel: () => onChangeExportMode('none'),
          onConfirm: onConfirmExport,
        }}
      />
      {searchCount > 0 ? (
        <>
          <BookListStyle>
            {search.data?.book?.map((book) => (
              <BookItem
                key={book.levelRoundId}
                title={book.topicTitle}
                passCount={book.rgPointCount}
                addYn={!book.addYn}
                movieYn={!!book.animationPath}
                point={book.getableRgPoint}
                src={book.surfaceImagePath}
                levelName={book.levelName}
                recommendedAge={book.recommendedAge}
                isCheckable={isExportMode}
                isChecked={isExportMode && isSelectedItem(book.levelRoundId)}
                onClick={() => {
                  if (isExportMode) {
                    const currentFlag = isSelectedItem(book.levelRoundId)
                    setSelectItemChange(
                      book.levelRoundId,
                      {
                        levelRoundId: book.levelRoundId,
                        isAddableYn: book.addYn,
                      },
                      !currentFlag,
                    )
                  } else {
                    if (isStudyEnd) {
                      onStudyEndMessage()
                    } else {
                      setBookInfo({
                        levelRoundId: book.levelRoundId,
                        surfaceImagePath: book.surfaceImagePath,
                        title: book.topicTitle,
                        bookCode: book.levelName,
                      })
                    }
                  }
                }}
              />
            ))}
          </BookListStyle>
          <Pagenation
            maxPage={maxPage}
            currentPage={currentPage}
            onPageChange={onPageClick}
          />
          {bookInfo && (
            <BookInfoModal
              onClickClose={() => {
                setBookInfo(undefined)
              }}
              title={bookInfo.title}
              bookCode={bookInfo.bookCode}
              imgSrc={bookInfo.surfaceImagePath}
              levelRoundId={bookInfo.levelRoundId}
            />
          )}
          {vocabularyOption && (
            <PrintVocabularyModal
              onConfirm={onConfirmVocabularyOption}
              onClickClose={() => setVocabularyOption(false)}
            />
          )}
          {isSelectStudentHistory && (
            <SelectStudentHistoryModal
              studentHistoryList={
                studentHistory.data?.list?.filter(
                  (item) => item.isBookWizard,
                ) || []
              }
              onCloseModal={() => {
                setSelectStudentHistory(false)
              }}
              onSelectStudentHistoryId={(studentHistoryId) => {
                setSelectStudentHistory(false)
                onConfirmExportWithStudentHistoryId(studentHistoryId)
              }}
            />
          )}
        </>
      ) : (
        <BookListEmptyStateStyle>
          <p>{t('t8th009')}</p>
        </BookListEmptyStateStyle>
      )}
    </>
  )
}

function HeaderContent({
  level,
  levelOptions,
  onLevelChange,
}: {
  level: string
  levelOptions: { key: string; label: string }[]
  onLevelChange: (level: string) => void
}) {
  return (
    <SelectBox
      selectedValue={level}
      largeFont
      onChange={(value) => onLevelChange(value.key)}
      options={levelOptions}
    />
  )
}
