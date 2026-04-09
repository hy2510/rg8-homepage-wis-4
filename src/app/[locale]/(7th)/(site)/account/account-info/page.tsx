'use client'

import {
  useFetchChnagePassword,
  useFetchModifySmsReceive,
  useFetchUpdatePhoneNumberCert,
  useFetchUpdatePhoneNumberRequest,
  useFetchUpdateStudentName,
} from '@/7th/_client/store/student/info/hook'
import {
  useStudentInfo,
  useStudentInfoMainPhone,
} from '@/7th/_client/store/student/info/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { CheckBox, TextField } from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  BASE_TIME,
  isValidatePassword,
  isValidatePasswordVn,
  isValidateStudentName,
  isValidateStudentNameKr,
  useCountDown,
} from '../sign-up/_component/Signup'
import StreakViewMethod from './_cpnt/StreakViewMethod'
import StudySuspend from './_cpnt/StudySuspend'
import Withdraw from './_cpnt/Withdraw'

const STYLE_ID = 'page_account_info'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'
  const swingWebViewPlugin = (window as any).swingWebViewPlugin

  const { country, isPaymentable, paymentUrl, isShowStudyEndDay, studentOpen } =
    useSiteBlueprint()
  const {
    changeUserName: isChangeStudentName,
    userEmail: isShowUserEmail,
    phoneNumber: isShowPhoneNumber,
    reportSetting: isReportSetting,
    suspendSetting: isStudySuspendSetting,
    withdraw: isWithdraw,
    nameMaxLangth,
  } = studentOpen
  const student = useStudentInfo()

  const { fetch: fetchUpdateStudentName } = useFetchUpdateStudentName()
  const [newStudentName, setNewStudentName] = useState<{
    isEdit: boolean
    value: string
  }>({ isEdit: false, value: '' })
  const onChangeStudentName = (name: string) => {
    if (name.length === 0) {
      alert(t('t176'))
      return
    }
    if (country.korea) {
      if (!isValidateStudentNameKr(name)) {
        alert(t('t177'))
        return
      }
    } else {
      if (!isValidateStudentName(name)) {
        alert(t('t177'))
        return
      }
    }
    setNewStudentName({ isEdit: false, value: name })
    fetchUpdateStudentName({
      studentName: name,
      callback: (success) => {
        if (!success) {
          alert(t('t178'))
          setNewStudentName({ isEdit: true, value: name })
        } else {
          alert(t('t179'))
        }
      },
    })
  }

  const { fetch: fetchChangePassword } = useFetchChnagePassword()
  const [newPassword, setNewPassword] = useState<{
    isEdit: boolean
    oldValue: string
    newValue: string
  }>({ isEdit: false, oldValue: '', newValue: '' })
  const onChangePassword = (oldPassword: string, newPassword: string) => {
    if (oldPassword.length === 0) {
      alert(t('t180'))
      return
    }
    if (newPassword.length === 0) {
      alert(t('t181'))
      return
    }
    if (oldPassword === newPassword) {
      alert(t('t182'))
      return
    }
    if (country.korea && !isValidatePassword(newPassword)) {
      alert(t('t183', { num1: 8, num2: 20 }))
      return
    } else if (country.vietnam && !isValidatePasswordVn(newPassword)) {
      alert(t('t184', { num1: 8, num2: 20 }))
      return
    }
    setNewPassword({
      isEdit: false,
      oldValue: oldPassword,
      newValue: newPassword,
    })
    fetchChangePassword({
      oldPassword,
      newPassword,
      callback: (success) => {
        if (!success) {
          alert(t('t178'))
          setNewPassword({
            isEdit: true,
            oldValue: oldPassword,
            newValue: newPassword,
          })
        } else {
          alert(t('t185'))
          setNewPassword({ isEdit: false, oldValue: '', newValue: '' })
        }
      },
    })
  }

  const userName = student.name
  const userLoginId = student.loginId
  let userEmail = ''
  if (student.parentEmail) {
    userEmail = student.parentEmail
  } else if (student.studentEmail) {
    userEmail = student.studentEmail
  }
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

  let studyEndDate = ''
  if (student.studyEndDate) {
    let endDate: Date | undefined = undefined
    if (
      student.studyEndDate.length === 8 ||
      student.studyEndDate.length === 10
    ) {
      endDate = DateUtils.createDate(student.studyEndDate)
    }
    if (endDate) {
      endDate.setDate(endDate.getDate() - 1)
      studyEndDate = DateUtils.toStringDate(endDate, {
        divide: '.',
        digitfix: false,
      })
    }
  }

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
    <main className={`${style.account_info} container compact`}>
      <div className={style.heading}>{t('t189')}</div>
      <div className={style.contents}>
        {/* 회원 & 결제 정보 */}
        {isShowStudyEndDay && (
          <>
            {/* <div className={style.sub_title}>{t('t190')}</div> */}
            <div className={`${style.description} ${style.include_link}`}>
              <div className={style.lable_text}>
                {t('t191', { num: student.studyEndDay })}
              </div>
              <div className={style.lable_text}>
                {t('t192', { txt: studyEndDate })}
              </div>
              {isPaymentable && (
                <Link href={paymentUrl} className={style.link_text}>
                  {t('t193')}
                </Link>
              )}
            </div>
          </>
        )}
        {!isShowStudyEndDay && isPaymentable && (
          <>
            {/* <div className={style.sub_title}>{t('t190')}</div> */}
            <div className={`${style.description} ${style.include_link}`}>
              <Link href={paymentUrl} className={style.link_text}>
                {t('t193')}
              </Link>
            </div>
          </>
        )}
        <div className={style.form_box}>
          <EditTextField
            key={userName || undefined}
            hint={t('t080')}
            value={newStudentName.isEdit ? newStudentName.value : userName}
            editMessage={t('t194')}
            saveMessage={t('t195')}
            isEdit={newStudentName.isEdit}
            isDisableEdit={!isChangeStudentName}
            maxLength={nameMaxLangth}
            onConfirmEdit={(isEdit, text) => {
              if (!isEdit) {
                setNewStudentName({ isEdit: true, value: userName })
              } else {
                const name = text.trim()
                if (name && newStudentName.value !== name) {
                  onChangeStudentName(name)
                } else {
                  setNewStudentName({ isEdit: false, value: name })
                }
              }
            }}
          />
          {isShowUserEmail ? (
            <>
              {userLoginId === userEmail ? (
                <div>
                  <TextField hint={'ID(E-Mail)'} value={userEmail} disabled />
                </div>
              ) : (
                <>
                  <div>
                    <TextField hint={'ID'} value={userLoginId} disabled />
                  </div>
                  <div>
                    <TextField hint={'E-Mail'} value={userEmail} disabled />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div>
                <TextField hint={'ID'} value={userLoginId} disabled />
              </div>
            </>
          )}
          <EditChangePassword
            oldPassword={newPassword.oldValue}
            newPassword={newPassword.newValue}
            isEdit={newPassword.isEdit}
            onTextChange={(oldValue, newValue) => {
              setNewPassword({ ...newPassword, oldValue, newValue })
            }}
            onConfirmEdit={(oldValue, newValue) => {
              onChangePassword(oldValue, newValue)
            }}
            onModeChange={(isEdit) =>
              setNewPassword({ isEdit, oldValue: '', newValue: '' })
            }
          />

          {/* 전화번호가 있는 경우 */}
          {isShowPhoneNumber && (
            <EditChangePhoneNumber
              isEdit={newPhone.isEdit}
              phone={userPhone}
              newPhone={newPhone.phoneNumber}
              authCode={newPhone.authCode}
              authTime={timeText}
              isRequestedAuthCode={
                newPhone.phoneNumber.length > 0 &&
                newPhone.phoneNumber === newPhone.requestValue
              }
              isInvalidAuthCode={newPhone.isInvalidAuthCode}
              onRequestAuthCode={onRequestAuthCode}
              onRequestChangePhone={onValidateAuthCode}
              onTextChange={(phoneNumber, authCode) => {
                setNewPhone({ ...newPhone, phoneNumber, authCode })
              }}
              onModeChange={(isEdit) => {
                onPhoneNumberChangeMode(isEdit)
              }}
            />
          )}
          {/* 전화번호가 없는 경우 */}
        </div>
        {isReportSetting && (
          <div className={style.check}>
            {/* 전화번호가 없는 경우 체크박스를 눌렀을 때 경고창 출력: 학습 리포트, 소식 등 알림을 받으려면 수신할 휴대전화번호가 필요합니다. 연락처 칸에서 휴대전화번호를 등록해 주세요. [확인] */}
            <CheckBox
              check={isSmsReceive}
              onClick={() => {
                onChangeSmsReceive(!isSmsReceive)
              }}
            />
            <span
              onClick={() => {
                onChangeSmsReceive(!isSmsReceive)
              }}>
              {t('t198')}
            </span>
          </div>
        )}

        <div className={style.accordion_box}>
          {/* 연속학습 보기 설정 */}
          <AccordionItem headerContents={t('t625')}>
            <StreakViewMethod />
          </AccordionItem>
          {isStudySuspendSetting && (
            <AccordionItem headerContents={t('t200')}>
              <StudySuspend />
            </AccordionItem>
          )}
          {isWithdraw && (
            <AccordionItem headerContents={t('t201')}>
              <Withdraw />
            </AccordionItem>
          )}
        </div>
        {isMobile && (
          <div
            className={style.clear_cache_button}
            onClick={() => {
              if (
                confirm(
                  'Do you want to delete the account list and app usage history?',
                )
              ) {
                swingWebViewPlugin.app.webview.clearCache()
                alert('Requested task completed.')
              }
            }}>
            Clear Cache
          </div>
        )}
      </div>
    </main>
  )
}

