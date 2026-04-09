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
import ReviewWriteItem from '@/8th/features/review/ui/component/ReviewWriteItem'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { VocabularyOption } from '@/8th/shared/hook/useExportPanel'
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
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WriteResultHistory({
  startDate,
  endDate,
  keyword,
}: {
  startDate?: string
  endDate?: string
  keyword?: string
}) {
  //@language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const onChangeDate = (startDate: string, endDate: string) => {
    router.replace(
      `${SITE_PATH.NW82.REVIEW_WRITE}?startDate=${startDate}&endDate=${endDate}`,
    )
  }

  const onChangeKeyword = (keyword: string) => {
    router.replace(`${SITE_PATH.NW82.REVIEW_WRITE}?keyword=${keyword}`)
  }

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th047')}`}
        parentPath={SITE_PATH.NW82.ACTIVITY}
      />
      <WriteResultHistoryList
        startDate={startDate}
        endDate={endDate}
        keyword={keyword}
        onChangeDate={onChangeDate}
        onChangeKeyword={onChangeKeyword}
      />
    </>
  )
}

function WriteResultHistoryList({
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
  const { menu } = useCustomerConfiguration()

  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const history = useHistoryReadingInfinite({
    startDate: startDate,
    endDate: endDate,
    keyword: keyword,
    status: 'Writing',
  })

  const { mutate: exportVocabulary } = useExportVocabulary()
  const { mutate: exportReport } = useExportReport()
  const { mutate: exportWorksheets } = useExportWorksheet()

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

  if (history.isLoading) {
    return <div>Loading...</div>
  }
  if (!history.data) {
    return <div>No data</div>
  }

  const summary = history.data?.pages[0].summary

  const dateOrderList: { date: string; list: HistoryStudy[] }[] = []
  if (!history.isFetching && !history.isLoading && history.data) {
    history.data.pages.forEach((page) => {
      page.history.forEach((history, i) => {
        if (i === 0) {
          dateOrderList.push({ date: history.completeDate, list: [history] })
        } else if (
          dateOrderList[dateOrderList.length - 1].date === history.completeDate
        ) {
          dateOrderList[dateOrderList.length - 1].list.push(history)
        } else {
          dateOrderList.push({ date: history.completeDate, list: [history] })
        }
      })
    })
  }

  let searchTitle = ''
  if (keyword) {
    searchTitle = `Search: ${keyword}`
  } else if (startDate && endDate) {
    const dayDistance = DateUtils.dayDistance(
      DateUtils.createDate(startDate),
      DateUtils.createDate(endDate),
      true,
    )
    if (!history.isFetching && summary.studyDays > 0) {
      searchTitle = `${t('t8th050', { num1: dayDistance, num2: summary.studyDays })}`
    } else {
      searchTitle = `${t('t8th049', { num: dayDistance })}`
    }
  }

  const onDateSearch = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return

    if (onChangeDate) {
      onChangeDate(startDate.replace(/-/g, ''), endDate.replace(/-/g, ''))
    }
  }
  const onKeywordSearch = (keyword: string) => {
    if (!keyword) return

    if (onChangeKeyword) {
      onChangeKeyword(keyword)
    }
  }

  const historyTypeText = t('t8th069')
  const historyTypeItems: ActionBarDropdownItem[] = []
  if (menu.activity.result.read.open) {
    historyTypeItems.push({
      key: 'HistoryTypeReading',
      label: t('t8th067'),
      isActive: false,
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
      isActive: true,
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
      router.replace(
        `${SITE_PATH.NW82.REVIEW}?startDate=${pStartDate}&endDate=${pEndDate}`,
      )
    } else if (item.key === 'HistoryTypeWriting') {
    } else if (item.key === 'HistoryTypeSpeaking') {
      router.replace(
        `${SITE_PATH.NW82.REVIEW_SPEAK}?startDate=${pStartDate}&endDate=${pEndDate}`,
      )
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

  return (
    <>
      <ReviewListStyle>
        <ReviewActionBar
          key={`actionbar_${startDate}_${endDate}_${keyword}`}
          title={searchTitle}
          startDate={startDate}
          endDate={endDate}
          keyword={keyword}
          searchOptionOpen={!history.isFetching && summary.totalCount === 0}
          onChangeDate={onDateSearch}
          onChangeKeyword={onKeywordSearch}
          dropdowns={[
            {
              title: historyTypeText,
              isTitleBlack: true,
              isActiveMakerVisible: true,
              items: historyTypeItems,
              onItemClick: onHistoryTypeItemClick,
            },
          ]}
        />
        {summary.totalCount > 0 ? (
          <>
            <BoxStyle
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              width="fit-content"
              gap={10}>
              <RoundedFullButton
                viewSmall
                tabs
                active={true}
                onClick={() => {
                  //
                }}>
                {t('t8th052', { num: summary.totalCount })}
              </RoundedFullButton>
            </BoxStyle>

            {dateOrderList.map((item) => {
              return (
                <BookListDateGroupStyle key={item.date}>
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
                        <ReviewWriteItem
                          uid={history.studyId}
                          key={history.studyId}
                          title={history.title}
                          levelName={history.levelName}
                          src={history.surfaceImagePath}
                          totalScore={history.average}
                          stepScore1={history.scoreStep1}
                          stepScore2={history.scoreStep2}
                          stepScore3={history.scoreStep3}
                          stepScore4={history.scoreStep4}
                          stepScore5={history.scoreStep5}
                          isPassed={history.average >= 70}
                          studyDate={DateUtils.toRgDateEnglishFormat(
                            history.completeDate,
                            'MD',
                          )}
                          completedInfo={history.fullEasyName}
                          expendMenu={expendMenu}
                          onExpendMenuClick={(isOpen) => {
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
            {singleItemVocabularyOption && (
              <PrintVocabularyModal
                onConfirm={(option) => {
                  if (singleItemVocabularyOption) {
                    onSingleItemVocabulary(
                      singleItemVocabularyOption.levelRoundId,
                      singleItemVocabularyOption.studentHistoryId,
                      option,
                    )
                  }
                }}
                onClickClose={() => {
                  setSingleItemVocabularyOption(undefined)
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
