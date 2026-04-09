'use client'

import AuthContextProvider from '@/8th/shared/auth/AuthContext'
import ApplicationContextProvider, {
  ApplicationType,
} from '@/8th/shared/context/ApplicationContext'
import CustomerContextProvider from '@/8th/shared/context/CustomerContext'
import ScreenModeContextProvider from '@/8th/shared/context/ScreenModeContext'
import ScrollLockContextProvider from '@/8th/shared/context/ScrollLockContext'
import ReactQueryProvider from '@/8th/shared/react-query/ReactQueryProvider'
import ChannelTalkContextProvider from '@/external/channel-talk/component/ChannelTalkContext'
import MarketingTrackerContextProvider from '@/external/marketing-tracker/component/MarketingTrackerContext'
import LanguagePackContextProvider from '@/localization/client/LanguagePackContext'

export default function ApplicationProviders({
  customer,
  locale,
  languageResource,
  applicationType,
  userAgentInfo,
  isStudentLogin,
  isStaffLogin,
  children,
}: {
  customer: string
  locale: string
  languageResource: string
  applicationType: ApplicationType
  userAgentInfo: string
  isStudentLogin: boolean
  isStaffLogin: boolean
  children: React.ReactNode
}) {
  return (
    <ApplicationContextProvider
      applicationType={applicationType}
      userAgentInfo={userAgentInfo}>
      <ReactQueryProvider>
        <ScrollLockContextProvider>
          <ScreenModeContextProvider>
            <MarketingTrackerContextProvider>
              <LanguagePackContextProvider
                language={locale}
                namespace="common"
                res={languageResource}>
                <CustomerContextProvider customerJson={customer}>
                  <ChannelTalkContextProvider>
                    <AuthContextProvider
                      studentLogin={isStudentLogin}
                      staffLogin={isStaffLogin}>
                      {children}
                    </AuthContextProvider>
                  </ChannelTalkContextProvider>
                </CustomerContextProvider>
              </LanguagePackContextProvider>
            </MarketingTrackerContextProvider>
          </ScreenModeContextProvider>
        </ScrollLockContextProvider>
      </ReactQueryProvider>
    </ApplicationContextProvider>
  )
}
