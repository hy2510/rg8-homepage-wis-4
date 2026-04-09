'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const STYLE_ID = 'home_main_main_banner'

export default function MainBanner({
  banner,
  onExternalLink,
}: {
  banner: { image: string; link: string; self?: boolean }[]
  onExternalLink?: (url: string) => void
}) {
  const style = useStyle(STYLE_ID)
  const [order, _order] = useState(0)

  const bannerSize = banner.length
  useEffect(() => {
    const interval = setInterval(() => {
      bannerSize > order + 1 ? _order(order + 1) : _order(0)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [order, bannerSize])

  return (
    <div className={style.main_banner}>
      {banner.length > 0 && (
        <>
          <MainBannerItem
            key={banner[order].image}
            imgSrc={banner[order].image.trim()}
            href={banner[order].link}
            target={banner[order].self ? '' : '_blank'}
            onExternalLink={onExternalLink}
          />
          <Indicator
            index={order}
            size={banner.length}
            onNext={() => {
              if (order < banner.length - 1) {
                _order(order + 1)
              } else {
                _order(0)
              }
            }}
            onPrev={() => {
              if (order > 0) {
                _order(order - 1)
              } else {
                _order(banner.length - 1)
              }
            }}
          />
        </>
      )}
    </div>
  )
}

const MainBannerItem = ({
  imgSrc,
  href,
  target,
  onExternalLink,
}: {
  imgSrc: string
  href?: string
  target?: string
  onExternalLink?: (url: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  const isExternal = target === '_blank'
  const link = isExternal ? '#' : href ? href : ''

  return (
    <Link
      href={link}
      target={isExternal ? undefined : '_self'}
      onClick={
        isExternal
          ? (e) => {
              e.preventDefault()
              if (onExternalLink) {
                onExternalLink(href || '')
              }
            }
          : undefined
      }>
      <div className={`${style.main_banner_item} fade-in`}>
        <Image alt="" src={imgSrc} width={1000} height={350} loading="lazy" />
      </div>
    </Link>
  )
}

const Indicator = ({
  index,
  size,
  onNext,
  onPrev,
}: {
  index: number
  size: number
  onNext: () => void
  onPrev: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.indicator}>
      <div className={style.arrows}>
        <div className={style.btn_left} onClick={onPrev}></div>
        <div className={style.btn_right} onClick={onNext}></div>
      </div>
      <div className={style.status}>
        {index + 1} / {size}
      </div>
    </div>
  )
}
