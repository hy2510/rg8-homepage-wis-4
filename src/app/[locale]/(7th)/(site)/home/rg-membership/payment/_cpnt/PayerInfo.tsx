'use client'

import {
  useFetchModifySmsReceive,
  useFetchUpdatePhoneNumberCert,
  useFetchUpdatePhoneNumberRequest,
} from '@/7th/_client/store/student/info/hook'
import {
  useStudentInfo,
  useStudentInfoMainPhone,
} from '@/7th/_client/store/student/info/selector'
import { CheckBox } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import {
  BASE_TIME,
  useCountDown,
} from '@/7th/site/account/sign-up/_component/Signup'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'

export default function PayerInfo({
  STYLE_ID,
  isChangeUserInfo = false,
  onPolicyAgreeChange,
}: {
  STYLE_ID: string
  isChangeUserInfo?: boolean
  onPolicyAgreeChange?: (checked: boolean) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  const student = useStudentInfo()

  const [isCheckAgree, setCheckAgree] = useState(false)

  const [newPhone, setNewPhone] = useState<{
    isEdit: boolean
    phoneNumber: string
    requestValue: string
    authCode: string
    isInvalidAuthCode: boolean
  }>({
    isEdit: false,
    phoneNumber: '',
    requestValue: '',
    authCode: '',
    isInvalidAuthCode: false,
  })
  const userPhone = useStudentInfoMainPhone()
  const { timeText, reset, stop } = useCountDown({
    timeset: BASE_TIME,
    autoStart: false,
  })
  const { fetch: fetchChangePhoneNumber } = useFetchUpdatePhoneNumberRequest()
  const { fetch: fetchChangePhoneAuthCode } = useFetchUpdatePhoneNumberCert()

  const onPhoneNumberChangeMode = (isEdit: boolean) => {
    setNewPhone({
      isEdit,
      phoneNumber: '',
      requestValue: '',
      authCode: '',
      isInvalidAuthCode: false,
    })
  }

  const onRequestAuthCode = (phoneNumber: string) => {
    if (phoneNumber.length === 0) {
      alert(t('t620')) // 전화번호를 입력해 주세요.
      return
    }
    fetchChangePhoneNumber({
      phone: phoneNumber,
      callback: (isSuccess) => {
        if (isSuccess) {
          reset()
          setNewPhone({
            ...newPhone,
            phoneNumber,
            requestValue: phoneNumber,
            isInvalidAuthCode: false,
          })
        } else {
          alert(t('t621')) // 인증번호 요청에 실패하였습니다.
        }
      },
    })
  }

  const onValidateAuthCode = (phoneNumber: string, authCode: string) => {
    if (phoneNumber.length === 0 || phoneNumber !== newPhone.phoneNumber) {
      alert(t('t622')) // 인증번호를 다시 요청해주세요.
      return
    }
    fetchChangePhoneAuthCode({
      phone: phoneNumber,
      authCode,
      callback: (isSuccess) => {
        if (isSuccess) {
          onPhoneNumberChangeMode(false)
          alert(t('t623')) // 전화번호가 변경되었습니다.
        } else {
          setNewPhone({ ...newPhone, isInvalidAuthCode: true })
          alert(t('t624')) // 인증에 실패하였습니다.
        }
      },
    })
  }
  const isRequestedAuthCode =
    newPhone.phoneNumber.length > 0 &&
    newPhone.phoneNumber === newPhone.requestValue

  const isSmsReceive = student.smsStudyReportYn && student.smsEventInfomationYn
  const { fetch: fetchModifySmsAgree } = useFetchModifySmsReceive()
  const onChangeSmsReceive = (isReceive: boolean) => {
    if (!userPhone) {
      alert(t('t186'))
      return
    }
    fetchModifySmsAgree({
      isReceive,
      callback: (success) => {
        if (!success) {
          alert(t('t178'))
        } else {
          if (isReceive) {
            alert(t('t187'))
          } else {
            alert(t('t188'))
          }
        }
      },
    })
  }

  return (
    <div className={style.pay_info}>
      <div className={style.section_title}>
        {/* 구매자 정보 */}
        {t('t651')}
      </div>
      <div className={style.user_id}>
        <div className={style.txt_label}>
          {/* 회원 ID */}
          {t('t652')}
        </div>
        <div className={style.text_field}>{student.loginId}</div>
      </div>
      {isChangeUserInfo && (
        <>
          <div className={style.contact_info}>
            <div className={style.txt_label}>
              {/* 구매자 연락처 */}
              {t('t653')}
            </div>
            {userPhone && (
              <div className={style.text_field}>
                {/* <div className={style.select_front_number}>010<span className={style.arrow}></span></div> */}
                <div className={style.user_phone_number}>{userPhone}</div>
                {/* <input type="phone" placeholder="'-' 없이 숫자만 입력" /> */}
                <div
                  className={style.btn_link}
                  onClick={() => {
                    onPhoneNumberChangeMode(!newPhone.isEdit)
                  }}>
                  {/* 취소  변경 */}
                  {newPhone.isEdit ? t('t204') : t('t655')}
                </div>
              </div>
            )}
          </div>
          {(newPhone.isEdit || !userPhone) && (
            <>
              {/* 전화번호가 없는 경우 등록할 때 */}
              <div className={style.contact_info}>
                <div className={style.empty_space}></div>
                <div className={style.edit_space}>
                  <div className={style.text_field}>
                    {/* <div className={style.select_front_number}>010<span className={style.arrow}></span></div> */}
                    <input
                      type="phone"
                      placeholder={`${userPhone ? t('t656') : t('t657')} ${t('t658')}`} // 변경할 전화번호  연락받을 전화번호  (- 없이 입력)
                      onChange={(e) => {
                        setNewPhone({
                          ...newPhone,
                          phoneNumber: e.target.value,
                        })
                      }}
                      value={newPhone.phoneNumber}
                    />
                    <div
                      className={style.btn_link}
                      onClick={() => onRequestAuthCode(newPhone.phoneNumber)}>
                      {/* 인증번호 받기 */}
                      {t('t659')}
                    </div>
                  </div>
                  <div className={style.txt_message}>
                    {isRequestedAuthCode
                      ? ` * ${t('t628')}` // 입력한 전화번호로 인증번호를 발송했습니다.
                      : ''}
                  </div>
                </div>
              </div>

              {/* 인증번호 입력 */}
              {isRequestedAuthCode && (
                <div className={style.contact_info}>
                  <div className={style.empty_space}></div>
                  <div className={style.edit_space}>
                    <div className={style.text_field}>
                      {/* <div className={style.select_front_number}>010<span className={style.arrow}></span></div> */}
                      <input
                        type="phone"
                        placeholder={`${t('t661')} (${timeText})`} // 인증번호 입력
                        onChange={(e) => {
                          setNewPhone({ ...newPhone, authCode: e.target.value })
                        }}
                        value={newPhone.authCode}
                      />
                      <div
                        className={style.btn_link}
                        onClick={() =>
                          onValidateAuthCode(
                            newPhone.phoneNumber,
                            newPhone.authCode,
                          )
                        }>
                        {t('t728')}
                      </div>
                    </div>
                    <div className={style.txt_message}>
                      {newPhone.isInvalidAuthCode
                        ? ` * ${t('t630')}` // 입력한 인증번호가 정확하지 않습니다. 올바른 인증번호를 입력해 주세요.
                        : ''}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className={style.check_box}>
            <div className={style.empty_space}></div>
            <div
              className={style.check_item}
              onClick={() => {
                setCheckAgree(!isCheckAgree)
                onPolicyAgreeChange && onPolicyAgreeChange(!isCheckAgree)
              }}>
              <CheckBox check={isCheckAgree} />
              {/* 결제 정보 확인용 개인정보 수집 동의 (필수) */}
              {t('t663')}
            </div>
          </div>
          <div className={style.check_box}>
            <div className={style.empty_space}></div>
            <div
              className={style.check_item}
              onClick={() => {
                onChangeSmsReceive(!isSmsReceive)
              }}>
              <CheckBox check={isSmsReceive} />
              {/* 학습 리포트 및 소식 알림 동의 (선택) */}
              {t('t664')}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
