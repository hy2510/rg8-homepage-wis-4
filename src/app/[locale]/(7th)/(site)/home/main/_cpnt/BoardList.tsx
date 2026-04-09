'use client'

import PaginationBar from '@/7th/_ui/common/PaginationBar'
import {
  Margin,
  NoticeBoardContainer,
  NoticeBoardItem,
} from '@/7th/_ui/common/common-components'

export default function BoardList({
  list,
  page,
  maxPage,
  grid,
  onPageClick,
}: {
  list: { title: string; date: string; link: string; image?: string }[]
  page: number
  maxPage: number
  grid?: boolean
  onPageClick?: (page: number) => void
}) {
  return (
    <div>
      <NoticeBoardContainer grid={grid}>
        {list.map((a) => {
          return (
            <NoticeBoardItem
              key={`notice-${a.link}`}
              title={a.title}
              date={a.date}
              href={a.link}
              image={a.image}
              grid={grid}
            />
          )
        })}
      </NoticeBoardContainer>
      <Margin height={20} />
      <PaginationBar page={page} maxPage={maxPage} onPageClick={onPageClick} />
    </div>
  )
}