// 수정하기 기능이 있는 텍스트 필드
const EditTextField = ({
  hint,
  value,
  editMessage,
  saveMessage,
  password,
  email,
  maxLength,
  isEdit,
  isDisableEdit,
  onConfirmEdit,
}: {
  hint?: string
  value?: string
  editMessage?: string
  saveMessage?: string
  password?: boolean
  email?: boolean
  maxLength?: number
  isEdit?: boolean
  isDisableEdit?: boolean
  onConfirmEdit?: (isEdit: boolean, text: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  const [text, setText] = useState(value)
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isEdit) {
      ref.current?.focus()
    }
  }, [isEdit])

  return (
    <div className={style.edit_text_field}>
      {!isDisableEdit && (
        <div
          className={style.btn_edit}
          onClick={() => {
            onConfirmEdit && onConfirmEdit(!!isEdit, text || '')
          }}>
          {!isEdit ? (
            <span className={style.text_blue}>{editMessage}</span>
          ) : (
            <span className={style.text_blue}>{saveMessage}</span>
          )}
        </div>
      )}
      <TextField
        ref={ref}
        hint={hint}
        value={text}
        disabled={!isEdit}
        password={password}
        email={email}
        maxLength={maxLength}
        onTextChange={(text) => {
          setText(text)
        }}
      />
    </div>
  )
}

