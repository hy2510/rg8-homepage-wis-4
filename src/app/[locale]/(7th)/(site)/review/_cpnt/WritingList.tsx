'use client'

import { useHistoryStudy } from '@/7th/_client/store/history/study/selector'
import {
  EmptyMessage,
  PillItem,
  Pills,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import { ReviewAssessmentReport } from '@/7th/_ui/modules/review-assessment-report/ReviewAssessmentReport'
import {
  WritingReportItem,
  WritingReportsList,
} from '@/7th/_ui/modules/review-detail-view-reports/review-detail-view-reports'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import { useMemo, useState } from 'react'

const STYLE_ID = 'page_review_view'

export default function WritingList({
  isReportLoading,
  onMore,
}: {
  isReportLoading: boolean
  onMore?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')

  const historyStudy = useHistoryStudy().custom.payload
  const history = historyStudy.history
  const hasMore = historyStudy.page.page < historyStudy.page.totalPages

  const allCount = history.length
  const { passedCount, earnPoints } = useMemo(() => {
    let passedCount = 0
    let earnPoints = 0.0
    history.forEach((item) => {
      if (item.average >= 70) {
        passedCount++
        earnPoints += item.rgPoint
      }
    })
    return {
      passedCount,
      earnPoints,
    }
  }, [history])
  const failedCount = allCount - passedCount

  const list = history.filter((item) => {
    if (tab === 'passed') {
      return item.average >= 70
    } else if (tab === 'failed') {
      return item.average < 70
    } else {
      return true
    }
  })

  const [selectedBookInfo, setSelectBookInfo] = useState<string | undefined>(
    undefined,
  )

  const t415 = t('t415')

  return (
    <>
      <Pills>
        <PillItem
          active={tab === 'all'}
          onClick={() => {
            setTab('all')
          }}>
          {t('t412', { num: allCount })}
        </PillItem>
        {/* <PillItem
            active={tab === 'passed'}
            onClick={() => {
              setTab('passed')
            }}>
            {t('t413', { num: passedCount })}
          </PillItem>
          <PillItem
            active={tab === 'failed'}
            onClick={() => {
              setTab('failed')
            }}>
            {t('t414', { num: failedCount })}
          </PillItem> */}
      </Pills>
      {!isReportLoading && list && list.length === 0 ? (
        <EmptyMessage>
          <div dangerouslySetInnerHTML={{ __html: t415 }}></div>
        </EmptyMessage>
      ) : (
        <WritingReportsList>
          {list.map((book, i) => {
            let statusInfo = '-'
            if (book.revisionStatusCode === '028009') {
              statusInfo = 'Comp. R'
            } else if (book.revisionStatusCode === '028003') {
              statusInfo = 'On Revision'
            }
            const earnPoints = NumberUtils.toRgDecimalPoint(book.rgPoint)

            return (
              <WritingReportItem
                key={`history_${book.completeDate}_${book.bookId}_${i}`}
                title={book.title}
                bookCode={book.levelName}
                isPassed={book.average >= 70}
                imgSrc={book.surfaceImagePath}
                studyDate={book.completeDate}
                totalScore={book.average}
                completedInfo={statusInfo}
                writingScore={
                  book.scoreStep5 ? book.scoreStep5.toString() : '-'
                }
                onClick={() => {
                  setSelectBookInfo(book.studyId)
                }}>
                {selectedBookInfo && selectedBookInfo === book.studyId && (
                  <ReviewAssessmentReport
                    studyId={book.studyId}
                    studentHistoryId={book.studentHistoryId}
                    levelRoundId={book.levelRoundId}
                    title={book.title}
                    bookImgSrc={book.surfaceImagePath}
                    bookCode={book.levelName}
                    studyDate={book.completeDate}
                    totalScore={book.average}
                    isPassed={book.average >= 70}
                    completedInfo={book.fullEasyName}
                    earnPoints={earnPoints}
                    onClickDelete={() => {
                      setSelectBookInfo(undefined)
                    }}
                  />
                )}
              </WritingReportItem>
            )
          })}
        </WritingReportsList>
      )}
      {/* <Pagination>
          <PaginationItem active={true}>1</PaginationItem>
        </Pagination> */}
      {hasMore && (
        <p className={style.more}>
          <button onClick={() => onMore && onMore()}>MORE</button>
        </p>
      )}
    </>
  )
}
