'use client'

import { STAFF_PATH, isValidatePath } from '@/app/site-path'
import ChannelTalkContextProvider from '@/external/channel-talk/component/ChannelTalkContext'
import MarketingTrackerContextProvider from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useSwing2AppConnect from '@/external/swing2app/component/useSwing2AppConnect'
import LanguagePackContextProvider from '@/localization/client/LanguagePackContext'
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode, createContext, useContext, useState } from 'react'
import ClientTo from '../_app/ClientTo'
import LoginForward from '../_app/LoginForward'
import useCanadaAccessCheck from '../_app/useCanadaAccessCheck'
import {
  useStaffInfoFlagLogin,
  useStudentInfo,
  useStudentInfoAction,
  useStudentInfoFlagLogin,
} from '../_client/store/student/info/selector'
import CustomerContextProvider from '../_context/CustomerContext'
import { setPlatform } from '../_function/open-window'
import { makeCustomer } from '../_repository/client/object/customer'
import StyleContextProvider from '../_ui/context/StyleContext'

export type ApplicationType = 'app' | 'private' | 'school' | 'academy'
export type PlatformType = 'Web' | 'Android' | 'iOS' | 'unknown'

type PlatformInfo = {
  platform: PlatformType
  info: string
  tag: string
}

type ApplicationContextValue = {
  applicationType: ApplicationType
  platformInfo: PlatformInfo
}

type ApplicationContextProps = ApplicationContextValue

const ApplicationContext = createContext<ApplicationContextProps | undefined>(
  undefined,
)

export default function ApplicationContextProvider({
  locale,
  languageResource,
  applicationType,
  userAgentInfo,
  customerResource,
  isLogin,
  isStaffAccess,
  children,
}: {
  locale: string
  languageResource: string
  applicationType: ApplicationType
  userAgentInfo: string
  customerResource?: string
  isLogin: boolean
  isStaffAccess: boolean
  children?: ReactNode
}) {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    platform: 'unknown',
    info: '',
    tag: userAgentInfo,
  })

  const updatePlatform = (platform: {
    platform: string
    info?: string
    tag?: string
  }) => {
    let platformType: PlatformType = 'unknown'
    if (platform.platform.toLowerCase() === 'android') {
      platformType = 'Android'
    } else if (platform.platform.toLowerCase() === 'ios') {
      platformType = 'iOS'
    } else if (platform.platform.toLowerCase() === 'web') {
      platformType = 'Web'
    }
    setPlatformInfo({
      platform: platformType,
      info: platform.info || platformInfo.info,
      tag: platform.tag || platformInfo.tag,
    })
    if (platformType === 'Android' || platformType === 'iOS') {
      setPlatform(platformType)
    }
  }
  useSwing2AppConnect({
    platform: platformInfo.platform,
    updatePlatform,
  })
  useCanadaAccessCheck(applicationType)

  // Customer 설정
  const parsed = customerResource ? JSON.parse(customerResource) : undefined
  const parsedCustomer = parsed ? makeCustomer(parsed.Customer) : undefined
  const customerInfo = parsedCustomer
    ? {
        customerId: parsedCustomer.customerId,
        customerName: parsedCustomer.name,
        customerUse: parsedCustomer.customerUse,
      }
    : undefined
  let loginInfo = undefined
  const { loginId, studentId, name: studentName } = useStudentInfo()
  if (loginId && studentId && studentName) {
    loginInfo = {
      loginId,
      studentId,
      studentName,
    }
  }

  // ---
  const path = usePathname()
  const searchParams = useSearchParams()

  const { staffLogOn, studentLogOff, staffLogOff } = useStudentInfoAction()
  const loginStatus = useStudentInfoFlagLogin()
  const isLoginForwardValidatePath = isValidatePath(path)
  const staffLoginStatus = useStaffInfoFlagLogin()
  if (!isLogin && loginStatus === 'unknown') {
    studentLogOff()
  }

  let staffPath = ''
  if (staffLoginStatus === 'unknown') {
    if (isStaffAccess) {
      staffLogOn()
    } else {
      staffLogOff()
    }
  } else if (loginStatus !== 'on' && staffLoginStatus === 'on') {
    if (path.includes(STAFF_PATH.MIRAGE)) {
      const uid = searchParams.get('uid')
      if (uid) {
        staffPath = `${STAFF_PATH.MIRAGE}?uid=${uid}`
      }
    }
    if (!staffPath && isLoginForwardValidatePath) {
      staffPath = STAFF_PATH.MAIN
    }
  }

  return (
    <ApplicationContext.Provider value={{ applicationType, platformInfo }}>
      <LanguagePackContextProvider
        language={locale}
        namespace={'common'}
        res={languageResource}>
        <CustomerContextProvider customerJson={customerResource}>
          <MarketingTrackerContextProvider>
            <ChannelTalkContextProvider
              customerInfo={customerInfo}
              loginInfo={loginInfo}>
              <StyleContextProvider>
                {children}

                {!isLogin &&
                  applicationType !== 'app' &&
                  staffLoginStatus !== 'off' &&
                  isStaffAccess &&
                  staffPath && <ClientTo to={staffPath} isReplace={true} />}
                {isLogin &&
                  loginStatus === 'unknown' &&
                  isLoginForwardValidatePath && <LoginForward />}
              </StyleContextProvider>
            </ChannelTalkContextProvider>
          </MarketingTrackerContextProvider>
        </CustomerContextProvider>
      </LanguagePackContextProvider>
    </ApplicationContext.Provider>
  )
}

export function useDevicePlatform(): PlatformType {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.platformInfo.platform
}

export function useDevicePlatformInfo(): string {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  const { platform, info, tag } = context.platformInfo
  return `${platform}${info ? `(${info})` : ''}_${tag}`
}

export function useApplicationType(): ApplicationType {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.applicationType
}
