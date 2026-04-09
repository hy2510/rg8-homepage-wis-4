'use client'

import { BackLink, Margin } from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import { useRouter } from 'next/navigation'

const STYLE_ID = 'page_rg_news_post'

export default function BoardDetail({
  backLabel,
  backLink,
  title,
  date,
  htmlContents,
  image,
  backColorWhite = true,
}: {
  backLabel: string
  backLink?: string
  title: string
  date: string
  htmlContents: string
  image?: string
  backColorWhite?: boolean
}) {
  const style = useStyle(STYLE_ID)
  const router = useRouter()

  const isMobile = useScreenMode() === 'mobile'

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
        <div className={style.row_2}>
          {image && (
            <div>
              <img src={image} style={{ width: '100%' }} />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: htmlContents }} />
        </div>
      </div>
    </main>
  )
}
