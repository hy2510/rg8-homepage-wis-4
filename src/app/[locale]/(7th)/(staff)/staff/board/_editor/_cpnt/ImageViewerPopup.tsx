import style from './page.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ImageViewerPopup({
  image,
  onClose,
}: {
  image: string
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => setVisible(true), 10) // 살짝 딜레이 줘야 transition 적용됨
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  return (
    <div
      onClick={handleClose}
      className={`${style.image_popup_container} ${visible ? style.visible : ''}`}>
      <div
        className={style.content_wrapper}
        onClick={(e) => {
          e.stopPropagation()
        }}>
        <Image
          width={200}
          height={200}
          alt={''}
          src={image}
          className={style.image_contents}
          unoptimized
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          className={style.btn_close}>
          ×
        </button>
      </div>
    </div>
  )
}
