'use client'

import {
  useFetchLibraryFavorite,
  useOnLoadLibraryFavorite,
} from '@/7th/_client/store/library/favorites/hook'
import { useLibraryFavorite } from '@/7th/_client/store/library/favorites/selector'
import { openDownloadLink } from '@/7th/_function/open-window'
import PaginationBar from '@/7th/_ui/common/PaginationBar'
import {
  AlertBar,
  Dropdown,
  DropdownItem,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import VocaPrintOptions from '@/7th/_ui/modules/library-book-cover/VocaPrintOptions'
import { BookCover } from '@/7th/_ui/modules/library-book-cover/book-cover'
import {
  ExportItem,
  ExportModePanel,
} from '@/7th/_ui/modules/library-export-mode-panel/export-mode-panel'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import StudentHistorySelectModal from '../../_cpnt/StudentHistorySelectModal'
import useExport, {
  ExportAction,
  useSupportExportActionFavorite,
} from '../../_fn/use-export'
import AssignmentNavBar from '../_component/AssignmentNavBar'

const STYLE_ID = 'page_favorite'

export default function Page() {
  const { loading, error } = useOnLoadLibraryFavorite()
  if (loading) {
    return <LoadingScreen />
  }
  return <Favorite />
}

function Favorite() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const STATUS_OPTION = [
    {
      id: 'All',
      label: 'All',
    },
    {
      id: 'Complete',
      label: t('t368'),
    },
    {
      id: 'Before',
      label: t('t346'),
    },
  ]

  const { fetch } = useFetchLibraryFavorite()
  const { option, payload: books } = useLibraryFavorite()

  const onChangeStatus = (status: string) => {
    setExportMode(undefined)
    setSelectMode(false)
    fetch({ status, page: 1 })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const onPageClick = (page: number) => {
    fetch({ status: option.status, page: page })
  }

  const findStatusOption = STATUS_OPTION.filter(
    (item) => option.status === item.id,
  )
  const currentSortOption =
    !findStatusOption || findStatusOption.length === 0
      ? STATUS_OPTION[0]
      : findStatusOption[0]

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

  const supportExportAction = useSupportExportActionFavorite()

  const [exportSelected, setExportSelected] = useState<
    ExportAction | undefined
  >(
    supportExportAction && supportExportAction.length > 0
      ? supportExportAction[0].action
      : undefined,
  )

  const downloadExcelUrl =
    books.page.totalRecords > 0 ? books.download : undefined
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
  return (
    <>
      <AssignmentNavBar active={'favorite'} />
      <main className={style.favorite}>
        <AlertBar>{t('t370')}</AlertBar>
        <div className={style.favorite_sort}>
          <div className={style.favorite_sort_container}>
            <Dropdown title={`${t('t383', { num: books.page.totalRecords })}`}>
              {downloadExcelUrl && (
                <DropdownItem onClick={onBookListExcelDownload}>
                  {t('t387')}
                </DropdownItem>
              )}
              {/* 
              <DropdownItem>
                <span className="color-red">{t('t388')}</span>
              </DropdownItem> */}
            </Dropdown>
            <Dropdown title={currentSortOption.label}>
              {STATUS_OPTION.map((opt) => {
                return (
                  <DropdownItem
                    key={`favorite-status-${opt.id}`}
                    onClick={() => {
                      onChangeStatus(opt.id)
                    }}>
                    {opt.label}
                  </DropdownItem>
                )
              })}
            </Dropdown>
          </div>
          {books.page.totalRecords > 0 && (
            <div className="flex gap-m">
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
            </div>
          )}
        </div>
        <div className={style.favorite_list}>
          {books.book.map((book, i) => {
            const earnPoint = book.getableRgPoint
            const isCheckMode = !!exportMode
            const isChecked = isSelectedItem(book.levelRoundId)
            const onCheckedChange = setItemSelectedChange

            return (
              <BookCover
                key={`book-cover-${i}-${book.surfaceImagePath}`}
                id={book.levelRoundId}
                target={`library`}
                bookImgSrc={book.surfaceImagePath}
                bookCode={book.levelName}
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
                isExportMode={isCheckMode}
                isExportChecked={isChecked}
                onExportCheckedChange={onCheckedChange}
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
                  onExportAction('delete-favorite')
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
