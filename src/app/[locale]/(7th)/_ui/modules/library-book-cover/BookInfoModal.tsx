'use client'

import { useDevicePlatformInfo } from '@/7th/__root/ApplicationContext'
import {
  useFetchBookInfoDetail,
  useFetchStudyMode,
  useOnLoadBookInfoDetail,
} from '@/7th/_client/store/bookinfo/detail/hook'
import {
  useBookInfoDetail,
  useBookInfoDetailAction,
} from '@/7th/_client/store/bookinfo/detail/selector'
import {
  useFetchLibraryAddFavroite,
  useFetchLibraryDeleteFavorite,
} from '@/7th/_client/store/library/favorites/hook'
import {
  useLibraryFavorite,
  useLibraryFavoriteAction,
} from '@/7th/_client/store/library/favorites/selector'
import { useUpdateBookListTodo } from '@/7th/_client/store/library/hook'
import {
  useFetchLibraryAddTodo,
  useFetchLibraryDeleteTodo,
  useFetchLibraryTodos,
} from '@/7th/_client/store/library/todos/hook'
import {
  useLatestStudentHistoryId,
  useStudentHistory,
  useStudentHistoryAction,
} from '@/7th/_client/store/student/history/selector'
import {
  useStaffInfoFlagLogin,
  useStudentStudyable,
} from '@/7th/_client/store/student/info/selector'
import { useStudentReadingUnit } from '@/7th/_client/store/student/reading-unit/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { openWindow } from '@/7th/_function/open-window'
import { goToStudy } from '@/7th/_function/study-start'
import { BookInfoResponse } from '@/7th/_repository/client/library/book-info/book-info'
import {
  AlertBox,
  Button,
  Modal,
  SelectBox,
  SelectBoxItem,
} from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import { useLanguagePackContext } from '@/localization/client/LanguagePackContext'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'
import VocaPrintOptions from './VocaPrintOptions'

const STYLE_ID = 'book_cover'

export interface BookInfoModal {
  target: string
  bookImgSrc: string
  title: string
  author: string
  levelRoundId: string
  studyId?: string
  studentHistoryId?: string
  onClickDelete?: () => void
  onClickLightBox?: () => void
}
type StudyStart = 'study' | 'speak'

