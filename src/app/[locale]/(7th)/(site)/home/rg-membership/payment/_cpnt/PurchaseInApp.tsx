'use client'

import { useFetchInappPurchase } from '@/7th/_client/store/payment/inapp/hook'
import { useOnLoadProductList } from '@/7th/_client/store/payment/purchase/hook'
import { useStudentInfoMainPhone } from '@/7th/_client/store/student/info/selector'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import BillPaper from './BillPaper'
import PayerInfo from './PayerInfo'
import PaymentStudentInfo from './PaymentStudentInfo'
import ProductCardList from './ProductCard'

const STYLE_ID = 'page_purchase'

export default function PurchaseInApp({
  purchaseType,
  isChangeUserInfo = false,
}: {
  purchaseType: 'ios' | 'android'
  isChangeUserInfo?: boolean
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const maketingEventTracker = useTrack()

  const router = useRouter()
  const userPhone = useStudentInfoMainPhone()

  const { loading, error, payload } = useOnLoadProductList(purchaseType)

  const [selectItem, setSelectItem] = useState<string | undefined>(undefined)
  const [isPolicyAgree, setPolicyAgree] = useState(!isChangeUserInfo)

  const [iapInterface, setIapInterface] = useState<any>(undefined)
  const { loading: purchaseLoading, fetch: purchaseFetch } =
    useFetchInappPurchase({ iapInterface, platform: purchaseType })

  useEffect(() => {
    const iap = new (window as any).RgIapInterface()
    iap.init()
    setIapInterface(iap)
  }, [])

  useEffect(() => {
    if (payload && selectItem) {
      const filteredItem = payload?.product?.filter(
        (item) => item.id === selectItem,
      )
      if (filteredItem && filteredItem.length > 0) {
        maketingEventTracker.eventAction('이용권 상품 조회', {
          catagory_id: purchaseType,
          product_id: filteredItem[0].name,
        })
      }
    }
  }, [maketingEventTracker, purchaseType, payload, selectItem])

  const onProductClick = (itemId: string) => {
    setSelectItem(itemId)
  }

  const onBuyClick = () => {
    if (!iapInterface) {
      return
    }
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

    if (targetProduct) {
      const itemId = targetProduct.id
      maketingEventTracker.eventAction('결제 시작', {
        product_id: targetProduct.id,
        total_price: targetProduct.totalFee,
      })
      maketingEventTracker.eventAction('이용권 결제하기 클릭', {
        category: purchaseType,
        product_id: targetProduct.id,
        product_name: targetProduct.name,
        price: targetProduct.totalFee,
        currency: currency,
        subscription_type: targetProduct.name,
      })
      purchaseFetch({
        itemId,
        callback: (isSuccess, errorCode) => {
          if (isSuccess) {
            maketingEventTracker.eventAction('상품구매', {
              value: targetProduct.totalFee,
              currency,
            })
            maketingEventTracker.eventAction('결제 완료', {
              product_id: targetProduct.id,
              product_name: targetProduct.name,
              price: targetProduct.totalFee,
              currency: currency,
              subscription_type: targetProduct.name,
            })
            alert(t('t694')) // 결제가 완료 되었습니다.
            router.push(SITE_PATH.HOME.MEMBERSHIP_PAYMENT_HISTORY)
          } else {
            if (errorCode !== -99) {
              alert('errorCode: ' + errorCode)
            }
            maketingEventTracker.eventAction('구매 취소', {
              product_id: targetProduct.id,
              cancel_reason: errorCode,
            })
            maketingEventTracker.eventAction('결제 취소', {
              product_id: targetProduct.id,
              product_name: targetProduct.name,
              price: targetProduct.totalFee,
              currency: currency,
              subscription_type: targetProduct.name,
              cancel_reason: errorCode,
            })
          }
        },
      })
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
            </>
          )}
        </div>
        <div className={style.col_right}>
          <BillPaper
            STYLE_ID={STYLE_ID}
            currency={currency}
            product={targetProduct}
            active={!!targetProduct && !!userPhone && isPolicyAgree}
            onBuyClick={onBuyClick}
          />
        </div>
      </div>
      {purchaseLoading && <LoadingScreen />}
    </div>
  )
}
