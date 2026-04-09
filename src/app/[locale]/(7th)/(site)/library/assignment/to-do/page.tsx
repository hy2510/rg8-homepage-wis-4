'use client'

import {
  useFetchLibraryDeleteAllTodo,
  useFetchLibraryTodos,
} from '@/7th/_client/store/library/todos/hook'
import { useLibraryTodo } from '@/7th/_client/store/library/todos/selector'
import { openDownloadLink } from '@/7th/_function/open-window'
import PaginationBar from '@/7th/_ui/common/PaginationBar'
import {
  AlertBar,
  Dropdown,
  DropdownItem,
  EmptyMessage,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import VocaPrintOptions from '@/7th/_ui/modules/library-book-cover/VocaPrintOptions'
import { BookCover } from '@/7th/_ui/modules/library-book-cover/book-cover'
import {
  ExportItem,
  ExportModePanel,
} from '@/7th/_ui/modules/library-export-mode-panel/export-mode-panel'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useState } from 'react'
import StudentHistorySelectModal from '../../_cpnt/StudentHistorySelectModal'
import useExport, {
  ExportAction,
  useSupportExportActionTodo,
} from '../../_fn/use-export'
import AssignmentNavBar from '../_component/AssignmentNavBar'

const STYLE_ID = 'page_to_do'