// 도서 정보 모달
export function BookInfoModal({
  target,
  bookImgSrc,
  title,
  author,
  levelRoundId,
  studyId,
  studentHistoryId,
  onClickDelete,
  onClickLightBox,
}: BookInfoModal) {
  const maketingEventTracker = useTrack()

  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()
  const { language } = useLanguagePackContext()
  const device = useDevicePlatformInfo()

  const isMobile = useScreenMode() === 'mobile'
  const staffLoginStatus = useStaffInfoFlagLogin()

  const addTargetStudentHistoryList = useStudentHistory()
    .payload.filter((history) => history.isBookWizard)
    .map((history) => ({
      studentHistoryId: history.studentHistoryId,
      classId: history.classId,
      className: history.className,
    }))
  const latestStudentHistoryId = useLatestStudentHistoryId()
  const currentStudentHistoryId = studentHistoryId || latestStudentHistoryId
  const { setDefaultHistoryId: setLatestStudentHistoryId } =
    useStudentHistoryAction()
  const onSelectStudentHistoryId = (studentHistoryId: string) => {
    setLatestStudentHistoryId(studentHistoryId)
  }

  const { studyOpen, target: siteTarget } = useSiteBlueprint()
  const isStudySpeakActive = studyOpen.Speak

  const { loading: isBookInfoInitLoading, error } = useOnLoadBookInfoDetail({
    levelRoundId,
    studyId,
    studentHistoryId: currentStudentHistoryId,
  })
  const { fetch: bookInfoReload, loading: isBookInfoLoading } =
    useFetchBookInfoDetail()

  const { fetch: todoListReload } = useFetchLibraryTodos()

  const bookInfo = useBookInfoDetail().payload
  const bookInfoAction = useBookInfoDetailAction()

  const {
    fetch: addFavorite,
    loading: isAddFavoriteLoading,
    success: isAddFavoriteSuccess,
  } = useFetchLibraryAddFavroite()
  const {
    fetch: deleteFavorite,
    loading: isDeleteFavoriteLoading,
    success: isDeleteFavoriteSuccess,
  } = useFetchLibraryDeleteFavorite()

  const favoriteChangeAction = bookInfoAction.setFavorite
  const favoriteCount = useLibraryFavorite().count
  const favoriteCountAction = useLibraryFavoriteAction().setFavoriteCount

  const onAddFavorite = () => {
    if (bookInfo.expiredContentsYn) {
      return
    }
    if (
      !isBookInfoInitLoading &&
      !isAddFavoriteLoading &&
      !isDeleteFavoriteLoading
    ) {
      const levelRoundIds = [levelRoundId]
      addFavorite({
        levelRoundIds,
        callback: ({ success, error }) => {
          if (success && !error) {
            favoriteChangeAction(true)
            favoriteCountAction(favoriteCount + 1)
          } else if (error) {
            if ((error as any).message) {
              alert((error as any).message)
            } else {
              alert(t('t343'))
            }
          }
        },
      })
    }
  }
  const onDeleteFavorite = () => {
    if (
      !isBookInfoInitLoading &&
      !isAddFavoriteLoading &&
      !isDeleteFavoriteLoading
    ) {
      const levelRoundIds = [levelRoundId]
      deleteFavorite({
        levelRoundIds,
        callback: ({ success, error }) => {
          if (success && !error) {
            favoriteChangeAction(false)
            favoriteCountAction(favoriteCount - 1)
          }
        },
      })
    }
  }
  const {
    fetch: deleteTodo,
    loading: isDeleteTodoLoading,
    success: isDeleteTodoSuccess,
    reset: deleteTodoReset,
  } = useFetchLibraryDeleteTodo()
  const onDeleteTodo = () => {
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    if (!bookInfo.deleteYn) {
      alert(t('t786')) // 학습을 시작한 경우, To-Do에서 학습을 지울 수 없습니다.
      return
    }
    if (
      !isBookInfoInitLoading &&
      !isAddTodoLoading &&
      !isDeleteTodoLoading &&
      bookInfo &&
      bookInfo.studyId &&
      !bookInfo.studyStartedYn
    ) {
      const studyIds = [bookInfo.studyId]
      deleteTodo({
        studyIds,
        callback: ({ success, error }) => {
          if (success && !error) {
            todoListReload({ isReload: true })
            bookInfoReload({
              levelRoundId,
              studentHistoryId: currentStudentHistoryId,
              callback: ({ success, error, payload }) => {
                if (success && !error && payload) {
                  updateBookList([levelRoundId], false)
                }
              },
            })
          }
        },
      })
    }
  }
  const updateBookList = useUpdateBookListTodo()
  const { fetch: addTodo, loading: isAddTodoLoading } = useFetchLibraryAddTodo()
  const [addTodoLock, setAddTodoLock] = useState(false)
  const onAddTodo = (study?: StudyStart) => {
    if (bookInfo.expiredContentsYn) {
      return
    }
    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }
    if (!isAddableTodo) {
      alert(t('t742')) // 학습을 추가할 수 있는 권한이 없습니다.
      return
    }
    if (bookInfo.todayStudyYn) {
      alert(t('t458'))
      return
    }
    if (!isBookInfoInitLoading && !isAddTodoLoading && !isDeleteTodoLoading) {
      const levelRoundIds = [levelRoundId]
      if (addTodoLock) {
        return
      }
      setAddTodoLock(true)
      addTodo({
        levelRoundIds,
        studentHistoryId: currentStudentHistoryId,
        callback: ({ success, error }) => {
          if (success && !error) {
            todoListReload({ isReload: true })
            bookInfoReload({
              levelRoundId,
              studentHistoryId: currentStudentHistoryId,
              callback: ({ success, loading, error, payload }) => {
                if (!loading) {
                  setAddTodoLock(false)
                }
                if (success && !error && payload) {
                  updateBookList([levelRoundId], true)
                  if (study) {
                    if (study === 'speak') {
                      goStudy(study, payload)
                    } else {
                      goStudyStartAutoModeSet(payload)
                    }
                  }
                }
              },
            })
          } else if (error) {
            setAddTodoLock(false)
            if ((error as any).message) {
              alert((error as any).message)
            } else {
              alert(t('t341'))
            }
          }
        },
      })
    }
  }

  const goStudy = (study: StudyStart, bookInfo: BookInfoResponse) => {
    goToStudy({
      studyInfo: bookInfo,
      mode: 'quiz',
      user: staffLoginStatus === 'on' ? 'staff' : 'student',
      isStartSpeak: study === 'speak',
      unit: userReadingUnit.id,
      language,
      device,
    })
  }

  const { fetch: modeSet } = useFetchStudyMode()

  const goStudyModeSetAndStart = (
    bookInfo: BookInfoResponse,
    mode: 'full' | 'easy',
  ) => {
    const { classId, studyId, studentHistoryId, levelRoundId } = bookInfo
    modeSet({
      classId,
      studyId,
      studentHistoryId,
      levelRoundId,
      mode,
      callback: ({ success }) => {
        if (success) {
          goStudy('study', bookInfo)
        }
      },
    })
  }
  const goStudyStartAutoModeSet = (bookInfo: BookInfoResponse) => {
    const { studyMode, classId, studyId, studentHistoryId, levelRoundId } =
      bookInfo
    const isModeSetableEasy =
      !!studyMode &&
      studyMode.startsWith('select:') &&
      studyMode.indexOf('easy') >= 0
    const isModeSetableFull =
      !!studyMode &&
      studyMode.startsWith('select:') &&
      studyMode.indexOf('full') >= 0

    if (isModeSetableEasy !== isModeSetableFull) {
      const mode = isModeSetableEasy ? 'easy' : 'full'
      modeSet({
        classId,
        studyId,
        studentHistoryId,
        levelRoundId,
        mode,
        callback: ({ success }) => {
          if (success) {
            goStudy('study', bookInfo)
          }
        },
      })
    } else if (!isModeSetableEasy && !isModeSetableFull) {
      goStudy('study', bookInfo)
    }
  }

  const otherButtonLock =
    isAddFavoriteSuccess ||
    isDeleteFavoriteSuccess ||
    isAddFavoriteLoading ||
    isDeleteFavoriteLoading ||
    isBookInfoLoading ||
    isAddTodoLoading ||
    isDeleteTodoLoading

  const [confirmMessageType, setConfirmMessageType] = useState<
    'Favorite' | 'Todo' | undefined
  >(undefined)

  let isFirstPointPassed = false
  let isSecondPointPassed = false
  let firstPointText = ''
  let secondPointText = ''
  if (bookInfo.passCount === 0) {
    if (bookInfo.studyTypeFullEasyYn) {
      const studyMode = bookInfo.studyMode
      if (studyMode === 'full') {
        isFirstPointPassed = true
      } else if (studyMode === 'easy') {
        isSecondPointPassed = true
      }
      firstPointText = t('t460', { num: bookInfo.secondRgPoint })
      secondPointText = t('t461', { num: bookInfo.rgPoint })
    } else {
      isSecondPointPassed = true
      firstPointText = t('t462', { num: bookInfo.rgPoint })
      secondPointText = t('t463', { num: bookInfo.secondRgPoint })
    }
  } else if (bookInfo.passCount === 1) {
    if (bookInfo.studyTypeFullEasyYn) {
      const studyMode = bookInfo.studyMode
      if (
        studyMode === 'select:easy' ||
        studyMode === 'add:easy' ||
        studyMode === 'easy'
      ) {
        isSecondPointPassed = true
        firstPointText = t('t460', { num: bookInfo.secondRgPoint })
        secondPointText = t('t464', { num: bookInfo.rgPoint })
      } else {
        isFirstPointPassed = true
        firstPointText = t('t465', { num: bookInfo.secondRgPoint })
        secondPointText = t('t461', { num: bookInfo.rgPoint })
      }
    } else {
      isFirstPointPassed = true
      firstPointText = t('t466', { num: bookInfo.rgPoint })
      secondPointText = t('t463', { num: bookInfo.secondRgPoint })
    }
  } else {
    isFirstPointPassed = true
    isSecondPointPassed = true
    if (bookInfo.studyTypeFullEasyYn) {
      firstPointText = t('t465', { num: bookInfo.secondRgPoint })
      secondPointText = t('t464', { num: bookInfo.rgPoint })
    } else {
      firstPointText = t('t466', { num: bookInfo.rgPoint })
      secondPointText = t('t467', { num: bookInfo.secondRgPoint })
    }
  }
  const firstPointClassName = `${style.detaild_item} ${isFirstPointPassed ? style.passed : ''}`
  const secondPointClassName = `${style.detaild_item} ${isSecondPointPassed ? style.passed : ''}`

  const isAssigned = !!bookInfo.studyId
  const isDeletable = !!bookInfo.deleteYn

  const [isMoviePlay, setMoviePlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoStop = () => {
    videoRef?.current?.pause()
  }

  useEffect(() => {
    return () => {
      videoStop()
    }
  }, [])

  const studyMode = bookInfo.studyMode
  const isModeSetableEasy =
    studyMode.startsWith('select:') && studyMode.indexOf('easy') >= 0
  const isModeSetableFull =
    studyMode.startsWith('select:') && studyMode.indexOf('full') >= 0
  const isReviewMode = studyMode === 'review' || studyMode === 'rewrite'

  const isButtonLayoutFullEasy =
    !!bookInfo.studyId && isModeSetableEasy && isModeSetableFull

  const onClickStartStudy = () => {
    if (!bookInfo.studyId) {
      onAddTodo('study')
    } else {
      const openDate = DateUtils.createDate(bookInfo.openDate)
      if (Date.now() >= openDate.getTime()) {
        goStudyStartAutoModeSet(bookInfo)
      } else {
        alert(
          t('t788', {
            year: openDate.getFullYear(),
            month: openDate.getMonth() + 1,
            day: openDate.getDate(),
          }), // 이 학습은 ${openDate.getFullYear()}년 ${openDate.getMonth() + 1}월 ${openDate.getDate()}일부터 시작 가능합니다.
        )
      }
    }
  }

  const onClickStartEasy = () => {
    const openDate = DateUtils.createDate(bookInfo.openDate)
    if (Date.now() >= openDate.getTime()) {
      goStudyModeSetAndStart(bookInfo, 'easy')
    } else {
      alert(
        t('t788', {
          year: openDate.getFullYear(),
          month: openDate.getMonth() + 1,
          day: openDate.getDate(),
        }), // 이 학습은 ${openDate.getFullYear()}년 ${openDate.getMonth() + 1}월 ${openDate.getDate()}일부터 시작 가능합니다.
      )
    }
  }

  const onClickStartFull = () => {
    const openDate = DateUtils.createDate(bookInfo.openDate)
    if (Date.now() >= openDate.getTime()) {
      goStudyModeSetAndStart(bookInfo, 'full')
    } else {
      alert(
        t('t788', {
          year: openDate.getFullYear(),
          month: openDate.getMonth() + 1,
          day: openDate.getDate(),
        }), // 이 학습은 ${openDate.getFullYear()}년 ${openDate.getMonth() + 1}월 ${openDate.getDate()}일부터 시작 가능합니다.
      )
    }
  }

  const onClickStartSpeak = () => {
    if (bookInfo.studyId) {
      goStudy('speak', bookInfo)
    } else {
      onAddTodo('speak')
    }
  }

  const isWorksheetYn = !!bookInfo.workSheetPath
  const isVocabularyYn = !!bookInfo.vocabularyPath

  const { isStudyEnd, studyEndMessage, value } = useStudentStudyable()
  const isGoToPayment =
    !siteTarget.private && isStudyEnd && value === 'NEED_PAYMENT'
  const { userReadingUnit } = useStudentReadingUnit()

  const isAddableTodo =
    !isAssigned &&
    addTargetStudentHistoryList &&
    addTargetStudentHistoryList.length > 0
      ? true
      : false

  let lblStartBtn = t('t793') // 시작하기
  if (isReviewMode) {
    lblStartBtn = t('t794') // 다시보기
  } else if (bookInfo.studyStartedYn) {
    lblStartBtn = t('t795') // 이어서하기
  }

  const router = useRouter()
  const onStudyEndMessage = () => {
    alert(studyEndMessage)
    if (isGoToPayment) {
      if (!siteTarget.private) {
        router.push(SITE_PATH.HOME.RG_PAYMENT)
      }
    }
  }

  const [viewVocaPrintOptions, setViewVocaPrintOptions] = useState(false)

  useEffect(() => {
    if (!bookInfo.bookCode) return
    if (!bookInfo.levelRoundId) return
    maketingEventTracker.eventAction('도서 상세 조회', {
      level_round_id: bookInfo.levelRoundId,
      book_code: bookInfo.bookCode,
    })
  }, [maketingEventTracker, bookInfo.bookCode, bookInfo.levelRoundId])

  if (isBookInfoInitLoading || error) {
    return (
      <Modal
        onClickDelete={() => {
          onClickDelete && onClickDelete()
          bookInfoAction.resetBookDetail()
        }}
        onClickLightbox={() => {
          if (onClickLightBox) {
            onClickLightBox()
          } else if (onClickDelete) {
            onClickDelete()
          }
          bookInfoAction.resetBookDetail()
        }}
        bookInfoStyle>
        <div className={style.book_info_modal}>
          <div
            className={style.col_a}
            style={{ backgroundImage: `url(${bookImgSrc})` }}>
            <div className={style.col_a_container}>
              <div style={{ width: '0px', height: '40px' }} />
              <div className={style.book}>
                <div className={style.book_container}>
                  <div className={style.book_image}>
                    <Image
                      alt=""
                      src={bookImgSrc}
                      layout="intrinsic"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className={style.txt_h}>{title}</div>
                  <div className={style.txt_l}>{author}</div>
                </div>
                <div className={style.download}>
                  <div
                    className={style.download_voca}
                    style={{ cursor: 'default' }}>
                    <span>&nbsp;</span>
                  </div>
                </div>
              </div>
              <Button width="100%" shadow color={'dark'}>
                <Image
                  alt=""
                  src="/src/images/lock-icons/lock_white.svg"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
            <div className={style.light_box}></div>
          </div>
          <div className={style.col_b}>
            <div className={style.col_b_header}>
              <div className={style.txt_h}>{t('t468')}</div>
              <div
                className={style.delete_button}
                onClick={onClickDelete}></div>
            </div>
            <div className={style.col_b_body}>
              <div className={style.book_info}>
                <div className={style.txt_p}>
                  {/* 도서 정보를 불러 올 수 없습니다. */}
                  {error ? t('t796') : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isMoviePlay && (
          <div className={style.movie_player}>
            <div
              className={style.container_video}
              onContextMenu={(e) => e.preventDefault()}>
              <video
                ref={videoRef}
                poster={bookImgSrc}
                disablePictureInPicture={true}
                autoPlay={false}
                controls={true}
                controlsList={'nodownload'}
                playsInline={true}
                style={{
                  width: '100%',
                  display: 'block',
                  maxHeight: isMobile ? '280px' : '300px',
                }}
                src={bookInfo.animationPath}
              />
            </div>
            <Button
              color={'red'}
              shadow
              width={'200px'}
              onClick={() => {
                videoStop()
                setMoviePlay(false)
              }}>
              close
            </Button>
          </div>
        )}
      </Modal>
    )
  }
  return (
    <Modal
      onClickDelete={() => {
        onClickDelete && onClickDelete()
        bookInfoAction.resetBookDetail()
      }}
      onClickLightbox={() => {
        if (onClickLightBox) {
          onClickLightBox()
        } else if (onClickDelete) {
          onClickDelete()
        }
        bookInfoAction.resetBookDetail()
      }}
      bookInfoStyle>
      {error ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            {/* 도서 정보를 불러 올 수 없습니다. */}
            {t('t796')}
          </div>
        </div>
      ) : (
        <>
          <div className={style.book_info_modal}>
            <div
              className={style.col_a}
              style={{ backgroundImage: `url(${bookImgSrc})` }}>
              <div className={style.col_a_container}>
                {bookInfo.expiredContentsYn ? (
                  <div style={{ width: '0px', height: '40px' }} />
                ) : (
                  <AddAssignment>
                    <AddFavorite
                      isFavorite={bookInfo.bookMarkYn}
                      isConfirmMessage={confirmMessageType === 'Favorite'}
                      onClick={() => {
                        if (confirmMessageType !== 'Favorite') {
                          setConfirmMessageType('Favorite')
                        } else {
                          setConfirmMessageType(undefined)
                        }
                      }}
                      onAddFavorite={onAddFavorite}
                      onDeleteFavorite={onDeleteFavorite}
                    />
                    <AddTodo
                      isTodo={isAssigned}
                      isDelete={isDeletable}
                      isConfirmMessage={confirmMessageType === 'Todo'}
                      onClick={() => {
                        if (!bookInfo.studyStartedYn) {
                          if (confirmMessageType !== 'Todo') {
                            setConfirmMessageType('Todo')
                          } else {
                            setConfirmMessageType(undefined)
                          }
                        }
                      }}
                      onAddTodo={() => onAddTodo()}
                      onDeleteTodo={onDeleteTodo}
                    />
                  </AddAssignment>
                )}
                <div className={style.book}>
                  <div className={style.book_container}>
                    {!bookInfo.expiredContentsYn && bookInfo.animationPath ? (
                      <div
                        className={style.movie_player}
                        onContextMenu={(e) => e.preventDefault()}>
                        <video
                          ref={videoRef}
                          poster={bookImgSrc}
                          disablePictureInPicture={true}
                          autoPlay={false}
                          controls={true}
                          controlsList={'nodownload'}
                          playsInline={true}
                          style={{
                            width: '100%',
                            display: 'block',
                            maxHeight: isMobile ? '280px' : '300px',
                          }}
                          src={bookInfo.animationPath}
                        />
                      </div>
                    ) : (
                      <div className={style.book_image}>
                        {bookInfo.expiredContentsYn ? (
                          <>
                            <div
                              style={{
                                position: 'relative',
                                display: 'inline-block',
                              }}>
                              <Image
                                alt=""
                                src={bookImgSrc}
                                layout="intrinsic"
                                width={200}
                                height={200}
                                style={{ display: 'block' }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  background: 'rgba(0,0,0,0.6)',
                                  pointerEvents: 'none',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  zIndex: 2,
                                }}>
                                <Image
                                  alt=""
                                  src="/src/images/@book-info/not-available.png"
                                  width={150}
                                  height={150}
                                  style={{ backgroundImage: 'none' }}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <Image
                            alt=""
                            src={bookImgSrc}
                            layout="intrinsic"
                            width={200}
                            height={200}
                          />
                        )}
                      </div>
                    )}

                    <div className={style.txt_h}>{title}</div>
                    <div className={style.txt_l}>{author}</div>
                  </div>
                  <div className={style.download}>
                    <div className={style.download_voca_container}>
                      <div
                        className={style.download_voca}
                        onClick={() => {
                          if (!isVocabularyYn) {
                            return
                          }
                          setViewVocaPrintOptions(!viewVocaPrintOptions)

                          /*
                          if (!isStudyEnd) {
                            openWindow(bookInfo.vocabularyPath, {
                              external: true,
                              target: '_blank',
                              feature: 'noopener, noreferrer',
                            })
                          } else {
                            onStudyEndMessage()
                          }
                          */
                        }}>
                        {isVocabularyYn && (
                          <>
                            <span>{t('t534')}</span>
                            <Image
                              alt=""
                              src="/src/images/@book-info/download.svg"
                              width={14}
                              height={14}
                            />
                          </>
                        )}
                      </div>
                      {/* 단어장 프린트 옵션 */}
                      {viewVocaPrintOptions && (
                        <VocaPrintOptions
                          onClick={(option) => {
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
                              paramsMap.set(
                                'args4',
                                option.vocabulary ? 'Y' : 'N',
                              )
                              if (option.definition1) {
                                paramsMap.set('args5', option.definition1Value)
                              } else {
                                paramsMap.set('args5', 'N')
                              }
                              paramsMap.set(
                                'args6',
                                option.definition2 ? 'Y' : 'N',
                              )
                              paramsMap.set(
                                'args7',
                                option.exampleSentence ? 'Y' : 'N',
                              )
                              paramsMap.set(
                                'args8',
                                option.studentName ? 'Y' : 'N',
                              )
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
                          }}
                          onCancel={() => {
                            setViewVocaPrintOptions(false)
                          }}
                        />
                      )}
                    </div>
                    {isWorksheetYn && (
                      <div
                        className={style.download_worksheet}
                        onClick={() => {
                          if (!isStudyEnd) {
                            openWindow(bookInfo.workSheetPath, {
                              external: true,
                              target: '_blank',
                              feature: 'noopener, noreferrer',
                            })
                          } else {
                            onStudyEndMessage()
                          }
                        }}>
                        <span>{t('t535')}</span>
                        <Image
                          alt=""
                          src="/src/images/@book-info/download.svg"
                          width={14}
                          height={14}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {!isAssigned &&
                  addTargetStudentHistoryList &&
                  addTargetStudentHistoryList.length > 1 && (
                    <SelectBox
                      value={currentStudentHistoryId}
                      onChange={(e) => {
                        onSelectStudentHistoryId &&
                          onSelectStudentHistoryId(e.target.value)
                      }}>
                      {addTargetStudentHistoryList.map((stdHistory) => {
                        return (
                          <SelectBoxItem
                            key={stdHistory.studentHistoryId}
                            value={stdHistory.studentHistoryId}>
                            {stdHistory.className}
                          </SelectBoxItem>
                        )
                      })}
                    </SelectBox>
                  )}
                {!isButtonLayoutFullEasy ? (
                  <Button
                    width="100%"
                    shadow
                    color={isReviewMode ? 'blue' : 'red'}
                    onClick={() => {
                      if (bookInfo.expiredContentsYn) {
                        return
                      }
                      if (!isStudyEnd) {
                        onClickStartStudy()
                      } else {
                        onStudyEndMessage()
                      }
                    }}>
                    {!isStudyEnd && !bookInfo.expiredContentsYn ? (
                      lblStartBtn
                    ) : (
                      <Image
                        alt=""
                        src="/src/images/lock-icons/lock_white.svg"
                        width={24}
                        height={24}
                      />
                    )}
                  </Button>
                ) : (
                  <>
                    {!isStudyEnd && !bookInfo.expiredContentsYn ? (
                      <div className={style.full_easy_container}>
                        <Button
                          width="100%"
                          shadow
                          color={'red'}
                          onClick={() => onClickStartEasy()}
                          completed={!isModeSetableEasy}>
                          EASY Mode
                        </Button>
                        <Button
                          width="100%"
                          shadow
                          color={'red'}
                          onClick={() => onClickStartFull()}
                          completed={!isModeSetableFull}>
                          FULL Mode
                        </Button>
                      </div>
                    ) : (
                      <Button
                        width="100%"
                        shadow
                        color={'red'}
                        onClick={() => {
                          if (isStudyEnd) {
                            onStudyEndMessage()
                          }
                        }}>
                        <Image
                          alt=""
                          src="/src/images/lock-icons/lock_white.svg"
                          width={24}
                          height={24}
                        />
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div className={style.light_box}></div>
            </div>
            <div className={style.col_b}>
              <div className={style.col_b_header}>
                <div className={style.txt_h}>{t('t468')}</div>
                <div className={style.delete_button} onClick={onClickDelete}>
                  {/* <Image
                  alt=""
                  src="/src/images/delete-icons/x_black.svg"
                  width={28}
                  height={28}
                /> */}
                </div>
              </div>
              <div className={style.col_b_body}>
                <div className={style.book_info}>
                  <div className={style.txt_p}>{bookInfo.synopsis}</div>
                  <div className={style.detaild}>
                    <div className={style.detaild_row_a}>
                      <div className={style.detaild_item}>{t('t469')}</div>
                      <div
                        className={
                          style.detaild_item
                        }>{`${bookInfo.bookLevel}`}</div>
                      <div className={style.detaild_item}>{t('t470')}</div>
                      <div
                        className={
                          style.detaild_item
                        }>{`${bookInfo.bookCode}`}</div>
                      <div className={style.detaild_item}>{t('t471')}</div>
                      <div
                        className={
                          style.detaild_item
                        }>{`${bookInfo.pages}`}</div>
                      <div className={style.detaild_item}>{t('t472')}</div>
                      <div
                        className={
                          style.detaild_item
                        }>{`${bookInfo.wordCount}`}</div>
                      <div className={style.detaild_item}>{t('t473')}</div>
                      <div
                        className={
                          style.detaild_item
                        }>{`${bookInfo.recommendedAge === 'B' ? 'Teen' : bookInfo.recommendedAge === 'C' ? 'Adult' : 'All'}`}</div>
                      <div className={style.detaild_item}>{t('t474')}</div>
                      <div
                        className={
                          style.detaild_item
                        }>{`${bookInfo.genre}`}</div>
                    </div>
                    <div className={style.detaild_row_b}>
                      <div className={style.detaild_item}>{t('t475')}</div>
                      <div className={style.detaild_item}>
                        {bookInfo.passCount <= 2 ? bookInfo.passCount : 2}/2
                      </div>
                      <div className={style.detaild_item}>{t('t476')}</div>

                      <div className={`${firstPointClassName}`}>
                        {firstPointText}
                      </div>
                      <div className={style.detaild_item} />
                      <div className={`${secondPointClassName}`}>
                        {secondPointText}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.book_resource}>
                  {isStudySpeakActive && bookInfo.speakContentYn && (
                    <div className={style.book_resource_container}>
                      <div className={style.txt_h}>{t('t477')}</div>
                      <div className={style.buttons}>
                        <div
                          className={style.speak_button}
                          onClick={() => {
                            if (!isStudyEnd) {
                              onClickStartSpeak()
                            } else {
                              onStudyEndMessage()
                            }
                          }}>
                          Speak{`${bookInfo.speakPassYn ? ' Pass' : ''}`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isMoviePlay && (
            <div className={style.movie_player}>
              <div
                className={style.container_video}
                onContextMenu={(e) => e.preventDefault()}>
                <video
                  ref={videoRef}
                  poster={bookImgSrc}
                  disablePictureInPicture={true}
                  autoPlay={false}
                  controls={true}
                  controlsList={'nodownload'}
                  playsInline={true}
                  style={{
                    width: '100%',
                    display: 'block',
                    maxHeight: isMobile ? '280px' : '300px',
                  }}
                  src={bookInfo.animationPath}
                />
              </div>
              <Button
                color={'red'}
                shadow
                width={'200px'}
                onClick={() => {
                  videoStop()
                  setMoviePlay(false)
                }}>
                close
              </Button>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}

const AddAssignment = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.add_assignment}>
      <div className={style.add_assignment_container}>{children}</div>
    </div>
  )
}

const AddFavorite = ({
  isFavorite,
  isConfirmMessage,
  onClick,
  onAddFavorite,
  onDeleteFavorite,
}: {
  isFavorite: boolean
  isConfirmMessage: boolean
  onClick?: () => void
  onAddFavorite?: () => void
  onDeleteFavorite?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  return (
    <div className={style.add_favorite}>
      <div
        className={style.add_favorite_icon}
        onClick={() => {
          onClick && onClick()
        }}>
        {isFavorite ? (
          <Image
            alt=""
            src="/src/images/@book-info/add_favorite_on.svg"
            width={24}
            height={24}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/@book-info/add_favorite_off.svg"
            width={24}
            height={24}
          />
        )}
      </div>
      {isConfirmMessage && (
        <div className={style.alert}>
          <AlertBox
            toolTipRight={!isMobile}
            toolTipLeft={isMobile}
            text={isFavorite ? t('t478') : t('t479')}
            onClickY={() => {
              if (isFavorite) {
                onDeleteFavorite && onDeleteFavorite()
              } else {
                onAddFavorite && onAddFavorite()
              }
              onClick && onClick()
            }}
            onClickN={() => {
              onClick && onClick()
            }}
          />
        </div>
      )}
    </div>
  )
}

const AddTodo = ({
  isTodo,
  isDelete,
  isConfirmMessage,
  onClick,
  onAddTodo,
  onDeleteTodo,
}: {
  isTodo: boolean
  isDelete: boolean
  isConfirmMessage: boolean
  onClick?: () => void
  onAddTodo?: () => void
  onDeleteTodo?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'
  let text = ''
  if (isConfirmMessage) {
    if (isTodo) {
      text = t('t480')
    } else {
      text = t('t481')
    }
  }

  const styleDontDelete = isTodo && !isDelete ? { opacity: 0.6 } : undefined

  return (
    <div className={style.add_todo}>
      <div
        className={style.add_todo_icon}
        style={styleDontDelete}
        onClick={() => {
          if (isTodo && !isDelete) {
            alert(t('t786')) // 학습을 시작한 경우, To-Do에서 학습을 지울 수 없습니다.
          } else {
            onClick && onClick()
          }
        }}>
        {isTodo ? (
          <Image
            alt=""
            src="/src/images/@book-info/add_to_do_on.svg"
            width={24}
            height={24}
          />
        ) : (
          <Image
            alt=""
            src="/src/images/@book-info/add_to_do_off.svg"
            width={24}
            height={24}
          />
        )}
      </div>
      {isConfirmMessage && (
        <div className={style.alert}>
          <AlertBox
            toolTipRight={!isMobile}
            toolTipLeft={isMobile}
            text={text}
            onClickY={() => {
              if (isTodo) {
                onDeleteTodo && onDeleteTodo()
              } else {
                onAddTodo && onAddTodo()
              }
              onClick && onClick()
            }}
            onClickN={() => {
              onClick && onClick()
            }}
          />
        </div>
      )}
    </div>
  )
}
