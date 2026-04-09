'use client'

import { useOnLoadBoardNoticeDetail } from '@/7th/_client/store/home/hook'
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

  const { payload, loading, error } = useOnLoadBoardNoticeDetail({
    notifyId: id,
  })

  const [saveLoading, setSaveLoading] = useState(false)

  const {
    title: subject,
    content,
    registStaffId,
    editableYn,
    attachFileName,
    attachOriginFileName,
    attachFilePath,
    attachImageName,
    attachOriginImageName,
    attachImagePath,
  } = payload

  const onSaveContents = ({
    title,
    body: contents,
    file: attachFile,
    fileDelete,
    image: attachImage,
    imageDelete,
  }: {
    title: string
    body: string
    file: File | null
    image: File | null
    fileDelete?: boolean
    imageDelete?: boolean
  }) => {
    async function fetching() {
      let _attachFileName: string | undefined = undefined
      let _attachFileOriginName: string | undefined = undefined
      let imageFileName: string | undefined = undefined
      let imageFileOriginName: string | undefined = undefined
      let error: any = undefined

      if (attachFile || attachImage) {
        const promises: Promise<{
          status: number
          data?: {
            originalFileName: string
            hashFileName: string
          }
        }>[] = []
        if (attachFile) {
          promises.push(writeFileUpload(customerId, 'Notice', attachFile))
        }
        if (attachImage) {
          promises.push(writeFileUpload(customerId, 'Notice', attachImage))
        }
        if (promises.length > 0) {
          try {
            const ress = await Promise.all(promises)
            let isSuccess = true
            ress.forEach((res) => {
              isSuccess = isSuccess && res.status >= 200 && res.status < 300
            })
            if (isSuccess) {
              if (ress.length === 1 && attachFile) {
                _attachFileName = ress[0].data?.hashFileName
                _attachFileOriginName = ress[0].data?.originalFileName
              } else if (ress.length === 1 && attachImage) {
                imageFileName = ress[0].data?.hashFileName
                imageFileOriginName = ress[0].data?.originalFileName
              } else if (ress.length === 2) {
                _attachFileName = ress[0].data?.hashFileName
                _attachFileOriginName = ress[0].data?.originalFileName
                imageFileName = ress[1].data?.hashFileName
                imageFileOriginName = ress[1].data?.originalFileName
              }
            }
          } catch (err) {
            error = err
          }
        }
      }
      if (!error) {
        let sendFileName = _attachFileName
        let sendFileOriginName = _attachFileOriginName
        let sendImageFileName = imageFileName
        let sendImageOriginName = imageFileOriginName
        if (!sendFileName && attachFilePath && !fileDelete) {
          sendFileName = attachFileName
          sendFileOriginName = attachOriginFileName
        }
        if (!sendImageFileName && attachImagePath && !imageDelete) {
          sendImageFileName = attachImageName
          sendImageOriginName = attachOriginImageName
        }

        const res = await Repository.postBoardNoticeModify({
          notifyId: id,
          title,
          content: contents,
          attachFileName: sendFileName,
          attachFileOriginName: sendFileOriginName,
          imageFileName: sendImageFileName,
          imageFileOriginName: sendImageOriginName,
          isDeleteFile: fileDelete,
          isDeleteImage: imageDelete,
          registStaffId,
        })
        if (res.ok && res.data && res.data.success) {
          router.replace(`${STAFF_PATH.NOTICE.MAIN}/${id}`)
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
    return <h2>Notice not found.</h2>
  }

  return (
    <QuillEditorProvider>
      <Editor
        defaultTitle={subject}
        defaultContents={content}
        attachedFile={attachFilePath}
        attachedImage={attachImagePath}
        activeUploadImage={{ active: true, description: t('t919') }}
        activeUploadFile={{ active: true }}
        onSaveContent={onSaveContents}
        onCancel={onBack}
      />
    </QuillEditorProvider>
  )
}
