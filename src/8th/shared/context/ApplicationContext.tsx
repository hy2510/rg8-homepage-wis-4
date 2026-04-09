'use client'

import useCanadaAccessCheck from '@/8th/shared/hook/useCanadaAccessCheck'
import { setPlatform } from '@/8th/shared/utils/open-window'
import useSwing2AppConnect from '@/external/swing2app/component/useSwing2AppConnect'
import { ReactNode, createContext, useContext, useState } from 'react'

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
  applicationType,
  userAgentInfo,
  children,
}: {
  applicationType: ApplicationType
  userAgentInfo: string
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

  return (
    <ApplicationContext.Provider value={{ applicationType, platformInfo }}>
      {children}
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
