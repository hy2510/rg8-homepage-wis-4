'use client'

import { useCustomerInfo } from '@/7th/_context/CustomerContext'
import {
  useLoginPageLock,
  useLoginPageLockAction,
} from '@/7th/_context/LoginContext'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { ReactNode } from 'react'

const STYLE_ID = 'page_sign_in'

export default function LoginForm({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const loginLock = useLoginPageLock()

  return (
    <main className={style.sign_in}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>
      {/* <div className={style.log_in_box}>{children}</div> */}
      {children}
      {!loginLock.customerId && (
        <div className={style.link}>
          <Link href="/account/account-list">{t('t256')}</Link>
        </div>
      )}
      {loginLock.isLockable && <LoginPageLockUnlockButton />}
    </main>
  )
}

function LoginPageLockUnlockButton() {
  const style = useStyle(STYLE_ID)

  const customer = useCustomerInfo()
  const loginLock = useLoginPageLock()
  const setLoginPageLock = useLoginPageLockAction()

  if (!customer.customerId) {
    return <></>
  }

  const onLoginPageLock = () => {
    if (
      confirm(
        '로그인 화면을 고정하면 계정 목록에 로그인 기록이 저장되지 않습니다. 로그인 화면을 고정하시겠습니까?',
      )
    ) {
      setLoginPageLock({
        customerId: customer.customerId,
        customerName: customer.name,
      })
    }
  }
  const onLoginPageUnlock = () => {
    setLoginPageLock()
  }

  return (
    <>
      <div className={style.login_page_lock}>
        <div className={style.lock_btn_position}>
          <span className={style.lock}></span>
          <span
            className={style.label}
            onClick={() => {
              if (loginLock.customerId) {
                onLoginPageUnlock()
              } else {
                onLoginPageLock()
              }
            }}>
            {loginLock.customerId ? 'Unlock' : 'Lock'}
          </span>
        </div>
      </div>
    </>
  )
}
