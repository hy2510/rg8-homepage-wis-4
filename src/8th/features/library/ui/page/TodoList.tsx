'use client'

import { Assets } from '@/8th/assets/asset-library'
import BookItem, {
  SkeletonBookItem,
} from '@/8th/features/library/ui/component/BookItem'
import TodoActionBar, {
  ActionBarDropdownItem,
} from '@/8th/features/library/ui/component/LibraryActionBar'
import PrintVocabularyModal from '@/8th/features/library/ui/modal/PrintVocabularyModal'
import {
  useStudent,
  useStudentHistoryList,
} from '@/8th/features/student/service/student-query'
import { TodoBook } from '@/8th/features/todo/model/todo-book'
import {
  useDeleteAllTodo,
  useTodoList,
} from '@/8th/features/todo/service/todo-query'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import {
  ExportActionType,
  PickItemType,
  useExportItems,
  useTodoSortItems,
} from '@/8th/shared/hook/useActionBarDropdownOption'
import {
  VocabularyOption,
  useExportPanelTodo,
} from '@/8th/shared/hook/useExportPanel'
import {
  BookListDateGroupStyle,
  BookListEmptyStateStyle,
  BookListStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, Gap, TextStyle } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import { openDownloadLink, openWindow } from '@/8th/shared/utils/open-window'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import { useEffect, useState } from 'react'
import TodoBookInfoModal from '../modal/TodoBookInfoModal'

export default function TodoList() {
  return <TodoListDependency />
}

function TodoListDependency() {
  //@language 'common'
  const { t } = useTranslation()

  const student = useStudent()

  if (student.isLoading) {
    return <></>
  }

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th028')}`}
        iconSrc={Assets.Icon.Side.toDo.src}
        parentPath={SITE_PATH.NW82.LIBRARY}
      />
      <BookList />
    </>
  )
}

type TodoBookExportType =
  | 'none'
  | 'Vocabulary'
  | 'Favorite'
  | 'BookList'
  | 'EditDelete'

