'use client'

import {
  useStudentInfo,
  useStudentIsLogin,
  useStudentStudyable,
} from '@/7th/_client/store/student/info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { AlertBar } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { ReactNode } from 'react'
import { HomeContextProvider } from './_cpnt/HomeContext'

const STYLE_ID = 'page_home'

export default function Layout({ children }: { children?: ReactNode }) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  const isLogin = useStudentIsLogin()
  const { studyEndDay } = useStudentInfo()
  const {
    isStudyEnd,
    studyEndMessage,
    value: studyState,
  } = useStudentStudyable()
  const {
    target,
    isShowStudyEndInform: isOnStudyEndInform,
    isPaymentable,
    paymentUrl,
  } = useSiteBlueprint()

  let paymentMessage = ''
  if (isStudyEnd) {
    if (studyState === 'NEED_PAYMENT' || studyState === 'PAUSED') {
      paymentMessage = studyEndMessage
    } else {
      paymentMessage = t('t322')
    }
  } else if (isOnStudyEndInform && studyEndDay <= 7) {
    paymentMessage = t('t323', { num: studyEndDay })
  }

  return (
    <HomeContextProvider>
      <div className={style.home}>
        <div className="container" style={{ paddingBottom: 0, paddingTop: 0 }}>
          {isLogin && paymentMessage && (
            <>
              <div style={{ paddingTop: '15px' }}></div>
              <AlertBar>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    color: 'red',
                  }}>
                  <div>{paymentMessage}</div>
                  {target.private &&
                    isPaymentable &&
                    studyState !== 'PAUSED' && (
                      <div>
                        <Link href={paymentUrl}>
                          <b>{t('t193')}</b>
                        </Link>
                      </div>
                    )}
                  {!target.private &&
                    isPaymentable &&
                    studyState === 'NEED_PAYMENT' && (
                      <div>
                        <Link href={paymentUrl}>
                          <b>{t('t193')}</b>
                        </Link>
                      </div>
                    )}
                  {studyState === 'PAUSED' && (
                    <div>
                      <Link href={SITE_PATH.ACCOUNT.INFO}>
                        <b>
                          {/* 일시중지 해제 */}
                          {t('t590')}
                        </b>
                      </Link>
                    </div>
                  )}
                </div>
              </AlertBar>
            </>
          )}
        </div>
        {children}
      </div>
    </HomeContextProvider>
  )
}
