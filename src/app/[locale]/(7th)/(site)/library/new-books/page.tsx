'use client'

import { useOnLoadLibraryNewBook } from '@/7th/_client/store/library/new-book/hook'
import { useLibraryNewBook } from '@/7th/_client/store/library/new-book/selector'
import { BackLink } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import VocaPrintOptions from '@/7th/_ui/modules/library-book-cover/VocaPrintOptions'
import { BookCover } from '@/7th/_ui/modules/library-book-cover/book-cover'
import {
  ExportItem,
  ExportModePanel,
} from '@/7th/_ui/modules/library-export-mode-panel/export-mode-panel'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import StudentHistorySelectModal from '../_cpnt/StudentHistorySelectModal'
import useExport, {
  ExportAction,
  useSupportExportActionSearch,
} from '../_fn/use-export'

const STYLE_ID = 'page_new_books'

export default function Page() {
  const params = useSearchParams()

  const keyword = params.get('keyword') || ''

  const { loading } = useOnLoadLibraryNewBook()

  if (loading) {
    return <LoadingScreen />
  }

  return <NewBookLayout keyword={keyword} />
}

function NewBookLayout({ keyword }: { keyword: string }) {
  const style = useStyle(STYLE_ID)

  //// @Language 'common'
  const { t } = useTranslation()

  const { option, payload: newbook } = useLibraryNewBook()

  const eBookCount = newbook.EB.length
  const pBookCount = newbook.PB.length

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
    <main className={style.search_result}>
      <div className={style.top}>
        <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
          {`${option.year}. ${option.month} New Books`}
        </BackLink>
        {eBookCount + pBookCount > 0 && (
          <div
            className={style.btn_link}
            onClick={() => setSelectMode(!isSelectMode)}>
            {isSelectMode ? t('t371') : t('t372')}
          </div>
        )}
      </div>
      {/* <Dropdown title={`${option.year}. ${option.month}`}>
        <DropdownItem> {`${option.year}. ${option.month}`}</DropdownItem>
      </Dropdown> */}

      {eBookCount > 0 && (
        <div className={style.row_a}>
          <div className={style.txt_h}>eBook({eBookCount})</div>
          <div className={style.book_list}>
            {newbook.EB.map((book, i) => {
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
          </div>
        </div>
      )}

      {pBookCount > 0 && (
        <div className={style.row_a}>
          <div className={style.txt_h}>pBook Quiz({pBookCount})</div>
          <div className={style.book_list}>
            {newbook.PB.map((book, i) => {
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
          </div>
        </div>
      )}
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
  )
}
