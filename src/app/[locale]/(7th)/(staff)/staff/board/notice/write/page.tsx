'use client'

import { useCustomerInfo } from '@/7th/_context/CustomerContext'
import Repository from '@/7th/_repository/client'
import { STAFF_PATH } from '@/app/site-path'
import QuillEditorProvider from '@/external/quill/component/QuillEditorContext'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Editor from '../../_editor/_cpnt/Editor'
import { writeFileUpload } from '../../_editor/upload_file'

export default function Page() {
  // @Language 'common'
  const { t } = useTranslation()

  const customerId = useCustomerInfo().customerId

  const router = useRouter()

  const [saveLoading, setSaveLoading] = useState(false)

  const onSaveContents = ({
    title,
    body: contents,
    file: attachFile,
    image: attachImage,
  }: {
    title: string
    body: string
    file: File | null
    image: File | null
  }) => {
    async function fetching() {
      let attachFileName: string | undefined = undefined
      let attachFileOriginName: string | undefined = undefined
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
                attachFileName = ress[0].data?.hashFileName
                attachFileOriginName = ress[0].data?.originalFileName
              } else if (ress.length === 1 && attachImage) {
                imageFileName = ress[0].data?.hashFileName
                imageFileOriginName = ress[0].data?.originalFileName
              } else if (ress.length === 2) {
                attachFileName = ress[0].data?.hashFileName
                attachFileOriginName = ress[0].data?.originalFileName
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
        const res = await Repository.postBoardNoticeWrite({
          title: title,
          content: contents,
          attachFileName,
          attachFileOriginName,
          imageFileName,
          imageFileOriginName,
        })
        if (res.ok && res.data && res.data.success) {
          const newNotifyId = res.data?.notifyId
          router.replace(`${STAFF_PATH.NOTICE.MAIN}/${newNotifyId}`)
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

  return (
    <QuillEditorProvider>
      <Editor
        onSaveContent={onSaveContents}
        onCancel={onBack}
        activeUploadImage={{ active: true, description: t('t919') }}
        activeUploadFile={{ active: true }}
      />
    </QuillEditorProvider>
  )
}
