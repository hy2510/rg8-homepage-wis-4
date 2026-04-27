'use client'

import {
  useApplicationType,
  useDevicePlatformInfo,
} from '@/7th/__root/ApplicationContext'
import {
  deleteAllAccount,
  setTempolaryAccount,
} from '@/7th/_account/account-list'
import {
  LoginPageLock,
  deleteLoginPageLock,
  getLoginPageLock,
  setLoginPageLock,
} from '@/7th/_account/login-lock'
import ClientTo from '@/7th/_app/ClientTo'
import LoginForward, { DESTINATION } from '@/7th/_app/LoginForward'
import {
  useFetchSignin,
  useFetchSigninWithSSO,
} from '@/7th/_client/store/account/signin/hook'
import {
  useClearCustomer,
  useCustomerInfo,
} from '@/7th/_context/CustomerContext'
import { SigninResponse } from '@/7th/_repository/client/account/signin'
import { clearChangeGroupClassPassingTime } from '@/7th/site/_header/ChangeGroupClassController'
import SITE_PATH, { STAFF_PATH } from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import { VIETNAMESE } from '@/localization/localize-config'
import React, { useContext, useEffect, useRef, useState } from 'react'

type LoginActionParam = {
  id: string
  password?: string
  isSavePassword?: boolean
  isSSO?: boolean
  i?: number
  destination?: string
  onError?: (code: number, message: string, redirect?: string) => void
}

type LoginContextProps = {
  action: {
    login: (param: LoginActionParam) => void
    lockLoginPage: (param?: LoginPageLock) => void
  }
  data: {
    loginPageLock: LoginPageLock & { isLoaded: boolean; isLockable: boolean }
  }
}

const LoginContext = React.createContext<LoginContextProps | undefined>(
  undefined,
)

type LoginExtra = {
  type: 'ChangePassword' | 'NeedClass' | 'StaffLogin'
  hash: string
}
let loginExtra: LoginExtra | undefined = undefined
export function getLoginExtra() {
  return loginExtra
}
export function resetLoginExtra() {
  loginExtra = undefined
}

