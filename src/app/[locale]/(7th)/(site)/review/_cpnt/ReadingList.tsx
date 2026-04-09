'use client'

import {
  useFetchStudyReportFailed,
  useFetchStudyReportPassed,
} from '@/7th/_client/store/history/study/hook'
import { useHistoryStudy } from '@/7th/_client/store/history/study/selector'
import { openDownloadLink, openWindow } from '@/7th/_function/open-window'
import { StudyReport } from '@/7th/_repository/client/object/study-report'
import {
  EmptyMessage,
  PillItem,
  Pills,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import VocaPrintOptions from '@/7th/_ui/modules/library-book-cover/VocaPrintOptions'
import {
  ExportItem,
  ExportModePanel,
} from '@/7th/_ui/modules/library-export-mode-panel/export-mode-panel'
import { ReviewAssessmentReport } from '@/7th/_ui/modules/review-assessment-report/ReviewAssessmentReport'
import {
  DetailedReportItem,
  DetailedReportsList,
} from '@/7th/_ui/modules/review-detail-view-reports/review-detail-view-reports'
import StudentHistorySelectModal from '@/7th/site/library/_cpnt/StudentHistorySelectModal'
import useExport, {
  ExportAction,
  useSupportExportActionReport,
} from '@/7th/site/library/_fn/use-export'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import { useState } from 'react'

const STYLE_ID = 'page_review_view'

export default function ReadingList({
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

  const [passedPage, setPassedPage] = useState<{
    page: number
    totalPages: number
  }>({ page: 0, totalPages: 0 })
  const [passedList, setPassedList] = useState<StudyReport[]>([])
  const { fetch: fetchPassed, loading: isPassedLoading } =
    useFetchStudyReportPassed()

  const [failedPage, setFailedPage] = useState<{
    page: number
    totalPages: number
  }>({ page: 0, totalPages: 0 })
  const [failedList, setFailedList] = useState<StudyReport[]>([])
  const { fetch: fetchFailed, loading: isFailedLoading } =
    useFetchStudyReportFailed()

  let list: StudyReport[]
  let hasMore: boolean
  if (tab === 'passed') {
    list = passedList
    hasMore = passedPage.page > 0 && passedPage.page < passedPage.totalPages
  } else if (tab === 'failed') {
    list = failedList
    hasMore = failedPage.page > 0 && failedPage.page < failedPage.totalPages
  } else {
    list = history
    hasMore = historyStudy.page.page < historyStudy.page.totalPages
  }

  const [selectedBookInfo, setSelectBookInfo] = useState<string | undefined>(
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

  const [isGridList, setIsGridList] = useState(true)

  const t415 = t('t415')

  const onPassed = (page: number) => {
    if (passedPage.page > 0 && passedPage.page === page) {
      setTab('passed')
      return
    }
    if (isPassedLoading) {
      return
    }
    fetchPassed({
      page,
      callback: (isSuccess, payload, error) => {
        if (isSuccess) {
          setTab('passed')
          setPassedPage({
            page: payload!.page.page,
            totalPages: payload!.page.totalPages,
          })
          setPassedList([...passedList, ...payload!.history])
        } else {
        }
      },
    })
  }

  const onFailed = (page: number) => {
    if (failedPage.page > 0 && failedPage.page === page) {
      setTab('failed')
      return
    }
    if (isFailedLoading) {
      return
    }
    fetchFailed({
      page,
      callback: (isSuccess, payload, error) => {
        if (isSuccess) {
          setTab('failed')
          setFailedPage({
            page: payload!.page.page,
            totalPages: payload!.page.totalPages,
          })
          setFailedList([...failedList, ...payload!.history])
        } else if (isSuccess) {
        }
      },
    })
  }

  const onMoreList = () => {
    if (tab === 'passed') {
      onPassed(passedPage.page + 1)
    } else if (tab === 'failed') {
      onFailed(failedPage.page + 1)
    } else {
      if (onMore) {
        onMore()
      }
    }
  }

  return (
    <>
      <div>
        <div className={style.study_days_count}>
          <div>
            {/* 학습일수 */} {t('t762')} : {passedDays}
          </div>
          <div className={style.change_list_type_menu}>
            <div
              className={`${style.grid_menu_button} ${isGridList && style.active}`}
              onClick={() => {
                setIsGridList(true)
              }}></div>
            <div
              className={`${style.list_menu_button} ${!isGridList && style.active}`}
              onClick={() => {
                setIsGridList(false)
              }}></div>
          </div>
        </div>
        <Pills>
          <div className={style.pills_container}>
            <div className={style.pill_group}>
              <PillItem
                active={tab === 'all'}
                onClick={() => {
                  if (tab !== 'all') {
                    setTab('all')
                    setSelectMode(false)
                  }
                }}>
                {t('t412', { num: allCount })}
              </PillItem>
              <PillItem
                active={tab === 'passed'}
                onClick={() => {
                  if (tab !== 'passed') {
                    onPassed(passedPage.page)
                    setSelectMode(false)
                  }
                }}>
                {t('t416', {
                  num1: passedCount,
                  num2: NumberUtils.toRgDecimalPoint(earnPoints),
                })}
              </PillItem>
              <PillItem
                active={tab === 'failed'}
                onClick={() => {
                  if (tab !== 'failed') {
                    onFailed(failedPage.page)
                    setSelectMode(false)
                  }
                }}>
                {t('t414', { num: failedCount })}
              </PillItem>
            </div>
            <div className={style.extra_menu}>
              {!isSelectMode &&
                history.length !== 0 &&
                !!performanceReportUrl && (
                  <div
                    className={`${style.extra_link} ${style.performance_link}`}
                    onClick={onPerformanceReportUrl}>
                    Performance
                  </div>
                )}
              {false && !isSelectMode && downloadExcelUrl && (
                <div
                  className={style.extra_link}
                  onClick={onBookListExcelDownload}>
                  {t('t765')}
                </div>
              )}
              {history.length !== 0 && (
                <div
                  className={style.extra_link}
                  onClick={() => {
                    setSelectMode(!isSelectMode)
                  }}>
                  {isSelectMode ? t('t204') : t('t372')}
                </div>
              )}
            </div>
          </div>
        </Pills>
      </div>
      {!isReportLoading &&
      !isFailedLoading &&
      !isPassedLoading &&
      list &&
      list.length === 0 ? (
        <EmptyMessage>
          <div dangerouslySetInnerHTML={{ __html: t415 }}></div>
        </EmptyMessage>
      ) : (
        <DetailedReportsList isGridView={isGridList}>
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
          <button onClick={() => onMoreList()}>MORE</button>
        </p>
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
    </>
  )
}
