'use client'

import { useOnLoadGalleryDetail } from '@/7th/_client/store/home/hook'
import Repository from '@/7th/_repository/client'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BoardDetailTypeGallery from './BoardDetailTypeGallery'

export default function GalleryBoardDetail({
  id,
  backColorWhite = true,
  modifyLink,
}: {
  id: string
  backColorWhite?: boolean
  modifyLink?: string
}) {
  const { payload, loading, error } = useOnLoadGalleryDetail({
    boardId: id,
  })
  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const [deleteLoading, setDeleteLoading] = useState(false)

  const title = payload.title || ''
  let date = ''
  if (payload.registDate) {
    date = payload.registDate.split('T')[0]
  }
  const html = payload.content || '<div></div>'

  const isEditMenu = !!modifyLink && payload.editableYn
  const deleteFetch = async () => {
    const registStaffId = payload.registerId
    const res = await Repository.deleteBoardGalleryDelete({
      boardId: id,
      registStaffId,
    })
    if (res.ok && res.data && res.data.success) {
      alert(t('t923'))
      router.back()
    } else {
      alert('Failed')
    }
    setDeleteLoading(false)
  }
  const onGalleryDelete = () => {
    if (deleteLoading) {
      return
    }
    if (isEditMenu) {
      if (confirm(t('t922'))) {
        setDeleteLoading(true)
        deleteFetch()
      }
    }
  }
  const onGalleryModify = () => {
    if (modifyLink && isEditMenu) {
      router.push(modifyLink)
    }
  }

  if (loading) {
    return <></>
  }
  return (
    <BoardDetailTypeGallery
      backLabel={t('t770')}
      backColorWhite={backColorWhite}
      title={title}
      date={date}
      htmlContents={html}
      isEditMenu={isEditMenu}
      image={payload.attachImagePath}
      onDelete={onGalleryDelete}
      onModify={onGalleryModify}
    />
  )
}