// 비밀번호 변경하기
const EditChangePassword = ({
  oldPassword,
  newPassword,
  isEdit,
  onTextChange,
  onConfirmEdit,
  onModeChange,
}: {
  oldPassword?: string
  newPassword?: string
  isEdit?: boolean
  onTextChange?: (oldValue: string, newValue: string) => void
  onConfirmEdit?: (oldPassword: string, newPassword: string) => void
  onModeChange?: (isEdit: boolean) => void
}) => {
  const style = useStyle(STYLE_ID)

  //@language 'common'
  const { t } = useTranslation()

  const oldPwRef = useRef<HTMLInputElement>(null)
  const newPwRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEdit) {
      oldPwRef.current?.focus()
    }
  }, [isEdit])

  return (
    <div className={style.edit_change_password}>
      {!isEdit ? (
        <>
          <div
            className={style.btn_edit}
            onClick={() => {
              onModeChange && onModeChange(true)
            }}>
            <span className={style.text_blue}>{t('t194')}</span>
          </div>
          <TextField
            hint={t('t202')}
            value={'************'}
            disabled
            password
          />
        </>
      ) : (
        <div className={style.input_password}>
          <div className={style.row_1}>
            <TextField
              ref={oldPwRef}
              hint={t('t203')}
              password
              value={oldPassword}
              onTextChange={(text) => {
                onTextChange && onTextChange(text, newPassword || '')
              }}
            />
          </div>
          <div className={style.row_2}>
            <div className={style.btn_edit}>
              <div
                className={style.text_blue}
                onClick={() => {
                  onModeChange && onModeChange(false)
                }}>
                {t('t204')}
              </div>
              <div
                className={style.text_blue}
                onClick={() => {
                  onConfirmEdit &&
                    onConfirmEdit(oldPassword || '', newPassword || '')
                }}>
                {t('t097')}
              </div>
            </div>
            <TextField
              ref={newPwRef}
              hint={t('t205')}
              password
              value={newPassword}
              onTextChange={(text) => {
                onTextChange && onTextChange(oldPassword || '', text)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const EditChangePhoneNumber = ({
  phone,
  newPhone,
  authCode,
  authTime,
  isEdit,
  isRequestedAuthCode,
  isInvalidAuthCode,
  onRequestAuthCode,
  onRequestChangePhone,
  onModeChange,
  onTextChange,
}: {
  phone: string
  newPhone: string
  authCode: string
  authTime: string
  isEdit: boolean
  isRequestedAuthCode: boolean
  isInvalidAuthCode?: boolean
  onRequestAuthCode?: (phoneNumber: string) => void
  onRequestChangePhone?: (phoneNumber: string, authCode: string) => void
  onModeChange?: (isChange: boolean) => void
  onTextChange?: (newPhone: string, authCode: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const phoneRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isEdit) {
      phoneRef.current?.focus()
    }
  }, [isEdit])

  return (
    <div className={style.edit_change_phone}>
      {!isEdit ? (
        <>
          <div
            className={style.btn_edit}
            onClick={() => {
              onModeChange && onModeChange(true)
            }}>
            <span className={style.text_blue}>{t('t194')}</span>
          </div>
          <TextField hint={t('t196')} value={phone} disabled />
        </>
      ) : (
        <div className={style.input_phone}>
          <div>
            <div className={style.row_1}>
              <div className={style.btn_edit}>
                <div
                  className={style.text_blue}
                  onClick={() => {
                    onModeChange && onModeChange(false)
                  }}>
                  {t('t204')}
                </div>
                <div
                  className={style.text_blue}
                  onClick={() => {
                    onRequestAuthCode && onRequestAuthCode(newPhone || '')
                  }}>
                  {/* 인증번호 받기 */}
                  {t('t626')}
                </div>
              </div>
              <TextField
                ref={phoneRef}
                hint={t('t627')} // 전화번호 (- 없이 입력)
                value={newPhone}
                onTextChange={(text) => {
                  onTextChange && onTextChange(text, authCode || '')
                }}
              />
            </div>
            <div className={style.txt_message}>
              {isRequestedAuthCode
                ? `* ${t('t628')}` // 입력한 전화번호로 인증번호를 발송했습니다.
                : ''}
            </div>
          </div>
          {isRequestedAuthCode && (
            <div>
              <div className={style.row_2}>
                <div className={style.btn_edit}>
                  <div
                    className={style.text_blue}
                    onClick={() => {
                      onRequestChangePhone &&
                        onRequestChangePhone(newPhone, authCode)
                    }}>
                    {t('t728')}
                  </div>
                </div>
                <TextField
                  hint={`${t('t629')} (${authTime})`} // 인증번호
                  value={authCode}
                  onTextChange={(text) => {
                    onTextChange && onTextChange(newPhone || '', text)
                  }}
                />
              </div>
              <div className={style.txt_message}>
                {isInvalidAuthCode
                  ? ` * ${t('t630')}` // 입력한 인증번호가 정확하지 않습니다. 올바른 인증번호를 입력해 주세요.
                  : ''}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// 아코디언 아이템
const AccordionItem = ({
  headerContents,
  children,
}: {
  headerContents?: string
  children?: ReactNode
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.accordion_item}>
      <div className={style.header}>
        <div className={style.header_text}>{headerContents}</div>
        <div className={style.btn_toggle}>
          <Image
            alt=""
            src="/src/images/arrow-icons/chv_down.svg"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className={style.body_contents}>{children}</div>
    </div>
  )
}
