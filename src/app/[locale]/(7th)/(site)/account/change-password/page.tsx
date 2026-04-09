'use client'

import ClientTo from '@/7th/_app/ClientTo'
import LoginForward from '@/7th/_app/LoginForward'
import { useFetchChangePassword } from '@/7th/_client/store/account/signin/hook'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { getLoginExtra, resetLoginExtra } from '@/7th/_context/LoginContext'
import { Button, TextField } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import {
  isValidatePassword,
  isValidatePasswordVn,
} from '../sign-up/_component/Signup'

const STYLE_ID = 'page_sign_in'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const { country } = useSiteBlueprint()

  const [notFound, setNotFound] = useState(false)

  const [loginExtra] = useState(getLoginExtra())
  if (!notFound && loginExtra?.type !== 'ChangePassword') {
    setNotFound(true)
  }

  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [isWarningPassword, setWarningPassword] = useState(false)
  const [isWarningRepassword, setWarningRepassword] = useState(false)
  const [errorRedirect, setErrorRedirect] = useState('')
  const [loginRedirect, setLoginRedirect] = useState('')

  const { fetch: changePassword } = useFetchChangePassword()

  const onChangePassword = () => {
    if (!loginExtra) {
      return
    }
    if (!password) {
      alert(t('t215'))
      return
    }
    if (country.korea && !isValidatePassword(password)) {
      alert(t('t183', { num1: 8, num2: 20 }))
      return
    } else if (country.vietnam && !isValidatePasswordVn(password)) {
      alert(t('t184', { num1: 8, num2: 20 }))
      return
    }
    if (!repassword) {
      alert(t('t216'))
      return
    }
    if (password !== repassword) {
      alert(t('t217'))
      return
    }
    const hash = loginExtra.hash
    changePassword({
      hash,
      newPassword: password,
      callback: (data) => {
        resetLoginExtra()
        if (data.success) {
          setLoginRedirect(SITE_PATH.HOME.MAIN)
        } else {
          alert(t('t218'))
          setErrorRedirect(SITE_PATH.ACCOUNT.MAIN)
        }
      },
    })
  }

  if (notFound) {
    return <div></div>
  }
  if (!loginExtra?.type) {
    return <div>Loading</div>
  }
  if (errorRedirect) {
    return <ClientTo to={errorRedirect} isReplace />
  } else if (loginRedirect) {
    return <LoginForward to={loginRedirect} />
  }

  return (
    <main className={style.sign_in}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>
      <div className={style.log_in_box}>
        <div className={style.log_in_personal_member}>
          {!country.vietnam ? (
            <div>* {t('t183', { num1: 8, num2: 20 })}</div>
          ) : (
            <div>* {t('t184', { num1: 8, num2: 20 })}</div>
          )}
          <TextField
            hint={t('t202')}
            password
            value={password}
            onTextChange={(text) => setPassword(text)}
            onFocusIn={(text) => setWarningPassword(false)}
            onFocusOut={(text) => {
              if (text.length > 0) {
                if (country.korea && !isValidatePassword(password)) {
                  setWarningPassword(true)
                } else if (country.vietnam && !isValidatePasswordVn(password)) {
                  setWarningPassword(true)
                }
              }
            }}
          />
          {isWarningPassword && (
            <span
              style={{
                color: 'red',
              }}>{`[!] ${t('t220')}`}</span>
          )}
          <div>{`* ${t('t221')}`}</div>
          <TextField
            hint={t('t294')}
            password
            value={repassword}
            onTextChange={(text) => setRepassword(text)}
            onFocusIn={(text) => {
              setWarningRepassword(false)
              if (text !== password) {
                setRepassword('')
              }
            }}
            onFocusOut={(text) =>
              setWarningRepassword(text.length > 0 && text !== password)
            }
          />
          {isWarningRepassword && (
            <span
              style={{
                color: 'red',
              }}>{`[!] ${t('t220')}`}</span>
          )}
          <Button
            shadow={true}
            onClick={() => {
              onChangePassword()
            }}>
            {t('t222')}
          </Button>
        </div>
      </div>
    </main>
  )
}