export default function LoginContextProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  // @language 'common'
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const { customerId } = useCustomerInfo()
  const clearCustomer = useClearCustomer()

  const deviceType = useDevicePlatformInfo()
  const appType = useApplicationType()
  const loginType = appType === 'app' ? 'student' : 'all'

  const waitRef = useRef<boolean>(false)

  const [loginPageLock, setLoginPageLockState] = useState<
    LoginPageLock & { isLoaded: boolean; isLockable: boolean }
  >({ customerId: '', customerName: '', isLoaded: false, isLockable: false })
  useEffect(() => {
    if (appType === 'app') {
      const savedLoginPageLock = getLoginPageLock()
      if (savedLoginPageLock) {
        setLoginPageLockState({
          ...savedLoginPageLock,
          isLoaded: true,
          isLockable: true,
        })
      } else {
        setLoginPageLockState({
          customerId: '',
          customerName: '',
          isLoaded: true,
          isLockable: true,
        })
      }
    }
  }, [appType])

  const lockLoginPageAction = (info?: LoginPageLock) => {
    if (info) {
      setLoginPageLock(info)
      deleteAllAccount()
      const newLoginLock = { ...loginPageLock, ...info }
      setLoginPageLockState(newLoginLock)
    } else {
      deleteLoginPageLock()
      clearCustomer()
      const newLoginLock = {
        ...loginPageLock,
        customerId: '',
        customerName: '',
      }
      setLoginPageLockState(newLoginLock)
    }
  }

  const [redirect, setRedirect] = useState('')
  const [afterLoginFlag, setAfterLoginFlag] = useState<
    'none' | 'student' | 'staff'
  >('none')
  const { loading: isLoadingSignin, fetch: signinFetch } = useFetchSignin()
  const { loading: isLoadingSigninSSO, fetch: signinSSOFetch } =
    useFetchSigninWithSSO()

  const maketingEventTracker = useTrack()

  const loginAction = ({
    id,
    password,
    isSavePassword = false,
    isSSO = false,
    i = 0,
    destination,
    onError,
  }: LoginActionParam) => {
    if (isLoadingSignin || isLoadingSigninSSO) {
      return
    }
    if (redirect) {
      return
    }
    const loginId = id ? id.trim() : ''
    if (!loginId) {
      return
    }
    if (isSSO && (!i || i <= 0)) {
      return
    } else if (!isSSO && !password) {
      return
    }
    if (waitRef.current) {
      return
    }
    waitRef.current = true
    setTimeout(() => {
      waitRef.current = false
    }, 1000)
    const signInCallback = (data: {
      loading: boolean
      success?: boolean
      error?: unknown
      payload?: SigninResponse
      reset?: () => void
    }) => {
      if (data.success) {
        const staff = !!data.payload?.staff
        if (!staff) {
          if (!loginPageLock.customerId) {
            setTempolaryAccount({
              customerId: customerId,
              loginId: loginId,
              password: isSavePassword ? password : '',
            })
          }
          clearChangeGroupClassPassingTime()
          setAfterLoginFlag('student')
          setRedirect(destination ? destination : DESTINATION.STUDY)
          maketingEventTracker.eventAction('로그인')
          maketingEventTracker.eventAction('로그인 성공')
        } else {
          setAfterLoginFlag('staff')
          setRedirect(`${STAFF_PATH.MAIN}?open=1`)
        }
      } else {
        let errorCode = -1
        let errorMessage = '로그인에 실패하였습니다.'
        let extra = undefined
        let redirect = undefined
        if (data.error) {
          errorCode = (data.error as { code: number }).code
          extra = (data.error as { extra: any }).extra
          if (errorCode === 2000) {
            errorMessage =
              '고객사 정보를 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.'
          } else if (errorCode === 3000) {
            //pw error
            errorMessage = '아이디 또는 비밀번호가 일치하지 않습니다.'
            if (language === VIETNAMESE) {
              errorMessage = 'ID hoặc mật khẩu không chính xác.'
            }
          } else if (errorCode === 3001) {
            //id error
            errorMessage = '아이디 또는 비밀번호가 일치하지 않습니다.'
            if (language === VIETNAMESE) {
              errorMessage = 'ID hoặc mật khẩu không chính xác.'
            }
          } else if (errorCode === 2002) {
            errorMessage = '관리자계정은 로그인 할 수 없습니다.'
          } else if (errorCode === 2001) {
            loginExtra = {
              type: 'ChangePassword',
              hash: extra.hash,
            }
            errorMessage =
              '임시 비밀번호로 로그인하였습니다. 변경 후 다시 이용해주세요.'
            if (language === VIETNAMESE) {
              errorMessage =
                'Bạn đã đăng nhập bằng mật khẩu tạm thời. Vui lòng đổi mật khẩu và đăng nhập lại.'
            }
            if (!loginPageLock.customerId) {
              setTempolaryAccount({
                customerId: customerId,
                loginId: loginId,
                password: '',
              })
            }
            redirect = `${SITE_PATH.ACCOUNT.CHANGE_PASSWORD}`
          } else if (errorCode === 9998) {
            // 9998 오류 발생 시 아무 메시지도 출력하지 않음.
            return
          }
          if (errorCode !== 2001) {
            maketingEventTracker.eventAction('로그인 실패', {
              error_reason: `[CODE:${errorCode}]${errorMessage}`,
            })
          }
        }
        onError && onError(errorCode, errorMessage, redirect)
      }
    }
    if (isSSO) {
      signinSSOFetch({
        code: loginId,
        i,
        deviceType,
        loginType,
        callback: signInCallback,
      })
    } else {
      signinFetch({
        id: loginId,
        password: password!,
        deviceType,
        loginType,
        callback: signInCallback,
      })
    }
  }
  return (
    <LoginContext.Provider
      value={{
        action: {
          login: loginAction,
          lockLoginPage: lockLoginPageAction,
        },
        data: {
          loginPageLock,
        },
      }}>
      {children}
      {afterLoginFlag === 'student' && redirect && (
        <LoginForward to={redirect} />
      )}
      {afterLoginFlag === 'staff' && redirect && <ClientTo to={redirect} />}
    </LoginContext.Provider>
  )
}

export function useLoginAction() {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.action.login
}

export function useLoginPageLockAction() {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.action.lockLoginPage
}

export function useLoginPageLock() {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.data.loginPageLock
}
