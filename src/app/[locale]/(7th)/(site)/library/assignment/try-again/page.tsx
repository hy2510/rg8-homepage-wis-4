'use client'

import {
  useFetchLibraryTryAgain,
  useOnLoadLibraryTryAgain,
} from '@/7th/_client/store/library/try-again/hook'
import { useLibraryTryAgain } from '@/7th/_client/store/library/try-again/selector'
import PaginationBar from '@/7th/_ui/common/PaginationBar'
import { AlertBar, Dropdown } from '@/7th/_ui/common/common-components'
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
  useSupportExportActionSearch,
} from '../../_fn/use-export'
import AssignmentNavBar from '../_component/AssignmentNavBar'

const STYLE_ID = 'page_try_again'

export default function Page() {
  const { loading, error } = useOnLoadLibraryTryAgain()
  if (loading) {
    return <LoadingScreen />
  }
  return <TryAgain />
}

function TryAgain() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { fetch } = useFetchLibraryTryAgain()
  const { option, payload: books } = useLibraryTryAgain()

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const onPageClick = (page: number) => {
    fetch({ page: page })
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

  const [exportSelected, setExportSelected] = useState<
    ExportAction | undefined
  >(
    supportExportAction && supportExportAction.length > 0
      ? supportExportAction[0].action
      : undefined,
  )
  return (
    <>
      <AssignmentNavBar active={'try-again'} />
      <main className={style.try_again}>
        <AlertBar>{t('t386', { num: 70 })}</AlertBar>
        {false && (
          <>
            {/* Try-Again은 일괄작업 없어서 숨김처리함 */}
            <div>
              <Dropdown
                title={`${t('t383', { num: books.page.totalRecords })}`}>
                {/* 
              * FIXME : 다운로드 기능, 전체 삭제 구현 전까지 숨김 처리 (2024. 04. 15)
              <DropdownItem>{t('t387')}</DropdownItem>
              <DropdownItem>
                <span className="color-red">{t('t388')}</span>
              </DropdownItem> */}
              </Dropdown>
            </div>
            <div
              className={style.edit}
              onClick={() => {
                setSelectMode(!isSelectMode)
              }}>
              {isSelectMode ? t('t371') : t('t372')}
            </div>
          </>
        )}
        <div className={style.try_again_list}>
          {books.book.map((book, i) => {
            const earnPoint = book.getableRgPoint
            const isExportChecked = isSelectedItem(book.levelRoundId)

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
                isExportMode={isSelectMode}
                isExportChecked={isExportChecked}
                onExportCheckedChange={setItemSelectedChange}
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
        {isSelectMode && (
          <ExportModePanel
            count={selectedItemCount}
            onExportClick={() => {
              if (exportSelected) {
                onExportAction && onExportAction(exportSelected)
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
