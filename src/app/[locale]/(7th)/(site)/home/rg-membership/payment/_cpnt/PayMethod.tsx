'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'

export default function PayMethodList({
  STYLE_ID,
  methodList = [],
  activeMethod,
  onPayMethodClick,
}: {
  STYLE_ID: string
  methodList?: string[]
  activeMethod?: string
  onPayMethodClick?: (id: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  const methods = methodList?.map((method) => {
    let id = method
    let name = 'none'
    switch (method) {
      case 'kakao':
        name = '카카오 페이'
        break
      case 'vcard':
        name = '신용카드'
        break

      case 'directbank':
        name = '실시간 계좌이체'
        break
      case 'vbank':
        name = '무통장 입금'
        break
      case 'paypal':
        name = 'PayPal'
        break
      case 'vnpay':
        name = 'VNPAY'
        break
    }
    if (name === 'none') {
      id = 'none'
      name = '지원하지 않음'
    }
    return {
      id,
      name,
    }
  })

  return (
    <div className={style.payment_method}>
      <div className={style.section_title}>
        {/* 결제 수단 */}
        {t('t572')}
      </div>
      <div className={style.payment_items}>
        {methods?.map((method) => {
          return (
            <PaymentMethodItem
              key={method.id}
              STYLE_ID={STYLE_ID}
              id={method.id}
              name={method.name}
              active={method.id === activeMethod}
              onPaymentMethodClick={onPayMethodClick}
            />
          )
        })}
      </div>
    </div>
  )
}

function PaymentMethodItem({
  STYLE_ID,
  id,
  name,
  active,
  onPaymentMethodClick,
}: {
  STYLE_ID: string
  id: string
  name: string
  active: boolean
  onPaymentMethodClick?: (id: string) => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.payment_method_item} ${active && style.active}`}
      onClick={() => {
        onPaymentMethodClick && onPaymentMethodClick(id)
      }}>
      {name}
    </div>
  )
}