const PAGE_PER_RECORD = 12
export default function Page() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const SORT_OPTIONS = [
    {
      id: 'RegistDate',
      label: t('t377'),
    },
    {
      id: 'RegistDateASC',
      label: t('t378'),
    },
    {
      id: 'OngoingStudy',
      label: t('t379'),
    },
    {
      id: 'BeforeStudy',
      label: t('t380'),
    },
  ]

  const { fetch, loading } = useFetchLibraryTodos()
  const { option, payload: todos } = useLibraryTodo()

  const [isPageLoading, setPageLoading] = useState(true)
  useEffect(() => {
    fetch({
      ...option,
      isReload: true,
      callback: () => {
        setPageLoading(false)
      },
    })
  }, [])

  const onChangeSort = (sort: string) => {
    setCurrentPage(1)
    setExportMode(undefined)
    setSelectMode(false)
    fetch({ sortOption: sort })
  }

  const [currentPage, setCurrentPage] = useState<number>(1)
  const maxPage = Math.ceil(todos.count / PAGE_PER_RECORD)
  const onPageClick = (page: number) => {
    setCurrentPage(page)
  }
  const startIdx = PAGE_PER_RECORD * (currentPage - 1)
  const endIdx = PAGE_PER_RECORD * currentPage
  const todoItems = loading
    ? []
    : todos.todo.filter((_, idx) => {
        return startIdx <= idx && idx < endIdx
      })

  const findSortOption = SORT_OPTIONS.filter(
    (item) => option.sortOption === item.id,
  )
  const currentSortOption =
    !findSortOption || findSortOption.length === 0
      ? SORT_OPTIONS[0]
      : findSortOption[0]

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  const [exportMode, setExportMode] = useState<'export' | 'delete' | undefined>(
    undefined,
  )
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

  const supportExportAction = useSupportExportActionTodo()

  const [exportSelected, setExportSelected] = useState<
    ExportAction | undefined
  >(
    supportExportAction && supportExportAction.length > 0
      ? supportExportAction[0].action
      : undefined,
  )

  const downloadExcelUrl = todos.count > 0 ? todos.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      openDownloadLink(downloadExcelUrl)
    }
  }

  let exportButtonLabel = ''
  let deleteButtonLabel = ''
  if (exportMode === 'export') {
    exportButtonLabel = t('t371')
  } else if (exportMode === 'delete') {
    deleteButtonLabel = t('t373')
  } else {
    exportButtonLabel = t('t372')
    deleteButtonLabel = t('t374')
  }
  if (!isSelectMode && exportMode !== undefined) {
    setExportMode(undefined)
  }

  const { fetch: deleteAllTodo } = useFetchLibraryDeleteAllTodo()

  const onDeleteAllTodos = () => {
    if (confirm(t('t927'))) {
      deleteAllTodo({
        callback: ({ success, error }) => {
          if (success) {
            fetch({
              ...option,
              isReload: true,
              callback: () => {
                setPageLoading(false)
              },
            })
            alert(t('t740')) // Todo에서 삭제되었습니다.
            setCurrentPage(1)
            setExportMode(undefined)
            setSelectMode(false)
          } else if (error) {
            if ((error as any).message) {
              alert((error as any).message)
            } else {
              alert(t('t381'))
            }
          }
        },
      })
    }
  }

  if (isPageLoading) {
    return (
      <>
        <AssignmentNavBar active={'to-do'} />
        <main className={style.to_do}></main>
      </>
    )
  }
  return (
    <>
      <AssignmentNavBar active={'to-do'} />
      <main className={style.to_do}>
        <AlertBar>{t('t382')}</AlertBar>
        <div className={style.to_do_sort}>
          <div className={style.to_do_sort_container}>
            <Dropdown title={`${t('t383', { num: todos.count })}`}>
              {downloadExcelUrl && (
                <DropdownItem onClick={onBookListExcelDownload}>
                  {t('t387')}
                </DropdownItem>
              )}
            </Dropdown>
            <Dropdown title={currentSortOption.label}>
              {SORT_OPTIONS.map((sort) => {
                return (
                  <DropdownItem
                    key={`todo-sort-${sort.id}`}
                    onClick={() => {
                      onChangeSort(sort.id)
                    }}>
                    {sort.label}
                  </DropdownItem>
                )
              })}
            </Dropdown>
          </div>
          {todos.count > 0 && (
            <div className="flex gap-m">
              {exportButtonLabel && (
                <div
                  className={style.txt_l}
                  onClick={() => {
                    if (!exportMode) {
                      setExportMode('export')
                      setSelectMode(true)
                    } else {
                      setExportMode(undefined)
                      setSelectMode(false)
                    }
                  }}>
                  {exportButtonLabel}
                </div>
              )}
              {exportMode === 'delete' && (
                <div
                  className={style.txt_l}
                  style={{ color: 'var(--red)' }}
                  onClick={() => onDeleteAllTodos()}>
                  {t('t926')}
                </div>
              )}
              {deleteButtonLabel && (
                <div
                  className={style.txt_l}
                  onClick={() => {
                    if (!exportMode) {
                      setExportMode('delete')
                      setSelectMode(true)
                    } else {
                      setExportMode(undefined)
                      setSelectMode(false)
                    }
                  }}>
                  {deleteButtonLabel}
                </div>
              )}
            </div>
          )}
        </div>
        {todos.count !== 0 ? (
          <>
            <div className={style.to_do_list}>
              {todoItems.map((book, i) => {
                const isInprogressTodo =
                  book.statusCode !== '025001' || book.answerCount !== 0

                const isCheckMode = !!exportMode
                const isChecked = isSelectedItem(book.studyId)
                const onCheckedChange = setItemSelectedChange
                const isCheckable = exportMode === 'export' || book.deleteYn
                return (
                  <BookCover
                    key={`book-cover-${i}-${book.surfaceImagePath}`}
                    id={book.studyId}
                    target={`todo`}
                    bookImgSrc={book.surfaceImagePath}
                    bookCode={book.levelName}
                    title={book.title}
                    author={book.author}
                    isInprogressTodo={isInprogressTodo}
                    isHomework={book.homeworkYn}
                    isBookInfo={bookInfo === book.studyId}
                    isMovieBook={!!book.animationPath}
                    onClickBookDetail={() => {
                      setBookInfo(bookInfo ? undefined : book.studyId)
                    }}
                    assignDate={book.openDate}
                    levelRoundId={book.levelRoundId}
                    studyId={book.studyId}
                    studentHistoryId={book.studentHistoryId}
                    isExportMode={isCheckMode}
                    isExportChecked={isChecked}
                    isExportCheckable={isCheckable}
                    onExportCheckedChange={onCheckedChange}
                    earnPoint={book.getableRgPoint}
                    grade={book.recommendedAge}
                  />
                )
              })}
            </div>
            <PaginationBar
              page={currentPage}
              maxPage={maxPage}
              onPageClick={onPageClick}
            />
          </>
        ) : (
          <EmptyMessage>{t('t384')}</EmptyMessage>
        )}
        {/* 내보내기 모드 실행시 */}
        {exportMode === 'export' && isSelectMode && (
          <ExportModePanel
            count={selectedItemCount}
            onExportClick={() => {
              if (exportSelected) {
                if (onExportAction) {
                  onExportAction(exportSelected)
                }
              }
            }}>
            {supportExportAction &&
              supportExportAction.map((mode) => {
                return (
                  <ExportItem
                    key={mode.action}
                    active={exportSelected === mode.action}
                    onClick={() => {
                      if (exportSelected !== mode.action) {
                        setExportSelected(mode.action)
                      }
                    }}>
                    {mode.label}
                  </ExportItem>
                )
              })}
          </ExportModePanel>
        )}
        {isSelectStudentHistory && (
          <StudentHistorySelectModal
            studentHistoryList={targetStudentHistoryList}
            defaultStudentHistoryId={targetStudentHistoryId}
            onCloseModal={onExportCancel}
            onSelectStudentHistoryId={onSelectStudentHistory}
          />
        )}
        {/* 일괄삭제 모드 실행시 */}
        {exportMode === 'delete' && isSelectMode && (
          <ExportModePanel
            count={selectedItemCount}
            buttonName={t('t385')}
            onExportClick={() => {
              if (selectedItemCount > 0) {
                if (onExportAction) {
                  onExportAction('delete-todo')
                }
              }
            }}></ExportModePanel>
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
    </>
  )
}
