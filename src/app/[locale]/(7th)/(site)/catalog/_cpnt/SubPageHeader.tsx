'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'

const STYLE_ID = 'page_catalog'

export default function SubPageHeader({
  titleCol1,
  titleCol2,
  exp,
  compact,
}: {
  titleCol1: string
  titleCol2?: string
  exp: string
  compact?: boolean
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.sub_page_header} ${compact && style.compact}`}>
      <div className={style.title}>
        <span className={style.title_col1}>{titleCol1}</span>
        <span className={style.title_col2}>{titleCol2}</span>
      </div>
      <div className={style.exp}>{exp}</div>
    </div>
  )
}
