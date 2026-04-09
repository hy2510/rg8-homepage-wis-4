'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'

const STYLE_ID = 'page_kids_prek'

export default function PreKCover({
  title,
  passedCount,
  coverImage,
  active,
  downloadPath,
  onClickBook,
  onClickDownload,
}: {
  title: string
  passedCount: number
  coverImage: string
  active?: boolean
  downloadPath?: string

  onClickBook?: () => void
  onClickDownload?: () => void
}) {
  const style = useStyle(STYLE_ID)

  const isPassed = passedCount >= 1
  const isCompleted = passedCount >= 2

  return (
    <div>
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
          <Image src={coverImage} alt="" width={320} height={180} />
        </div>
        {downloadPath && (
          <div className={style.btn_download} onClick={onClickDownload}></div>
        )}
      </div>
      <div className={style.txt_study_title} onClick={onClickBook}>
        {title}
      </div>
    </div>
  )
}
