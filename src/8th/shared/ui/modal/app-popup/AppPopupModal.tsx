'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useStudent } from '@/8th/features/student/service/student-query'
import { useApplicationType } from '@/8th/shared/context/ApplicationContext'
import {
  useCustomerConfiguration,
  useCustomerInfo,
} from '@/8th/shared/context/CustomerContext'
import { useLockBodyScroll } from '@/8th/shared/context/ScrollLockContext'
import { BookInfoModalStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useAppPopupCheck } from './useAppPopupCheck'

export function AppPopupModal() {
  // @language 'common'
  const { i18n } = useTranslation()
  const language = i18n.language

  const pathname = usePathname()
  const { country, target } = useCustomerConfiguration()
  const { customerId } = useCustomerInfo()

  const { data: student } = useStudent()
  const loginStatus = student?.student?.studentId ? 'on' : 'off'

  const isApp = useApplicationType() === 'app'

  const { state, actions, popupImage } = useAppPopupCheck({
    isApp,
    pathname,
    language,
    country,
    loginStatus,
    target,
    customerId,
  })
  const { isShow, closeButtonText } = state
  const { handleClose, handleDontShowAgain } = actions

  // 모달이 표시될 때 body 스크롤 막기
  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isShow])
  useLockBodyScroll(isShow)

  if (!isShow) {
    return null
  }

  return (
    <BookInfoModalStyle>
      <BoxStyle
        width="100%"
        maxWidth="600px"
        maxHeight="calc(100vh - 20px)"
        margin="0 16px"
        backgroundColor="#fff"
        borderRadius="20px"
        overflow="hidden">
        <BoxStyle position="relative">
          <BoxStyle
            position="absolute"
            top={'20px'}
            right={'20px'}
            padding={'10px'}
            borderRadius={'40px'}
            width={'20px'}
            height={'20px'}
            backgroundColor={'#f0f0f0'}
            cursor={'pointer'}
            onClick={handleClose}>
            <Image
              src={Assets.Icon.deleteBlack}
              alt="close"
              width={20}
              height={20}
            />
          </BoxStyle>
          <BoxStyle
            width="100%"
            maxHeight={'calc(100vh - 92px)'}
            overflow={'auto'}>
            <Image
              src={popupImage}
              alt="앱 팝업"
              width={800}
              height={1200}
              unoptimized
              priority
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </BoxStyle>
        </BoxStyle>
        <BoxStyle
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'56px'}>
          <button
            onClick={handleDontShowAgain}
            style={{
              width: 'auto',
              padding: '10px 20px',
              borderRadius: '10px',
              color: '#666',
              border: 'solid 1px #e1e1e1',
              fontFamily: 'var(--font-family-secondary)',
              fontSize: 'var(--font-size-medium)',
            }}>
            {closeButtonText}
          </button>
        </BoxStyle>
      </BoxStyle>
    </BookInfoModalStyle>
  )
}
