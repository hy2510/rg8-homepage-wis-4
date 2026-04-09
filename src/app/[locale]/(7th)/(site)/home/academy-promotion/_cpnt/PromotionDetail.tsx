'use client'

import IFrameWrapper from '@/7th/_app/IFrameWrapper'
import { BackLink, Margin } from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'

const STYLE_ID = 'page_academy_promotion'

export default function PromotionDetail({
  title,
  date,
  image,
}: {
  title?: string
  date?: string
  image?: string
}) {
  const style = useStyle(STYLE_ID)
  const router = useRouter()

  const isMobile = useScreenMode() === 'mobile'
  // @Language 'common'
  const { t } = useTranslation()

  const backColorWhite = true
  const backLink = SITE_PATH.HOME.MAIN
  const backLabel = '학원 도입 안내'
  const htmlUrl = `/src/html/b2b-promotion/academy.html`

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
        {title && (
          <div className={style.row_1}>
            <div className={style.txt_1}>{title}</div>
            {date && <div className={style.txt_2}>{date}</div>}
          </div>
        )}
        <div className={style.row_2}>
          {image && (
            <div>
              <img src={image} style={{ width: '100%' }} />
            </div>
          )}
          <IFrameWrapper pcUrl={htmlUrl} mobileUrl={htmlUrl} />
        </div>
      </div>
    </main>
  )
}
