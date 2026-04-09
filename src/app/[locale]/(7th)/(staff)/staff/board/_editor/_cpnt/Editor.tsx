'use client'

import style from './page.module.scss'
import {
  QuillEditor,
  useQuillEditorAction,
} from '@/external/quill/component/QuillEditorContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AttachFile from './AttachFile'
import ImageViewerPopup from './ImageViewerPopup'

export default function Editor({
  defaultTitle = '',
  defaultContents,
  activeUploadFile,
  activeUploadImage,
  attachedFile,
  attachedImage,
  onCancel,
  onSaveContent,
}: {
  defaultTitle?: string
  defaultContents?: string
  attachedFile?: string
  attachedImage?: string
  activeUploadImage?: {
    active: boolean
    description?: string
  }
  activeUploadFile?: {
    active: boolean
    description?: string
  }
  onCancel?: () => void
  onSaveContent?: (contents: {
    title: string
    body: string
    file: File | null
    fileDelete?: boolean
    image: File | null
    imageDelete?: boolean
  }) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const quill = useQuillEditorAction()
  const [title, setTitle] = useState(defaultTitle)
  const [showImagePopup, setShowImagePopup] = useState(false)

  const [attachFile, setAttachFile] = useState<File | null>(null)
  const [isDeleteFile, setDeleteFile] = useState<boolean>(false)
  const [attachImage, setAttachImage] = useState<{
    file: File
    image: string
  } | null>(null)
  const [isDeleteImage, setDeleteImage] = useState<boolean>(false)

  const onImageSelected = (file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const attachImage = {
          file,
          image: reader.result as string,
        }
        setAttachImage(attachImage)
        setDeleteImage(false)
      }
      reader.readAsDataURL(file)
    } else {
      setAttachImage(null)
    }
  }

  const onImageDelete = () => {
    setDeleteImage(!isDeleteImage)
  }

  const onFileSelected = (file: File | null) => {
    if (file) {
      setAttachFile(file)
      setDeleteFile(false)
    } else {
      setAttachFile(null)
    }
  }

  const onFileDelete = () => {
    setDeleteFile(!isDeleteFile)
  }

  const onWriteNotice = () => {
    if (!quill) {
      return
    }
    if (!title) {
      alert(t('t920'))
      return
    }

    const plainText = quill.getPlainText()

    if (!plainText && !attachImage) {
      if (!attachedImage || isDeleteImage) {
        alert(t('t921'))
        return
      }
    }

    const content = quill.getContentHtml()
    if (onSaveContent) {
      onSaveContent({
        title,
        body: content,
        file: attachFile,
        fileDelete: isDeleteFile,
        image: attachImage?.file || null,
        imageDelete: isDeleteImage,
      })
    }
  }

  useEffect(() => {
    if (quill && defaultContents) {
      quill.setContentHtml(defaultContents)
    }
  }, [quill, defaultContents])

  return (
    <div className={style.editor_container}>
      <div className={style.row_box}>
        <h3 className={style.label}>{`${t('t451')}`}</h3>
        <div>
          <input
            className={style.title}
            placeholder={'Title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      {activeUploadImage && activeUploadImage.active && (
        <div className={style.row_box}>
          <h3 className={style.label}>{`${t('t917')}`}</h3>
          <div>
            <AttachFile
              ext={'image'}
              buttonText={`${t('t339')}`}
              onFileChanged={onImageSelected}
              isActiveDelete={!!attachedImage}
              isFileDelete={isDeleteImage}
              onFileDelete={onImageDelete}
            />
            {attachImage && attachImage.image && (
              <div>
                <div>
                  <Image
                    width={96}
                    height={96}
                    src={attachImage.image}
                    alt=""
                    unoptimized
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '100px',
                    }}
                    onClick={() => {
                      setShowImagePopup(true)
                    }}
                  />
                </div>
                {activeUploadImage.description && (
                  <span
                    style={{
                      color: 'var(--red)',
                    }}>{` * ${activeUploadImage.description}`}</span>
                )}
              </div>
            )}
            {attachedImage && (
              <div
                style={{
                  display:
                    !isDeleteImage && attachImage === null ? 'block' : 'none',
                }}>
                <div>
                  <Image
                    width={96}
                    height={96}
                    src={attachedImage}
                    alt=""
                    unoptimized
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '100px',
                    }}
                    onClick={() => {
                      setShowImagePopup(true)
                    }}
                  />
                </div>
                {activeUploadImage.description && (
                  <span
                    style={{
                      color: 'var(--red)',
                    }}>{` * ${activeUploadImage.description}`}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {activeUploadFile && activeUploadFile.active && (
        <div className={style.row_box}>
          <h3 className={style.label}>{`${t('t916')}`}</h3>
          <AttachFile
            ext={'document'}
            buttonText={`${t('t339')}`}
            onFileChanged={onFileSelected}
            isActiveDelete={!!attachedFile}
            isFileDelete={isDeleteFile}
            onFileDelete={onFileDelete}
          />
        </div>
      )}
      <QuillEditor height="50vh" />

      <div className={style.button_area}>
        <button
          className={style.btn_cancel}
          onClick={() => {
            if (onCancel) {
              onCancel()
            }
          }}>
          {`${t('t204')}`}
        </button>
        <span className={style.space_btn}></span>
        <button className={style.btn_write} onClick={onWriteNotice}>
          {`${t('t195')}`}
        </button>
      </div>
      {attachImage && attachImage.image && showImagePopup && (
        <ImageViewerPopup
          image={attachImage.image}
          onClose={() => {
            setShowImagePopup(false)
          }}
        />
      )}
      {attachedImage && attachImage === null && showImagePopup && (
        <ImageViewerPopup
          image={attachedImage}
          onClose={() => {
            setShowImagePopup(false)
          }}
        />
      )}
    </div>
  )
}
