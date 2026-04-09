import { UnpaidBalance } from '@/7th/_repository/client/object/unpaid-balance'
import { Button, Modal, TextField } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import { useRef, useState } from 'react'

export default function PayRequestGroupModal({
  STYLE_ID,
  PAY_TYPE,
  selectItem,
  onBuyClick,
  onCloseClick,
}: {
  STYLE_ID: string
  PAY_TYPE: string[]
  selectItem: UnpaidBalance
  onBuyClick?: (
    itemId: string,
    payMethod: string,
    extra?: { phone?: string; email?: string },
  ) => void
  onCloseClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const [payType, setPayType] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  const refInputPhone = useRef<HTMLInputElement | null>(null)
  const refInputEmail = useRef<HTMLInputElement | null>(null)

  const methods = PAY_TYPE.map((method) => {
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

  const onPaymentClick = () => {
    if (phoneNumber.length === 0) {
      refInputPhone.current?.focus()
      return
    }
    const phone_regex = /^(010|011|012|016|017|019)[0-9]{7,8}$/i
    if (!phone_regex.test(phoneNumber)) {
      alert(t('t680')) // 전화번호 형식이 올바르지 않습니다.
      refInputPhone.current?.focus()
      return
    }
    if (email.length === 0) {
      refInputEmail.current?.focus()
      return
    }
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
    if (!email_regex.test(email)) {
      alert(t('t681')) // 이메일 형식이 올바르지 않습니다.
      refInputEmail.current?.focus()
      return
    }
    onBuyClick &&
      onBuyClick(selectItem.requestId, payType, { email, phone: phoneNumber })
  }

  return (
    // 결제하기
    <Modal compact header title={t('t193')} onClickDelete={onCloseClick}>
      <div className="container">
        <div className={style.purchase_form}>
          <h3>
            {/* 결제 방식을 선택해주세요. */}
            {t('t683')}
          </h3>
          {methods.map((method) => {
            return (
              <Button
                key={method.id}
                color={payType === method.id ? 'dark' : 'gray'}
                onClick={() => setPayType(method.id)}>
                {method.name}
              </Button>
            )
          })}
          {payType && (
            <>
              <hr style={{ border: 'dashed 1px #dadada' }} />
              <div className={style.comment}>
                <div className={style.txt_1}>
                  {/* 결제에 필요한 기본 정보를 입력 후 결제하기 버튼을 눌러주세요. */}
                  {t('t684')}
                </div>
                <div className={style.txt_2}>
                  {/* (입력한 연락처와 이메일 주소는 결제 이외의 다른 용도로 사용되지 않습니다.) */}
                  {t('t685')}
                </div>
              </div>
              <TextField
                ref={refInputPhone}
                hint={t('t686')} // 연락처 ('-' 없이 숫자만 입력)
                maxLength={11}
                onTextChange={(text) => {
                  setPhoneNumber(text.replace(/[^0-9]/g, ''))
                }}
                onKeyDown={(e) => {
                  if (
                    phoneNumber.length > 0 &&
                    e.key.toLowerCase() === 'enter'
                  ) {
                    onPaymentClick()
                  }
                }}
                value={phoneNumber}
              />
              <TextField
                ref={refInputEmail}
                hint={t('t687')} // 이메일 주소
                onTextChange={(text) => {
                  setEmail(text)
                }}
                onKeyDown={(e) => {
                  if (email.length > 0 && e.key.toLowerCase() === 'enter') {
                    onPaymentClick()
                  }
                }}
                value={email}
              />
            </>
          )}
        </div>
        {payType && (
          <Button
            shadow
            color={phoneNumber && email ? 'blue' : 'gray'}
            onClick={onPaymentClick}>
            {/* 결제하기 */}
            {t('t193')}
          </Button>
        )}
      </div>
    </Modal>
  )
}
