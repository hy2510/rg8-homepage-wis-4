'use client'

import { useOnLoadPaymentHistory } from '@/7th/_client/store/payment/history/hook'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import CurrencyFormat from '@/localization/currency-format'

const STYLE_ID = 'page_payment_history'

export default function PaymentHistory() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'
  const { country, target } = useSiteBlueprint()

  const { loading, error, payload } = useOnLoadPaymentHistory()

  return (
    <div className={style.payment_history}>
      <div
        className={`${style.t_header} ${target.private ? style.private : ''}`}>
        <div className={style.th_item}>
          {/* 내역 */}
          {t('t665')}
        </div>
        {!target.private && (
          <div className={style.th_item}>
            {/* 반명 */}
            {t('t666')}
          </div>
        )}
        <div className={style.th_item}>
          {/* 결제 금액 */}
          {t('t667')}
        </div>
        <div className={style.th_item}>
          {/* 결제일 */}
          {t('t570')}
        </div>
        <div className={style.th_item}>
          {/* 결제 수단 */}
          {t('t572')}
        </div>
      </div>
      <div className={style.t_body}>
        {!loading &&
          payload &&
          payload.length > 0 &&
          payload.map((item, i) => {
            let currency = 'KRW'
            if (
              item.receiptTypeName !== 'android' &&
              item.receiptTypeName !== 'ios' &&
              item.receiptTypeName !== 'paypal' &&
              country.vietnam
            ) {
              currency = 'VND'
            } else if (item.receiptTypeName === 'vnpay') {
              currency = 'VND'
            } else if (item.receiptTypeName === 'paypal') {
              currency = 'USD'
            }
            return (
              <div
                className={`${style.tr} ${target.private ? style.private : ''}`}
                key={`receipt_${i}`}>
                <div className={style.td_item}>{item.memo}</div>
                {!target.private && (
                  <div className={style.td_item}>{item.className}</div>
                )}
                <div className={style.td_item}>
                  {CurrencyFormat.toNumberMoneyString(
                    item.receiptFee,
                    currency,
                  )}
                </div>
                <div className={style.td_item}>{item.receiptDate}</div>
                <div className={style.td_item}>{item.receiptTypeName}</div>
              </div>
            )
          })}
        {/* 구매 내역이 없는 경우 나오는 메세지 */}
        {!loading && payload && payload.length === 0 && (
          <div className={style.empty_message}>{t('t670')}</div> // 아직 결제 내역이 없습니다.
        )}
      </div>
    </div>
  )
}
