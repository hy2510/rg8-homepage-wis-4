'use client'

import ChannelService from './channel-talk-api'

const TYPE_PRIVATE_KEY = 'c660d8bb-30f0-42f3-a8b4-41f85374393e'
const TYPE_SCHOOL_KEY = '45d96f00-6524-47b5-8f75-6634663d766e'
const TYPE_ACADEMY_KEY = '22d7855e-17cd-44d5-b281-dfba2b599bef'
// if ((customerId != "000107") && (customerId != "000830") && (customerId != "002061")) // IREAD-수원정자센터, 로제타스톤코리아, SDA교문리교회 제외
const EXECLUSIVE_CUSTOMER = ['000107', '000830', '002061']

const connection: {
  isLoaded: boolean | undefined
  serialized: string
  connectInfo?: {
    customerId: string
    customerName: string
    customerUse: string
  }
  userInfo?: {
    memberId: string
    studentId: string
    loginId: string
    name: string
  }
  config?: {
    pluginKey: string
    memberId?: string
    profile?: {
      [key: string]: string | number | boolean | null | undefined
    }
  }
  setting: {
    isButtonShow: boolean
  }
} = {
  isLoaded: undefined,
  serialized: '',
  connectInfo: undefined,
  userInfo: undefined,
  config: undefined,
  setting: {
    isButtonShow: false,
  },
}

function getKey(customerType?: string) {
  const type = customerType?.toLocaleLowerCase()
  let key: string | undefined = undefined

  if (type === 'private') {
    key = TYPE_PRIVATE_KEY
  } else if (type === 'school') {
    key = TYPE_SCHOOL_KEY
  } else if (type === 'academy') {
    key = TYPE_ACADEMY_KEY
  }
  return key
}

function load() {
  if (connection.isLoaded === undefined) {
    connection.isLoaded = false
    ChannelService.loadScript()
    connection.isLoaded = true
  }
}

function connect(
  customer: {
    customerId: string
    customerName: string
    customerType: string
  },
  user?: {
    userid: string
    loginId: string
    name: string
  },
) {
  const { customerId, customerName, customerType } = customer
  const { userid, loginId, name } = user || {}

  const key: string | undefined = getKey(customerType)

  const isAvailableCustomer =
    !!key && !!customerId && !EXECLUSIVE_CUSTOMER.includes(customerId)

  if (!isAvailableCustomer) {
    return
  }
  const serialized = `${customerId}-${customerName}-${customerType}|${loginId}-${userid}-${name}`

  const memberId =
    userid && loginId
      ? `C${customerName}L${loginId}S${userid}`.replace(
          /[\s’'"+&%$#@!~`]/g,
          '_',
        )
      : undefined

  const profile = userid && name ? { customerName, name } : { customerName }
  const config = {
    pluginKey: key,
    hideChannelButtonOnBoot: true,
    zIndex: 990,
    memberId,
    profile,
  }

  if (!connection.isLoaded) {
    load()
  }
  if (connection.isLoaded && serialized !== connection.serialized) {
    connection.serialized = serialized
    ChannelService.boot(config, (error) => {
      if (!error) {
        connection.config = config
        if (memberId && userid && loginId && name) {
          connection.userInfo = {
            memberId,
            studentId: userid,
            loginId,
            name,
          }
        } else {
          connection.userInfo = undefined
        }
        if (connection.setting.isButtonShow) {
          ChannelService.showChannelButton()
        }
      } else {
        connection.serialized = ''
      }
    })
  }
}

function showChat() {
  ChannelService.openChat()
}

function hideChat() {
  ChannelService.onHideMessenger(() => {})
}

function showButton(isToggle?: boolean) {
  if (isToggle) {
    if (!connection.setting.isButtonShow) {
      connection.setting.isButtonShow = true
      ChannelService.showChannelButton()
    }
  } else {
    connection.setting.isButtonShow = true
    ChannelService.showChannelButton()
  }
}

function hideButton(isToggle?: boolean) {
  if (isToggle) {
    if (connection.setting.isButtonShow) {
      connection.setting.isButtonShow = false
      ChannelService.hideChannelButton()
    }
  } else {
    connection.setting.isButtonShow = false
    ChannelService.hideChannelButton()
  }
}

export const Chatbot = {
  load,
  connect,
  showChat,
  hideChat,
  showButton,
  hideButton,
}
