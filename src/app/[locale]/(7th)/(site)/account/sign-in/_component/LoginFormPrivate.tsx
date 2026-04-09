'use client'

import { useApplicationType } from '@/7th/__root/ApplicationContext'
import { useLoginAction } from '@/7th/_context/LoginContext'
import { Button, TextField } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useRef, useState } from 'react'

const STYLE_ID = 'page_sign_in'

export default function LoginFormPrivate({
  customHeader,
  destination,
}: {
  customHeader?: ReactNode
  destination?: string
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const isAppType = useApplicationType() === 'app'
  const onLogin = useLoginAction()

  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const loginIdInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const isLoginDisabled = !loginId || !password

  const requestLogin = (id: string, password: string) => {
    onLogin({
      id,
      password,
      isSavePassword: false,
      destination,
      onError: (code, message, redirect) => {
        if (code === 3000) {
        } else if (code === 2001 && redirect) {
          router.replace(redirect)
        }
        alert(message)
        passwordInputRef.current?.focus()
      },
    })
  }

  return (
    <>
      <div className={style.log_in_box}>
        <div className={style.log_in_personal_member}>
          {customHeader}
          <TextField
            ref={loginIdInputRef}
            id={'user-id'}
            hint={t('t266')}
            onTextChange={(text) => setLoginId(text)}
            value={loginId}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                if (!isLoginDisabled) {
                  requestLogin(loginId, password)
                } else if (loginId && !password) {
                  passwordInputRef?.current?.focus()
                }
              }
            }}
          />
          <TextField
            ref={passwordInputRef}
            id={'user-passowrd'}
            hint={t('t202')}
            password
            value={password}
            onTextChange={(text) => setPassword(text)}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                if (!isLoginDisabled) {
                  requestLogin(loginId, password)
                } else if (!loginId && password) {
                  loginIdInputRef?.current?.focus()
                }
              }
            }}
          />
          <Button
            shadow={!isLoginDisabled}
            color={isLoginDisabled ? 'gray' : 'red'}
            onClick={() => {
              if (!isLoginDisabled) {
                requestLogin(loginId, password)
              }
            }}>
            {t('t214')}
          </Button>
          <div className={style.row_box} style={{ alignItems: 'center' }}>
            <Link href={SITE_PATH.ACCOUNT.FORGOT_ID}>{t('t225')}</Link>
            <Link href={SITE_PATH.ACCOUNT.FORGOT_PASSWORD}>{t('t247')}</Link>
            <Link
              href={SITE_PATH.ACCOUNT.SIGN_UP}
              style={{
                color: 'var(--blue)',
                fontWeight: '600',
                fontSize: 'var(--text-l)',
              }}>
              {t('t267')}
            </Link>
          </div>
          <div className={style.comment} style={{ display: 'inline-block' }}>
            {`❗️ ${t('t268')}`}
            {!isAppType && (
              <Link
                href={SITE_PATH.ACCOUNT.GROUP_SEARCH}
                style={{
                  color: 'var(--blue)',
                  fontWeight: '600',
                  marginLeft: '5px',
                }}>
                {t('t262')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
