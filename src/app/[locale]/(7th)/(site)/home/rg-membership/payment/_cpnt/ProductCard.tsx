'use client'

import { Product } from '@/7th/_repository/client/object/purchase-product'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import CurrencyFormat from '@/localization/currency-format'
import { VIETNAMESE } from '@/localization/localize-config'
import Image from 'next/image'

export default function ProductCardList({
  STYLE_ID,
  currency = 'KRW',
  product = [],
  activeId,
  onProductClick,
}: {
  STYLE_ID: string
  currency?: string
  product?: Product[]
  activeId?: string
  onProductClick?: (id: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <div className={style.product_list}>
      <div className={style.section_title}>
        {/* 상품 선택 */}
        {t('t689')}
      </div>
      <div className={style.cards}>
        {product?.map((item) => {
          let eventName: string | undefined = undefined
          if (item?.event?.name) {
            const eventRawName = item.event.name
            if (eventRawName.includes('Happy Week')) {
              eventName = 'Happy Week'
            } else if (eventRawName.includes('Double Day')) {
              eventName = 'Double Day'
            }
          }
          let discountFeeSum = 0
          if (item.discount.length > 0) {
            item.discount.forEach((discount) => {
              if (discount.type === 'add') {
                discountFeeSum += discount.fee
              }
            })
          }
          let discountPrice: number | undefined =
            discountFeeSum > 0 ? item.totalFee + discountFeeSum : 0
          if (discountPrice === item.totalFee || discountPrice === item.fee) {
            discountPrice = undefined
          }

          return (
            <ProductCard
              key={item.id}
              id={item.id}
              STYLE_ID={STYLE_ID}
              currency={currency}
              active={activeId === item.id}
              day={item.value}
              title={item.name}
              originalPrice={item.fee}
              finalPrice={item.totalFee}
              discountPrice={discountPrice}
              eventName={eventName}
              gift={item.event?.gift}
              onProductClick={onProductClick}
            />
          )
        })}
      </div>
    </div>
  )
}

function ProductCard({
  STYLE_ID,
  id,
  currency,
  active,
  day,
  title,
  originalPrice,
  discountPrice = 0,
  finalPrice,
  eventName,
  gift,
  onProductClick,
}: {
  STYLE_ID: string
  id: string
  currency: string
  active: boolean
  day: number
  title: string
  originalPrice: number
  finalPrice: number
  discountPrice?: number
  eventName?: string
  gift?: string
  onProductClick?: (id: string) => void
}) {
  // @Language 'common'
  const { t, i18n } = useTranslation()
  const language = i18n.language

  let productTitle = title
  if (
    language === VIETNAMESE &&
    (id === 'rg.1m.nonsub' || id === 'rg.1m.nonsub0')
  ) {
    productTitle = `Gói 1 tháng`
  }

  const style = useStyle(STYLE_ID)
  let eventImageSrc: string | undefined = undefined
  if (eventName) {
    if (eventName === 'Happy Week') {
      eventImageSrc = '/src/images/@rg-membership/img-vn_discount_label.png'
    } else if (eventName === 'Double Day') {
      eventImageSrc =
        '/src/images/@rg-membership/img-vn_discount_dbday_label.png'
    }
  }

  return (
    <div
      className={`${style.product_card} ${active && style.active}`}
      onClick={() => {
        if (onProductClick) {
          onProductClick(id)
        }
      }}>
      {eventImageSrc && (
        <div className={style.discount_label}>
          <Image src={eventImageSrc} alt="" width={80} height={64} />
        </div>
      )}
      <div className={style.tag}>{t('t052', { num: day })}</div>
      <div
        className={style.title}
        style={gift ? { marginTop: '20px' } : undefined}>
        {productTitle}
      </div>
      <div
        className={style.original_price}
        style={{ opacity: originalPrice === finalPrice ? 0 : 1 }}>
        {CurrencyFormat.toNumberMoneyString(originalPrice, currency)}
      </div>
      {discountPrice > 0 && (
        <div className={`${style.final_price} ${style.discount}`}>
          {CurrencyFormat.toNumberMoneyString(discountPrice, currency)}
        </div>
      )}
      <div className={style.final_price}>
        {CurrencyFormat.toNumberMoneyString(finalPrice, currency)}
      </div>
      {gift && (
        <div className={style.event_message_box}>
          <div className={style.event_gift_text}>{gift}</div>
        </div>
      )}
    </div>
  )
}
