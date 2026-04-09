'use client'

import { useFetchSearchCustomer } from '@/7th/_client/store/customer/search/hook'
import { SearchCustomerResponse } from '@/7th/_repository/client/customer/search-customer'
import { Button, TextField } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useState } from 'react'

const STYLE_ID = 'page_group_search'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()
  const groupSearch = useFetchSearchCustomer()

  const [isGroupSearchEmpty, setGroupSearchEmpty] = useState(false)
  const [groupKeyword, setGroupKeyword] = useState('')
  const [groupSearchCustomers, setGroupSearchCustomers] =
    useState<SearchCustomerResponse>([])

  const onSearchClick = () => {
    if (!groupKeyword) {
      return
    }
    groupSearch.fetch({
      keyword: groupKeyword,
      callback: (data) => {
        if (data.success) {
          if (data.payload && data.payload.length > 0) {
            setGroupSearchEmpty(false)
            setGroupSearchCustomers(data.payload)
          } else {
            setGroupSearchEmpty(true)
          }
          setGroupKeyword(groupKeyword)
        }
      },
    })
  }

  return (
    <main className={style.sign_in}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>
      <div className={style.group_search_box}>
        <div className={style.txt_title}>{t('t259') + ' ' + t('t231')}</div>
        <TextField
          onTextChange={(text) => setGroupKeyword(text)}
          value={groupKeyword}
          hint={t('t262')}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter' && groupKeyword) {
              onSearchClick()
            }
          }}
        />
        <Button color={'red'} onClick={() => onSearchClick()} shadow>
          {t('t263')}
        </Button>
        {isGroupSearchEmpty ? (
          <div>{t('t264')}</div>
        ) : (
          groupSearchCustomers.map((customer) => {
            return (
              <a
                key={customer.customerId}
                href={customer.homepageUrl}
                target="_blank">
                <div className={style.school_card_item}>
                  {`• ${customer.name}`}
                </div>
              </a>
            )
          })
        )}
      </div>
      <div className={style.link}>
        <Link href="/account/account-list">{t('t256')}</Link>
      </div>
    </main>
  )
}
