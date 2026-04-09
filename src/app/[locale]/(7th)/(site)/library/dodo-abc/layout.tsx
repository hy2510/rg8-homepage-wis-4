import { BackLink, Margin } from '@/7th/_ui/common/common-components'
import SITE_PATH from '@/app/site-path'
import React from 'react'

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="pd-top-m"></div>
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        DODO ABC
      </BackLink>
      <Margin height={5} />
      {children}
    </>
  )
}
