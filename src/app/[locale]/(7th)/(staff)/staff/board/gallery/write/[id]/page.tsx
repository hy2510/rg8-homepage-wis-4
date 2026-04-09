'use client'

import { useOnLoadGalleryDetail } from '@/7th/_client/store/home/hook'
import { useCustomerInfo } from '@/7th/_context/CustomerContext'
import Repository from '@/7th/_repository/client'
import { STAFF_PATH } from '@/app/site-path'
import QuillEditorProvider from '@/external/quill/component/QuillEditorContext'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import Editor from '../../../_editor/_cpnt/Editor'
import { writeFileUpload } from '../../../_editor/upload_file'

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const id = params.id

  // @Language 'common'
  const { t } = useTranslation()

  const customerId = useCustomerInfo().customerId

  const router = useRouter()

  const { payload, loading, error } = useOnLoadGalleryDetail({
    boardId: id,
  })

  const [saveLoading, setSaveLoading] = useState(false)

  const {
    title: subject,
    content,
    registerId,
    editableYn,
    attachImageName,
    attachOriginImageName,
    attachImagePath,
  } = payload

  const onSaveContents = ({
    title,
    body: contents,
    image: attachImage,
    imageDelete,
  }: {
    title: string
    body: string
    image: File | null
    imageDelete?: boolean
  }) => {
    async function fetching() {
      let imageFileName: string = ''
      let imageFileOriginName: string = ''
      let error: any = undefined

      if (attachImage) {
        const promises: Promise<{
          status: number
          data?: {
            originalFileName: string
            hashFileName: string
          }
        }>[] = []
        if (attachImage) {
          promises.push(writeFileUpload(customerId, 'Gallery', attachImage))
        }
        if (promises.length > 0) {
          try {
            const ress = await Promise.all(promises)
            let isSuccess = true
            ress.forEach((res) => {
              isSuccess = isSuccess && res.status >= 200 && res.status < 300
            })
            if (isSuccess) {
              if (ress.length === 1 && attachImage) {
                imageFileName = ress[0].data?.hashFileName || ''
                imageFileOriginName = ress[0].data?.originalFileName || ''
              }
            }
          } catch (err) {
            error = err
          }
        }
      }
      if (!error) {
        let sendImageFileName = imageFileName
        let sendImageOriginName = imageFileOriginName
        if (!sendImageFileName && attachImagePath && !imageDelete) {
          sendImageFileName = attachImageName
          sendImageOriginName = attachOriginImageName
        }

        const res = await Repository.postBoardGalleryModify({
          boardId: id,
          title,
          content: contents,
          imageFileName: sendImageFileName,
          imageFileOriginName: sendImageOriginName,
          isDeleteImage: imageDelete,
          registStaffId: registerId,
        })
        if (res.ok && res.data && res.data.success) {
          router.replace(`${STAFF_PATH.GALLERY.MAIN}/${id}`)
        } else {
          setSaveLoading(false)
          alert('Failed')
        }
      } else {
        setSaveLoading(false)
        alert('Failed')
      }
    }
    if (!saveLoading) {
      setSaveLoading(true)
      fetching()
    }
  }

  const onBack = () => {
    router.back()
  }

  if (loading) {
    return <></>
  }
  if (!editableYn) {
    return <h2>Gallery not found.</h2>
  }

  return (
    <QuillEditorProvider>
      <Editor
        defaultTitle={subject}
        defaultContents={content}
        activeUploadImage={{ active: true, description: t('t924') }}
        attachedImage={attachImagePath}
        onSaveContent={onSaveContents}
        onCancel={onBack}
      />
    </QuillEditorProvider>
  )
}
