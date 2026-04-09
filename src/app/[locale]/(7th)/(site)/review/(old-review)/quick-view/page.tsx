'use client'

import {
  useFetchStudyReportRange,
  useOnLoadStudyReporQuick,
} from '@/7th/_client/store/history/study/hook'
import { useHistoryStudy } from '@/7th/_client/store/history/study/selector'
import { openWindow } from '@/7th/_function/open-window'
import {
  Dropdown,
  DropdownItem,
  EmptyMessage,
  PillItem,
  Pills,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import { ReviewAssessmentReport } from '@/7th/_ui/modules/review-assessment-report/ReviewAssessmentReport'
import {
  QuickReportItem,
  QuickReportsList,
} from '@/7th/_ui/modules/review-quick-view-reports/QuickReportItem'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import { useState } from 'react'

const STYLE_ID = 'page_quick_view'

export default function Page() {
  const { loading } = useOnLoadStudyReporQuick()

  if (loading) {
    return <LoadingScreen />
  }
  return <HistoryLayout />
}

function HistoryLayout() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const history = useHistoryStudy().range.payload.history
  const option = useHistoryStudy().range.option
  const historyStudy = useHistoryStudy().range.payload

  const { fetch: fetchReport } = useFetchStudyReportRange()

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')
  const {
    totalCount: allCount,
    passCount: passedCount,
    failCount: failedCount,
    totalPoints: earnPoints,
    studyDays: passedDays,
  } = historyStudy.summary

  const [range, setRange] = useState(option.range)
  const onRangeChange = (range: 1 | 7 | 14 | 30) => {
    setRange(range)
    fetchReport({ range, status: option.status })
  }

  const [selectedBookInfo, setSelectBookInfo] = useState<string | undefined>(
    undefined,
  )

  const performanceReportUrl = historyStudy.performanceReport
  const onPerformanceReportUrl = () => {
    if (performanceReportUrl) {
      openWindow(performanceReportUrl, {
        external: true,
        target: '_blank',
        feature: 'noopener, noreferrer',
      })
    }
  }

  const hasMore = historyStudy.page.page < historyStudy.page.totalPages
  const onMoreHistory = () => {
    const { page, totalPages } = historyStudy.page
    if (page < totalPages) {
      fetchReport({ page: page + 1 })
    }
  }

  const t415 = t('t415')

  return (
    <main className={style.quick_view}>
      <div className={style.top}>
        {/* 오늘 */}
        <Dropdown title={range === 1 ? t('t761') : t('t408', { num: range })}>
          <DropdownItem onClick={() => onRangeChange(1)}>
            {/* 오늘 */}
            {t('t761', { num: 1 })}
          </DropdownItem>
          <DropdownItem onClick={() => onRangeChange(7)}>
            {t('t408', { num: 7 })}
          </DropdownItem>
          <DropdownItem onClick={() => onRangeChange(14)}>
            {t('t408', { num: 14 })}
          </DropdownItem>
          <DropdownItem onClick={() => onRangeChange(30)}>
            {t('t408', { num: 30 })}
          </DropdownItem>
        </Dropdown>
      </div>
      <div>
        <div className={style.days}>
          <div className={style.days_data}>
            {/* 학습일수 */}• {t('t762')} {passedDays} days
          </div>
        </div>
        <Pills>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '15px',
            }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PillItem active={tab === 'all'} onClick={() => setTab('all')}>
                {`${t('t412', { num: allCount })}`}
              </PillItem>
              <PillItem
                active={tab === 'passed'}
                onClick={() => setTab('passed')}>
                {`${t('t413', { num: passedCount })}`}
              </PillItem>
              <PillItem
                active={tab === 'failed'}
                onClick={() => setTab('failed')}>
                {`${t('t414', { num: failedCount })}`}
              </PillItem>
            </div>
            {history.length !== 0 && (
              <div
                className={style.performance_link}
                onClick={onPerformanceReportUrl}>
                Performance
              </div>
            )}
          </div>
        </Pills>
      </div>

      {!history || history.length === 0 ? (
        <EmptyMessage>
          <div dangerouslySetInnerHTML={{ __html: t415 }}></div>
        </EmptyMessage>
      ) : (
        <QuickReportsList>
          {history
            .filter((item) => {
              if (tab === 'passed') {
                return item.average >= 70
              } else if (tab === 'failed') {
                return item.average < 70
              } else {
                return <tr></tr>
              }
            })
            .map((book, i) => {
              const earnPoints = NumberUtils.toRgDecimalPoint(book.rgPoint)

              return (
                <QuickReportItem
                  key={`history_${book.completeDate}_${book.bookId}_${i}`}
                  title={book.title}
                  bookCode={book.levelName}
                  isPassed={book.average >= 70}
                  imgSrc={book.surfaceImagePath}
                  studyDate={book.completeDate}
                  totalScore={book.average}
                  completedInfo={book.fullEasyName}
                  earnPoints={earnPoints}
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
                </QuickReportItem>
              )
            })}
        </QuickReportsList>
      )}
      {/* <Pagination>
        <PaginationItem active={true}>1</PaginationItem>
      </Pagination> */}
      {hasMore && (
        <p className={style.more}>
          <button onClick={() => onMoreHistory()}>MORE</button>
        </p>
      )}
    </main>
  )
}
