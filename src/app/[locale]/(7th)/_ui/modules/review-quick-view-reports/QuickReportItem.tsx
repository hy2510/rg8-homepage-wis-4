'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import { ReactNode } from 'react'

const STYLE_ID = 'quick_view_reports'

// 간편보기 리포트 리스트
export const QuickReportsList = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.quick_reports_list}>{children}</div>
}

// 간편보기 리포트 아이템
export const QuickReportItem = ({
  imgSrc,
  title,
  bookCode,
  studyDate,
  totalScore,
  isPassed,
  completedInfo,
  earnPoints,
  children,
  onClick,
}: {
  imgSrc: string
  title: string
  bookCode: string
  studyDate: string
  totalScore: number
  isPassed: boolean
  completedInfo: string
  earnPoints: number
  children?: ReactNode
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  const isThirdStudy = completedInfo.toLocaleLowerCase() === '3rd'

  return (
    <div className={style.quick_report_item}>
      <div className={style.book_cover} onClick={onClick}>
        <Image
          alt=""
          src={imgSrc}
          layout="intrinsic"
          width={200}
          height={200}
          className={style.book_cover_img}
        />
        {isPassed ? (
          <div
            className={`${style.pass_mark}${isThirdStudy ? ` ${style.third}` : ''}`}></div>
        ) : (
          <div className={`${style.fail_mark}`}></div>
        )}
      </div>
      <div className={style.result}>
        {isPassed ? (
          <div className={style.pass}>
            {isThirdStudy ? 'PASS' : `+${earnPoints}P`}
          </div>
        ) : (
          <div className={style.fail}>FAIL</div>
        )}
      </div>
      <div className={`${style.date}`}>{studyDate}</div>
      {children}
    </div>
  )
}
