'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'

const STYLE_ID = 'page_catalog'

export default function SubPageMainBanner({ imgSrc }: { imgSrc: string }) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.sub_page_main_banner}>
      <Image src={imgSrc} width={1080} height={400} alt="" />
    </div>
  )
}
