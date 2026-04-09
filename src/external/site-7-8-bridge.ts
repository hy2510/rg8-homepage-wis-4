'use client'
const SITE_BRIDGE_STORAGE_KEY = 'site_bridge'

const CUSTOMER_WHITE_LIST: string[] = [
  '000172', // 개인회원
  '001104', // 개인회원(dev)
  '000902', // 용인백현초등학교
  '001174', // 개인회원(베트남)
  '001690', // 레이먼원어민어학원
]
const CUSTOMER_BLACK_LIST: string[] = []

let siteCustomerId: string | undefined = undefined
let siteStudentId: string | undefined = undefined
let siteCustomerUse: string | undefined = undefined
let siteCountryCode: string | undefined = undefined

type SiteBridge = {
  _id: string
  useType: 'nw' | 'od'
}

function getSiteBridgeId({
  customerId,
  studentId,
}: {
  customerId: string
  studentId: string
}) {
  return `${customerId}#${studentId}`
}

function getAllSiteBridge(): SiteBridge[] {
  const configs: SiteBridge[] = []
  if (window) {
    const configJson = window.localStorage.getItem(SITE_BRIDGE_STORAGE_KEY)
    if (configJson) {
      const objConfig = JSON.parse(configJson) as SiteBridge[]
      configs.push(...objConfig)
    }
  }
  return configs
}

function getSiteBridge(
  info: {
    customerId: string
    studentId: string
  },
  isEmptyCreate?: boolean,
): SiteBridge | undefined {
  const configId = getSiteBridgeId(info)
  const configs = getAllSiteBridge().filter((config) => {
    return config._id === configId
  })
  if (configs.length === 1) {
    return configs[0]
  }
  if (isEmptyCreate) {
    return {
      _id: configId,
      useType: 'od',
    }
  }
  return undefined
}

export function setSiteBridge(data?: {
  customerId: string | undefined
  studentId: string | undefined
  customerUse: string | undefined
  countryCode: string | undefined
}) {
  siteCustomerId = data?.customerId
  siteStudentId = data?.studentId
  siteCustomerUse = data?.customerUse
  siteCountryCode = data?.countryCode
}

export function updateSiteBridge(flag: 'nw' | 'od') {
  if (!siteCustomerId || !siteStudentId) {
    return
  }

  const configId = getSiteBridgeId({
    customerId: siteCustomerId,
    studentId: siteStudentId,
  })
  const allConfigs = getAllSiteBridge()
  const myConfig = getSiteBridge({
    customerId: siteCustomerId,
    studentId: siteStudentId,
  })

  const configs: SiteBridge[] = []
  if (myConfig) {
    configs.push(
      ...allConfigs.map((config) => {
        if (config._id === configId) {
          const newConfig: SiteBridge = {
            ...config,
            useType: flag,
          }
          return newConfig
        } else {
          return config
        }
      }),
    )
  } else {
    const newConfig: SiteBridge = {
      _id: configId,
      useType: flag,
    }
    configs.push(...allConfigs, newConfig)
  }
  if (window) {
    window.localStorage.setItem(
      SITE_BRIDGE_STORAGE_KEY,
      JSON.stringify(configs),
    )
  }
}

export function isGoTo8th() {
  if (!siteCustomerId || !siteStudentId || !isAvailable8thCustomer()) {
    return false
  }
  const siteBridge = getSiteBridge({
    customerId: siteCustomerId,
    studentId: siteStudentId,
  })
  if (siteBridge) {
    return siteBridge.useType === 'nw'
  }
  return false
}

export function isAvailable8thCustomer() {
  if (!siteCustomerId || !siteStudentId) {
    return false
  }
  if (CUSTOMER_WHITE_LIST.includes(siteCustomerId)) {
    return true
  }
  if (CUSTOMER_BLACK_LIST.includes(siteCustomerId)) {
    return false
  }
  if (siteCustomerUse?.toLowerCase() === 'academy') {
    return false
  }
  if (siteCountryCode?.toLowerCase() !== 'kr') {
    return false
  }
  return true
}
