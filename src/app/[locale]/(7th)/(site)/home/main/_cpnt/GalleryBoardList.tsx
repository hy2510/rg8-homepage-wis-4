'use client'

import BoardList from './BoardList'

type GalleryListItem = {
  title: string
  date: string
  link: string
  imagePath?: string
}
export default function GalleryBoardList({
  list,
  onPageChange,
}: {
  list: GalleryListItem[]
  currentPage?: number
  maxPage?: number
  onPageChange?: (page: number) => void
}) {
  if (list.length === 0) {
    return (
      <div style={{ margin: '60px 16px' }}>Sorry, there are no posts yet.</div>
    )
  }
  return (
    <BoardList
      list={list}
      onPageClick={onPageChange}
      page={1}
      maxPage={0}
      grid={true}
    />
  )
}