function BookList() {
  const maketingEventTracker = useTrack()
  useEffect(() => {
    maketingEventTracker.eventAction('도서 섹션 탭 클릭', {
      version: '8th',
      section_name: 'To-Do',
    })
  }, [maketingEventTracker])

  // @Language 'common'
  const { t } = useTranslation()

  const { setting } = useCustomerConfiguration()

  const [todoSearch, setTodoSearch] = useState<{
    sortColumn: string
  }>({
    sortColumn: 'RegistDate',
  })

  const student = useStudent()
  const todo = useTodoList(todoSearch)
  const { mutate: deleteAll } = useDeleteAllTodo()

  const [exportMode, setExportMode] = useState<TodoBookExportType>('none')
  const [vocabularyOption, setVocabularyOption] = useState<boolean>(false)

  const {
    selectedItemCount,
    setSelectItemChange,
    resetSelectedItem,
    isSelectedItem,
    onActionDeleteTodo,
    onActionAddFavorite,
    onActionVocabulary,
    onActionBookList,
  } = useExportPanelTodo()

  const [bookInfo, setBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
        studentHistoryId: string
        studyId: string
      }
    | undefined
  >(undefined)

  const sortItems = useTodoSortItems(todoSearch.sortColumn)
  const exportOption: {
    action: ExportActionType
    pick: PickItemType[]
  } = {
    action: 'exclude',
    pick: ['Favorite', 'ToDo'],
  }
  if (!setting.printVocabulary) {
    exportOption.pick.push('Vocabulary')
  }
  const exportItems = useExportItems(exportOption)

  const studentHistory = useStudentHistoryList()
  if (studentHistory.isLoading) {
    return <div></div>
  }
  const defaultStudentHistoryId =
    studentHistory.data?.list && studentHistory.data?.list.length > 0
      ? studentHistory.data.list[0].studentHistoryId
      : ''

  if (todo.isLoading) {
    return (
      <BookListStyle>
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonBookItem key={`skeleton-${index}`} />
        ))}
      </BookListStyle>
    )
  }

  const isExportMode = exportMode !== 'none'
  const onChangeExportMode = (item: TodoBookExportType) => {
    setExportMode(item)
    if (item === 'none') {
      resetSelectedItem()
    }
  }
  const onConfirmVocabularyOption = (vocabularyOption: VocabularyOption) => {
    const studentHistoryId = defaultStudentHistoryId

    onActionVocabulary(
      {
        studentHistoryId,
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
    if (selectedItemCount > 0) {
      if (exportMode === 'Vocabulary') {
        setVocabularyOption(true)
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
      } else if (exportMode === 'EditDelete') {
        onActionDeleteTodo((success, error) => {
          if (success) {
            setExportMode('none')
          } else if (error) {
            alert(error)
          } else {
            setExportMode('none')
          }
        })
      }
    }
  }

  const onSortItemClick = (item: ActionBarDropdownItem) => {
    if (item.key.startsWith('Sort')) {
      const value = item.key.substring(4)
      setTodoSearch({ ...todoSearch, sortColumn: value })
    }
  }

  const onExportItemClick = (item: ActionBarDropdownItem) => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    if (item.key !== 'ExportAllBooksList') {
      if (exportMode === 'EditDelete' && selectedItemCount > 0) {
        resetSelectedItem()
      }
      setExportMode(item.key.substring(6) as TodoBookExportType)
    } else {
      if (downloadExcelUrl) {
        openDownloadLink(downloadExcelUrl)
      }
    }
  }

  const editItems: ActionBarDropdownItem[] = [
    { key: 'EditDelete', label: t('t8th036'), isActive: true },
    { key: '--' },
    {
      key: 'EditDeleteAll',
      label: t('t8th037'),
      isActive: true,
    },
  ]

  const onEditItemClick = (item: ActionBarDropdownItem) => {
    if (item.key === 'EditDelete') {
      if (selectedItemCount > 0) {
        resetSelectedItem()
      }
      setExportMode('EditDelete')
    } else if (item.key === 'EditDeleteAll') {
      deleteAll()
    }
  }

  const searchCount = todo.data?.count || 0
  const downloadExcelUrl = searchCount > 0 ? todo.data?.download : undefined
  const allTodos = todo.data?.todo || []
  const groupTodos: { group: string; todos: TodoBook[] }[] = []
  if (
    todoSearch.sortColumn === 'RegistDate' ||
    todoSearch.sortColumn === 'RegistDateASC'
  ) {
    const dates = allTodos
      .map((todo): string => todo.openDate)
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort((a, b) => {
        const aNum = DateUtils.createDate(a).getTime()
        const bNum = DateUtils.createDate(b).getTime()
        if (todoSearch.sortColumn === 'RegistDate') {
          return bNum - aNum
        } else {
          return aNum - bNum
        }
      })
    dates.forEach((date) => {
      groupTodos.push({
        group: DateUtils.toRgDateEnglishFormat(date),
        todos: allTodos.filter((todo) => todo.openDate === date),
      })
    })
    // MEMO: 학습 중, 학습 전 분리하였으나, 분리된 결과가 실제 서버데이터랑 렬순서가 맞지 않아서 주석처리 함. 서버에는 현재 학습중인 도서가 학습 안한 도서 뒤쪽에 나오는 경우도 있음.
    //   } else {
    //     const inProgressTodos = allTodos.filter((todo) => todo.answerCount > 0)
    //     const notStartedTodos = allTodos.filter((todo) => todo.answerCount <= 0)
    //     if (todoSearch.sortColumn === 'OngoingStudy') {
    //       groupTodos.push({
    //         group: '학습 중',
    //         todos: inProgressTodos,
    //       })
    //       groupTodos.push({
    //         group: '학습 전',
    //         todos: notStartedTodos,
    //       })
    //     } else {
    //       groupTodos.push({
    //         group: '학습 전',
    //         todos: notStartedTodos,
    //       })
    //       groupTodos.push({
    //         group: '학습 중',
    //         todos: inProgressTodos,
    //       })
    //     }
  }

  const onBookCoverClick = (studyId: string, isCheckable: boolean) => {
    const book = allTodos.find((book) => book.studyId === studyId)
    if (!book) {
      return
    }
    if (isCheckable) {
      const currentFlag = isSelectedItem(book.studyId)

      setSelectItemChange(
        book.studyId,
        {
          studyId: book.studyId,
          studentHistoryId: book.studentHistoryId,
          levelName: book.levelName,
          isDeleteableYn: book.deleteYn,
          levelRoundId: book.levelRoundId,
        },
        !currentFlag,
      )
    } else if (!isExportMode) {
      if (isStudyEnd) {
        onStudyEndMessage()
        return
      }
      setBookInfo({
        levelRoundId: book.levelRoundId,
        surfaceImagePath: book.surfaceImagePath,
        title: book.title,
        bookCode: book.levelName,
        studentHistoryId: book.studentHistoryId,
        studyId: book.studyId,
      })
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

  let exportTitle = ''
  if (exportMode === 'EditDelete') {
    exportTitle = `${t('t8th043')} / ${t('t8th044')}`
  } else {
    exportTitle = `${t('t8th014')} / ${exportItems.find((item) => item.key === `Export${exportMode}`)?.label || exportMode}`
  }

  return (
    <>
      <BoxStyle
        padding="10px 15px"
        backgroundColor="rgba(212, 220, 230, 0.50)"
        borderRadius={10}>
        <TextStyle fontSize="small" fontFamily="sans" fontColor="primary">
          {t('t8th045', { num: 60 })}
        </TextStyle>
      </BoxStyle>
      <TodoActionBar
        title={`${t('t8th046')}`}
        count={searchCount}
        dropdowns={[
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
          {
            title: t('t8th043'),
            items: editItems,
            onItemClick: onEditItemClick,
          },
        ]}
        exportPanel={{
          isOpen: isExportMode,
          title: exportTitle,
          count: selectedItemCount,
          isEdit: exportMode === 'EditDelete',
          onCancel: () => onChangeExportMode('none'),
          onConfirm: onConfirmExport,
        }}
      />
      {searchCount > 0 && groupTodos.length === 0 && (
        <BookListView
          todos={allTodos.map((book) => {
            return {
              ...book,
              isCheckable: isExportMode,
              isDisabled: exportMode === 'EditDelete' && !book.deleteYn,
              isChecked: isExportMode && isSelectedItem(book.studyId),
            }
          })}
          onBookClick={onBookCoverClick}
        />
      )}
      {searchCount > 0 &&
        groupTodos.length > 0 &&
        groupTodos.map((item) => {
          return (
            <BookListDateGroupStyle key={item.group} isTodoList>
              <TextStyle fontSize="medium" fontColor="secondary">
                {`+ ${item.group}`}
              </TextStyle>
              <Gap size={15} />
              <BookListView
                todos={item.todos.map((book) => {
                  return {
                    ...book,
                    isCheckable: isExportMode,
                    isDisabled: exportMode === 'EditDelete' && !book.deleteYn,
                    isChecked: isExportMode && isSelectedItem(book.studyId),
                  }
                })}
                onBookClick={onBookCoverClick}
              />
            </BookListDateGroupStyle>
          )
        })}
      {bookInfo && (
        <TodoBookInfoModal
          onClickClose={() => {
            setBookInfo(undefined)
          }}
          title={bookInfo.title}
          bookCode={bookInfo.bookCode}
          imgSrc={bookInfo.surfaceImagePath}
          levelRoundId={bookInfo.levelRoundId}
          studentHistoryId={bookInfo.studentHistoryId}
          studyId={bookInfo.studyId}
        />
      )}
      {vocabularyOption && (
        <PrintVocabularyModal
          onConfirm={onConfirmVocabularyOption}
          onClickClose={() => setVocabularyOption(false)}
        />
      )}
      {searchCount === 0 && (
        <BookListEmptyStateStyle>
          <p>{t('t8th009')}</p>
        </BookListEmptyStateStyle>
      )}
    </>
  )
}

function BookListView({
  todos,
  onBookClick,
}: {
  todos: (TodoBook & {
    isCheckable: boolean
    isChecked: boolean
    isDisabled: boolean
  })[]
  onBookClick: (studyId: string, isCheckable: boolean) => void
}) {
  return (
    <BookListStyle>
      {todos.map((book) => {
        const isInProgressInTodo = book.levelName.startsWith('EB-PK')
          ? !book.deleteYn
          : book.answerCount > 0
        return (
          <BookItem
            key={book.studyId}
            title={book.title}
            passCount={0}
            addYn={!book.deleteYn}
            movieYn={!!book.animationPath}
            point={book.getableRgPoint}
            src={book.surfaceImagePath}
            levelName={book.levelName}
            homeworkYn={book.homeworkYn}
            recommendedAge={book.recommendedAge}
            isCheckable={book.isCheckable}
            isDisabled={book.isDisabled}
            isChecked={book.isChecked}
            isInProgressInTodo={isInProgressInTodo}
            onClick={() => {
              onBookClick(book.studyId, book.isCheckable)
            }}
          />
        )
      })}
    </BookListStyle>
  )
}
