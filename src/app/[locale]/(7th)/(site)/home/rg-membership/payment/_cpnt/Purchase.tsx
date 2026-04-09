'use client'

import { useOnLoadProductList } from '@/7th/_client/store/payment/purchase/hook'
import { useFetchReloadStudentStudyState } from '@/7th/_client/store/student/info/hook'
import {
  useStudentInfo,
  useStudentInfoMainPhone,
} from '@/7th/_client/store/student/info/selector'
import { useCustomerInfo } from '@/7th/_context/CustomerContext'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BillPaper from './BillPaper'
import PayMethodList from './PayMethod'
import PayerInfo from './PayerInfo'
import PaymentStudentInfo from './PaymentStudentInfo'
import ProductCardList from './ProductCard'
import PurchaseProcess, { PurchaseRequest } from './PurchaseProcess'

const STYLE_ID = 'page_purchase'

export default function Purchase({
  purchaseType,
  isChangeUserInfo = false,
}: {
  purchaseType: 'direct' | 'directvn' | 'ios' | 'android'
  isChangeUserInfo?: boolean
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const isMobile = useScreenMode() === 'mobile'

  const studentId = useStudentInfo().studentId
  const customerId = useCustomerInfo().customerId
  const userPhone = useStudentInfoMainPhone()

  const { loading, error, payload } = useOnLoadProductList(purchaseType)
  const { loading: reloadStudentStudyLoading, fetch: reloadStudentStudy } =
    useFetchReloadStudentStudyState()

  const [selectItem, setSelectItem] = useState<string | undefined>(undefined)
  const [payMethod, setPayMethod] = useState<string | undefined>(undefined)
  const [isPolicyAgree, setPolicyAgree] = useState(!isChangeUserInfo)
  const [paymentInfo, setPaymentInfo] = useState<PurchaseRequest | undefined>(
    undefined,
  )

  const onProductClick = (itemId: string) => {
    setSelectItem(itemId)
  }

  const onPaymethodClick = (payMethod: string) => {
    setPayMethod(payMethod)
  }

  const onBuyClick = () => {
    if (!targetProduct) {
      alert(t('t690')) // 구매하실 이용권을 선택해주세요.
      return
    }
    if (!userPhone) {
      alert(t('t691')) // 연락처를 입력해주세요.
      return
    }
    if (!isPolicyAgree) {
      alert(t('t692')) // 결제를 진행하기 위해서는 개인정보 수집에 동의하셔야 합니다.
      return
    }
    if (!payMethod) {
      alert(t('t693')) // 결제 수단을 선택해주세요.
      return
    }

    if (targetProduct) {
      const name = targetProduct.name
      const price = targetProduct.totalFee
      const param = {
        customerId,
        studentId,
        payMethod,
        productName: name,
        price,
        mobileYn: isMobile ? 'Y' : 'N',
      }
      setPaymentInfo(param)
    }
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
            router.push(SITE_PATH.HOME.MEMBERSHIP_PAYMENT_HISTORY)
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

  if (loading) {
    return <div></div>
  }
  const filteredItem = payload?.product?.filter(
    (item) => item.id === selectItem,
  )
  const currency = payload?.currency || 'KRW'
  const targetProduct =
    filteredItem && filteredItem.length > 0 ? filteredItem[0] : undefined

  return (
    <div className={style.purchase}>
      <PaymentStudentInfo STYLE_ID={STYLE_ID} />
      <div className={style.page_container}>
        <div className={style.col_left}>
          <ProductCardList
            STYLE_ID={STYLE_ID}
            currency={currency}
            product={payload?.product}
            activeId={selectItem}
            onProductClick={onProductClick}
          />
          {selectItem && (
            <>
              <PayerInfo
                STYLE_ID={STYLE_ID}
                isChangeUserInfo={isChangeUserInfo}
                onPolicyAgreeChange={(checked) => {
                  setPolicyAgree(checked)
                }}
              />
              {purchaseType !== 'android' && purchaseType !== 'ios' && (
                <PayMethodList
                  STYLE_ID={STYLE_ID}
                  methodList={payload?.payType.filter((p) => {
                    // MEMO : 무통장입금 미구현(결제 모듈 미구현 이슈)
                    return p !== 'paypal' && p !== 'vbank'
                  })}
                  activeMethod={payMethod}
                  onPayMethodClick={onPaymethodClick}
                />
              )}
            </>
          )}
        </div>
        <div className={style.col_right}>
          <BillPaper
            STYLE_ID={STYLE_ID}
            currency={currency}
            product={targetProduct}
            active={
              !!targetProduct && !!userPhone && isPolicyAgree && !!payMethod
            }
            onBuyClick={onBuyClick}
          />
        </div>
      </div>
      {paymentInfo && (
        <PurchaseProcess
          request={paymentInfo}
          currency={currency}
          onPurchaseResult={onPaymentResult}
          onCancel={() => {
            setPaymentInfo(undefined)
          }}
        />
      )}
    </div>
  )
}
