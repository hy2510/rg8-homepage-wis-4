'use client'

import { useFetchSpeakReport } from '@/7th/_client/store/history/speak/hook'
import { useHistorySpeak } from '@/7th/_client/store/history/speak/selector'
import {
  DateObject,
  toDateObject,
  toStringDate,
  useFetchStudyReport,
  useOnLoadStudyReport,
} from '@/7th/_client/store/history/study/hook'
import { useHistoryStudy } from '@/7th/_client/store/history/study/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { openDownloadLink, openWindow } from '@/7th/_function/open-window'
import {
  Dropdown,
  DropdownItem,
  EmptyMessage,
  PillItem,
  Pills,
} from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import VocaPrintOptions from '@/7th/_ui/modules/library-book-cover/VocaPrintOptions'
import { ReviewAssessmentReport } from '@/7th/_ui/modules/review-assessment-report/ReviewAssessmentReport'
import {
  DetailedReportItem,
  DetailedReportsList,
  SpeakReportItem,
  SpeakReportsList,
  WritingReportItem,
  WritingReportsList,
} from '@/7th/_ui/modules/review-detail-view-reports/review-detail-view-reports'
import { ReportSearchBox } from '@/7th/_ui/modules/review-detail-view-search-box/review-detail-view-search-box'
import StudentHistorySelectModal from '@/7th/site/library/_cpnt/StudentHistorySelectModal'
import useExport, {
  ExportAction,
  useSupportExportActionReport,
} from '@/7th/site/library/_fn/use-export'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import NumberUtils from '@/util/number-utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export const dynamic = 'force-dynamic'

const STYLE_ID = 'page_detailed_view'

export default function Page() {
  const router = useRouter()
  const params = useSearchParams()

  const keyword = params.get('keyword') || ''
  const startDate = params.get('startDate') || ''
  const endDate = params.get('endDate') || ''

  const { loading, redirect } = useOnLoadStudyReport({
    baseUrl: SITE_PATH.REVIEW.DETAIL,
    keyword,
    startDate,
    endDate,
  })

  useEffect(() => {
    if (redirect) {
      router.replace(redirect)
    }
  }, [redirect])

  if (loading || redirect) {
    return <LoadingScreen />
  }
  return <HistoryLayout />
}

