'use client'

import { useFetchFindCustomer } from '@/7th/_client/store/customer/info/hook'
import {
  useFetchSearchCustomer,
  useOnLoadSearchPrivateCustomer,
} from '@/7th/_client/store/customer/search/hook'
import {
  useChangeCustomer,
  useClearCustomer,
  useCustomerInfo,
} from '@/7th/_context/CustomerContext'
import { useLoginPageLock } from '@/7th/_context/LoginContext'
import { SearchCustomerResponse } from '@/7th/_repository/client/customer/search-customer'
import {
  BackLink,
  Button,
  Nav,
  NavItem,
  TextField,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useState } from 'react'
import LoginFormAcademy from './LoginFormAcademy'
import LoginFormIntro from './LoginFormIntro'
import LoginFormPrivate from './LoginFormPrivate'
import LoginFormSchool from './LoginFormSchool'

const STYLE_ID = 'page_sign_in'

const PRIVATE_SUPPORT_NATION = ['KR', 'ID', 'VN']
function getNationLabel(countryCode: string, customerName: string) {
  if (customerName.toLowerCase() === 'other') {
    return 'Other Countries'
  }
  if (countryCode === 'KR') {
    return '대한민국'
  } else if (countryCode === 'ID') {
    return 'Indonesia'
  } else if (countryCode === 'VN') {
    return 'Việt Nam'
  }
  return ''
}

