'use client'

import { BackLink, Margin } from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const STYLE_ID = 'page_rg_news_post'

export default function BoardDetailTypeGallery({
  backLabel,
  backLink,
  title,
  date,
  htmlContents,
  image,
  backColorWhite = true,
  isEditMenu,
  onModify,
  onDelete,
}: {
  backLabel: string
  backLink?: string
  title: string
  date: string
  htmlContents: string
  image?: string
  backColorWhite?: boolean
  isEditMenu?: boolean
  onModify?: () => void
  onDelete?: () => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)
  const router = useRouter()

  const isMobile = useScreenMode() === 'mobile'

  const [showImage, setShowImage] = useState(true)
  useEffect(() => {
    if (!!image) {
    }
  }, [image])

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/src/editor/preview.css' // public 폴더에 있는 CSS 파일
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link) // cleanup
    }
  }, [])

  return (
    <main className="container compact">
      {isMobile && <Margin height={20} />}
      <BackLink
        largeFont
        colorWhite={backColorWhite}
        onClick={() => {
          if (backLink) {
            router.push(backLink)
          } else {
            router.back()
          }
        }}>
        {backLabel}
      </BackLink>
      <Margin height={20} />
      <div className={style.rg_news_post}>
        <div className={style.row_1}>
          <div className={style.txt_1}>{title}</div>
          <div className={style.txt_2}>{date}</div>
        </div>

        {isEditMenu && (
          <div className={style.editor_fn}>
            <span
              className={style.btn_delete}
              onClick={() => onDelete && onDelete()}>{`${t('t374')}`}</span>
            <span
              className={style.btn_modify}
              onClick={() => onModify && onModify()}>{`${t('t194')}`}</span>
          </div>
        )}

        <div className={style.row_2}>
          {showImage && (
            <div>
              <img
                src={image}
                style={{ width: '100%' }}
                onError={() => {
                  setShowImage(false)
                }}
              />
            </div>
          )}
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: htmlContents }}
          />
        </div>
      </div>
    </main>
  )
}

