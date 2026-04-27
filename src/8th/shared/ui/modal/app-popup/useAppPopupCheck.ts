'use client'

import { useEffect, useState } from 'react'
import popupImage from './app_popup.jpg'

const AppPopupData = {
  // localStorage에 저장하여 브라우저 캐시 삭제 시 함께 삭제되어 다시 노출됨
  STORAGE_KEY: 'app_popup_dismissed',
  // 팝업 ID, 다시 안나오도록 하는 구분 값
  POPUP_ID: '20260427',
  START_DATE: new Date('2026-04-27'),
  END_DATE: new Date('2026-05-12'),
  // 제외할 고객사 ID 리스트
  EXCLUDE_CUSTOMER_IDS: [
    // '002410',
    // '001521',
    // '002376',
    // '002269',
    // '002459',
    // '001388',
    // '000902',
    // '001754',
    // '002453',
    // '001523',
    // '000171',
    // '000928',
    // '001934',
  ],
  // 팝업 이미지
  POPUP_IMAGE: popupImage,
  POPUP_IMAGE_VN: popupImage,
}
// 하루 끝까지 포함
AppPopupData.END_DATE.setHours(23, 59, 59, 999)

export function useAppPopupCheck({
  isApp,
  pathname,
  language,
  country,
  loginStatus,
  target,
  customerId = '',
}: {
  isApp: boolean
  pathname: string
  language: 'ko' | 'en' | 'vi' | string
  country: 'kr' | 'vn' | 'ca' | 'id'
  loginStatus: 'on' | 'off'
  target: 'academy' | 'school' | 'private'
  customerId?: string
}) {
  const [isVisible, setVisible] = useState(false)
  const [isShow, setShow] = useState(false)

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return
    if (isVisible) return

    // 한국 이외의 고객사 제외
    if (country !== 'kr') {
      return
    }

    // 앱이 아닌 경우 제외
    if (!isApp) {
      return
    }

    // 앱 타입인 경우 로그인 상태 체크
    if (isApp && loginStatus !== 'on') {
      return
    }

    // 학원 제외
    if (target === 'academy') {
      // return
    }

    // 고객사 제외 체크 (학교 아니면서 방과 후 아닌 곳)
    // if (
    //   target === 'school' &&
    //   AppPopupData.EXCLUDE_CUSTOMER_IDS.includes(customerId)
    // ) {
    //   return
    // }

    // 날짜 체크: START_DATE ~ END_DATE 사이인지 확인
    const now = new Date()
    if (now < AppPopupData.START_DATE || now > AppPopupData.END_DATE) {
      setVisible(true)
      return
    }

    // localStorage(브라우저 캐시)에서 "다시보지 않기" 체크
    const isDismissed =
      localStorage.getItem(AppPopupData.STORAGE_KEY) === AppPopupData.POPUP_ID
    if (isDismissed) {
      setVisible(true)
      return
    }

    // 모든 조건을 만족하면 모달 표시
    setShow(true)
  }, [pathname, isVisible, isApp, loginStatus, country, customerId, target])

  const handleClose = () => {
    setShow(false)
    setVisible(true)
  }

  const handleDontShowAgain = () => {
    localStorage.setItem(AppPopupData.STORAGE_KEY, AppPopupData.POPUP_ID)
    handleClose()
  }

  const popupImage =
    country === 'vn' ? AppPopupData.POPUP_IMAGE_VN : AppPopupData.POPUP_IMAGE

  const closeButtonText =
    language === 'ko' ? '다시보지 않기' : "Don't show again"

  return {
    state: {
      isVisible,
      isShow,
      closeButtonText,
    },
    actions: {
      setVisible,
      setShow,
      handleClose,
      handleDontShowAgain,
    },
    popupImage,
  }
}
