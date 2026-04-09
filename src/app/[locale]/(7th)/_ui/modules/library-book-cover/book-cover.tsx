'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import { ExportSelectItem } from '@/7th/site/library/_fn/use-export'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import { useState } from 'react'
import InProgress from '../InProgress'
import { BookInfoModal } from './BookInfoModal'

const STYLE_ID = 'book_cover'

export interface BookCoverProps {
  target?: string
  bookImgSrc: string
  bookCode?: string
  title: string
  author: string
  summary?: string
  assignDate?: string
  earnPoint?: number
  isAssignedTodo?: boolean
  isInprogressTodo?: boolean
  passedCount?: number
  isMovieBook?: boolean
  id: string
  isHomework?: boolean
  isBookInfo?: boolean
  onClickBookDetail?: () => void
  levelRoundId: string
  studyId?: string
  studentHistoryId?: string
  isExportMode?: boolean
  isExportCheckable?: boolean
  isExportChecked?: boolean
  onExportCheckedChange?: (
    key: string,
    item: ExportSelectItem,
    isChecked: boolean,
  ) => void
  grade?: string
}

// 도서 아이템
export function BookCover({
  target = 'library',
  bookImgSrc,
  bookCode,
  title,
  author,
  isHomework,
  assignDate,
  earnPoint,
  isAssignedTodo = false,
  isInprogressTodo = false,
  passedCount = 0,
  isMovieBook,
  id,
  isBookInfo,
  onClickBookDetail,
  levelRoundId,
  studyId,
  studentHistoryId,
  isExportMode,
  isExportChecked,
  isExportCheckable = true,
  onExportCheckedChange,
  grade,
}: BookCoverProps) {
  const style = useStyle(STYLE_ID)

  let passedIcon = ''
  let passedClassName = ''
  if (passedCount >= 2) {
    passedIcon = '/src/images/@book-cover/passed_all.svg'
    passedClassName = style.passed_all
  } else if (passedCount === 1) {
    passedIcon = '/src/images/@book-cover/passed_1.svg'
    passedClassName = style.passed_1
  }

  const onCheckedChange = () => {
    if (isExportCheckable) {
      if (onExportCheckedChange) {
        onExportCheckedChange(
          id,
          {
            levelRoundId,
            studyId,
            studentHistoryId,
            extra: isAssignedTodo ? 'todo' : undefined,
          },
          !isExportChecked,
        )
      }
    }
  }

  const isShowPoint = earnPoint !== undefined
  const coverPoint = earnPoint || 0

  const [copyMessage, setCopyMessage] = useState(false)

  const handleCopy = async () => {
    let isCopied = false
    const textToCopy = title
    if (!!window?.navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy)

        isCopied = true
      } catch (_) {}
    }

    if (!isCopied) {
      const tempInput = document.createElement('input')
      tempInput.setAttribute('readonly', 'true')
      tempInput.style.position = 'fixed'
      tempInput.style.bottom = '0'
      tempInput.style.left = '0'
      tempInput.style.opacity = '0'
      tempInput.style.pointerEvents = 'none'
      tempInput.style.zIndex = '-1'

      // 임시 입력 필드에 텍스트 설정
      tempInput.value = textToCopy
      document.body.appendChild(tempInput)

      // 텍스트 선택 및 복사
      tempInput.select()
      tempInput.setSelectionRange(0, 99999)
      document.execCommand('copy')

      // 임시 입력 필드 삭제
      document.body.removeChild(tempInput)
      isCopied = true
    }

    if (isCopied) {
      setCopyMessage(true)
      setTimeout(() => {
        setCopyMessage(false)
      }, 1000)
    }
    // alert('Book title copied.');
  }

  return (
    <>
      <div className={style.book_cover}>
        <div className={style.container}>
          <div className={style.study_status}>
            {isAssignedTodo && (
              <div className={style.assigned_todo}>
                <Image
                  alt=""
                  src="/src/images/@book-cover/assigned_todo.svg"
                  width={34}
                  height={34}
                />
              </div>
            )}
            {passedIcon && (
              <div className={passedClassName}>
                <Image alt="" src={passedIcon} width={34} height={34} />
              </div>
            )}
            {isInprogressTodo && (
              <div className={style.in_progress}>
                {/* <Image
                  alt=""
                  src="/src/images/@book-cover/in_progress.svg"
                  width={34}
                  height={34}
                  style={{ width: '34px', height: '34px' }}
                /> */}
                <InProgress />
              </div>
            )}
            {isHomework && (
              <div className={style.home_work}>
                <Image
                  alt=""
                  src="/src/images/@book-cover/home_work.svg"
                  width={34}
                  height={34}
                />
              </div>
            )}
          </div>
          <div>
            <div className={style.book_image}>
              {(grade === 'B' || grade === 'C') && (
                <div
                  className={
                    style.grade_badge
                  }>{`${grade === 'B' ? 'Teen' : grade === 'C' ? 'Adult' : ''}`}</div>
              )}
              {isExportMode ? (
                <div
                  className={`${style.check_box} ${style.swirl_in_bck}`}
                  onClick={onCheckedChange}>
                  {isExportCheckable && (
                    <>
                      {isExportChecked ? (
                        <Image
                          alt={''}
                          src="/src/images/check-icons/check_box_on.svg"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <Image
                          alt={''}
                          src="/src/images/check-icons/check_box_off.svg"
                          width={24}
                          height={24}
                        />
                      )}
                    </>
                  )}
                </div>
              ) : undefined}
              {isMovieBook && (
                <div className={style.movie_icon}>
                  <Image
                    alt=""
                    src="/src/images/@book-cover/movie_src.svg"
                    width={34}
                    height={34}
                  />
                </div>
              )}
              <Image
                alt=""
                src={bookImgSrc}
                layout="intrinsic"
                width={200}
                height={290}
                className={style.book_image_src}
                onClick={() => {
                  if (!isExportMode) {
                    onClickBookDetail && onClickBookDetail()
                  } else {
                    onCheckedChange()
                  }
                }}
              />
            </div>
          </div>
          <div
            className={`${style.title_copy_box} ${copyMessage ? null : style.copy_icon}`}>
            <div
              onClick={() => {
                handleCopy()
              }}
              className={style.book_title}>
              {/* <Image src='/src/images/@book-cover/copy.svg' width={14} height={14} alt='' /> */}
              {copyMessage ? (
                <span style={{ color: 'var(--green)' }}>Title copied!</span>
              ) : (
                title
              )}
            </div>
          </div>
          {bookCode && (
            <div className={style.tag}>
              <span>
                {bookCode}{' '}
                {isShowPoint && (
                  <>
                    <div className={style.line}></div>
                    <span
                      className={
                        style.point
                      }>{`${NumberUtils.toRgDecimalPoint(coverPoint)}P`}</span>
                  </>
                )}
              </span>
            </div>
          )}
          {assignDate && (
            <div className={style.tag}>
              <span>{isHomework ? `(${assignDate})` : `${assignDate}`}</span>
            </div>
          )}
        </div>
      </div>
      {isBookInfo && (
        <BookInfoModal
          key={studyId}
          target={target}
          bookImgSrc={bookImgSrc}
          title={title}
          author={author}
          onClickDelete={() => {
            onClickBookDetail && onClickBookDetail()
          }}
          levelRoundId={levelRoundId}
          studyId={studyId}
          studentHistoryId={studentHistoryId}
        />
      )}
    </>
  )
}
