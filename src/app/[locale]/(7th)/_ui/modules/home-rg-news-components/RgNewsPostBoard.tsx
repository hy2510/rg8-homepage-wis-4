'use client'

import { Dropdown, DropdownItem } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { ReactNode } from 'react'

const STYLE_ID = 'home_rg_news_post_board'

export default function RgNewsPostBoard({
  post,
  current,
  children,
}: {
  current?: string
  post: { title: string; id: string; url: string }[]
  children?: ReactNode
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  let currentIndex = -1
  post.forEach((p, i) => {
    if (current && p.id === current) {
      currentIndex = i
    }
  })
  if (post.length === 0) {
    // 아직 도착한 소식이 없습니다.
    return <div>{t('t785')}</div>
  }
  if (currentIndex < 0) {
    return <>{children}</>
  }

  const title = currentIndex !== -1 ? post[currentIndex].title : ''
  const prevLinkUrl =
    currentIndex !== -1 && post.length - 1 > currentIndex
      ? post[currentIndex + 1].url
      : undefined
  const nextLinkUrl = currentIndex > 0 ? post[currentIndex - 1].url : undefined

  return (
    <div className={style.rg_news_post_board}>
      {/* 회차 선택 */}
      <div className={style.group_1}>
        <div className={style.btn_left}>
          {prevLinkUrl && (
            <Link href={prevLinkUrl}>
              <div className={'ico-arrow-left'} />
            </Link>
          )}
        </div>
        <div className={style.col_center}>
          <Dropdown title={title}>
            {post.map((a, i) => {
              return (
                <DropdownItem key={`dropdown-rg-news-${i}`}>
                  <Link href={a.url}>{a.title}</Link>
                </DropdownItem>
              )
            })}
          </Dropdown>
        </div>
        <div className={style.btn_right}>
          {nextLinkUrl && (
            <Link href={nextLinkUrl}>
              <div className={'ico-arrow-right'} />
            </Link>
          )}
        </div>
      </div>

      {/* 내용 */}
      <div className={style.group_2}>{children}</div>
    </div>
  )
}
