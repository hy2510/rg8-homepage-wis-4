'use client'

import { useOnLoadBoardNoticeDetail } from '@/7th/_client/store/home/hook'
import Repository from '@/7th/_repository/client'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BoardDetailTypeNotice from './BoardDetailTypeNotice'

export default function NoticeBoardDetail({
  id,
  backColorWhite = true,
  modifyLink,
}: {
  id: string
  backColorWhite?: boolean
  modifyLink?: string
}) {
  const { payload, loading, error } = useOnLoadBoardNoticeDetail({
    notifyId: id,
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
    const registStaffId = payload.registStaffId
    const res = await Repository.deleteBoardNoticeDelete({
      notifyId: id,
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
  const onNoticeDelete = () => {
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
  const onNoticeModify = () => {
    if (modifyLink && isEditMenu) {
      router.push(modifyLink)
    }
  }
  if (loading) {
    return <></>
  }
  return (
    <BoardDetailTypeNotice
      backLabel={t('t325')}
      backColorWhite={backColorWhite}
      title={title}
      date={date}
      htmlContents={html}
      isEditMenu={isEditMenu}
      image={payload.attachImagePath}
      file={payload.attachFilePath}
      fileName={payload.attachOriginFileName}
      onDelete={onNoticeDelete}
      onModify={onNoticeModify}
    />
  )
}
