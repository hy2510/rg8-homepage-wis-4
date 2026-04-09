'use client'

import { Modal } from '@/7th/_ui/common/common-components'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useState } from 'react'

const PURCHASE_RESULT_ORIGIN = 'https://integratedpay.readinggate.com'
const PAYMENT_URL = 'https://integratedpay.readinggate.com/Payment/Payment'
// const PAYMENT_URL = 'https://integratedpay.readinggate.com/Payment/PaymentTest'
const REQUEST_WINDOW_TYPE: 'iframe' | 'opener' = 'opener'

export type PurchaseRequest = {
  customerId: string
  studentId: string
  productName: string
  price: number
  payMethod: string
  email?: string | undefined
  phone?: string | undefined
  requestId?: string | undefined
}

export default function PurchaseProcess({
  request,
  currency = 'KRW',
  onPurchaseResult,
  onCancel,
}: {
  request: PurchaseRequest
  currency?: string
  onPurchaseResult?: (result: {
    isSuccess: boolean
    code: number
    message: string
  }) => void
  onCancel?: () => void
}) {
  const {
    customerId,
    studentId,
    productName,
    price,
    payMethod,
    email,
    phone,
    requestId,
  } = request
  let paramSerial = `callType=${REQUEST_WINDOW_TYPE}&CustomerId=${customerId}&StudentId=${studentId}&GoodsName=${productName}&TotalPrice=${price}&PayMethod=${payMethod}`
  if (email) {
    paramSerial += `&Email=${email}`
  }
  if (phone) {
    paramSerial += `&PhoneNumber=${phone}`
  }
  if (requestId) {
    paramSerial += `&RequestId=${requestId}`
  }
  const payDataUrl = `${PAYMENT_URL}?${paramSerial}`

  // @Language 'common'
  const { t } = useTranslation()

  const maketingEventTracker = useTrack()

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      if (e.origin === PURCHASE_RESULT_ORIGIN) {
        const data = JSON.parse(e.data) as { Status: string }

        let code = 0
        let message = ''
        if (data.Status !== 'Complete') {
          code = -1000
          message = t('t705') // 결제에 실패하였습니다.
        }
        if (code === 0) {
          maketingEventTracker.eventAction('상품구매', {
            value: request.price,
            currency,
          })
        }
        onPurchaseResult &&
          onPurchaseResult({ isSuccess: code === 0, code, message })
      }
    }
    window.addEventListener('message', messageHandler)
    return () => {
      window.removeEventListener('message', messageHandler)
    }
  }, [onPurchaseResult])
  const [isOpner, setOpener] = useState(false)
  useEffect(() => {
    if (!isOpner && REQUEST_WINDOW_TYPE === 'opener') {
      window.open(payDataUrl)
      setOpener(true)
    }
  }, [isOpner, payDataUrl])

  const onCancelListener = () => {
    if (onCancel) {
      if (
        confirm(
          t('t706'), // 결제가 진행중인 상태에서 종료하면 과금이 발생할 수 있습니다. 종료하시겠습니까?
        )
      ) {
        onCancel()
      }
    }
  }

  return (
    // 결제
    <Modal compact header title={t('t702')} onClickDelete={onCancelListener}>
      <div className="container">
        {REQUEST_WINDOW_TYPE === 'iframe' ? (
          <iframe
            src={payDataUrl}
            width={'100%'}
            frameBorder="0"
            style={{ height: '60vh', backgroundColor: 'transparent' }}
          />
        ) : (
          <div style={{ display: 'flex', paddingTop: 'var(--space-m)' }}>
            {/* 결제 진행 중 입니다. */}
            {t('t708')}
          </div>
        )}
      </div>
    </Modal>
  )
}
