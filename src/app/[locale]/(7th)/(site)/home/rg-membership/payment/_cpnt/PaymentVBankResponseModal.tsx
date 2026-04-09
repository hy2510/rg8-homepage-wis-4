'use client'

import { Modal } from '@/7th/_ui/common/common-components'
import CurrencyFormat from '@/localization/currency-format'

export default function PaymentVBankResponseModal({
  name = '수강료',
  payDate = '2024-08-09',
  price = 20000,
  vBankNumber = '(국민은행(주택은행)) 6500539000000222222',
  onCloseClick,
}: {
  name: string
  payDate: string
  price: number
  vBankNumber: string
  onCloseClick?: () => void
}) {
  return (
    <Modal compact header title={'입금 안내'} onClickDelete={onCloseClick}>
      <div className="container">
        <h3>{name} 입금</h3>
        <div>
          {payDate} 까지{' '}
          <strong>{CurrencyFormat.toNumberMoneyString(price, 'KRW')}</strong>을
          아래 계좌로 입금해 주세요.
        </div>

        <br />
        <div>{vBankNumber}</div>
        <br />
        <div>
          입금이 완료되고 난 후 납입처리가 될 때까지 몇 시간 정도 소요될 수
          있습니다.
          <br />
          계속해서 납입처리가 완료되지 않는다면 리딩게이트 고객센터(1599-0533)로
          문의주세요.
        </div>
      </div>
    </Modal>
  )
}
