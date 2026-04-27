'use client'

import { useSearchTryAgainBook } from '@/8th/features/library/service/search-query'
import BookItem, {
  SkeletonBookItem,
} from '@/8th/features/library/ui/component/BookItem'
import BookInfoModal from '@/8th/features/library/ui/modal/BookInfoModal'
import { useStudent } from '@/8th/features/student/service/student-query'
import {
  BookListEmptyStateStyle,
  BookListStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import Pagenation from '@/8th/shared/ui/Pagenation'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useState } from 'react'

export default function TryAgainBookList() {
  return <LibraryBookListDependency />
}

function LibraryBookListDependency() {
  // @Language 'common'
  const { t } = useTranslation()

  const student = useStudent()

  if (student.isLoading) {
    return <></>
  }

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th041')}`}
        parentPath={SITE_PATH.NW82.ACTIVITY}
      />
      <BookList />
    </>
  )
}

function BookList() {
  const maketingEventTracker = useTrack()
  useEffect(() => {
    maketingEventTracker.eventAction('도서 섹션 탭 클릭', {
      version: '8th',
      section_name: 'Try Again',
    })
  }, [maketingEventTracker])

  // @Language 'common'
  const { t } = useTranslation()

  const student = useStudent()

  const [tryAgainSearch, setTryAgainSearch] = useState<{
    page: number
  }>({
    page: 1,
  })
  const search = useSearchTryAgainBook(tryAgainSearch)

  const [bookInfo, setBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
      }
    | undefined
  >(undefined)

  if (search.isLoading) {
    return (
      <BookListStyle>
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonBookItem key={`skeleton-${index}`} />
        ))}
      </BookListStyle>
    )
  }

  const searchCount = search.data?.page?.totalRecords || 0

  const currentPage = search.data?.page?.page || 0
  const maxPage = search.data?.page?.totalPages || 0
  const onPageClick = (page: number) => {
    setTryAgainSearch({ ...tryAgainSearch, page: page })
  }

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  return (
    <>
      <BoxStyle
        padding="10px 15px"
        backgroundColor="rgba(212, 220, 230, 0.50)"
        borderRadius={10}>
        <TextStyle fontSize="small" fontFamily="sans" fontColor="primary">
          {t('t8th042', { num: 70 })}
        </TextStyle>
      </BoxStyle>

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
                isCheckable={false}
                onClick={() => {
                  if (isStudyEnd) {
                    onStudyEndMessage()
                    return
                  }
                  setBookInfo({
                    levelRoundId: book.levelRoundId,
                    surfaceImagePath: book.surfaceImagePath,
                    title: book.topicTitle,
                    bookCode: book.levelName,
                  })
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
        </>
      ) : (
        <BookListEmptyStateStyle>
          <p>{t('t8th009')}</p>
        </BookListEmptyStateStyle>
      )}
    </>
  )
}
