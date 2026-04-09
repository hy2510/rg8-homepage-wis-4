'use client'

import { useDevicePlatform } from '@/7th/__root/ApplicationContext'
import { useRefIframeHeight } from '@/7th/_app/IFrameWrapper'
import { useStudentIsLogin } from '@/7th/_client/store/student/info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { Button, Margin, Modal } from '@/7th/_ui/common/common-components'
import { useScreenMode } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  // @Language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  const [viewModal, _viewModal] = useState(false)
  const { iframeRef, onIframeLoad, height } = useRefIframeHeight()

  const router = useRouter()

  // MEMO : App 결제인 경우, 멤버쉽 소개 화면 보여주지 않음
  const [redirect, setRedirect] = useState<string>('')
  const platform = useDevicePlatform()
  const { country } = useSiteBlueprint()
  const isAppLaunch = platform === 'Android' || platform === 'iOS'
  const isLogin = useStudentIsLogin()

  useEffect(() => {
    if (redirect) {
      router.replace(redirect)
    }
  }, [redirect, router])

  if ((isAppLaunch || country.vietnam) && !redirect) {
    setRedirect(SITE_PATH.HOME.MEMBERSHIP_PAYMENT)
    return <></>
  }

  return (
    <div>
      <iframe
        width={'100%'}
        onLoad={onIframeLoad}
        frameBorder="0"
        scrolling="no"
        ref={iframeRef}
        src={
          isMobile
            ? '/src/html/page-contents/mobile/rg-membership/membership_01_info.html'
            : '/src/html/page-contents/pc/rg-membership/membership_01_info.html'
        }
        style={{
          backgroundColor: 'transparent',
          overflow: 'hidden',
          height: `${height + 20}px`,
        }}
      />
      {height > 0 && (
        <>
          <Margin height={20} />
          <div style={{ width: isMobile ? '100%' : '300px', margin: 'auto' }}>
            <Button
              shadow
              onClick={() => {
                viewModal ? _viewModal(false) : _viewModal(true)
              }}>
              {t('t333')}
            </Button>
          </div>
          {isMobile ? <></> : <Margin height={50} />}
          {viewModal && (
            <Modal
              header={true}
              title={''}
              compact={false}
              onClickDelete={() => {
                _viewModal(false)
              }}
              onClickLightbox={() => {
                _viewModal(false)
              }}>
              <iframe
                width={'100%'}
                frameBorder="0"
                scrolling="no"
                src={
                  isMobile
                    ? '/src/html/page-contents/mobile/rg-membership/membership_pop01.html'
                    : '/src/html/page-contents/pc/rg-membership/membership_pop01.html'
                }
                style={{
                  borderRadius: 15,
                  backgroundColor: 'transparent',
                  overflow: 'hidden',
                  height: '73vh',
                }}
              />
              <Margin height={20} />
              <div style={{ width: '300px', margin: 'auto' }}>
                <Button
                  shadow
                  onClick={() => {
                    if (isLogin) {
                      router.push(SITE_PATH.HOME.MEMBERSHIP_PAYMENT)
                    } else {
                      // 로그인이 안 된 상태에서만 실행
                      // 한국어 : 이용권 안내 로그인 또는 회원가입 후 이용 가능합니다. 로그인(회원가입) 하시겠습니까?
                      // 영어 : Access to the subscription information is available after logging in or signing up. Would you like to log in or sign up?
                      // 베트남어 : Thông tin về gói dịch vụ sẽ có sẵn sau khi bạn đăng nhập hoặc đăng ký tài khoản. Bạn có muốn đăng nhập hoặc đăng ký không?
                      if (
                        confirm(
                          '이용권 안내는 로그인 또는 회원가입 후 이용하실 수 있습니다. 로그인(회원가입)을 진행하시겠습니까?',
                        )
                      ) {
                        router.push(SITE_PATH.ACCOUNT.MAIN)
                      }
                    }
                  }}>
                  {t('t334')}
                </Button>
              </div>
              <Margin height={30} />
            </Modal>
          )}
        </>
      )}
    </div>
  )
}
