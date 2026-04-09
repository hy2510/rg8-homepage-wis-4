import { makeCustomer as __SAFE__makeCustomer } from '@/7th/_repository/client/object/customer'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { getLanguageResources } from '@/localization/server/i18next-server'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { ReactNode } from 'react'
import Common from '@/repository/server/common'
import ApplicationContextProvider from './ApplicationContext'

export const revalidate = 0
const TARGET_HOMEPAGE = process.env.TARGET_HOMEPAGE

type CustomerPayload = {
  applicationType: string
  customerData?: string
}
const getData = async (
  url: string,
  token?: string,
): Promise<CustomerPayload> => {
  let homepageUrl = url
  if (TARGET_HOMEPAGE && TARGET_HOMEPAGE !== 'N') {
    homepageUrl = TARGET_HOMEPAGE
  }
  if (!homepageUrl.startsWith('https') && !homepageUrl.startsWith('http')) {
    homepageUrl = 'https://' + homepageUrl
  }

  let payload: CustomerPayload | undefined = undefined
  const urlResponse = await Common.findCustomer({ homepageUrl })
  if (urlResponse.ok && urlResponse.data) {
    const customer = __SAFE__makeCustomer(urlResponse.data.Customer)
    const applicationType = customer.customerUse.toLowerCase()

    if (
      applicationType === 'private' ||
      applicationType === 'school' ||
      applicationType === 'academy'
    ) {
      payload = {
        applicationType,
        customerData: JSON.stringify(urlResponse.data),
      }
    }
  }
  if (!payload) {
    if (token) {
      const meResponse = await Common.selfCustomer(token)
      if (meResponse.ok && meResponse.data) {
        payload = {
          applicationType: 'app',
          customerData: JSON.stringify(meResponse.data),
        }
      } else {
        payload = {
          applicationType: 'app',
          customerData: undefined,
        }
      }
    } else {
      payload = {
        applicationType: 'app',
        customerData: undefined,
      }
    }
  }
  if (!payload) {
    throw Error('Initializing Failed')
  }
  return payload
}

async function getUserAgentInfoTag() {
  const asyncHeaders = headers()
  const header = await asyncHeaders

  const uaObj = userAgent({ headers: header })
  const browswer =
    `${(uaObj?.browser?.name || 'Unknown').replace(/ /g, '')}(${uaObj?.browser?.version?.split('.')[0] || '?'}/${(uaObj?.os?.name || '?').replace(/ /g, '')})`.replace(
      /_/g,
      '-',
    )
  const type = `${uaObj?.device?.type || 'etc'}`.replace(/_/g, '-')
  return `${browswer}_${type}`
}

export default async function RootBodyLayout({
  locale,
  children,
}: {
  locale: string
  children?: ReactNode
}) {
  const asyncHeaders = headers()
  const header = await asyncHeaders

  const authorizationWithCookie = await getAuthorizationWithCookie()
  const findHost = header.get('host') || ''
  const token = authorizationWithCookie.getActiveAccessToken()
  const data = await getData(findHost, token)
  const userDetails = token
    ? authorizationWithCookie.getTokenUserDetails()
    : undefined
  const isStaffAccess =
    userDetails?.role === 'staff' || userDetails?.role === 'admin'
  const isLogin = !!userDetails?.uid
  const userAgentTag = await getUserAgentInfoTag()

  const resCommon = await getLanguageResources(locale)

  let applicationType: 'app' | 'private' | 'school' | 'academy' = 'app'
  if (data.applicationType === 'private') {
    applicationType = 'private'
  } else if (data.applicationType === 'school') {
    applicationType = 'school'
  } else if (data.applicationType === 'academy') {
    applicationType = 'academy'
  }

  if (data) {
    return (
      <ApplicationContextProvider
        locale={locale}
        languageResource={JSON.stringify(resCommon)}
        applicationType={applicationType}
        userAgentInfo={userAgentTag}
        customerResource={data.customerData}
        isLogin={isLogin}
        isStaffAccess={isStaffAccess}>
        {children}
      </ApplicationContextProvider>
    )
  } else {
    return <div>Initializing Failed</div>
  }
}
