import { Customer, parseCustomer } from '@/8th/features/customer/model/customer'
import {
  CustomerConfiguration,
  buildCustomerConfiguration,
} from '@/8th/features/customer/model/customer-configuration'
import { useFindCustomer } from '@/8th/features/customer/service/customer-query'
import { setCustomerToken } from '@/8th/shared/http'
import React, { useCallback, useContext, useMemo, useState } from 'react'

type CustomerContextProps = {
  token: string
  customer: Customer
  configuration: CustomerConfiguration
  changeCustomerId: (customerId: string) => void
  clearCustomer: () => void
}

const CustomerContext = React.createContext<CustomerContextProps | undefined>(
  undefined,
)

export default function CustomerContextProvider({
  customerJson,
  children,
}: {
  customerJson?: string
  children?: React.ReactNode
}) {
  const [currentCustomerId, setCurrentCustomerId] = useState<
    string | undefined
  >(undefined)

  const { data: customerFetchData, isSuccess } = useFindCustomer(
    { customerId: currentCustomerId! },
    {
      enabled: !!currentCustomerId,
      staleTime: Infinity,
    },
  )

  const clearCustomer = useCallback(() => {
    setCurrentCustomerId('')
    setCustomerToken('')
  }, [])

  const customerInfo = useMemo(() => {
    let rawJson = undefined
    if (isSuccess && customerFetchData) {
      rawJson = customerFetchData
    } else if (customerJson) {
      rawJson = customerJson
    }
    const parsed = parseCustomer(rawJson)
    setCustomerToken(parsed.Token)

    return {
      Token: parsed.Token,
      Customer: parsed.Customer,
    }
  }, [customerJson, customerFetchData, isSuccess])

  const customerConfig = useMemo(() => {
    return buildCustomerConfiguration(customerInfo.Customer)
  }, [customerInfo.Customer])

  return (
    <CustomerContext.Provider
      value={{
        token: customerInfo.Token,
        customer: customerInfo.Customer,
        configuration: customerConfig,
        clearCustomer,
        changeCustomerId: setCurrentCustomerId,
      }}>
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

export const useCustomerConfiguration = (): CustomerConfiguration => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.configuration
}

export const useChangeCustomerId = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.changeCustomerId
}

export const useClearCustomer = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.clearCustomer
}
