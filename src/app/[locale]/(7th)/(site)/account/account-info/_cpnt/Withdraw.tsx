'use client'

import { deleteAccountGetResult } from '@/7th/_account/account-list'
import { useStudentHistory } from '@/7th/_client/store/student/history/selector'
import { useStudentInfo } from '@/7th/_client/store/student/info/selector'
import { useFetchStudentWithdraw } from '@/7th/_client/store/student/withdraw/hook'
import { useCustomerInfo } from '@/7th/_context/CustomerContext'
import { Modal } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

const STYLE_ID = 'page_account_info'

export default function Withdraw() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const { loading, fetch } = useFetchStudentWithdraw()
  const [isShowWithdrawPopup, setShowWithdrawPopup] = useState(false)

  const studentHistory = useStudentHistory().payload
  const { loginId, studyEndDay } = useStudentInfo()
  const { customerId } = useCustomerInfo()

  let isWithdrawOn = studentHistory.length === 0 && studyEndDay <= 0
  if (!isWithdrawOn) {
    const className =
      studentHistory.length === 0
        ? ''
        : studentHistory[0].className.toUpperCase()
    if (
      studentHistory.length === 1 &&
      (className.startsWith('신규회원') || className.startsWith('TRIAL'))
    ) {
      isWithdrawOn = true
    } else if (studyEndDay <= 0) {
      isWithdrawOn = true
    }
  }
  return (
    <div className={style.widthdraw}>
      {/* 회원 탈퇴 및 계정 삭제 */}
      <div
        className={style.btn_link}
        onClick={() => {
          if (isWithdrawOn) {
            setShowWithdrawPopup(true)
          } else {
            alert(
              t('t596'), // 잔여학습일이 남아있는 경우에는 회원탈퇴를 할 수 없습니다. 고객센터로 문의해주세요.
            )
          }
        }}>
        {t('t597')}
      </div>
      {isShowWithdrawPopup && (
        <WithdrawCauseModal
          onWithdrawClick={(memo: string) => {
            if (!loading) {
              fetch({
                cause: memo,
                callback: (isSuccess) => {
                  if (isSuccess) {
                    deleteAccountGetResult({ loginId, customerId })
                    alert(
                      t('t598'), // 회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.
                    )
                    router.replace('/signoff')
                  }
                },
              })
            }
          }}
          onCancelClick={() => setShowWithdrawPopup(false)}
        />
      )}
    </div>
  )
}

function WithdrawCauseModal({
  onWithdrawClick,
  onCancelClick,
}: {
  onWithdrawClick?: (memo: string) => void
  onCancelClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

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
      value: t('t599'), // 1:단순한 변심
    },
    {
      key: '2',
      value: t('t600'), // 2:기대에 미치지 못한 콘텐츠
    },
    {
      key: '3',
      value: t('t601'), // 3:타 사이트 유사 서비스 이용을 위해
    },
    {
      key: '4',
      value: t('t602'), // 4:잦은 서비스 오류 및 장애
    },
    {
      key: '5',
      value: t('t603'), // 5:불만족스러운 서비스
    },
    {
      key: '6',
      value: t('t604'), // 6:개인정보 변경을 위한 재가입
    },
    {
      key: '7',
      value: t('t605'), // 7:학습 동기의 저하
    },
    {
      key: '8',
      value: t('t606'), // 8:학습자의 환경변화 (학년 이동, 이사, 이민 등)
    },
    {
      key: '9',
      value: t('t607'), // 9:기타
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

  return (
    <Modal
      compact
      header
      title={t('t201')} // 회원 탈퇴
      onClickDelete={() => onCancelClick && onCancelClick()}
      onClickLightbox={() => onCancelClick && onCancelClick()}>
      <div className={style.withdraw_cause_modal}>
        {!isShowSafeInput ? (
          <>
            <div className={style.survey}>
              <div className={style.label}>
                {/* 탈퇴 사유 */}
                {t('t609')}
              </div>
              <select onChange={(e) => onCauseSelect(e.target.value)}>
                <option value={''}>
                  {/* 선택 */}
                  {t('t339')}
                </option>
                {withdrawCauseMap.map(({ key, value }) => {
                  return (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                })}
              </select>
            </div>
            {isOnEtcCause && (
              <div className={style.input_field}>
                <input
                  placeholder={t('t611')} // 기타 사유를 입력해주세요.
                  onChange={(e) => setEtcCause(e.target.value)}
                />
              </div>
            )}
            <div className={style.buttons}>
              <button
                disabled={!isWithdrawActive}
                className={style.btn_light}
                onClick={() => {
                  if (isWithdrawActive) {
                    setShowSafeInput(true)
                  }
                }}>
                {/* 탈퇴하기 */}
                {t('t612')}
              </button>
              <button
                className={style.btn_light}
                onClick={() => {
                  onCancelClick && onCancelClick()
                }}>
                {/* 취소 */}
                {t('t204')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={style.message_container}>
              <div>
                {/* 회원 탈퇴를 완료하려면 아래 보안 코드를 입력해 주세요. 회원 탈퇴가 완료되면 사용자의 계정과 학습 데이터가 영구적으로 삭제됩니다. 이 작업은 완료후 절대로 되돌릴 수 없습니다. */}
                ❗️{t('t614')}
              </div>
              <div>
                {/* 보안 코드 */}
                {t('t615')}: {saftNumber}
              </div>
              <div className={style.input_field}>
                <input
                  placeholder={t('t616')} // 화면에 보이는 보안코드를 입력해주세요.
                  onChange={(e) => setUserSafeNumber(e.target.value)}
                />
              </div>
              <div className={style.buttons}>
                <button
                  disabled={saftNumber !== userSafeNumber}
                  className={style.btn_light}
                  style={{
                    color: saftNumber === userSafeNumber ? 'red' : '',
                  }}
                  onClick={() => {
                    if (isWithdrawActive) {
                      const item = withdrawCauseMap.filter(
                        (item) => item.key === withdrawCause,
                      )[0]
                      const cause = `${t('t617')} : ${item.key !== '9' ? `${item.value}` : `${item.value}: ${etcCause}`}` //  사유

                      onWithdrawClick && onWithdrawClick(cause)
                    }
                  }}>
                  {/* 계정 영구 삭제 */}
                  {t('t618')}
                </button>
                <button
                  className={style.btn_light}
                  onClick={() => onCancelClick && onCancelClick()}>
                  {/* 취소 */}
                  {t('t204')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
