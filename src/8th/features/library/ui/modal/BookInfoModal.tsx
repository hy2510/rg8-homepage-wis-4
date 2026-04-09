'use client'

import { Assets } from '@/8th/assets/asset-library'
import { BookDetailInfo } from '@/8th/features/library/model/book-info'
import {
  useAddFavorite,
  useBookDetailInfo,
  useDeleteFavorite,
} from '@/8th/features/library/service/library-query'
import { useStudentDailyLearning } from '@/8th/features/student/service/learning-query'
import {
  useStudentLocalConfig,
  useUpdateStudentLocalConfig,
} from '@/8th/features/student/service/setting-query'
import {
  useStudent,
  useStudentHistoryList,
} from '@/8th/features/student/service/student-query'
import LevelGuidanceModal from '@/8th/features/student/ui/modal/LevelGuidanceModal'
import {
  useAddTodo,
  useDeleteTodo,
  useStudyStart,
} from '@/8th/features/todo/service/todo-query'
import {
  useCustomerConfiguration,
  useCustomerInfo,
} from '@/8th/shared/context/CustomerContext'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { VocabularyOption } from '@/8th/shared/hook/useExportPanel'
import useStartStudy from '@/8th/shared/hook/useStartStudy'
import {
  BookInfoButtonsStyle,
  BookInfoDetailItemStyle,
  BookInfoDetailStyle,
  BookInfoMainBannerStyle,
  BookInfoPointsStyle,
  BookInfoSummaryStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { MoreHorizontalButton, StartButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, SelectBox } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import { openWindow } from '@/8th/shared/utils/open-window'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import PrintVocabularyModal from './PrintVocabularyModal'

/**
 * 도서정보 팝업
 */

interface BookInfoModalProps {
  imgSrc: string
  title: string
  bookCode: string
  levelRoundId: string
  studentHistoryId?: string
  onClickClose?: () => void
}

export default function BookInfoModal({
  imgSrc,
  title,
  bookCode,
  levelRoundId,
  studentHistoryId,
  onClickClose,
}: BookInfoModalProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const student = useStudent()
  const studentHistory = useStudentHistoryList()
  const { setting } = useCustomerConfiguration()

  const defaultStudentHistoryId =
    studentHistory.data?.list && studentHistory.data?.list.length > 0
      ? studentHistory.data.list[0].studentHistoryId
      : undefined
  const bookWizardStudentHistoryCount =
    studentHistory.data?.list?.filter((item) => item.isBookWizard).length || 0
  const isBookWizard = bookWizardStudentHistoryCount > 0
  const defaultBookWizardStudentHistoryId =
    bookWizardStudentHistoryCount > 0
      ? studentHistory.data?.list?.filter((item) => item.isBookWizard)[0]
          .studentHistoryId
      : undefined

  const [selectedStudentHistoryId, setSelectedStudentHistoryId] = useState<
    string | undefined
  >(studentHistoryId)
  const selectedClassName =
    studentHistory.data?.list?.find(
      (item) => item.studentHistoryId === selectedStudentHistoryId,
    )?.className || ''

  const queryStudentHistoryId =
    selectedStudentHistoryId ||
    defaultBookWizardStudentHistoryId ||
    defaultStudentHistoryId

  // 소속반 없는 경우에 자동 포커스 되도록 수정
  if (
    bookWizardStudentHistoryCount > 1 &&
    !selectedClassName &&
    !selectedStudentHistoryId &&
    !!queryStudentHistoryId
  ) {
    setSelectedStudentHistoryId(queryStudentHistoryId)
  }

  const { data: bookInfo, isLoading: isBookInfoLoading } = useBookDetailInfo({
    levelRoundId,
    studentHistoryId: queryStudentHistoryId,
  })

  const dailyLearning = useStudentDailyLearning()
  const customerId = useCustomerInfo()?.customerId || ''
  const studentId = student.data?.student?.studentId || ''
  const userConfig = useStudentLocalConfig({ customerId, studentId })
  const updateUserConfig = useUpdateStudentLocalConfig()

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoStop = () => {
    videoRef?.current?.pause()
  }

  useEffect(() => {
    return () => {
      videoStop()
    }
  }, [])

  const addFavorite = useAddFavorite({
    onError: (error?: unknown) => {
      if (error && typeof (error as any)?.message === 'string') {
        try {
          const errorPayload = JSON.parse((error as any).message) as {
            message: string
          }
          alert(errorPayload.message)
        } catch (e: unknown) {
          alert('Favorite 추가 실패 Error')
        }
      }
    },
  })
  const deleteFavorite = useDeleteFavorite()
  const addTodo = useAddTodo({
    onError: (error?: unknown) => {
      if (error && typeof (error as any)?.message === 'string') {
        try {
          const errorPayload = JSON.parse((error as any).message) as {
            message: string
          }
          alert(errorPayload.message)
        } catch (e: unknown) {
          alert('도서 추가 실패 Error')
        }
      }
    },
  })
  const deleteTodo = useDeleteTodo()
  const studyStart = useStudyStart({
    onSuccess: (data: {
      type: 'mode' | 'study' | 'speak'
      bookInfo: BookDetailInfo
    }) => {
      if (data.type === 'study' || data.type === 'speak') {
        goStudy(data.bookInfo, data.type)
      }
    },
    onError: (error?: unknown) => {
      if (error && typeof (error as any)?.message === 'string') {
        try {
          const errorPayload = JSON.parse((error as any).message) as {
            message: string
          }
          alert(errorPayload.message)
        } catch (e: unknown) {
          alert('학습 시작 실패 Error')
        }
      }
    },
  })

  const { onStartStudy } = useStartStudy('quiz')
  const isPhone = useIsPhone()

  const [viewVocaPrintOptions, setViewVocaPrintOptions] = useState(false)

  const [isShowLevelInRange, setShowLevelInRange] = useState<{
    isShow: boolean
    compare: -1 | 0 | 1
    type?: 'add' | 'study' | 'speak'
  }>({ isShow: false, compare: 0 })

  if (studentHistory.isLoading) {
    return <div></div>
  }

  const isWorksheetYn = !!bookInfo?.workSheetPath
  const isVocabularyYn = !!bookInfo?.vocabularyPath
  const isEBookYn = !!bookInfo?.bookCode.startsWith('EB-')
  const recommendedAge =
    bookInfo?.recommendedAge === 'B'
      ? 'Teen'
      : bookInfo?.recommendedAge === 'C'
        ? 'Adult'
        : 'All'

  let isFirstPointPassed = false
  let isSecondPointPassed = false
  if (bookInfo) {
    if (bookInfo.passCount === 1) {
      if (bookInfo.studyTypeFullEasyYn) {
        const studyMode = bookInfo.studyMode
        if (
          studyMode === 'select:easy' ||
          studyMode === 'add:easy' ||
          studyMode === 'easy'
        ) {
          isFirstPointPassed = true
        } else {
          isSecondPointPassed = true
        }
      } else {
        isFirstPointPassed = true
        isSecondPointPassed = false
      }
    } else if (bookInfo.passCount >= 2) {
      isFirstPointPassed = true
      isSecondPointPassed = true
    }
  }

  const studyMode = bookInfo?.studyMode
  const isModeSetableEasy =
    studyMode?.startsWith('select:') && studyMode?.indexOf('easy') >= 0
  const isModeSetableFull =
    studyMode?.startsWith('select:') && studyMode?.indexOf('full') >= 0
  const isReviewMode = studyMode === 'review' || studyMode === 'rewrite'
  const isButtonLayoutFullEasy =
    bookInfo?.studyId && isModeSetableEasy && isModeSetableFull

  let startButtonLabel = 'Start'
  if (bookInfo?.passCount !== undefined && bookInfo?.passCount <= 1) {
    if (studyMode === 'easy' || studyMode === 'add:easy') {
      startButtonLabel = 'Easy Start'
    } else if (studyMode === 'full' || studyMode === 'add:full') {
      startButtonLabel = 'Full Start'
    } else if (bookInfo?.passCount === 1) {
      startButtonLabel = '2nd Start'
    }
  } else if (bookInfo?.passCount && bookInfo?.passCount >= 2) {
    startButtonLabel = '3rd Start'
  }

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }
  const onShowWorksheet = () => {
    if (!isWorksheetYn) {
      return
    }
    if (!isStudyEnd) {
      openWindow(bookInfo.workSheetPath, {
        external: true,
        target: '_blank',
        feature: 'noopener, noreferrer',
      })
    } else {
      onStudyEndMessage()
    }
  }

  const onConfirmVocabularyOption = (option: VocabularyOption) => {
    if (!isVocabularyYn) {
      return
    }
    if (!isStudyEnd) {
      const url = new URL(bookInfo.vocabularyPath)
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
      setViewVocaPrintOptions(false)
    } else {
      onStudyEndMessage()
    }
  }

  const onToggleFavorite = () => {
    if (!bookInfo) {
      return
    }
    if (bookInfo?.bookMarkYn) {
      deleteFavorite.mutate({ levelRoundId })
    } else {
      addFavorite.mutate({ levelRoundId })
    }
  }

  const onToggleTodo = () => {
    if (!bookInfo) {
      return
    }
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    if (bookInfo.studyId) {
      if (bookInfo.deleteYn) {
        deleteTodo.mutate({
          studyId: bookInfo.studyId,
          levelRoundId: bookInfo.levelRoundId,
          studentHistoryId: bookInfo.studentHistoryId,
        })
      } else {
        alert(t('t8th293'))
      }
    } else if (isBookWizard) {
      if (bookWizardStudentHistoryCount === 1 || selectedStudentHistoryId) {
        onIsLevelInRenge('none', 'add')
        // addTodo.mutate({
        //   levelRoundId,
        //   studentHistoryId: queryStudentHistoryId!,
        // })
      } else {
        alert(t('t8th295'))
      }
    } else {
      alert(t('t8th315'))
    }
  }

  const onStudyStart = (params?: {
    mode?: 'easy' | 'full'
    type?: 'study' | 'speak'
  }) => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    if (bookInfo) {
      if (!!bookInfo.studyId && !!bookInfo.openDate) {
        const openDate = DateUtils.createDate(bookInfo.openDate)
        if (Date.now() < openDate.getTime()) {
          alert(
            t('t788', {
              year: openDate.getFullYear(),
              month: openDate.getMonth() + 1,
              day: openDate.getDate(),
            }), // 이 학습은 ${openDate.getFullYear()}년 ${openDate.getMonth() + 1}월 ${openDate.getDate()}일부터 시작 가능합니다.
          )
          return
        }
      }

      const { mode = undefined, type = 'study' } = params || {}
      if (bookInfo.studyId) {
        studyStart.mutate({
          type,
          bookInfo: bookInfo,
          mode,
        })
      } else if (isBookWizard) {
        if (bookWizardStudentHistoryCount === 1 || selectedStudentHistoryId) {
          // studyStart.mutate({
          //   type,
          //   bookInfo: bookInfo,
          //   studentHistoryId: queryStudentHistoryId!,
          //   mode,
          // })
          if (bookInfo.todayStudyYn) {
            alert(t('t8th314'))
            return
          }
          onIsLevelInRenge('none', type)
        } else {
          alert(t('t8th295'))
        }
      } else {
        alert(t('t8th315'))
      }
    }
  }

  const userLevel = dailyLearning.data?.settingLevelName || 'PK'
  const onIsLevelInRenge = (
    confirmLevelInRange: 'accept' | 'none',
    type?: 'add' | 'study' | 'speak',
  ) => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    if (!bookInfo) {
      return
    }
    if (bookInfo.todayStudyYn) {
      alert(t('t8th314'))
      return
    }
    const userLevelGroup = userLevel.substring(0, 1)
    const bookLevelGroup = bookInfo.bookCode.substring(3, 4)
    const findLevelRank = (level: string) => {
      if (level.substring(0, 1) === 'P') {
        return 1
      } else if (level.substring(0, 1) === 'K') {
        return 2
      } else if (Number(level.substring(0, 1)) < 4) {
        return Number(level.substring(0, 1)) + 2
      } else {
        return 6
      }
    }
    const userLevelRank = findLevelRank(userLevelGroup)
    const bookLevelRank = findLevelRank(bookLevelGroup)

    const isStartAction =
      confirmLevelInRange === 'accept' ||
      userLevelRank === bookLevelRank ||
      !userConfig.levelGuidanceTryOtherLevel
    if (!isStartAction) {
      if (confirmLevelInRange === 'none') {
        setShowLevelInRange({
          isShow: true,
          compare: bookLevelRank > userLevelRank ? 1 : -1,
          type,
        })
        return
      }
    }
    if (isStartAction) {
      setShowLevelInRange({ isShow: false, compare: 0 })
      if (type === 'add') {
        addTodo.mutate({
          levelRoundId,
          studentHistoryId: queryStudentHistoryId!,
        })
      } else {
        studyStart.mutate({
          type: type || 'study',
          bookInfo: bookInfo,
          studentHistoryId: queryStudentHistoryId!,
        })
      }
    }
  }

  const goStudy = (bookInfo: BookDetailInfo, study: 'study' | 'speak') => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    onStartStudy(bookInfo, study === 'speak')
  }

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">Book Info</div>
        <div className="btn-close" onClick={onClickClose} />
      </ModalHeaderStyle>
      <ModalBodyStyle bookInfoBody>
        {isShowLevelInRange.isShow && (
          <LevelGuidanceModal
            title={`${t('t8th302')}`}
            subtitle={t('t8th305')}
            message={
              isShowLevelInRange.compare === 1
                ? t('t8th306', { txt: userLevel })
                : t('t8th307', { txt: userLevel })
            }
            isCheckableDoNotShowAgain={true}
            onCloseModal={(isDoNotShowAgain) => {
              setShowLevelInRange({ isShow: false, compare: 0 })
              if (isDoNotShowAgain) {
                updateUserConfig({
                  ...userConfig,
                  customerId,
                  studentId,
                  levelGuidanceTryOtherLevel: false,
                })
              }
            }}
            onConfirm={(isDoNotShowAgain) => {
              onIsLevelInRenge('accept', isShowLevelInRange.type)
              if (isDoNotShowAgain) {
                updateUserConfig({
                  ...userConfig,
                  customerId,
                  studentId,
                  levelGuidanceTryOtherLevel: false,
                })
              }
            }}
            onCancel={(isDoNotShowAgain) => {
              setShowLevelInRange({ isShow: false, compare: 0 })
              if (isDoNotShowAgain) {
                updateUserConfig({
                  ...userConfig,
                  customerId,
                  studentId,
                  levelGuidanceTryOtherLevel: false,
                })
              }
            }}
          />
        )}

        {!bookInfo?.studyId && bookWizardStudentHistoryCount > 1 && (
          <BoxStyle margin="0 10px 20px 10px">
            <SelectBox
              selectedValue={selectedClassName}
              placeholder={t('t8th294')}
              largeFont
              onChange={(value) => {
                const selectedStudentHistory = studentHistory.data!.list.find(
                  (item) => item.classId === value.key,
                )
                setSelectedStudentHistoryId(
                  selectedStudentHistory?.studentHistoryId,
                )
              }}
              options={studentHistory
                .data!.list.filter((item) => item.isBookWizard)
                .map((item) => ({ key: item.classId, label: item.className }))}
            />
          </BoxStyle>
        )}
        <BookInfoMainBannerStyle bookCover={imgSrc || ''}>
          <BoxStyle className="wrapper" display="flex" gap={isPhone ? 10 : 20}>
            <div className="book-cover">
              <div className="cover-wrapper">
                <Image
                  className="book-cover-img"
                  src={imgSrc || ''}
                  alt="book"
                  width={140}
                  height={200}
                />
                {bookInfo?.expiredContentsYn && (
                  <div className="expired-overlay">
                    <Image
                      className="overlay-img"
                      src={Assets.Image.BookCoverNotAvailable}
                      alt="Not available."
                      width={140}
                      height={200}
                    />
                  </div>
                )}
              </div>
            </div>
            <BoxStyle
              className="content"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              gap={10}>
              <BoxStyle
                className="book-info"
                display="flex"
                flexDirection="column"
                alignItems="flex-start">
                <div className="book-code">{bookCode}</div>
                <div className="title">{title}</div>
                <div className="author">by {bookInfo?.author}</div>
              </BoxStyle>
              {!bookInfo?.expiredContentsYn && (
                <BoxStyle className="buttons" display="flex" gap={10}>
                  {!isButtonLayoutFullEasy && (
                    // {startButtonLabel} // 시작 버튼 글자 미사용, Start, Easy Start, Full Start, 2nd Start, 3rd Start 값 중 하나
                    <StartButton onClick={() => onStudyStart()} />
                  )}
                  {isButtonLayoutFullEasy && (
                    <>
                      <StartButton
                        onClick={() => onStudyStart({ mode: 'easy' })}
                        label="Easy"
                      />
                      <StartButton
                        onClick={() => onStudyStart({ mode: 'full' })}
                        label="Full"
                      />
                    </>
                  )}
                  {isEBookYn &&
                    setting.speakActivity &&
                    bookInfo?.speakContentYn && (
                      <MoreHorizontalButton
                        onSpeakClick={() => onStudyStart({ type: 'speak' })}
                      />
                    )}
                </BoxStyle>
              )}
            </BoxStyle>
          </BoxStyle>
        </BookInfoMainBannerStyle>

        {!bookInfo?.expiredContentsYn && bookInfo?.animationPath && (
          <BoxStyle
            width="100%"
            margin="0 0 20px 0"
            borderRadius={20}
            overflow="hidden"
            position="relative">
            <div>
              <video
                ref={videoRef}
                src={bookInfo.animationPath}
                controls
                disablePictureInPicture
                preload="auto"
                playsInline
                loop
                muted
                autoPlay
                controlsList="nodownload noremoteplayback"
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
          </BoxStyle>
        )}

        <BookInfoSummaryStyle>
          <BoxStyle display="flex" flexDirection="column" gap={20}>
            <div className="summary-content">{bookInfo?.synopsis}</div>
          </BoxStyle>
        </BookInfoSummaryStyle>
        <BookInfoButtonsStyle>
          <BoxStyle display="flex" alignItems="center" gap={20}>
            {!bookInfo?.expiredContentsYn && (
              <>
                <div
                  className={`btn to-do ${!!bookInfo?.studyId ? 'remove' : 'add'}`}
                  onClick={onToggleTodo}>
                  To-Do
                </div>
                <div
                  className={`btn favorite ${!!bookInfo?.bookMarkYn ? 'remove' : 'add'}`}
                  onClick={onToggleFavorite}>
                  Favorite
                </div>
              </>
            )}
            {isVocabularyYn && (
              <div
                className="btn"
                onClick={() => {
                  if (!isVocabularyYn) {
                    return
                  }
                  videoStop()
                  setViewVocaPrintOptions(true)
                }}>
                Vocabulary
              </div>
            )}
            {isWorksheetYn && (
              <div className="btn" onClick={onShowWorksheet}>
                Worksheet
              </div>
            )}
          </BoxStyle>
        </BookInfoButtonsStyle>
        <BookInfoDetailStyle>
          {bookInfo && (
            <BoxStyle display="flex" flexWrap="wrap" gap={20}>
              <DetailItem title="level" content={bookInfo?.bookLevel} />
              <DetailItem title="pages" content={bookInfo?.pages.toString()} />
              <DetailItem
                title="words"
                content={bookInfo?.wordCount.toString()}
              />
              <DetailItem title="genre" content={bookInfo?.genre} />
              <DetailItem title="grade" content={recommendedAge} />
              <DetailItem title="code" content={bookInfo?.bookCode} />
              <DetailItem title="passed" content={`${bookInfo?.passCount}/2`} />
              {isEBookYn && (
                <DetailItem
                  title="speak"
                  content={bookInfo?.speakContentYn ? 'available' : 'none'}
                />
              )}
            </BoxStyle>
          )}
        </BookInfoDetailStyle>
        <BookInfoPointsStyle>
          <BoxStyle display="flex" gap={10}>
            {bookInfo && (
              <>
                <div className="title">point</div>
                <BoxStyle
                  className="wrapper"
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                  gap={10}>
                  <BoxStyle
                    className="earn-point"
                    display="flex"
                    alignItems="center"
                    gap={10}>
                    <div
                      className={`point-icon ${isFirstPointPassed ? 'passed' : ''}`}></div>
                    <div className="passed">
                      {bookInfo.studyTypeFullEasyYn ? 'Full Mode' : 'Passed 1'}
                    </div>
                    <div className="point">
                      +{NumberUtils.toRgDecimalPoint(bookInfo.rgPoint)}P
                    </div>
                  </BoxStyle>
                  <BoxStyle
                    className="earn-point"
                    display="flex"
                    alignItems="center"
                    gap={10}>
                    <div
                      className={`point-icon ${isSecondPointPassed ? 'passed' : ''}`}></div>
                    <div className="passed">
                      {bookInfo.studyTypeFullEasyYn ? 'Easy Mode' : 'Passed 2'}
                    </div>
                    <div className="point">
                      +{NumberUtils.toRgDecimalPoint(bookInfo.secondRgPoint)}P
                    </div>
                  </BoxStyle>
                </BoxStyle>
              </>
            )}
          </BoxStyle>
        </BookInfoPointsStyle>
        {viewVocaPrintOptions && (
          <PrintVocabularyModal
            onConfirm={onConfirmVocabularyOption}
            onClickClose={() => {
              setViewVocaPrintOptions(false)
            }}
          />
        )}
      </ModalBodyStyle>
    </ModalContainer>
  )
}

function DetailItem({ title, content }: { title: string; content?: string }) {
  return (
    <BookInfoDetailItemStyle>
      <BoxStyle display="flex" alignItems="center" gap={10}>
        <div className="title">{title}</div>
        <div className="content">{content}</div>
      </BoxStyle>
    </BookInfoDetailItemStyle>
  )
}
