'use client'

import { useUnpaidBalanceList } from '@/7th/_client/store/payment/purchase/hook'
import { useFetchReloadStudentStudyState } from '@/7th/_client/store/student/info/hook'
import {
  useStudentInfo,
  useStudentStudyable,
} from '@/7th/_client/store/student/info/selector'
import { useCustomerInfo } from '@/7th/_context/CustomerContext'
import { UnpaidBalance } from '@/7th/_repository/client/object/unpaid-balance'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import CurrencyFormat from '@/localization/currency-format'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PayRequestGroupModal from './PayRequestGroupModal'
import PurchaseProcess, { PurchaseRequest } from './PurchaseProcess'

const STYLE_ID = 'page_purchase_school'

const PAY_TYPE = [
  'vcard',
  'directbank',
  // MEMO : 무통장입금 미구현(결제 모듈 미구현 이슈)
  //  'vbank'
]

export default function PurchaseGroup() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const isMobile = useScreenMode() === 'mobile'

  const studentId = useStudentInfo().studentId
  const customerId = useCustomerInfo().customerId
  const { isStudyEnd } = useStudentStudyable()

  const { loading, error, payload } = useUnpaidBalanceList()
  const { loading: reloadStudentStudyLoading, fetch: reloadStudentStudy } =
    useFetchReloadStudentStudyState()

  const [selectPayTarget, setSelectPayTarget] = useState<
    UnpaidBalance | undefined
  >(undefined)
  const [paymentInfo, setPaymentInfo] = useState<PurchaseRequest | undefined>(
    undefined,
  )

  const onBuyClick = (
    itemId: string,
    payMethod: string,
    extra?: { email?: string; phone?: string },
  ) => {
    const item = payload?.filter((p) => p.requestId === itemId)
    if (item && item.length > 0) {
      const name = item[0].requestTypeName
      const price = item[0].fee
      const param = {
        customerId,
        studentId,
        payMethod,
        productName: name,
        price,
        email: extra?.email,
        phone: extra?.phone,
        requestId: item[0].requestId,
        mobileYn: isMobile ? 'Y' : 'N',
      }
      setPaymentInfo(param)
      setSelectPayTarget(undefined)
    }
  }

  const onCloseClick = () => {
    setSelectPayTarget(undefined)
  }

  const onPaymentResult = ({
    isSuccess,
    code,
    message,
  }: {
    isSuccess: boolean
    code: number
    message: string
  }) => {
    if (isSuccess) {
      reloadStudentStudy({
        callback: (isSuccess) => {
          if (isSuccess) {
            alert(t('t694')) // 결제가 완료 되었습니다.
            router.push(SITE_PATH.HOME.RG_PAYMENT_HISTORY)
          } else {
            alert(t('t695')) // 사용자정보를 조회하는데 실패하였습니다.
            setPaymentInfo(undefined)
          }
        },
      })
    } else {
      alert(message)
      setPaymentInfo(undefined)
    }
  }

  return (
    <>
      <div className={style.purchase_school}>
        <div className={style.t_header}>
          <div className={style.th_item}>
            {/* 내역 */}
            {t('t665')}
          </div>
          <div className={style.th_item}>
            {/* 반명 */}
            {t('t666')}
          </div>
          <div className={style.th_item}>
            {/* 결제 금액 */}
            {t('t667')}
          </div>
          <div className={style.th_item}>
            {/* 납입 기한 */}
            {t('t701')}
          </div>
          <div className={style.th_item}></div>
        </div>
        <div className={style.t_body}>
          {!loading &&
            payload &&
            payload.length > 0 &&
            payload.map((unpaid) => {
              return (
                <div className={style.tr} key={unpaid.requestId}>
                  <div className={style.td_item}>{unpaid.requestTypeName}</div>
                  <div className={style.td_item}>{unpaid.className}</div>
                  <div className={style.td_item}>
                    {CurrencyFormat.toNumberMoneyString(unpaid.fee, 'KRW')}
                  </div>
                  <div className={style.td_item}>{unpaid.startDate}</div>
                  <div className={style.td_item}>
                    <div className={style.payment_form}>
                      <div
                        className={style.btn_link}
                        onClick={() => setSelectPayTarget(unpaid)}>
                        결제
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          {/* 구매 내역이 없는 경우 나오는 메세지 */}
          {!loading && payload && payload.length === 0 && (
            // 미납 내역이 없습니다.
            <div className={style.empty_message}>{t('t703')}</div>
          )}

          {!loading && isStudyEnd && (!payload || payload.length > 0) && (
            // 미납으로 학습이 제한 되었습니다. 결제 후 이용해주세요.
            <div className={style.empty_message}>{t('t704')}</div>
          )}
        </div>
      </div>
      {/* 이니시스 실행전 모달 */}
      {selectPayTarget && (
        <PayRequestGroupModal
          STYLE_ID={STYLE_ID}
          PAY_TYPE={PAY_TYPE}
          selectItem={selectPayTarget}
          onCloseClick={onCloseClick}
          onBuyClick={onBuyClick}
        />
      )}

      {paymentInfo && (
        <PurchaseProcess
          request={paymentInfo}
          onPurchaseResult={onPaymentResult}
          onCancel={() => {
            setPaymentInfo(undefined)
          }}
        />
      )}
      {/* {selectPayTarget && (
        <PaymentVBankResponseModal onCloseClick={onCloseClick} />
      )} */}
    </>
  )
}
