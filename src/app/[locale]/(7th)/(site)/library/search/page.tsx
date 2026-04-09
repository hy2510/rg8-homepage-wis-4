'use client'

import {
  useFetchLibrarySearchKeyword,
  useFetchLibrarySearchKeywordFirst,
  useOnClearLibrarySearchKeyword,
} from '@/7th/_client/store/library/search/hook'
import { useLibrarySearch } from '@/7th/_client/store/library/search/selector'
import {
  BackLink,
  EmptyMessage,
  Nav,
  NavItem,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import VocaPrintOptions from '@/7th/_ui/modules/library-book-cover/VocaPrintOptions'
import { BookCover } from '@/7th/_ui/modules/library-book-cover/book-cover'
import {
  ExportItem,
  ExportModePanel,
} from '@/7th/_ui/modules/library-export-mode-panel/export-mode-panel'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import StudentHistorySelectModal from '../_cpnt/StudentHistorySelectModal'
import useExport, {
  ExportAction,
  useSupportExportActionSearch,
} from '../_fn/use-export'

const STYLE_ID = 'page_search'

export default function Page() {
  const params = useSearchParams()

  const keyword = params.get('keyword') || ''

  useOnClearLibrarySearchKeyword(keyword)

  return <SearchLayout keyword={keyword} />
}

function SearchLayout({ keyword }: { keyword: string }) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { EB: ebook, PB: pbook } = useLibrarySearch()

  const { fetch: fetchChangeKeyword, loading: firstSearchLoading } =
    useFetchLibrarySearchKeywordFirst()
  const { fetch: fetchMoreBook } = useFetchLibrarySearchKeyword()
  useEffect(() => {
    fetchChangeKeyword(keyword)
    setSelectMode(false)
  }, [keyword])

  const onMoreBook = (bookType: string) => {
    const page =
      bookType === 'EB' ? ebook.payload.page.page : pbook.payload.page.page
    fetchMoreBook({ bookType, keyword, page: page + 1 })
  }

  const eBookCount = ebook.payload.page.totalRecords
  const pBookCount = pbook.payload.page.totalRecords

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)
  const [tab, setTab] = useState<'ebook' | 'pbook'>('ebook')
  const [mainTab, setMainTab] = useState<'ebook' | 'pbook'>('ebook')
  if (eBookCount === 0 && pBookCount > 0 && tab === 'ebook') {
    setTab('pbook')
  } else if (eBookCount > 0 && pBookCount === 0 && tab === 'pbook') {
    setTab('ebook')
  } else if (eBookCount > 0 && pBookCount > 0 && mainTab !== tab) {
    setTab(mainTab)
  }

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
          <div>{`${keyword} ${t('t265')}`}</div>
        </BackLink>
        {eBookCount + pBookCount > 0 && (
          <div
            className={style.btn_link}
            onClick={() => setSelectMode(!isSelectMode)}>
            {isSelectMode ? t('t371') : t('t372')}
          </div>
        )}
      </div>
      {!firstSearchLoading && eBookCount <= 0 && pBookCount <= 0 ? (
        <EmptyMessage>
          <div dangerouslySetInnerHTML={{ __html: t('t391') }}></div>
        </EmptyMessage>
      ) : (
        <Nav>
          {eBookCount > 0 && (
            <NavItem
              active={tab === 'ebook'}
              onClick={() => {
                setTab('ebook')
                setMainTab('ebook')
              }}>{`eBook(${ebook.payload.page.totalRecords})`}</NavItem>
          )}
          {pBookCount > 0 && (
            <NavItem
              active={tab === 'pbook'}
              onClick={() => {
                setTab('pbook')
                setMainTab('pbook')
              }}>{`pBook Quiz(${pbook.payload.page.totalRecords})`}</NavItem>
          )}
        </Nav>
      )}
      {eBookCount > 0 && tab === 'ebook' && (
        <div className={style.row_a}>
          <div className={style.book_list}>
            {/* BookCover */}
            {ebook.payload.book.map((book, i) => {
              const earnPoint = book.getableRgPoint
              const bookCode = book.levelName

              const isExportChecked = isSelectedItem(book.levelRoundId)

              return (
                <BookCover
                  key={`book-cover-eb-${i}-${book.surfaceImagePath}`}
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
          {ebook.payload.page.page < ebook.payload.page.totalPages && (
            <p className={style.more}>
              <button onClick={() => onMoreBook('EB')}>MORE</button>
            </p>
          )}
        </div>
      )}
      {pBookCount > 0 && tab === 'pbook' && (
        <div className={style.row_b}>
          <div className={style.book_list}>
            {/* BookCover */}
            {pbook.payload.book.map((book, i) => {
              const earnPoint = book.getableRgPoint
              const bookCode = book.levelName

              const isExportChecked = isSelectedItem(book.levelRoundId)

              return (
                <BookCover
                  key={`book-cover-pb-${i}-${book.surfaceImagePath}`}
                  id={book.levelRoundId}
                  target={`library`}
                  bookImgSrc={book.surfaceImagePath}
                  bookCode={bookCode}
                  earnPoint={earnPoint}
                  title={book.topicTitle}
                  author={book.author}
                  isBookInfo={bookInfo === book.levelRoundId}
                  onClickBookDetail={() => {
                    setBookInfo(bookInfo ? undefined : book.levelRoundId)
                  }}
                  passedCount={book.rgPointCount}
                  isMovieBook={!!book.animationPath}
                  isAssignedTodo={!book.addYn}
                  levelRoundId={book.levelRoundId}
                  isExportMode={isSelectMode}
                  isExportChecked={isExportChecked}
                  onExportCheckedChange={setItemSelectedChange}
                  grade={book.recommendedAge}
                />
              )
            })}
          </div>
          {pbook.payload.page.page < pbook.payload.page.totalPages && (
            <p className={style.more}>
              <button onClick={() => onMoreBook('PB')}>MORE</button>
            </p>
          )}
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
