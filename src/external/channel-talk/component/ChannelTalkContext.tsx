'use client'

import React, { useEffect } from 'react'
import { Chatbot } from '../chatbot-channeltalk'

const ChannelTalkChatbotContext = React.createContext<undefined>(undefined)

export default function ChannelTalkContextProvider({
  customerInfo,
  loginInfo,
  children,
}: {
  customerInfo?: {
    customerId: string
    customerName: string
    customerUse: string
  }
  loginInfo?: {
    loginId: string
    studentId: string
    studentName: string
  }
  children?: React.ReactNode
}) {
  useEffect(() => {
    Chatbot.load()
  }, [])

  // useConnectChannelTalk({ customer: customerInfo, user: loginInfo })

  return (
    <ChannelTalkChatbotContext.Provider value={undefined}>
      {children}
    </ChannelTalkChatbotContext.Provider>
  )
}

export const useConnectChannelTalk = ({
  customer,
  user,
}: {
  customer?: {
    customerId: string
    customerName: string
    customerUse: string
  }
  user?: {
    loginId: string
    studentId: string
    studentName: string
  }
}) => {
  const { customerId, customerName, customerUse } = customer || {}
  const { loginId, studentId, studentName } = user || {}

  useEffect(() => {
    if (
      customerId &&
      customerName &&
      customerUse &&
      studentId &&
      loginId &&
      studentName
    ) {
      Chatbot.connect(
        {
          customerId,
          customerName,
          customerType: customerUse,
        },
        {
          userid: studentId,
          loginId,
          name: studentName,
        },
      )
    } else if (customerId && customerName && customerUse) {
      Chatbot.connect({
        customerId,
        customerName,
        customerType: customerUse,
      })
    }
  }, [customerId, customerName, customerUse, loginId, studentId, studentName])
}

export const useChannelTalkChatbotController = () => {
  return {
    showChat: Chatbot.showChat,
    hideChat: Chatbot.hideChat,
    showButton: Chatbot.showButton,
    hideButton: Chatbot.hideButton,
  }
}
