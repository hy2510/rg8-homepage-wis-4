'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import { StudyProgressInfo } from './PreKContainer'

const STYLE_ID = 'page_kids_prek'
export default function PreKCategory({
  active,
  progress,
  onCategoryClick,
}: {
  active?: string
  progress?: StudyProgressInfo[]
  onCategoryClick?: (name: string) => void
}) {
  const style = useStyle(STYLE_ID)

  const typeClassName: string[] = [
    style.alphabet,
    style.phonics,
    style.word,
    style.story,
  ]

  return (
    <div className={style.category}>
      {progress?.map((prog, idx) => {
        return (
          <CategoryItem
            key={prog.activityName}
            name={prog.activityName}
            typeClassName={typeClassName[idx]}
            isActive={active === prog.activityName}
            current={prog.completedBooks}
            max={prog.totalBooks}
            onCategoryClick={onCategoryClick}
          />
        )
      })}
    </div>
  )
}

function CategoryItem({
  name,
  isActive,
  typeClassName,
  current,
  max,
  onCategoryClick,
}: {
  name: string
  typeClassName: string
  current: number
  max: number
  isActive?: boolean
  onCategoryClick?: (name: string) => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.category_item} ${typeClassName}${isActive ? ` ${style.active}` : ''}`}
      onClick={() => onCategoryClick && onCategoryClick(name)}>
      <div className={style.txt_category_name}>{name}</div>
      <div className={style.txt_status}>
        {current}/{max}
      </div>
    </div>
  )
}
