'use client'

import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import { useFetchStudentWithdraw } from '@/app/[locale]/(7th)/_client/store/student/withdraw/hook'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function WithDrawModal({
  onClickClose,
}: {
  onClickClose?: () => void
}) {
  const maketingEventTracker = useTrack()

  // @language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const { fetch: fetchStudentWithdraw, loading: withdrawLoading } =
    useFetchStudentWithdraw()

  const [withdrawCause, setWithdrawCause] = useState('')
  const [isOnEtcCause, setOnEtcCause] = useState(false)
  const [etcCause, setEtcCause] = useState('')
  const [isShowSafeInput, setShowSafeInput] = useState(false)
  const [userSafeNumber, setUserSafeNumber] = useState('')

  const saftNumber = useMemo(() => {
    return Math.ceil(Math.random() * 8999 + 1000).toString()
  }, [])

  const withdrawCauseMap: { key: string; value: string }[] = [
    {
      key: '1',
      value: t('t8th157'), // 1:단순한 변심
    },
    {
      key: '2',
      value: t('t8th158'), // 2:기대에 미치지 못한 콘텐츠
    },
    {
      key: '3',
      value: t('t8th159'), // 3:타 사이트 유사 서비스 이용을 위해
    },
    {
      key: '4',
      value: t('t8th160'), // 4:잦은 서비스 오류 및 장애
    },
    {
      key: '5',
      value: t('t8th161'), // 5:불만족스러운 서비스
    },
    {
      key: '6',
      value: t('t8th162'), // 6:개인정보 변경을 위한 재가입
    },
    {
      key: '7',
      value: t('t8th163'), // 7:학습 동기의 저하
    },
    {
      key: '8',
      value: t('t8th164'), // 8:학습자의 환경변화 (학년 이동, 이사, 이민 등)
    },
    {
      key: '9',
      value: t('t8th165'), // 9:기타
    },
  ]
  const onCauseSelect = (key: string) => {
    const selected = withdrawCauseMap.filter((item) => item.key === key)
    if (selected.length === 1) {
      setWithdrawCause(selected[0].key)
      setEtcCause('')
      if (selected[0].key !== '9') {
        setOnEtcCause(false)
      } else {
        setOnEtcCause(true)
      }
    } else {
      setWithdrawCause('')
    }
  }

  const isWithdrawActive =
    !!withdrawCause && (withdrawCause !== '9' || !!etcCause)

  const onWithdraw = () => {
    if (isWithdrawActive && saftNumber === userSafeNumber) {
      const item = withdrawCauseMap.filter(
        (item) => item.key === withdrawCause,
      )[0]
      const cause = `${t('t8th172')} : ${item.key !== '9' ? `${item.value}` : `${item.value}: ${etcCause}`}` //  사유

      fetchStudentWithdraw({
        cause: cause,
        callback: (isSuccess) => {
          if (isSuccess) {
            maketingEventTracker.eventAction('탈퇴', {
              version: '8th',
              deactivation_reason: cause,
            })
            router.replace('/signoff')
          }
        },
      })
      // alert('delete ' + cause)
    }
  }

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">{t('t8th155')}</div>
        <div className="btn-close" onClick={onClickClose} />
      </ModalHeaderStyle>
      {!isShowSafeInput && (
        <ModalBodyStyle>
          <BoxStyle display="flex" flexWrap="wrap" gap={20}>
            <TextStyle
              fontSize="large"
              fontColor="primary"
              fontFamily="sans"
              fontWeight={700}>
              {t('t8th166')}
            </TextStyle>
          </BoxStyle>
          <BoxStyle
            display="flex"
            flexWrap="wrap"
            flexDirection="column"
            gap={20}
            margin="20px 0 0 0">
            <select onChange={(e) => onCauseSelect(e.target.value)}>
              <option value={''}>
                {/* 선택 */}
                {t('t8th176')}
              </option>
              {withdrawCauseMap.map(({ key, value }) => {
                return (
                  <option
                    key={key}
                    value={key}
                    style={{ fontFamily: 'system-ui' }}>
                    {value}
                  </option>
                )
              })}
            </select>
            <div style={{ height: '18px' }}>
              {isOnEtcCause && (
                <input
                  placeholder={t('t8th167')} // 기타 사유를 입력해주세요.
                  onChange={(e) => setEtcCause(e.target.value)}
                />
              )}
            </div>
          </BoxStyle>
          <BoxStyle display="flex" flexWrap="wrap" gap={20} margin="60px 0 0 0">
            <div
              style={{
                color: isWithdrawActive
                  ? 'var(--color-red-strong)'
                  : 'var(--font-color-secondary)',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (isWithdrawActive) {
                  setShowSafeInput(true)
                }
              }}>
              {t('t8th168')}
            </div>
            <div
              style={{
                color: 'var(--font-color-secondary)',
                cursor: 'pointer',
              }}
              onClick={onClickClose}>
              cancel
            </div>
          </BoxStyle>
        </ModalBodyStyle>
      )}
      {isShowSafeInput && (
        <ModalBodyStyle>
          <BoxStyle
            display="flex"
            flexWrap="wrap"
            flexDirection="column"
            gap={20}>
            <TextStyle fontSize="medium" fontColor="primary" fontFamily="sans">
              {/* 회원 탈퇴를 완료하려면 아래 보안 코드를 입력해 주세요. 회원 탈퇴가 완료되면 사용자의 계정과 학습 데이터가 영구적으로 삭제됩니다. 이 작업은 완료후 절대로 되돌릴 수 없습니다. */}
              ❗️{t('t8th169')}
            </TextStyle>
            <TextStyle fontSize="medium" fontColor="primary" fontFamily="sans">
              {/* 보안 코드 */}
              {t('t8th170')}: {saftNumber}
            </TextStyle>
            <BoxStyle>
              <input
                placeholder={t('t8th171')} // 화면에 보이는 보안코드를 입력해주세요.
                onChange={(e) => setUserSafeNumber(e.target.value)}
              />
            </BoxStyle>
          </BoxStyle>
          <BoxStyle display="flex" flexWrap="wrap" gap={20} margin="60px 0 0 0">
            <div
              style={{
                color:
                  saftNumber === userSafeNumber
                    ? 'var(--color-red-strong)'
                    : 'var(--font-color-secondary)',
                cursor: 'pointer',
              }}
              onClick={onWithdraw}>
              {t('t8th173')}
            </div>
            <div
              style={{
                color: 'var(--font-color-secondary)',
                cursor: 'pointer',
              }}
              onClick={onClickClose}>
              cancel
            </div>
          </BoxStyle>
        </ModalBodyStyle>
      )}
    </ModalContainer>
  )
}
