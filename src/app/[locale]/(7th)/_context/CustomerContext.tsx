'use client'

import {
  Customer,
  makeCustomer,
} from '@/7th/_repository/client/object/customer'
import {
  SiteBlueprint,
  makeSiteBlueprint,
  newSiteBlueprint,
} from '@/7th/_repository/client/object/site-blueprint'
import { setCustomerToken } from '@/7th/_repository/client/utils'
import React, { useCallback, useContext, useState } from 'react'

export const CustomerMemory: { Token: string | undefined } = {
  Token: undefined,
}

type CustomerContext = {
  isReset?: boolean
  token: string
  customer: Customer
  blueprint: SiteBlueprint
}
type CustomerContextProps = CustomerContext & {
  changeCustomer: (customerJson: string) => void
  clearCustomer: () => void
}

const CustomerContext = React.createContext<CustomerContextProps | undefined>(
  undefined,
)

function setupCustomer(customerJson: string): CustomerContext | undefined {
  let result: CustomerContext | undefined = undefined
  try {
    const parsed = JSON.parse(customerJson)
    const parsedCustomer = makeCustomer(parsed.Customer)
    const customerToken = parsed.Token
    const SiteBlueprint = makeSiteBlueprint(parsedCustomer)
    if (customerToken) {
      setCustomerToken(customerToken)
      result = {
        token: customerToken,
        customer: parsedCustomer,
        blueprint: SiteBlueprint,
      }
    }
  } catch (error) {}
  return result
}

function removeCustomer() {
  setCustomerToken('')
}

export default function CustomerContextProvider({
  customerJson,
  children,
}: {
  customerJson?: string
  children?: React.ReactNode
}) {
  const [customer, setCustomer] = useState<CustomerContext>({
    token: '',
    customer: makeCustomer(),
    blueprint: newSiteBlueprint(),
  })
  const changeCustomer = useCallback((customerJson: string) => {
    const props = setupCustomer(customerJson)
    if (props) {
      setCustomer(props)
    }
  }, [])
  const clearCustomer = useCallback(() => {
    removeCustomer()
    setCustomer({
      token: '',
      isReset: true,
      customer: makeCustomer(),
      blueprint: newSiteBlueprint(),
    })
  }, [])

  if (!customer.isReset && !customer.token && customerJson) {
    changeCustomer(customerJson)
  }

  return (
    <CustomerContext.Provider
      value={{ ...customer, changeCustomer, clearCustomer }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomerInfo = (): Customer => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.customer
}

export const useSiteBlueprint = (): SiteBlueprint => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.blueprint
}

export const useChangeCustomer = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.changeCustomer
}

export const useClearCustomer = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.clearCustomer
}