const ICON_DOWNLOAD =
  'data:image/png;base64,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Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjczZDBhZDRkLTYzODItNGEwZi05YzkzLTkzNGQ1Zjk1MmJjNSIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMTg4NzMwMy00M2YxLTQ4M2YtODE5Yy0wOTFmMTQwYjczYTIiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZjM2NjlkNy0wYTczLTRjYzAtYTMwOS1jMmQ0MDAzMzFhMDIiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJNYWMgT1MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNzQzMzg0MTY1OTc0NTA5IgogICBHSU1QOlZlcnNpb249IjIuMTAuMzAiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGIwYjk5MjctYWI2Zi00MTk1LTk1ZTQtNDZiNTg0OTM2YWM3IgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKE1hYyBPUykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjUtMDMtMzFUMTA6MjI6NDUrMDk6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+bZWYaQAAAAZiS0dEAP4A9QCmgv3ipQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+kDHwEWLerAXmYAAAQ2SURBVHja7ZxBbxtFGIbfbxZV2QoEkZDA/AEOqOUULgQh2kbikKQVgZmNIOEvtD0UVCRawYFjACHBGSTsmWCKnSqBHkBqOZUTSEFcOALigACBsGni/bgkUkS9rk28xBO/z81je9fzPrvfznjsBQghhBBCCCGEEELIuCAxfuhms3mk3W6/DmBJVRXAB2mavjo/P38rtr7cFaOAVqv1mohcAAARAYCXWq0WALwcW19MlKetyHKX5hdj7EuUAgBUukh5kAIIBVAAoQAKIBRAAYQCKIBQAAUQCqAAQgEUQCiAAggFUAChAAogFEABhAIogFAABVAAoQAKIAfFgf5Bo1qtVpIkOZ3nuapqc3Fx8afDvN+ROgNCCFNJknwL4F1jzHvGmE3v/UzZ+/XezxhjNvfuN4QwNXYCVPUtAPftPhaRSRFplCnBez8jIg0Rmdy7XwBvjuM14HiXtlREGiGEUyWccadEpAEg7XIwHBtHAd8UtKcAmt77k0M88k8CaHYL/w6f5VCXoLOq2u4lIYRwYghH/ole4atqW1XPj52ALMtuisjpIgkiclRV1/YjYXV19QkADRE5WhD+LQDPZVl2cyznAdbaa2VJ8N5Pq+o6gLt7hL/gnLs61hMxa+01AGeGKcF7Py0iG73CF5FnDzr8kZkJO+c+60dCrVZ7qo+a/3g/4Vtr10ah7yN1r4harfa0iFwRkYmC8P5S1VljzOcFm5hW1Q0RuadXzXfONUelzzJgQI8ZY1ZU9VER+TrP83PDvoB572cB1EXkSMFL/iw6uns9V1bN328mfQuoVqsVY8zm3lmkqv6a5/kjw/4uJYQwp6of9ZAw6JC3lLIzjEz6vgaIyPzeHe1O45MkmSvhwrwmImcA/D2EzW2JiC2j5g8jk74FGGMqBU89VNLoaCPP82f2KWFLVa21tlHKCGYImYz0ekCWZev7kLClqtY598ko93HkF2SyLFsHsAhga4C3dQAsj3r4UQjYKUdXAGR9SugAeMFaW4uhb9EsSVprP+5DQkdVl2IJPyoBuxLyPC8qRx1VXXLOVWPqU3SL8lmW1VX1eQCtf82QF2MLP0oBAOCcWwVwDMBFABdF5PhOW3REedvKnXL0PYA3EDn8XRAFUACJRMAfBe2VcQ1PVYu+8/m9DAE/FLTP1ev1yXELv16vT4rIbIGYH4c+CjLGfJnnueL2NYRKp9P5NIRwfmJi4qsY72A+CDt3bp/a3t5eEZFuZ78aY270u72BVsRCCDcATLNy9yxL151zT5Z1EX6FEd9RwOXSRkHW2uuq+g5jLgx/JcuyL0odhqZpeg5AlXHfFv6HaZpeGPR9//VnKRJCOKuql0Tk3jHP/jdVveycexuA/l8CAADe+/sBLIvIrKo+LCIPAEgOeeAdVf0ZwHcicjVJkvcXFhZ+YQ0ghBBCCCGEEEIIIYQQMsL8A78P1pacZ5GhAAAAAElFTkSuQmCC'
function AttachmentFileDownload({
  file,
  link,
}: {
  file: string
  link: string
}) {
  const style = useStyle(STYLE_ID)

  const [isDownloading, setDownloading] = useState(false)
  const fileBlobRef = useRef<{ blob: Blob | null; url: string } | null>(null)
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null)

  let fileName = file
  if (file.length > 28) {
    fileName = `${file.substring(0, 9)}...${file.substring(file.length - 9)}`
  }

  useEffect(() => {
    return () => {
      if (fileBlobRef.current) {
        URL.revokeObjectURL(fileBlobRef.current.url)
        fileBlobRef.current.blob = null
        fileBlobRef.current = null
      }
    }
  }, [])

  const getFileBlob = async (): Promise<{
    blob: Blob | null
    url: string
  } | null> => {
    try {
      if (fileBlobRef.current === null) {
        const response = await fetch(link)
        if (response.ok) {
          const blob = await response.blob()
          fileBlobRef.current = {
            blob,
            url: URL.createObjectURL(blob),
          }
        }
      }
      return fileBlobRef.current
    } catch (error) {}
    return null
  }

  const onDownloadClick = async () => {
    if (isDownloading) return

    setDownloading(true)
    const blobData = await getFileBlob()
    if (blobData !== null && blobData.blob !== null) {
      if (hiddenLinkRef.current) {
        if (!hiddenLinkRef.current.href) {
          hiddenLinkRef.current.href = blobData.url
          hiddenLinkRef.current.download = file
        }

        hiddenLinkRef.current.click()
      }
    }
    setDownloading(false)
  }

  return (
    <div className={style.row_download_file}>
      <a ref={hiddenLinkRef} style={{ display: 'none' }} />
      <div className={style.filename_container}>
        <button className={style.btn_download} onClick={onDownloadClick}>
          <img className={style.icon} src={ICON_DOWNLOAD} />
        </button>
        <span className={style.filename} onClick={onDownloadClick}>
          {fileName}
        </span>
      </div>
    </div>
  )
}
