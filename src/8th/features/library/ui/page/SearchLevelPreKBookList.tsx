'use client'

import { useSearchBookPreK } from '@/8th/features/library/service/search-query'
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
  useStatusItems,
} from '@/8th/shared/hook/useActionBarDropdownOption'
import {
  VocabularyOption,
  useExportPanelSearch,
} from '@/8th/shared/hook/useExportPanel'
import {
  BookListEmptyStateStyle,
  BookListStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import Pagenation from '@/8th/shared/ui/Pagenation'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import { openWindow } from '@/8th/shared/utils/open-window'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useState } from 'react'

const activityMap: Record<string, { key: string; title: string }> = {
  all: { key: 'All', title: 'All' },
  alphabet: { key: 'Alphabet', title: 'Alphabet' },
  phonics: { key: 'Phonics', title: 'Phonics' },
  word: { key: 'Word', title: 'Word' },
  story: { key: 'Story', title: 'Story' },
}

export default function SearchLevelPreKBookList({
  activity,
}: {
  activity: string
}) {
  const targetActivity = activityMap[activity]
  if (!targetActivity) {
    return <>Invalid params {activity}</>
  }

  return (
    <LibraryBookListDependency
      activity={targetActivity.key}
      title={targetActivity.title}
    />
  )
}

function LibraryBookListDependency({
  activity,
  title,
}: {
  activity: string
  title: string
}) {
  const student = useStudent()

  if (student.isLoading) {
    return <></>
  }

  return (
    <>
      <SubPageNavHeader
        title={`Level PK`}
        subTitle={title}
        parentPath={SITE_PATH.NW82.EB}
      />
      <BookList activity={activity} />
    </>
  )
}

type SearchBookExportType =
  | 'none'
  | 'Vocabulary'
  | 'ToDo'
  | 'Favorite'
  | 'BookList'

function BookList({ activity }: { activity: string }) {
  const maketingEventTracker = useTrack()
  useEffect(() => {
    maketingEventTracker.eventAction('도서 검색', {
      version: '8th',
      section_name: 'PreK',
      activity: activity,
    })
  }, [maketingEventTracker, activity])

  // @Language 'common'
  const { t } = useTranslation()

  const { setting } = useCustomerConfiguration()

  const [pkSearch, setPkSearch] = useState<{
    activity: string
    status: string
    page: number
  }>({
    activity,
    status: 'All',
    page: 1,
  })

  const search = useSearchBookPreK(pkSearch)

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

  const statusItems = useStatusItems(pkSearch.status || 'All')

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
    action: 'exclude',
    pick: [],
  }
  if (isBookWizard && setting.printVocabulary) {
    exportOption.pick = ['AllBooksList']
  } else {
    const pick = exportOption.pick || []
    if (!isBookWizard) {
      pick.push('ToDo')
    }
    if (!setting.printVocabulary) {
      pick.push('Vocabulary')
    }
    pick.push('AllBooksList')
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
  const onChangeExportMode = (item: SearchBookExportType) => {
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
        setPkSearch({ ...pkSearch, status })
      } else if (pkSearch.status !== value) {
        setPkSearch({
          ...pkSearch,
          status: value,
        })
      }
    }
  }

  const onExportItemClick = (item: ActionBarDropdownItem) => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }

    if (item.key !== 'ExportAllBooksList') {
      setExportMode(item.key.substring(6) as SearchBookExportType)
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

  const currentPage = search.data?.page?.page || 0
  const maxPage = search.data?.page?.totalPages || 0
  const onPageClick = (page: number) => {
    setPkSearch({ ...pkSearch, page: page })
  }

  return (
    <>
      <ActionBar
        title={actionBarTitle}
        count={searchCount}
        dropdowns={[
          {
            title: t('t8th012'),
            isActiveMakerVisible: true,
            items: statusItems,
            onItemClick: onStatusItemClick,
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
          {maxPage > 1 && (
            <Pagenation
              maxPage={maxPage}
              currentPage={currentPage}
              onPageChange={onPageClick}
            />
          )}
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