function HistoryLayout() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const option = useHistoryStudy().custom.option

  const { fetch: fetchReport, loading: isReportLoading } = useFetchStudyReport()
  const { fetch: fetchSpeaking, loading: isSpeakingLoading } =
    useFetchSpeakReport()
  const historyStudy = useHistoryStudy().custom.payload

  const [view, setView] = useState<'read' | 'speak' | 'write'>('read')
  const [startDate, setStartDate] = useState<DateObject>(
    option.startDate ? { ...option.startDate } : toDateObject(''),
  )
  const [endDate, setEndDate] = useState<DateObject>(
    option.endDate ? { ...option.endDate } : toDateObject(''),
  )
  const [keyword, setKeyword] = useState(option.keyword || '')
  const [dateSyncKey, setDateSyncKey] = useState<number>(Date.now())

  const startDateText = toStringDate(startDate, true)
  const endDateText = toStringDate(endDate, true)

  const isHideKeyword = view === 'speak'

  const { studyOpen } = useSiteBlueprint()

  const onFirstPageReport = (
    startDate: DateObject,
    endDate: DateObject,
    isSpeak: boolean,
    status: string,
  ) => {
    if (isSpeak) {
      fetchSpeaking({
        startDate: startDate,
        endDate: endDate,
        status: 'All',
      })
    } else {
      fetchReport({
        startDate,
        endDate,
        status,
      })
    }
    setStartDate(startDate)
    setEndDate(endDate)
    setKeyword('')
  }

  const router = useRouter()
  const onSearch = (startDt: string, endDt: string, inKeyword: string) => {
    if (view !== 'speak' && inKeyword) {
      const isChange = inKeyword !== keyword
      if (isChange) {
        router.push(`${SITE_PATH.REVIEW.DETAIL}?keyword=${inKeyword}`)
      }
    } else {
      const startDateDeserial = toDateObject(startDt)
      const endDateDeserial = toDateObject(endDt)
      const isReverseDate =
        Number(
          startDt.substring(0, 4) +
            startDt.substring(5, 7) +
            startDt.substring(8, 10),
        ) >
        Number(
          endDt.substring(0, 4) +
            endDt.substring(5, 7) +
            endDt.substring(8, 10),
        )
      const pStartDate = isReverseDate ? endDateDeserial : startDateDeserial
      const pEndDate = isReverseDate ? startDateDeserial : endDateDeserial

      const isChangeDate =
        inKeyword !== keyword ||
        pStartDate.year !== startDate.year ||
        pStartDate.month !== startDate.month ||
        pStartDate.day !== startDate.day ||
        pEndDate.year !== endDate.year ||
        pEndDate.month !== endDate.month ||
        pEndDate.day !== endDate.day

      const dayDistance = DateUtils.dayDistance(
        DateUtils.createDate(toStringDate(pStartDate)),
        DateUtils.createDate(toStringDate(pEndDate)),
      )

      // 검색 기간 180일 제한,
      if (dayDistance > 180) {
        alert(t('t763')) // 180일을 초과하여 검색할 수 없습니다.
        setDateSyncKey(Date.now())
        return
      }

      if (isChangeDate) {
        const date = `${pStartDate.year}-${pStartDate.month < 10 ? '0' : ''}${pStartDate.month}-${pStartDate.day < 10 ? '0' : ''}${pStartDate.day}`
        const enddate = `${pEndDate.year}-${pEndDate.month < 10 ? '0' : ''}${pEndDate.month}-${pEndDate.day < 10 ? '0' : ''}${pEndDate.day}`
        router.push(
          `${SITE_PATH.REVIEW.DETAIL}?startDate=${date}&endDate=${enddate}`,
        )
      }
    }
  }

  const onMoreHistory = () => {
    if (view !== 'speak') {
      const { page, totalPages } = historyStudy.page
      if (page < totalPages) {
        fetchReport({ page: page + 1 })
      }
    }
  }

  return (
    <main className={style.detailed_view}>
      <ReportSearchBox
        key={dateSyncKey}
        startDate={startDateText}
        endDate={endDateText}
        isHideKeyword={isHideKeyword}
        keyword={keyword}
        isSearching={isReportLoading}
        onClickSearch={onSearch}
      />
      <div className={style.top}>
        <Dropdown
          title={
            view === 'read'
              ? 'My Read'
              : view === 'speak'
                ? 'My Speak'
                : 'Writing Activity'
          }>
          <DropdownItem
            onClick={() => {
              if (view !== 'read') {
                onFirstPageReport(
                  option.startDate || startDate,
                  option.endDate || endDate,
                  false,
                  'All',
                )
                setView('read')
              }
            }}>
            My Read
          </DropdownItem>
          {studyOpen.Speak && (
            <DropdownItem
              onClick={() => {
                if (view !== 'speak') {
                  onFirstPageReport(
                    option.startDate || startDate,
                    option.endDate || endDate,
                    true,
                    'All',
                  )
                  setView('speak')
                }
              }}>
              My Speak
            </DropdownItem>
          )}
          <DropdownItem
            onClick={() => {
              if (view !== 'write') {
                onFirstPageReport(
                  option.startDate || startDate,
                  option.endDate || endDate,
                  false,
                  'Writing',
                )
                setView('write')
              }
            }}>
            Writing Activity
          </DropdownItem>
        </Dropdown>
      </div>
      {view === 'read' && (
        <ReadList isReportLoading={isReportLoading} onMore={onMoreHistory} />
      )}
      {view === 'speak' && <SpeakList isReportLoading={isSpeakingLoading} />}
      {view === 'write' && (
        <WriteList isReportLoading={isReportLoading} onMore={onMoreHistory} />
      )}
    </main>
  )
}

