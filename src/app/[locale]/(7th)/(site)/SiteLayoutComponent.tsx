'use client'

import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/7th/_context/CustomerContext'
import { useThemeColor } from '@/7th/_ui/context/StyleContext'
import Image from 'next/image'
import Link from 'next/link'
import ChangeGroupClassController from './_header/ChangeGroupClassController'
import Gfooter from './_header/GFooter'
import Gheader from './_header/Gheader'
import { AppPopupModal } from './_header/app-popup-modal/AppPopupModal'
import useConnectRefreshToken from './useConnectRefreshToken'

export default function SiteLayoutComponent({
  children,
}: {
  children?: React.ReactNode
}) {
  useConnectRefreshToken()

  const themeColor = useThemeColor()

  const { customerId, useYn } = useCustomerInfo()
  const isSiteBlocked = customerId && !useYn

  return (
    <>
      <meta name="theme-color" content={themeColor} />
      {!isSiteBlocked ? (
        <>
          <ChangeGroupClassController>
            <Gheader />
            {children}
            <Gfooter />
            <AppPopupModal />
          </ChangeGroupClassController>
        </>
      ) : (
        <SiteBlocked />
      )}
    </>
  )
}

function SiteBlocked() {
  const { target } = useSiteBlueprint()
  if (target.school) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Link href={'https://readinggate.com/'}>
          <Image
            src="https://wcfresource.a1edu.com/newsystem/image/closeschool.png"
            width={700}
            height={700}
            style={{
              backgroundColor: '#f0f0f0',
              width: '100%',
              height: 'auto',
              maxWidth: '700px',
            }}
            alt=""
          />
        </Link>
      </div>
    )
  }
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}>
      <Image
        src="/src/images/@home/logo_color_full.svg"
        width={280}
        height={40}
        style={{ width: '100%', height: 'auto', maxWidth: '280px' }}
        alt=""
      />
      <div
        style={{
          fontSize: '1.4em',
          marginBottom: '40px',
          textAlign: 'center',
        }}>
        본 사이트는 계약 종료로 인해 사용이 중지 되었습니다.
      </div>
    </div>
  )
}
