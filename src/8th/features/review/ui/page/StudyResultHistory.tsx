'use client'

import { Assets } from '@/8th/assets/asset-library'
import {
  useExportReport,
  useExportVocabulary,
  useExportWorksheet,
} from '@/8th/features/export/service/export-query'
import PrintVocabularyModal from '@/8th/features/library/ui/modal/PrintVocabularyModal'
import { HistoryStudy } from '@/8th/features/review/model/history-study'
import {
  useHistoryBookDetailInfo,
  useHistoryReadingInfinite,
} from '@/8th/features/review/service/history-query'
import {
  ActionBarDropdownItem,
  ReviewActionBar,
} from '@/8th/features/review/ui/component/ReviewActionBar'
import ReviewBookItem from '@/8th/features/review/ui/component/ReviewItem'
import {
  useStudent,
  useStudentHistoryList,
} from '@/8th/features/student/service/student-query'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import {
  VocabularyOption,
  useExportPanelReport,
} from '@/8th/shared/hook/useExportPanel'
import useStartStudy from '@/8th/shared/hook/useStartStudy'
import {
  BookListDateGroupStyle,
  ReviewListStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { GapStyle } from '@/8th/shared/styled/SharedStyled'
import { RoundedFullButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import { openWindow } from '@/8th/shared/utils/open-window'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function StudyResultHistory({
  startDate,
  endDate,
  keyword,
}: {
  startDate?: string
  endDate?: string
  keyword?: string
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const onChangeDate = (startDate: string, endDate: string) => {
    router.replace(
      `${SITE_PATH.NW82.REVIEW}?startDate=${startDate}&endDate=${endDate}`,
    )
  }

  const onChangeKeyword = (keyword: string) => {
    router.replace(`${SITE_PATH.NW82.REVIEW}?keyword=${keyword}`)
  }

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th047')}`}
        parentPath={SITE_PATH.NW82.ACTIVITY}
      />
      <StudyResultHistoryList
        startDate={startDate}
        endDate={endDate}
        keyword={keyword}
        onChangeDate={onChangeDate}
        onChangeKeyword={onChangeKeyword}
      />
    </>
  )
}

type StudyHistoryBookExportType =
  | 'none'
  | 'Vocabulary'
  | 'Report'
  | 'Worksheets'

function StudyResultHistoryList({
  startDate,
  endDate,
  keyword,
  onChangeDate,
  onChangeKeyword,
}: {
  startDate?: string
  endDate?: string
  keyword?: string
  onChangeDate?: (startDate: string, endDate: string) => void
  onChangeKeyword?: (keyword: string) => void
}) {
  const { menu, setting } = useCustomerConfiguration()

  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const [exportMode, setExportMode] =
    useState<StudyHistoryBookExportType>('none')
  const {
    selectedItemCount,
    setSelectItemChange,
    resetSelectedItem,
    isSelectedItem,
    onActionVocabulary,
    onActionReport,
    onActionWorksheets,
  } = useExportPanelReport()

  const [status, setStatus] = useState<'All' | 'Passed' | 'Failed'>('All')
  // const [page, setPage] = useState<number>(1)

  const [vocabularyOption, setVocabularyOption] = useState<boolean>(false)

  const allHistory = useHistoryReadingInfinite({
    startDate: startDate,
    endDate: endDate,
    keyword: keyword,
    status: 'All',
    page: 1,
  })
  const history = useHistoryReadingInfinite({
    startDate: startDate,
    endDate: endDate,
    keyword: keyword,
    status: status,
  })

  const student = useStudent()
  const { mutate: exportVocabulary } = useExportVocabulary()
  const { mutate: exportReport } = useExportReport()
  const { mutate: exportWorksheets } = useExportWorksheet()

  const studentHistory = useStudentHistoryList()

  const defaultStudentHistoryId =
    studentHistory.data?.list && studentHistory.data?.list.length > 0
      ? studentHistory.data.list[0].studentHistoryId
      : ''

  const [singleItemVocabularyOption, setSingleItemVocabularyOption] = useState<
    | {
        levelRoundId: string
        studyId: string
        studentHistoryId: string
      }
    | undefined
  >(undefined)
  const [selectedBookInfo, setSelectedBookInfo] = useState<
    | {
        levelRoundId: string
        studyId: string
        studentHistoryId: string
      }
    | undefined
  >(undefined)
  const { data: bookInfo } = useHistoryBookDetailInfo(
    {
      levelRoundId: selectedBookInfo?.levelRoundId || '',
      studyId: selectedBookInfo?.studyId || '',
      studentHistoryId: selectedBookInfo?.studentHistoryId || '',
    },
    {
      enabled: !!selectedBookInfo,
    },
  )
  const { onStartStudy } = useStartStudy('review')

  if (studentHistory.isLoading) {
    return <div></div>
  }
  if (allHistory.isLoading) {
    return <div>Loading...</div>
  }
  if (!allHistory.data) {
    return <div>No data</div>
  }

  const summary = allHistory.data?.pages[0].summary
  const performanceReportUrl = allHistory.data?.pages[0].performanceReport

  const dateOrderList: { id: string; date: string; list: HistoryStudy[] }[] = []
  if (!history.isError && history.data) {
    history.data.pages.forEach((page) => {
      page.history.forEach((history, i) => {
        if (i === 0) {
          dateOrderList.push({
            id: `${history.completeDate}-${page.history.length}-${history.studyId}-${history.no}`,
            date: history.completeDate,
            list: [history],
          })
        } else if (
          dateOrderList[dateOrderList.length - 1].date === history.completeDate
        ) {
          dateOrderList[dateOrderList.length - 1].list.push(history)
        } else {
          dateOrderList.push({
            id: `${history.completeDate}-${page.history.length}-${history.studyId}-${history.no}`,
            date: history.completeDate,
            list: [history],
          })
        }
      })
    })
  }

  let searchTitle = ''
  if (keyword) {
    searchTitle = `${t('t8th048')}: ${keyword}`
  } else if (startDate && endDate) {
    const dayDistance = DateUtils.dayDistance(
      DateUtils.createDate(startDate),
      DateUtils.createDate(endDate),
      true,
    )
    if (!allHistory.isFetching && summary.studyDays > 0) {
      searchTitle = `${t('t8th050', { num1: dayDistance, num2: summary.studyDays })}`
    } else {
      searchTitle = `${t('t8th049', { num: dayDistance })}`
    }
  }

  const onDateSearch = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return

    setStatus('All')
    if (onChangeDate) {
      onChangeDate(startDate.replace(/-/g, ''), endDate.replace(/-/g, ''))
    }
  }
  const onKeywordSearch = (keyword: string) => {
    if (!keyword) return

    setStatus('All')
    if (onChangeKeyword) {
      onChangeKeyword(keyword)
    }
  }

  const historyTypeText = t('t8th067')
  const historyTypeItems: ActionBarDropdownItem[] = []
  if (menu.activity.result.read.open) {
    historyTypeItems.push({
      key: 'HistoryTypeReading',
      label: t('t8th067'),
      isActive: true,
    })
  }
  if (menu.activity.result.speak.open) {
    historyTypeItems.push({
      key: 'HistoryTypeSpeaking',
      label: t('t8th068'),
      isActive: false,
    })
  }
  if (menu.activity.result.write.open) {
    historyTypeItems.push({
      key: 'HistoryTypeWriting',
      label: t('t8th069'),
      isActive: false,
    })
  }

  const onHistoryTypeItemClick = (item: ActionBarDropdownItem) => {
    let pStartDate = startDate?.replace(/-/g, '')
    let pEndDate = endDate?.replace(/-/g, '')
    if (!pStartDate || !pEndDate) {
      const today = new Date()
      const tmpDate = new Date()
      tmpDate.setDate(tmpDate.getDate() - 14)
      pStartDate = DateUtils.toStringDate(tmpDate, {
        divide: '',
        digitfix: true,
      })
      pEndDate = DateUtils.toStringDate(today, { divide: '', digitfix: true })
    }

    if (item.key === 'HistoryTypeReading') {
    } else if (item.key === 'HistoryTypeWriting') {
      router.replace(
        `${SITE_PATH.NW82.REVIEW_WRITE}?startDate=${pStartDate}&endDate=${pEndDate}`,
      )
    } else if (item.key === 'HistoryTypeSpeaking') {
      router.replace(
        `${SITE_PATH.NW82.REVIEW_SPEAK}?startDate=${pStartDate}&endDate=${pEndDate}`,
      )
    }
  }

  const isExportMode = exportMode !== 'none'
  const onChangeExportMode = (item: StudyHistoryBookExportType) => {
    setExportMode(item)
    if (item === 'none') {
      resetSelectedItem()
    }
  }
  const onConfirmVocabularyOption = (vocabularyOption: VocabularyOption) => {
    const studentHistoryId = defaultStudentHistoryId

    onActionVocabulary(
      {
        studentHistoryId,
        vocabularyOption,
      },
      (success, url, error) => {
        if (success) {
          onChangeExportMode('none')
          setVocabularyOption(false)
          openWindow(url, {
            external: true,
            target: '_blank',
            feature: 'noopener, noreferrer',
          })
        } else if (error) {
          alert(error)
        } else {
          onChangeExportMode('none')
          setVocabularyOption(false)
        }
      },
    )
  }
  const onConfirmExport = () => {
    if (selectedItemCount > 0) {
      if (exportMode === 'Vocabulary') {
        setVocabularyOption(true)
      } else if (exportMode === 'Report') {
        onActionReport((success, url, error) => {
          if (success) {
            openWindow(url, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
            onChangeExportMode('none')
          } else if (error) {
            alert(error)
          } else {
            onChangeExportMode('none')
          }
        })
      } else if (exportMode === 'Worksheets') {
        onActionWorksheets((success, url, error) => {
          if (success) {
            openWindow(url, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
            onChangeExportMode('none')
          } else if (error) {
            alert(error)
          } else {
            onChangeExportMode('none')
          }
        })
      }
    }
  }

  const exportItems: ActionBarDropdownItem[] = []
  if (setting.printVocabulary) {
    exportItems.push({
      key: 'ExportVocabulary',
      label: t('t8th027'),
      isActive: true,
    })
  }
  if (setting.printReport) {
    exportItems.push({
      key: 'ExportReport',
      label: t('t8th070'),
      isActive: true,
    })
  }
  if (setting.printWorksheet) {
    exportItems.push({
      key: 'ExportWorksheets',
      label: t('t8th071'),
      isActive: true,
    })
  }
  if (performanceReportUrl && setting.printReport) {
    exportItems.push(
      { key: '--' },
      { key: 'ExportPerformance', label: t('t8th072'), isActive: true },
    )
  }

  const onExportItemClick = (item: ActionBarDropdownItem) => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    if (item.key !== 'ExportPerformance') {
      setExportMode(item.key.substring(6) as StudyHistoryBookExportType)
    } else {
      if (performanceReportUrl) {
        openWindow(performanceReportUrl, {
          external: true,
          target: '_blank',
          feature: 'noopener, noreferrer',
        })
      }
    }
  }

  const onSingleItemVocabulary = (
    levelRoundId: string,
    studentHistoryId: string,
    vocabularyOption?: VocabularyOption,
  ) => {
    exportVocabulary(
      {
        levelRoundIds: [levelRoundId],
        studentHistoryId,
        vocabularyOption: vocabularyOption ?? undefined,
      },
      {
        onSettled: (data, error, variables) => {
          if (!!data && !error) {
            openWindow(data, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
            setSingleItemVocabularyOption(undefined)
          } else if (error) {
            alert(error)
          } else {
            setSingleItemVocabularyOption(undefined)
          }
        },
      },
    )
  }

  const onSingleItemReport = (studyId: string, studentHistoryId: string) => {
    exportReport(
      {
        studyIds: [studyId],
        studentHistoryIds: [studentHistoryId],
      },
      {
        onSettled: (data, error, variables) => {
          if (!!data && !error) {
            openWindow(data, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
          } else if (error) {
            alert(error)
          } else {
          }
        },
      },
    )
  }

  const onSingleItemWorksheets = (levelName: string) => {
    exportWorksheets(
      {
        levelNames: [levelName],
      },
      {
        onSettled: (data, error, variables) => {
          if (!!data && !error) {
            openWindow(data, {
              external: true,
              target: '_blank',
              feature: 'noopener, noreferrer',
            })
          } else if (error) {
            alert(error)
          } else {
          }
        },
      },
    )
  }

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  const actionbarDropdowns: React.ComponentProps<
    typeof ReviewActionBar
  >['dropdowns'] = []
  if (historyTypeItems.length > 0) {
    actionbarDropdowns.push({
      title: historyTypeText,
      isTitleBlack: true,
      isActiveMakerVisible: true,
      items: historyTypeItems,
      onItemClick: onHistoryTypeItemClick,
    })
  }
  if (exportItems.length > 0) {
    actionbarDropdowns.push({
      title: t('t8th014'),
      items: exportItems,
      onItemClick: onExportItemClick,
    })
  }

  return (
    <>
      <BoxStyle
        padding="10px 15px"
        backgroundColor="rgba(212, 220, 230, 0.50)"
        borderRadius={10}>
        <TextStyle fontSize="small" fontFamily="sans" fontColor="primary">
          {t('t8th051', { num: 50 })}
        </TextStyle>
      </BoxStyle>

      <ReviewListStyle>
        <ReviewActionBar
          key={`actionbar_${startDate}_${endDate}_${keyword}`}
          title={searchTitle}
          startDate={startDate}
          endDate={endDate}
          keyword={keyword}
          searchOptionOpen={!allHistory.isFetching && summary.totalCount === 0}
          onChangeDate={onDateSearch}
          onChangeKeyword={onKeywordSearch}
          dropdowns={actionbarDropdowns}
          exportPanel={{
            isOpen: isExportMode,
            title: `${t('t8th014')} / ${exportItems.find((item) => item.key === `Export${exportMode}`)?.label || exportMode}`,
            count: selectedItemCount,
            isEdit: false,
            onCancel: () => onChangeExportMode('none'),
            onConfirm: onConfirmExport,
          }}
        />
        {summary.totalCount > 0 ? (
          <>
            <BoxStyle
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              width="fit-content"
              gap={5}
              overflowX="auto">
              <RoundedFullButton
                viewSmall
                tabs
                active={status === 'All'}
                onClick={() => {
                  setStatus('All')
                }}>
                {t('t8th052', { num: summary.totalCount })}
              </RoundedFullButton>
              <RoundedFullButton
                viewSmall
                tabs
                active={status === 'Passed'}
                onClick={() => {
                  setStatus('Passed')
                }}>
                {t('t8th053', {
                  num1: summary.passCount,
                  num2: NumberUtils.toRgDecimalPoint(summary.totalPoints),
                })}
              </RoundedFullButton>
              <RoundedFullButton
                viewSmall
                tabs
                active={status === 'Failed'}
                onClick={() => {
                  setStatus('Failed')
                }}>
                {t('t8th054', { num: summary.failCount })}
              </RoundedFullButton>
            </BoxStyle>

            {dateOrderList.map((item) => {
              return (
                <BookListDateGroupStyle key={item.id}>
                  <TextStyle
                    fontSize="medium"
                    fontColor="secondary"
                    className="divider">
                    {DateUtils.toRgDateEnglishFormat(item.date)} (
                    {item.list.length})
                  </TextStyle>
                  <GapStyle size={5} />
                  <BoxStyle
                    display="grid"
                    gridTemplateColumns="repeat(1, 1fr)"
                    gap={20}>
                    {item.list.map((history) => {
                      const isBookInfoLoaded =
                        bookInfo && bookInfo.studyId === history.studyId
                      const expendMenu: {
                        text: string
                        subText?: string
                        onClick?: () => void
                      }[] = []

                      if (isBookInfoLoaded) {
                        expendMenu.push({
                          text: t('t8th055'),
                          subText: t('t8th056'),
                          onClick: () => {
                            if (!bookInfo) {
                              return
                            }
                            if (bookInfo.expiredContentsYn) {
                              alert(t('t8th312'))
                              return
                            }
                            onStartStudy(bookInfo)
                          },
                        })
                        if (!!bookInfo?.vocabularyPath) {
                          expendMenu.push({
                            text: t('t8th057'),
                            onClick: () => {
                              setSingleItemVocabularyOption({
                                levelRoundId: history.levelRoundId,
                                studyId: history.studyId,
                                studentHistoryId: history.studentHistoryId,
                              })
                            },
                          })
                        }
                        if (!!bookInfo?.reportPath) {
                          expendMenu.push({
                            text: t('t8th058'),
                            onClick: () => {
                              onSingleItemReport(
                                history.studyId,
                                history.studentHistoryId,
                              )
                            },
                          })
                        }
                        if (!!bookInfo?.workSheetPath) {
                          expendMenu.push({
                            text: t('t8th059'),
                            onClick: () => {
                              onSingleItemWorksheets(history.levelName)
                            },
                          })
                        }
                      }
                      return (
                        <ReviewBookItem
                          uid={history.studyId}
                          key={history.studyId}
                          title={history.title}
                          levelName={history.levelName}
                          src={history.surfaceImagePath}
                          studyDate={DateUtils.toRgDateEnglishFormat(
                            history.completeDate,
                            'MD',
                          )}
                          totalScore={history.average}
                          stepScore1={history.scoreStep1}
                          stepScore2={history.scoreStep2}
                          stepScore3={history.scoreStep3}
                          stepScore4={history.scoreStep4}
                          stepScore5={history.scoreStep5}
                          isPassed={history.average >= 70}
                          completedInfo={history.fullEasyName}
                          earnPoints={NumberUtils.toRgDecimalPoint(
                            history.rgPoint,
                          )}
                          expendMenu={expendMenu}
                          isCheckable={exportMode !== 'none'}
                          isChecked={
                            isExportMode && isSelectedItem(history.studyId)
                          }
                          onClick={() => {
                            if (isExportMode) {
                              const currentFlag = isSelectedItem(
                                history.studyId,
                              )
                              setSelectItemChange(
                                history.studyId,
                                {
                                  levelRoundId: history.levelRoundId,
                                  studyId: history.studyId,
                                  studentHistoryId: history.studentHistoryId,
                                  levelName: history.levelName,
                                },
                                !currentFlag,
                              )
                            }
                          }}
                          onExpendMenuClick={(isOpen) => {
                            if (isStudyEnd) {
                              onStudyEndMessage()
                              return
                            }
                            if (isOpen) {
                              setSelectedBookInfo({
                                levelRoundId: history.levelRoundId,
                                studyId: history.studyId,
                                studentHistoryId: history.studentHistoryId,
                              })
                            } else {
                              setSelectedBookInfo(undefined)
                            }
                          }}
                        />
                      )
                    })}
                  </BoxStyle>
                </BookListDateGroupStyle>
              )
            })}
            {history.data && history.hasNextPage && (
              <RoundedFullButton
                onClick={() => {
                  history.fetchNextPage()
                }}>
                {t('t8th060')}
              </RoundedFullButton>
            )}
            {(vocabularyOption || singleItemVocabularyOption) && (
              <PrintVocabularyModal
                onConfirm={(option) => {
                  if (singleItemVocabularyOption) {
                    onSingleItemVocabulary(
                      singleItemVocabularyOption.levelRoundId,
                      singleItemVocabularyOption.studentHistoryId,
                      option,
                    )
                  } else {
                    onConfirmVocabularyOption(option)
                  }
                }}
                onClickClose={() => {
                  setSingleItemVocabularyOption(undefined)
                  setVocabularyOption(false)
                }}
              />
            )}
          </>
        ) : (
          // 학습 기록이 없을 때
          <BoxStyle
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={20}
            minHeight="200px">
            <Image
              src={Assets.Image.emptyResults}
              alt="empty"
              width={120}
              height={120}
            />
            <TextStyle fontFamily="sans" fontSize="small" fontColor="secondary">
              {t('t8th061')}
            </TextStyle>
          </BoxStyle>
        )}
      </ReviewListStyle>
    </>
  )
}