function ReadList({
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
  const {
    totalCount: allCount,
    passCount: passedCount,
    failCount: failedCount,
    totalPoints: earnPoints,
    studyDays: passedDays,
  } = historyStudy.summary
  const hasMore = historyStudy.page.page < historyStudy.page.totalPages

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

  const {
    isSelectMode,
    setSelectMode,
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

  const supportExportAction = useSupportExportActionReport()

  const [exportSelected, setExportSelected] = useState<
    ExportAction | undefined
  >(
    supportExportAction && supportExportAction.length > 0
      ? supportExportAction[0].action
      : undefined,
  )

  const downloadExcelUrl = allCount > 0 ? historyStudy.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      openDownloadLink(downloadExcelUrl)
    }
  }

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

  // TODO : 개발용 Flag.  Export, Download 작업 개발:
  const isDevAction = false

  const t415 = t('t415')
  const isGrid = useScreenMode() === 'mobile'

  return (
    <>
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
              position: 'relative',
            }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <PillItem
                active={tab === 'all'}
                onClick={() => {
                  setTab('all')
                }}>
                {t('t412', { num: allCount })}
              </PillItem>
              <PillItem
                active={tab === 'passed'}
                onClick={() => {
                  setTab('passed')
                }}>
                {t('t416', {
                  num1: passedCount,
                  num2: NumberUtils.toRgDecimalPoint(earnPoints),
                })}
              </PillItem>
              <PillItem
                active={tab === 'failed'}
                onClick={() => {
                  setTab('failed')
                }}>
                {t('t414', { num: failedCount })}
              </PillItem>
            </div>
            {history.length !== 0 && !!performanceReportUrl && (
              <div
                className={style.performance_link}
                onClick={onPerformanceReportUrl}>
                Performance
              </div>
            )}
          </div>
        </Pills>
      </div>

      <div
        onClick={() => {
          setSelectMode(!isSelectMode)
        }}>
        {isDevAction && (isSelectMode ? t('t204') : t('t372'))}
        {isSelectMode && (
          <div>
            {supportExportAction.map((item) => {
              return (
                <button
                  key={item.action}
                  onClick={(e) => {
                    e.stopPropagation()
                    setExportSelected(item.action)
                  }}>
                  {`[${exportSelected === item.action ? 'O' : '_'}]`}
                  {item.label}
                </button>
              )
            })}
            <div
              onClick={(e) => {
                e.stopPropagation()
                if (exportSelected) {
                  onExportAction && onExportAction(exportSelected)
                }
              }}>
              DO Action
            </div>
          </div>
        )}
        {isDevAction && downloadExcelUrl && (
          <div onClick={onBookListExcelDownload}>{t('t765')}</div>
        )}
      </div>
      {!isReportLoading && list && list.length === 0 ? (
        <EmptyMessage>
          <div dangerouslySetInnerHTML={{ __html: t415 }}></div>
        </EmptyMessage>
      ) : (
        <DetailedReportsList isGridView={isGrid}>
          {list.map((book, i) => {
            const isCheckable = true
            const isChecked = isSelectedItem(book.studyId)
            const onCheckedChange = setItemSelectedChange

            const earnPoints = NumberUtils.toRgDecimalPoint(book.rgPoint)

            return (
              <DetailedReportItem
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
                }}
                studyId={book.studyId}
                studentHistoryId={book.studentHistoryId}
                levelRoundId={book.levelRoundId}
                isExportMode={isSelectMode}
                isExportChecked={isChecked}
                isExportCheckable={isCheckable}
                onExportCheckedChange={onCheckedChange}>
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
              </DetailedReportItem>
            )
          })}
        </DetailedReportsList>
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

function WriteList({
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
              writingScore={book.scoreStep5 ? book.scoreStep5.toString() : '-'}
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

function SpeakList({ isReportLoading }: { isReportLoading: boolean }) {
  // @Language 'common'
  const { t } = useTranslation()

  const history = useHistorySpeak().payload

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')
  const allCount = history.length
  const { passedCount } = useMemo(() => {
    let passedCount = 0
    history.forEach((item) => {
      if (item.speakPassYn) {
        passedCount++
      }
    })
    return {
      passedCount,
    }
  }, [history])
  const failedCount = allCount - passedCount

  const list = history.filter((item) => {
    if (tab === 'passed') {
      return item.speakPassYn
    } else if (tab === 'failed') {
      return !item.speakPassYn
    } else {
      return true
    }
  })

  const t415 = t('t415')

  return (
    <>
      <Pills>
        <PillItem active={tab === 'all'} onClick={() => setTab('all')}>
          {t('t412', { num: allCount })}
        </PillItem>
        <PillItem active={tab === 'passed'} onClick={() => setTab('passed')}>
          {t('t413', { num: passedCount })}
        </PillItem>
        <PillItem active={tab === 'failed'} onClick={() => setTab('failed')}>
          {t('t414', { num: failedCount })}
        </PillItem>
      </Pills>
      {!isReportLoading && list && list.length === 0 ? (
        <EmptyMessage>
          <div dangerouslySetInnerHTML={{ __html: t415 }}></div>
        </EmptyMessage>
      ) : (
        <>
          <SpeakReportsList>
            {list.map((a, i) => {
              return (
                <SpeakReportItem
                  key={`speak-item-${a.levelName}-${i}`}
                  imgSrc={a.surfaceImagePath}
                  bookCode={a.levelName}
                  title={a.title}
                  studyDate={a.speakDate}
                  totalScore={a.average}
                  isPassed={a.speakPassYn}
                  completedInfo={''}
                  earnPoints={a.rgPoint}
                />
              )
            })}
          </SpeakReportsList>
          {/* <Pagination>
        <PaginationItem active={true}>1</PaginationItem>
      </Pagination> */}
        </>
      )}
    </>
  )
}