export default function LoginFormIntegrated({
  defaultNavTab,
}: {
  defaultNavTab?: 'P' | 'G'
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const customer = useCustomerInfo()

  const { payload: privateCustomer, loading: isCustomerLoading } =
    useOnLoadSearchPrivateCustomer()
  const groupSearch = useFetchSearchCustomer()
  const findCustomer = useFetchFindCustomer()

  const [navTab, setNavTab] = useState<'P' | 'G' | undefined>(defaultNavTab)

  const [isGroupSearchEmpty, setGroupSearchEmpty] = useState(false)
  const [groupKeyword, setGroupKeyword] = useState('')
  const [groupSearchCustomers, setGroupSearchCustomers] =
    useState<SearchCustomerResponse>([])

  const changeCustomer = useChangeCustomer()
  const clearCustomer = useClearCustomer()
  const setupCustomer = (customerId: string) => {
    findCustomer.fetch({
      customerId,
      callback: (data) => {
        if (data.payload) {
          changeCustomer(data.payload)
        }
      },
    })
  }

  const loginTitle =
    customer.customerUse === 'Private'
      ? getNationLabel(customer.countryCode, customer.name)
      : customer.name
  const onLoginBackClick = () => {
    clearCustomer()
  }

  const loginLock = useLoginPageLock()
  if (!loginLock.isLoaded) {
    return <></>
  }
  if (loginLock.customerId) {
    if (!customer.customerId && !findCustomer.loading) {
      setupCustomer(loginLock.customerId)
    }
    return (
      <>
        {customer.customerId && !findCustomer.loading ? (
          <LoginFormWrapper
            title={loginTitle}
            customerUse={customer.customerUse}
          />
        ) : (
          <LoadingScreen />
        )}
      </>
    )
  }
  if (!navTab) {
    return <LoginFormIntro onClickNav={setNavTab} />
  }
  return (
    <>
      {customer.customerId && (
        <LoginFormWrapper
          title={loginTitle}
          customerUse={customer.customerUse}
          onBack={onLoginBackClick}
        />
      )}
      {!customer.customerId && (
        <>
          <div className={style.log_in_box}>
            <div style={{ overflow: 'auto' }}>
              <Nav>
                <NavItem active={navTab === 'P'} onClick={() => setNavTab('P')}>
                  {t('t258')}
                </NavItem>
                <NavItem active={navTab === 'G'} onClick={() => setNavTab('G')}>
                  {t('t259')}
                  <span style={{ fontSize: '0.8em', fontWeight: 500 }}>
                    {t('t260')}
                  </span>
                </NavItem>
              </Nav>
            </div>
            {navTab === 'P' && (
              <>
                {isCustomerLoading ? (
                  <div />
                ) : (
                  <NationSelect
                    nations={privateCustomer.filter((customer) =>
                      PRIVATE_SUPPORT_NATION.includes(customer.countryCode),
                    )}
                    onSelectNation={(nation, customerId) => {
                      setupCustomer(customerId)
                    }}
                  />
                )}
              </>
            )}
            {navTab === 'G' && (
              <CustomerSearch
                isShowEmpty={isGroupSearchEmpty}
                searchKeyword={groupKeyword}
                customers={groupSearchCustomers}
                onSearchCustomer={(keyword) => {
                  setGroupSearchEmpty(false)
                  groupSearch.fetch({
                    keyword,
                    callback: (data) => {
                      if (data.success) {
                        if (data.payload && data.payload.length > 0) {
                          setGroupSearchCustomers(data.payload)
                        } else {
                          setGroupSearchEmpty(true)
                        }
                        setGroupKeyword(keyword)
                      }
                    },
                  })
                }}
                onSelectCustomer={(customer) => {
                  setupCustomer(customer.customerId)
                }}
              />
            )}
          </div>
        </>
      )}
    </>
  )
}

function LoginFormWrapper({
  customerUse,
  title,
  onBack,
}: {
  customerUse: string
  title: string
  onBack?: () => void
}) {
  const header = onBack ? (
    <BackLink onClick={() => onBack()}>{title}</BackLink>
  ) : (
    <span
      style={{
        fontWeight: 500,
        fontSize: 'var(--text-d-1)',
        margin: 'var(--space-xxs)',
      }}>
      {title}
    </span>
  )
  return (
    <>
      {customerUse === 'Private' && <LoginFormPrivate customHeader={header} />}
      {customerUse === 'School' && <LoginFormSchool customHeader={header} />}
      {customerUse === 'Academy' && <LoginFormAcademy customHeader={header} />}
    </>
  )
}

function NationSelect({
  nations,
  onSelectNation,
}: {
  nations: SearchCustomerResponse
  onSelectNation?: (nation: string, customerId: string) => void
}) {
  const style = useStyle(STYLE_ID)
  // @language 'common'
  const { t } = useTranslation()

  const onSelectNationListener = (nation: string, customerId: string) => {
    onSelectNation && onSelectNation(nation, customerId)
  }

  const t261 = t('t261')

  return (
    <div className={style.country_selection}>
      {/* <div className={style.txt_sentence}>{t('t261')}</div> */}
      <div
        className={style.txt_sentence}
        dangerouslySetInnerHTML={{ __html: t261 }}></div>
      {nations.map((nation) => {
        return (
          <div
            key={`${nation.customerId}_${nation.name}`}
            className={style.item_country}
            onClick={() => {
              onSelectNationListener(nation.countryCode, nation.customerId)
            }}>
            {getNationLabel(nation.countryCode, nation.name)}
          </div>
        )
      })}
    </div>
  )
}

function CustomerSearch({
  isShowEmpty,
  searchKeyword,
  customers,
  onSearchCustomer,
  onSelectCustomer,
}: {
  isShowEmpty: boolean
  searchKeyword: string
  customers: SearchCustomerResponse
  onSearchCustomer?: (keyword: string) => void
  onSelectCustomer?: (customer: { customerId: string }) => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const [keyword, setKeyword] = useState(searchKeyword)
  return (
    <>
      <div className={style.group_member}>
        <TextField
          id={'customer-name'}
          hint={t('t262')}
          value={keyword}
          onTextChange={(text) => setKeyword(text)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter' && keyword) {
              onSearchCustomer && onSearchCustomer(keyword)
            }
          }}
        />
        <Button
          color={'red'}
          shadow
          onClick={() => {
            onSearchCustomer && onSearchCustomer(keyword)
          }}>
          {t('t263')}
        </Button>
        {isShowEmpty && <div style={{ color: 'gray' }}>{t('t264')}</div>}

        {!isShowEmpty && customers.length > 0 && (
          <div className={style.search_result_data}>
            <div className={style.txt_title}>{t('t265')}</div>
            {customers.map((customer) => {
              return (
                <Link
                  href={''}
                  key={customer.customerId}
                  onClick={() =>
                    onSelectCustomer && onSelectCustomer(customer)
                  }>
                  <div className={style.school_card_item}>
                    {`• ${customer.name}`}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
