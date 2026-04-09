'use client'

import { useDevicePlatformInfo } from '@/7th/__root/ApplicationContext'
import { useOnLoadBookInfoDetail } from '@/7th/_client/store/bookinfo/detail/hook'
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
import {
  useStaffInfoFlagLogin,
  useStudentStudyable,
} from '@/7th/_client/store/student/info/selector'
import { useStudentReadingUnit } from '@/7th/_client/store/student/reading-unit/selector'
import { openWindow } from '@/7th/_function/open-window'
import { goToStudy } from '@/7th/_function/study-start'
import { AlertBox, Button, Modal } from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import { useLanguagePackContext } from '@/localization/client/LanguagePackContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import VocaPrintOptions from '../library-book-cover/VocaPrintOptions'

const STYLE_ID = 'review_assessment_report'

type StudyStart = 'study' | 'speak'
export const ReviewAssessmentReport = ({
  levelRoundId,
  studyId,
  studentHistoryId,
  onClickDelete,
  onClickLightbox,
  bookImgSrc,
  title,
  author,
  addedToDo = false,
  addedFavorite = false,
  bookCode,
  studyDate,
  totalScore,
  isPassed,
  completedInfo,
  earnPoints,
}: {
  levelRoundId: string
  studyId: string
  studentHistoryId: string
  onClickDelete?: () => void
  onClickLightbox?: () => void
  bookImgSrc: string
  title: string
  author?: string
  addedToDo?: boolean
  addedFavorite?: boolean
  bookCode: string
  studyDate: string
  totalScore: number
  isPassed: boolean
  completedInfo: string
  earnPoints: number
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()
  const { language } = useLanguagePackContext()
  const device = useDevicePlatformInfo()
  const staffLoginStatus = useStaffInfoFlagLogin()

  const { loading: isBookInfoInitLoading } = useOnLoadBookInfoDetail({
    levelRoundId,
    studyId,
    studentHistoryId,
  })
  const bookInfo = useBookInfoDetail().payload
  const bookInfoAction = useBookInfoDetailAction()

  const [confirmMessageType, setConfirmMessageType] = useState<
    'Favorite' | 'Todo' | undefined
  >(undefined)

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

  const isMobile = useScreenMode() === 'mobile'

  const onStartStudy = (study: StudyStart) => {
    if (bookInfo.expiredContentsYn) {
      return
    }
    goToStudy({
      studyInfo: bookInfo,
      mode: 'review',
      user: staffLoginStatus === 'on' ? 'staff' : 'student',
      isStartSpeak: study === 'speak',
      unit: userReadingUnit.id,
      language,
      device,
    })
  }

  const isWorksheetYn = !!bookInfo.workSheetPath
  const isVocabularyYn = !!bookInfo.vocabularyPath
  const isReportYn = !!bookInfo.reportPath

  const { isStudyEnd, studyEndMessage } = useStudentStudyable()
  const { userReadingUnit } = useStudentReadingUnit()

  const [viewVocaPrintOptions, setViewVocaPrintOptions] = useState(false)

  return (
    <Modal
      onClickLightbox={() => {
        if (onClickLightbox) {
          onClickLightbox()
        } else if (onClickDelete) {
          onClickDelete()
        }
      }}
      bookInfoStyle>
      <div className={style.review_assessment_report}>
        <div
          className={style.col_a}
          style={{ backgroundImage: `url("${bookImgSrc}")` }}>
          <div className={style.col_a_container}>
            <AddAssignment>
              {!bookInfo.expiredContentsYn ? (
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
              ) : (
                <div style={{ width: '0px', height: '40px' }} />
              )}
              {/* <AddTodo
                isTodo={true}
                isConfirmMessage={confirmMessageType === 'Todo'}
                onClick={() => {
                  if (confirmMessageType !== 'Todo') {
                    setConfirmMessageType('Todo')
                  } else {
                    setConfirmMessageType(undefined)
                  }
                }}
              /> */}
            </AddAssignment>
            <div className={style.book}>
              <div className={style.book_container}>
                <div className={style.book_image}>
                  {!bookInfo.expiredContentsYn ? (
                    <Image
                      alt=""
                      src={bookImgSrc}
                      layout="intrinsic"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div
                      style={{ position: 'relative', display: 'inline-block' }}>
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
                          background: 'rgba(0,0,0,0.5)',
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
                  )}
                </div>
                {bookInfo.expiredContentsYn ? (
                  <div style={{ width: '0px', height: '40px' }} />
                ) : (
                  <></>
                )}
                <div className={style.txt_h}>{title}</div>
                <div className={style.txt_l}>{author}</div>
              </div>
              <div className={style.download}>
                <div className={style.download_voca_container}>
                  {isVocabularyYn && (
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
                          alert(studyEndMessage)
                        }
                        */
                      }}>
                      <span>{t('t534')}</span>
                      <Image
                        alt=""
                        src="/src/images/@book-info/download.svg"
                        width={14}
                        height={14}
                      />
                    </div>
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
                        paramsMap.set('args4', option.vocabulary ? 'Y' : 'N')
                        if (option.definition1) {
                          paramsMap.set('args5', option.definition1Value)
                        } else {
                          paramsMap.set('args5', 'N')
                        }
                        paramsMap.set('args6', option.definition2 ? 'Y' : 'N')
                        paramsMap.set(
                          'args7',
                          option.exampleSentence ? 'Y' : 'N',
                        )
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
                        alert(studyEndMessage)
                      }
                    }}
                    onCancel={() => {
                      setViewVocaPrintOptions(false)
                    }}
                  />
                )}
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
                        alert(studyEndMessage)
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
            <div className={style.review}>
              {isReportYn && (
                <Button
                  width="100%"
                  color={'dark'}
                  onClick={() => {
                    if (!isStudyEnd) {
                      openWindow(bookInfo.reportPath, {
                        external: true,
                        target: '_blank',
                        feature: 'noopener, noreferrer',
                      })
                    } else {
                      alert(studyEndMessage)
                    }
                  }}>
                  {t('t536')}
                </Button>
              )}
              {!bookInfo.expiredContentsYn ? (
                <Button
                  width="100%"
                  color={isPassed ? 'blue' : 'red'}
                  onClick={() => {
                    if (!isStudyEnd) {
                      onStartStudy('study')
                    } else {
                      alert(studyEndMessage)
                    }
                  }}>
                  {!isStudyEnd ? (
                    t('t497')
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
                <div style={{ width: '100%' }}></div>
              )}
            </div>
          </div>
          <div className={style.light_box}></div>
        </div>
        <div className={style.col_b}>
          <div className={style.col_b_header}>
            <div className={style.txt_h}>{t('t537')}</div>
            <div
              className={style.delete_button}
              onClick={(e) => {
                e.stopPropagation()
                onClickDelete && onClickDelete()
              }}></div>
          </div>
          <div className={style.col_b_body}>
            <SubTitle>{t('t468')}</SubTitle>
            <StudyInfo
              bookCode={bookCode}
              studyDate={studyDate}
              totalScore={totalScore}
              isPassed={isPassed}
              completedInfo={completedInfo}
              earnPoints={earnPoints}
            />
            <SubTitle>{t('t538')}</SubTitle>
            <StepInfo
              scoreStep1={
                !bookInfo.scoreStep1 || bookInfo.scoreStep1 < 0
                  ? '-'
                  : bookInfo.scoreStep1
              }
              scoreStep2={
                !bookInfo.scoreStep2 || bookInfo.scoreStep2 < 0
                  ? '-'
                  : bookInfo.scoreStep2
              }
              scoreStep3={
                !bookInfo.scoreStep3 || bookInfo.scoreStep3 < 0
                  ? '-'
                  : bookInfo.scoreStep3
              }
              scoreStep4={
                !bookInfo.scoreStep4 || bookInfo.scoreStep4 < 0
                  ? '-'
                  : bookInfo.scoreStep4
              }
              scoreStep5={
                !bookInfo.scoreStep5 || bookInfo.scoreStep5 < 0
                  ? '-'
                  : bookInfo.scoreStep5
              }
            />
            {/* {(bookInfo.speakPassYn || bookInfo.animationPath) && (
              <MoreActivities
                isSpeakPass={bookInfo.speakPassYn}
                animationPath={bookInfo.animationPath}
              />
            )} */}
            {bookInfo.speakPassYn && (
              <MoreActivities isSpeakPass={bookInfo.speakPassYn} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

const SubTitle = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.sub_title}>{children}</div>
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
  isConfirmMessage,
  onClick,
  onAddTodo,
  onDeleteTodo,
}: {
  isTodo: boolean
  isConfirmMessage: boolean
  onClick?: () => void
  onAddTodo?: () => void
  onDeleteTodo?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'
  return (
    <div className={style.add_todo}>
      <div
        className={style.add_todo_icon}
        onClick={() => {
          onClick && onClick()
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
            text={isTodo ? t('t480') : t('t481')}
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

// (북코드, 학습 완료일, 총점, 통과했는가, 학습 모드 - 1st or full, 획득포인트 )
const StudyInfo = ({
  bookCode,
  studyDate,
  totalScore,
  isPassed,
  completedInfo,
  earnPoints,
}: {
  bookCode: string
  studyDate: string
  totalScore: number
  isPassed: boolean
  completedInfo: string
  earnPoints: number
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.study_info}>
      <div className={style.detaild}>
        <div className={style.detaild_item}>{t('t470')}</div>
        <div className={style.detaild_item}>{bookCode}</div>
        <div className={style.detaild_item}>{t('t539')}</div>
        <div className={style.detaild_item}>{studyDate}</div>
        <div className={style.detaild_item}>{t('t540')}</div>
        <div className={style.detaild_item}>{totalScore}</div>
        <div className={style.detaild_item}>{t('t140')}</div>
        <div className={style.detaild_item}>
          <span style={{ color: isPassed ? '#15b5f1' : '#ff274f' }}>
            {isPassed ? 'PASS' : 'FAIL'}{' '}
            {isPassed &&
              '/ ' + completedInfo + ' (' + '+' + earnPoints + 'P' + ')'}
          </span>
        </div>
      </div>
    </div>
  )
}

const StepInfo = ({
  scoreStep1,
  scoreStep2,
  scoreStep3,
  scoreStep4,
  scoreStep5,
}: {
  scoreStep1: number | '-'
  scoreStep2: number | '-'
  scoreStep3: number | '-'
  scoreStep4: number | '-'
  scoreStep5: number | '-'
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.step_info}>
      <div className={style.label}>step1</div>
      <div className={style.label}>step2</div>
      <div className={style.label}>step3</div>
      <div className={style.label}>step4</div>
      <div className={style.label}>step5</div>
      <div className={style.score}>{scoreStep1}</div>
      <div className={style.score}>{scoreStep2}</div>
      <div className={style.score}>{scoreStep3}</div>
      <div className={style.score}>{scoreStep4}</div>
      <div className={style.score}>{scoreStep5}</div>
    </div>
  )
}

const MoreActivities = ({
  isSpeakPass,
  animationPath,
}: {
  isSpeakPass: boolean
  animationPath?: string
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.book_resource}>
      <div className={style.book_resource_container}>
        <SubTitle>{t('t477')}</SubTitle>
        <div className={style.buttons}>
          {isSpeakPass && <div className={style.speak_button}>{t('t541')}</div>}
          {/* {animationPath && <div className={style.movie_button}>{t('t543')}</div>} */}
        </div>
      </div>
    </div>
  )
}
