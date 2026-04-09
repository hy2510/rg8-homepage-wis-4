'use client'

import styles from './AppPopupModal.module.scss'
import { useApplicationType } from '@/7th/__root/ApplicationContext'
import { useStudentInfoFlagLogin } from '@/7th/_client/store/student/info/selector'
import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/7th/_context/CustomerContext'
import { useAppPopupCheck } from '@/8th/shared/ui/modal/app-popup/useAppPopupCheck'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function AppPopupModal() {
  // @language 'common'
  const { i18n } = useTranslation()
  const language = i18n.language

  const pathname = usePathname()
  const { country, target } = useSiteBlueprint()
  let contryEval: 'kr' | 'vn' | 'ca' | 'id' = 'kr'
  if (country.vietnam) {
    contryEval = 'vn'
  } else if (country.indonesia) {
    contryEval = 'id'
  } else if (country.canada) {
    contryEval = 'ca'
  }
  let targetEval: 'private' | 'school' | 'academy' = 'private'
  if (target.school) {
    targetEval = 'school'
  } else if (target.academy) {
    targetEval = 'academy'
  }
  const { customerId } = useCustomerInfo()

  const loginStatus = useStudentInfoFlagLogin()

  const isApp = useApplicationType() === 'app'

  const { state, actions, popupImage } = useAppPopupCheck({
    isApp,
    pathname,
    language,
    country: contryEval,
    loginStatus: loginStatus === 'on' ? 'on' : 'off',
    target: targetEval,
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

  if (!isShow) {
    return null
  }

  return (
    <div className={styles.popup_overlay} onClick={handleClose}>
      <div
        className={styles.popup_container}
        onClick={(e) => e.stopPropagation()}>
        <button className={styles.btn_close} onClick={handleClose}>
          ×
        </button>
        <div className={styles.image_wrapper}>
          <Image
            src={popupImage}
            alt="앱 팝업"
            width={800}
            height={1200}
            className={styles.popup_image}
            unoptimized
            priority
          />
        </div>
        <div className={styles.button_wrapper}>
          <button
            className={styles.btn_dont_show}
            onClick={handleDontShowAgain}>
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}
