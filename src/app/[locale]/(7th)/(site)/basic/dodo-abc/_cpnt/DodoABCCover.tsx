'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import { useState } from 'react'
import { DodoABCType } from './DodoABCContainer'

const STYLE_ID = 'page_kids_dodo_abc'

export default function DodoABCCover({
  type,
  title,
  passedCount,
  studyImage,
  coverImage,
  active,
  downloadPath,
  onClickBook,
  onClickDownload,
}: {
  type: DodoABCType
  title?: string
  passedCount: number
  studyImage?: string
  coverImage: string
  active?: boolean
  downloadPath?: string
  onClickBook?: () => void
  onClickDownload?: () => void
}) {
  if (type === 'Song') {
    return (
      <DodoABCSongCover
        title={title!}
        passedCount={passedCount}
        image={studyImage!}
        onClickBook={onClickBook}
      />
    )
  } else if (type === 'Game') {
    return (
      <DodoABCGameCover
        passedCount={passedCount}
        image={coverImage}
        active={active}
        onClickBook={onClickBook}
      />
    )
  } else {
    return (
      <DodoABCStudyCover
        title={title!}
        passedCount={passedCount}
        image={studyImage!}
        active={active}
        downloadPath={downloadPath}
        onClickBook={onClickBook}
        onClickDownload={onClickDownload}
      />
    )
  }
}

export function DodoABCMovieCover({
  tag,
  videoPath,
  thumbnailImage,
}: {
  tag: string
  videoPath: string
  thumbnailImage: string
}) {
  const style = useStyle(STYLE_ID)

  const [isVideoActive, setVideoActive] = useState(false)

  return (
    <div
      className={`${style.movie_thumbnail}`}
      onClick={() => {
        setVideoActive(true)
      }}>
      <div className={style.tag}>
        <span className={style.ico_movie}></span>
        <span className={style.txt_tag}>{tag}</span>
      </div>
      <div
        className={style.img_thumbnail}
        style={{
          backgroundImage: `url('${thumbnailImage}')`,
        }}></div>
      {isVideoActive && (
        <MoviePlayerModal
          videoPath={videoPath}
          thumbnailImage={thumbnailImage}
          onCloseClick={() => {
            setVideoActive(false)
          }}
        />
      )}
    </div>
  )
}

function MoviePlayerModal({
  videoPath,
  thumbnailImage,
  onCloseClick,
}: {
  videoPath: string
  thumbnailImage: string
  onCloseClick?: () => void
}) {
  const style = useStyle(STYLE_ID)
  return (
    <div className={style.video_box}>
      <div
        className={style.video_container}
        onContextMenu={(e) => e.preventDefault()}>
        <video
          poster={thumbnailImage}
          disablePictureInPicture={true}
          autoPlay={false}
          controls={true}
          controlsList={'nodownload'}>
          <source src={videoPath} type="video/mp4" />
        </video>
        <div
          className={style.btn_delete}
          onClick={(e) => {
            e.stopPropagation()
            onCloseClick && onCloseClick()
          }}></div>
      </div>
    </div>
  )
}

function DodoABCStudyCover({
  title,
  passedCount,
  image,
  active,
  downloadPath,
  onClickBook,
  onClickDownload,
}: {
  title: string
  passedCount: number
  image: string
  active?: boolean
  downloadPath?: string
  onClickBook?: () => void
  onClickDownload?: () => void
}) {
  const style = useStyle(STYLE_ID)

  const isPassed = passedCount >= 1
  const isCompleted = passedCount >= 2

  return (
    <div
      className={`${style.study_thumbnail}${active ? ` ${style.active}` : ''}${isPassed ? ` ${style.passed}` : ''}${isCompleted ? ` ${style.passed_all}` : ''}`}>
      {isPassed ? (
        <div
          className={
            isCompleted ? style.ico_passed_all : style.ico_passed_1
          }></div>
      ) : (
        <></>
      )}
      <div className={style.img_thumbnail} onClick={onClickBook}>
        <Image src={image} alt="" width={320} height={180} />
      </div>
      <div className={style.txt_study_title} onClick={onClickBook}>
        {title}
      </div>
      {downloadPath && (
        <div className={style.btn_download} onClick={onClickDownload}></div>
      )}
    </div>
  )
}

function DodoABCSongCover({
  title,
  passedCount,
  image,
  onClickBook,
}: {
  title: string
  passedCount: number
  image: string
  onClickBook?: () => void
}) {
  const style = useStyle(STYLE_ID)

  const isPassed = passedCount >= 1
  const isCompleted = passedCount >= 2

  return (
    <div
      className={`${style.song_thumbnail} ${style.active}${isPassed ? ` ${style.passed}` : ''}`}>
      {isPassed ? (
        <div
          className={
            isCompleted ? style.ico_passed_all : style.ico_passed_1
          }></div>
      ) : (
        <></>
      )}
      <div className={style.img_thumbnail} onClick={onClickBook}>
        <Image src={image} alt="" width={320} height={180} />
      </div>
      <div className={style.txt_study_title} onClick={onClickBook}>
        {title}
      </div>
    </div>
  )
}

function DodoABCGameCover({
  passedCount,
  image,
  active,
  onClickBook,
}: {
  passedCount: number
  image: string
  active?: boolean
  onClickBook?: () => void
}) {
  const style = useStyle(STYLE_ID)

  const isPassed = passedCount >= 1
  const isCompleted = passedCount >= 2

  return (
    <div
      className={`${style.game_thumbnail}${active || isPassed ? ` ${style.active}` : ''}${isPassed ? ` ${style.passed}` : ''}`}>
      {isPassed ? (
        <div
          className={
            isCompleted ? style.ico_passed_all : style.ico_passed_1
          }></div>
      ) : (
        <></>
      )}
      <div className={style.img_thumbnail} onClick={onClickBook}>
        <Image src={image} alt="" width={320} height={180} />
      </div>
    </div>
  )
}
