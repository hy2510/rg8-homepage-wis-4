import { useDevicePlatform } from '@/7th/__root/ApplicationContext'
import { useOnLoadMain } from '@/7th/_client/store/home/hook'
import { useStudentInfo } from '@/7th/_client/store/student/info/selector'
import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/7th/_context/CustomerContext'
import { openWindow } from '@/7th/_function/open-window'
import { Main } from '@/7th/_repository/client/object/main'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import {
  useChannelTalkChatbotController,
  useConnectChannelTalk,
} from '@/external/channel-talk/component/ChannelTalkContext'
import React, { ReactNode, useContext } from 'react'
import VnFloatingMenu from './VnFloatingMenu'

const STYLE_ID = 'page_home'
const HomeContext = React.createContext<Main | undefined>(undefined)

export function HomeContextProvider({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  const { target, country } = useSiteBlueprint()
  const platform = useDevicePlatform()

  const { payload: mainData } = useOnLoadMain(target, platform, country)

  const { customerId, name: customerName, customerUse } = useCustomerInfo()
  const { loginId, studentId, name: studentName } = useStudentInfo()

  useConnectChannelTalk({
    customer: { customerId, customerName, customerUse },
    user: { loginId, studentId, studentName },
  })

  const chatbotController = useChannelTalkChatbotController()

  return (
    <HomeContext.Provider value={mainData}>
      {target.private && country.vietnam && <VnFloatingMenu />}
      {children}
      {mainData?.floatingmenu && mainData?.floatingmenu?.length > 0 && (
        <div className={style.chatbot_area}>
          {mainData.floatingmenu.map((menu, i) => {
            const isAction = menu.action === '@click#chatbot'
            const onclick = isAction
              ? () => {
                  chatbotController.showChat()
                }
              : undefined

            return (
              <div
                key={`id_${i}`}
                className={style.chat_icon}
                style={{ backgroundImage: `url('${menu.icon}')` }}
                onClick={onclick}>
                {!isAction && (
                  <a
                    href={'#'}
                    onClick={() => openExternalLink(menu.action)}
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </HomeContext.Provider>
  )
}

export function useHomeMain() {
  const context = useContext(HomeContext)
  return context
}

function openExternalLink(url: string) {
  openWindow(url, {
    external: true,
    target: '_blank',
  })
}
