'use client'

import { useOnLoadGalleryList } from '@/7th/_client/store/home/hook'
import { Margin } from '@/7th/_ui/common/common-components'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import GalleryBoardList from '../../_cpnt/GalleryBoardList'

export default function Page(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = use(props.searchParams)
  const page = searchParams.page ? Number(searchParams.page) : 1

  const route = useRouter()

  const { payload, loading, error } = useOnLoadGalleryList({ page })

  const galleryList = payload
    ? [
        ...payload.board.map((board) => {
          return {
            title: board.title,
            date: board.registDate.split('T')[0],
            link: `${SITE_PATH.HOME.GALLERY_POST}/${board.boardId}`,
            image: board.imagePath || undefined,
          }
        }),
      ]
    : []

  const onPageChange = (page: number) => {
    route.push(`${SITE_PATH.HOME.GALLERY}?page=${page}`)
  }

  return (
    <>
      <Margin height={15} />
      <GalleryBoardList
        list={galleryList}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </>
  )
}
