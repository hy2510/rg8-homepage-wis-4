'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import { DodoABCType, StudyProgressInfo } from './DodoABCContainer'

const STYLE_ID = 'page_kids_dodo_abc'

export default function DodoABCCategory({
  type,
  active,
  progress,
  onCategoryClick,
}: {
  type?: DodoABCType
  active?: string
  progress?: StudyProgressInfo[]
  onCategoryClick?: (name: string) => void
}) {
  const style = useStyle(STYLE_ID)

  let layoutClassName: string
  let typeClassName: string[]
  if (type === 'Game') {
    layoutClassName = style.game_category
    typeClassName = [
      style.alphabet,
      style.phonics,
      style.sight_word_1,
      style.sight_word_2,
    ]
  } else if (type === 'Song') {
    layoutClassName = style.song_category
    typeClassName = [style.alphabet, style.phonics, style.nursery]
  } else {
    layoutClassName = style.category
    typeClassName = [
      style.alphabet,
      style.phonics_1,
      style.phonics_2,
      style.sight_word_1,
      style.sight_word_2,
    ]
  }

  return (
    <div className={layoutClassName}>
      {progress?.map((prog, idx) => {
        const activityName = prog.activityName
        const isActive = !!active && active === activityName
        return (
          <CategoryItem
            key={activityName}
            name={activityName}
            isActive={isActive}
            typeClassName={typeClassName[idx]}
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
      className={`${style.category_item}${isActive ? ` ${style.active}` : ''}`}
      onClick={() => onCategoryClick && onCategoryClick(name)}>
      <div
        className={`${style.img_land} ${typeClassName}${isActive ? ` ${style.active}` : ''}`}></div>
      <div className={style.txt_status}>
        {current}/{max}
      </div>
    </div>
  )
}
