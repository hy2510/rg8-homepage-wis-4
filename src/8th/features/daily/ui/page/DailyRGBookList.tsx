'use client'

import {
  useDailyBookList,
  useDailySectionList,
} from '@/8th/features/daily/service/daily-query'
import { DailyRgResultActionBar } from '@/8th/features/daily/ui/component/DailyRGActionBar'
import DailyRGBookItem from '@/8th/features/daily/ui/component/DailyRGBookItem'
import { useBookDetailInfo } from '@/8th/features/library/service/library-query'
import BookInfoModal from '@/8th/features/library/ui/modal/BookInfoModal'
import PrintVocabularyModal from '@/8th/features/library/ui/modal/PrintVocabularyModal'
import {
  useStudent,
  useStudentHistoryList,
} from '@/8th/features/student/service/student-query'
import { VocabularyOption } from '@/8th/shared/hook/useExportPanel'
import { DailyRGCourseListStyle } from '@/8th/shared/styled/FeaturesStyled'
import { Gap } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import { openWindow } from '@/8th/shared/utils/open-window'
import SITE_PATH from '@/app/site-path'
import { useLayoutEffect, useState } from 'react'

export default function DailyRGBookList({
  stageId,
  sectionId,
  level,
}: {
  stageId: string
  sectionId: string
  level?: string
}) {
  useLayoutEffect(() => {
    window?.scrollTo(0, 0)
  }, [stageId, sectionId])

  const student = useStudent()
  const { data: sectionList, isLoading: isSectionListLoading } =
    useDailySectionList({
      stageId,
    })
  const { data: bookList, isLoading: isBookListLoading } = useDailyBookList({
    stageId,
    sectionId,
  })

  const studentHistory = useStudentHistoryList()
  const defaultStudentHistoryId =
    studentHistory.data?.list && studentHistory.data?.list.length > 0
      ? studentHistory.data.list[0].studentHistoryId
      : undefined
  const bookWizardStudentHistoryCount =
    studentHistory.data?.list?.filter((item) => item.isBookWizard).length || 0
  const defaultBookWizardStudentHistoryId =
    bookWizardStudentHistoryCount > 0
      ? studentHistory.data?.list?.filter((item) => item.isBookWizard)[0]
          .studentHistoryId
      : undefined

  const [selectBookInfo, setSelectBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
        studentHistoryId?: string
      }
    | undefined
  >(undefined)
  const [selectBookInfoOption, setSelectBookInfoOption] = useState<{
    isShowModal: boolean
    isShowVocaPrintOptions: boolean
    isShowMore: boolean
  }>({
    isShowModal: false,
    isShowVocaPrintOptions: false,
    isShowMore: false,
  })

  const { data: selectBookInfoData } = useBookDetailInfo(
    {
      levelRoundId: selectBookInfo?.levelRoundId || '',
      studentHistoryId:
        selectBookInfo?.studentHistoryId ||
        defaultBookWizardStudentHistoryId ||
        defaultStudentHistoryId,
    },
    {
      enabled:
        !!selectBookInfo &&
        (!!defaultBookWizardStudentHistoryId || !!defaultStudentHistoryId),
    },
  )

  if (isSectionListLoading || isBookListLoading) {
    return <></>
  }

  const currentSection = sectionList?.list.find(
    (section) => section.sectionId === sectionId,
  )
  const title = currentSection?.sectionName || ''
  const totalCount = currentSection?.totalBooks || 0
  const completeCount = currentSection?.completeBooks || 0

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }
  const onShowWorksheet = (workSheetPath: string) => {
    if (!isStudyEnd) {
      openWindow(workSheetPath, {
        external: true,
        target: '_blank',
        feature: 'noopener, noreferrer',
      })
    } else {
      onStudyEndMessage()
    }
  }

  const onConfirmVocabularyOption = (option: VocabularyOption) => {
    if (!selectBookInfoData?.vocabularyPath) {
      return
    }
    if (!isStudyEnd) {
      const url = new URL(selectBookInfoData.vocabularyPath)
      const params = new URLSearchParams(url.search)

      const paramsMap = new Map()
      params.forEach((value, key) => {
        paramsMap.set(key, value)
      })
      if (option.vocabulary) {
      }
      paramsMap.set('args4', option.vocabulary ? 'Y' : 'N')
      if (option.definition1) {
        paramsMap.set('args5', option.definition1Value)
      } else {
        paramsMap.set('args5', 'N')
      }
      paramsMap.set('args6', option.definition2 ? 'Y' : 'N')
      paramsMap.set('args7', option.exampleSentence ? 'Y' : 'N')
      paramsMap.set('args8', option.studentName ? 'Y' : 'N')
      const searchParams = new URLSearchParams()
      paramsMap.forEach((value, key) => {
        searchParams.append(key, value)
      })
      const queryString = searchParams.toString()

      const vocabularyUrl = `${url.protocol}//${url.host}${url.pathname}?${queryString}`
      openWindow(vocabularyUrl, {
        external: true,
        target: '_blank',
        feature: 'noopener, noreferrer',
      })
      setSelectBookInfoOption({
        ...selectBookInfoOption,
        isShowVocaPrintOptions: false,
      })
    } else {
      onStudyEndMessage()
    }
  }

  const parentPath = `${SITE_PATH.NW82.DAILY_RG}?${level ? `level=${level}` : `stage=${stageId}`}`
  return (
    <>
      <SubPageNavHeader parentPath={parentPath} />
      <Gap size={15} />
      <DailyRgResultActionBar
        title={title}
        bookCount={Number(completeCount)}
        totalCount={Number(totalCount)}
      />
      <DailyRGCourseListStyle>
        {bookList &&
          bookList.book &&
          bookList.book.length > 0 &&
          bookList.book.map((book) => {
            const isBookInfoLoaded =
              !!selectBookInfoData &&
              selectBookInfoData.levelRoundId === book.levelRoundId

            const isPreK = book.levelName.startsWith('EB-PK')
            const imageUrl = isPreK
              ? book.studyImagePath
              : book.surfaceImagePath

            const expendMenu: {
              text: string
              subText?: string
              onClick?: () => void
            }[] = []
            if (isBookInfoLoaded && selectBookInfoOption.isShowMore) {
              expendMenu.push({
                text: 'Book Info',
                onClick: () => {
                  setSelectBookInfoOption({
                    ...selectBookInfoOption,
                    isShowModal: true,
                  })
                },
              })
              if (selectBookInfoData?.vocabularyPath) {
                expendMenu.push({
                  text: 'Print Vocabulary',
                  onClick: () => {
                    setSelectBookInfoOption({
                      ...selectBookInfoOption,
                      isShowVocaPrintOptions: true,
                    })
                  },
                })
              }
              if (selectBookInfoData?.workSheetPath) {
                expendMenu.push({
                  text: 'Print Worksheet',
                  onClick: () => {
                    onShowWorksheet(selectBookInfoData.workSheetPath)
                  },
                })
              }
            }
            return (
              <DailyRGBookItem
                key={book.levelRoundId}
                no={book.no}
                title={book.topicTitle}
                imgUrl={imageUrl}
                point={book.getableRgPoint}
                color="#b535dc"
                passCount={book.rgPointCount}
                isPreK={isPreK}
                preKCharacter={book.character}
                isMovieAvailable={!!book.animationPath}
                expendMenu={expendMenu}
                onExpendMenuClick={(isOpen) => {
                  if (isStudyEnd) {
                    onStudyEndMessage()
                    return
                  }
                  if (isOpen) {
                    setSelectBookInfo({
                      levelRoundId: book.levelRoundId,
                      surfaceImagePath: book.surfaceImagePath,
                      title: book.topicTitle,
                      bookCode: book.levelName,
                    })
                    setSelectBookInfoOption({
                      ...selectBookInfoOption,
                      isShowMore: true,
                    })
                  } else {
                    setSelectBookInfoOption({
                      ...selectBookInfoOption,
                      isShowMore: false,
                    })
                  }
                }}
                onContentClick={() => {
                  if (isStudyEnd) {
                    onStudyEndMessage()
                    return
                  }
                  setSelectBookInfo({
                    levelRoundId: book.levelRoundId,
                    surfaceImagePath: book.surfaceImagePath,
                    title: book.topicTitle,
                    bookCode: book.levelName,
                  })
                  setSelectBookInfoOption({
                    ...selectBookInfoOption,
                    isShowModal: true,
                  })
                }}
              />
            )
          })}
      </DailyRGCourseListStyle>

      {selectBookInfo && selectBookInfoOption.isShowModal && (
        <BookInfoModal
          onClickClose={() => {
            setSelectBookInfoOption({
              ...selectBookInfoOption,
              isShowModal: false,
            })
          }}
          title={selectBookInfo.title}
          bookCode={selectBookInfo.bookCode}
          imgSrc={selectBookInfo.surfaceImagePath}
          levelRoundId={selectBookInfo.levelRoundId}
        />
      )}

      {selectBookInfoOption.isShowVocaPrintOptions && (
        <PrintVocabularyModal
          onConfirm={onConfirmVocabularyOption}
          onClickClose={() => {
            setSelectBookInfoOption({
              ...selectBookInfoOption,
              isShowVocaPrintOptions: false,
            })
          }}
        />
      )}

      {/* <Pagenation currentPage={1} maxPage={1} onPageChange={() => {}} /> */}
    </>
  )
}
