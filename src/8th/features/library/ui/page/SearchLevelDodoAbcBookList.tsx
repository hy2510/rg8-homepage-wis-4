'use client'

import { useSearchBookDodoABC } from '@/8th/features/library/service/search-query'
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
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import { openWindow } from '@/8th/shared/utils/open-window'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'

const activityMap: Record<string, { key: string; title: string }> = {
  alphabet: { key: 'Study-Alphabet', title: 'Alphabet' },
  phonics1: { key: 'Study-Phonics-1', title: 'Phonics 1' },
  phonics2: { key: 'Study-Phonics-2', title: 'Phonics 2' },
  sightwords1: { key: 'Study-Sight-Words-1', title: 'Sight Words 1' },
  sightwords2: { key: 'Study-Sight-Words-2', title: 'Sight Words 2' },
  'game-alphabet': { key: 'Game-Alphabet', title: 'Game Alphabet' },
  'game-phonics': { key: 'Game-Phonics', title: 'Game Phonics' },
  'game-sightwords1': {
    key: 'Game-Sight-Words-1',
    title: 'Game Sight Words 1',
  },
  'game-sightwords2': {
    key: 'Game-Sight-Words-2',
    title: 'Game Sight Words 2',
  },
  'alphabet-chant': { key: 'Song-Alphabet-Chant', title: 'Alphabet Chant' },
  'phonics-chant': { key: 'Song-Phonics-Chant', title: 'Phonics Chant' },
  'nursery-rhyme': { key: 'Song-Nursery-Rhyme', title: 'Nursery Rhyme' },
}

export default function SearchLevelDodoAbcBookList({
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

  const isStudy = activity.startsWith('Study')
  const isGame = activity.startsWith('Game')
  const isSong = activity.startsWith('Song')

  return (
    <>
      <SubPageNavHeader
        title={`DODO ABC`}
        subTitle={title}
        parentPath={SITE_PATH.NW82.EB}
      />
      {isStudy && <StudyBookList activity={activity} />}
      {isGame && <GameBookList activity={activity} />}
      {isSong && <SongBookList activity={activity} />}
    </>
  )
}

type SearchBookExportType =
  | 'none'
  | 'Vocabulary'
  | 'ToDo'
  | 'Favorite'
  | 'BookList'

function StudyBookList({ activity }: { activity: string }) {
  // @Language 'common'
  const { t } = useTranslation()

  const { setting } = useCustomerConfiguration()

  const [pkSearch, setPkSearch] = useState<{
    activity: string
    status: string
  }>({
    activity,
    status: 'All',
  })

  const search = useSearchBookDodoABC(pkSearch)

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

  const searchCount = search.data?.book?.length || 0

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

function GameBookList({ activity }: { activity: string }) {
  // @Language 'common'
  const { t } = useTranslation()

  const search = useSearchBookDodoABC({ activity, status: 'All' })

  const [bookInfo, setBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
      }
    | undefined
  >(undefined)

  const student = useStudent()
  const studentHistory = useStudentHistoryList()

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

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  const actionBarTitle = t('t8th015')
  const searchCount = search.data?.book?.length || 0

  return (
    <>
      <ActionBar title={actionBarTitle} count={searchCount} />
      {searchCount > 0 ? (
        <>
          <BookListStyle>
            {search.data?.book?.map((book) => (
              <BookItem
                key={book.levelRoundId}
                title={book.topicTitle}
                passCount={book.rgPointCount}
                addYn={!book.addYn}
                movieYn={false}
                point={book.getableRgPoint}
                src={book.surfaceImagePath}
                levelName={book.levelName}
                recommendedAge={book.recommendedAge}
                isCheckable={false}
                isChecked={false}
                isGrayscale={!book.gameLandRoundOpenYn}
                onClick={() => {
                  if (!book.gameLandRoundOpenYn) {
                    return
                  }
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
                }}
              />
            ))}
          </BookListStyle>
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
        </>
      ) : (
        <BookListEmptyStateStyle>
          <p>{t('t8th009')}</p>
        </BookListEmptyStateStyle>
      )}
    </>
  )
}

function SongBookList({ activity }: { activity: string }) {
  // @Language 'common'
  const { t } = useTranslation()

  const search = useSearchBookDodoABC({ activity, status: 'All' })

  const [bookInfo, setBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
      }
    | undefined
  >(undefined)

  const student = useStudent()
  const studentHistory = useStudentHistoryList()

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

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  const actionBarTitle = t('t8th015')
  const searchCount = search.data?.book?.length || 0

  return (
    <>
      <ActionBar title={actionBarTitle} count={searchCount} />
      {searchCount > 0 ? (
        <>
          <BookListStyle>
            {search.data?.book?.map((book) => (
              <BookItem
                key={book.levelRoundId}
                title={book.topicTitle}
                passCount={book.rgPointCount}
                addYn={!book.addYn}
                movieYn={false}
                point={book.getableRgPoint}
                src={book.surfaceImagePath}
                levelName={book.levelName}
                recommendedAge={book.recommendedAge}
                isCheckable={false}
                isChecked={false}
                onClick={() => {
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
                }}
              />
            ))}
          </BookListStyle>
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
        </>
      ) : (
        <BookListEmptyStateStyle>
          <p>{t('t8th009')}</p>
        </BookListEmptyStateStyle>
      )}
    </>
  )
}
