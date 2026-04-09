'use client'

import React, { useContext, useState } from 'react'

type Platform = 'Web' | 'Android' | 'iOS' | 'unknown'

type DeviceContextProps = {
  platform: Platform
  info: string
  tag: string
}

type SetDevice = {
  set?: (device: DeviceContextProps) => void
}

const DeviceContext = React.createContext<DeviceContextProps & SetDevice>({
  platform: 'unknown',
  info: '',
  tag: '',
})

export default function DeviceContextProvider({
  applicationType,
  userAgentInfo,
  children,
}: {
  applicationType: string
  userAgentInfo: string
  children: React.ReactNode
}) {
  const [device, setDevice] = useState<DeviceContextProps>({
    platform: applicationType !== 'app' ? 'Web' : 'unknown',
    info: '',
    tag: userAgentInfo,
  })
  return (
    <DeviceContext.Provider value={{ ...device, set: setDevice }}>
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevicePlatform(): Platform {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.platform
}

export function useDevicePlatformInfo(): string {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return `${context.platform}${context.info ? `(${context.info})` : ''}_${context.tag}`
}

export function useUpdateDevicePlatform(): (
  device: Partial<DeviceContextProps>,
) => void {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  if (!context.set) {
    throw new Error('set function is not defined.')
  }
  const setDevice = context.set
  const currentDevice = {
    platform: context.platform,
    info: context.info,
    tag: context.tag,
  }
  const update = (device: Partial<DeviceContextProps>) => {
    if (device.platform) {
      setDevice({
        platform: device.platform,
        info: device.info || currentDevice.info,
        tag: device.tag || currentDevice.tag,
      })
    }
  }
  return update
}
