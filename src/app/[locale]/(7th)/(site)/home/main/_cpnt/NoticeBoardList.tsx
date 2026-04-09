'use client'

import BoardList from './BoardList'

type NoticeListItem = {
  title: string
  date: string
  link: string
}
export default function NoticeBoardList({
  list,
  currentPage,
  maxPage,
  onPageChange,
}: {
  list: NoticeListItem[]
  currentPage: number
  maxPage: number
  onPageChange?: (page: number) => void
}) {
  return (
    <BoardList
      list={list}
      page={currentPage}
      maxPage={maxPage}
      onPageClick={onPageChange}
    />
  )
}
