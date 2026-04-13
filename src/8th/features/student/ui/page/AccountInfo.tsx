'use client'

import { useAdjustHistoryList } from '@/8th/features/payment/service/payment-query'
import {
  useChangeContinuousStudyType,
  useContinuousStudy,
} from '@/8th/features/student/service/learning-query'
import {
  useChangePassword,
  useChangeSmsAgree,
  useChangeStudentName,
  useRegistPhoneNumberCertificate,
  useRegistPhoneNumberRequest,
  useStudent,
  useStudentHistoryList,
} from '@/8th/features/student/service/student-query'
import AccountSectionTabBar from '@/8th/features/student/ui/component/AccountSectionTabBar'
import ExtraOptionLayoutItem from '@/8th/features/student/ui/component/ExtraOptionLayoutItem'
import StudentEditInputPassword from '@/8th/features/student/ui/component/StudentEditInputPassword'
import StudentEditInputPhoneNumber from '@/8th/features/student/ui/component/StudentEditInputPhone'
import StudentEditInputText from '@/8th/features/student/ui/component/StudentEditInputText'
import StudyStatusView from '@/8th/features/student/ui/component/StudyStatusView'
import SuspendSettingModal from '@/8th/features/student/ui/modal/SuspendSettingModal'
import WithDrawModal from '@/8th/features/student/ui/modal/WithDrawModal'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { BASE_TIME, useCountDown } from '@/8th/shared/hook/useCountDown'
import { ExtraOptionLayoutStyle } from '@/8th/shared/styled/FeaturesStyled'
import CustomCheckbox from '@/8th/shared/ui/CustomCheckbox'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import {
  isValidatePassword,
  isValidateStudentName,
  isValidateStudentNameKr,
} from '@/8th/shared/utils/validation'
import { isUnlimitedStudyPeriod } from '@/8th/shared/utils/student-study-period'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import { Fragment, useEffect, useState } from 'react'

type editModeType =
  | 'studentName'
  | 'loginId'
  | 'email'
  | 'phoneNumber'
  | 'password'
  | undefined
export default function AccountInfo() {
  const { menu, setting, country } = useCustomerConfiguration()

  // @language 'common'
  const { t } = useTranslation()

  const { data } = useStudent()
  const studentHistory = useStudentHistoryList()
  const continuousStudyData = useContinuousStudy()
  const { data: suspendSettingData, isLoading: suspendSettingDataLoading } =
    useAdjustHistoryList()

  const [studentName, setStudentName] = useState({
    value: '',
    readOnly: false,
    isEdit: false,
  })
  const [loginId, setLoginId] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState({
    value: '',
    isEdit: false,
    isAuthCodeEnabled: false,
  })
  const [editMode, setEditMode] = useState<editModeType>(undefined)

  const [continuousViewType, setContinuousViewType] = useState<
    '6' | '7' | undefined
  >(undefined)

  const [isShowSuspendSettingModal, setShowSuspendSettingModal] =
    useState(false)
  const [isShowWithDrawModal, setShowWithDrawModal] = useState(false)

  const isSmsAgree =
    data?.student?.smsStudyReportYn && data?.student?.smsEventInfomationYn
  const onEditModeCancel = () => {
    setEditMode(undefined)
  }

  useEffect(() => {
    if (data?.student?.name && studentName.value !== data.student.name) {
      const newStudentName = {
        ...studentName,
        value: data.student.name,
      }
      setStudentName(newStudentName)
    }
  }, [data?.student?.name, studentName])

  useEffect(() => {
    if (data?.student?.loginId) {
      setLoginId(data.student.loginId)
    }
  }, [data?.student?.loginId])

  useEffect(() => {
    if (data?.student?.parentEmail) {
      setEmail(data.student.parentEmail)
    }
  }, [data?.student?.parentEmail])

  useEffect(() => {
    if (
      data?.student?.parentCellPhone &&
      phone.value !== data.student.parentCellPhone
    ) {
      const newPhone = {
        ...phone,
        value: data.student.parentCellPhone,
      }
      setPhone(newPhone)
    }
  }, [data?.student?.parentCellPhone, phone])

  useEffect(() => {
    if (
      continuousStudyData.data?.continuousViewType &&
      continuousViewType !== continuousStudyData.data.continuousViewType
    ) {
      setContinuousViewType(continuousStudyData.data.continuousViewType)
    }
  }, [continuousViewType, continuousStudyData?.data?.continuousViewType])

  const { isStudyEnd, value: studyState } = data?.studyState || {}

  let studyEndDate = ''
  if (data?.student?.studyEndDate) {
    let endDate: Date | undefined = undefined
    if (
      data?.student?.studyEndDate.length === 8 ||
      data?.student?.studyEndDate.length === 10
    ) {
      endDate = DateUtils.createDate(data?.student?.studyEndDate)
    }
    if (endDate) {
      endDate.setDate(endDate.getDate() - 1)
      studyEndDate = DateUtils.toStringDate(endDate, {
        divide: '.',
        digitfix: false,
      })
    }
  }

  const latestClassName =
    studentHistory.data?.list[0]?.className.toUpperCase() || undefined

  const isOpenExtraOption =
    menu.account.studentInfo.strekSetting.open ||
    menu.account.studentInfo.studyPause.open ||
    menu.account.studentInfo.withdraw.open

  const paymentUrl = setting.paymentable ? setting.paymentUrl : undefined
  return (
    <>
      <SubPageNavHeader
        title="Setting"
        parentPath={SITE_PATH.NW82.ACTIVITY}
      />
      <AccountSectionTabBar active="account" />
      <BoxStyle
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={20}>
        {menu.account.studentInfo.studyAvaliableDay.open &&
          !isUnlimitedStudyPeriod(
            data?.student?.studyEndDay || 0,
            data?.student?.studyEndDate,
          ) && (
            <StudyStatusView
              remainingStudyPeriod={data?.student?.studyEndDay || 0}
              endStudyDate={studyEndDate}
              paymentUrl={paymentUrl}
            />
          )}
        {menu.account.studentInfo.studentName.open && (
          <StudentName
            isKorea={country === 'kr'}
            studentName={studentName.value}
            readOnly={!menu.account.studentInfo.studentName.editable}
            isEditMode={editMode === 'studentName'}
            onEditModeStart={() => setEditMode('studentName')}
            onEditModeCancel={onEditModeCancel}
          />
        )}
        {menu.account.studentInfo.loginId.open && (
          <StudentEditInputText
            value={loginId}
            label={t('t8th098')}
            readOnly={true}
          />
        )}
        {menu.account.studentInfo.email.open && (
          <StudentEditInputText
            value={email}
            label={t('t8th099')}
            readOnly={true}
          />
        )}
        {menu.account.studentInfo.password.open && (
          <LoginPassword
            isEditMode={editMode === 'password'}
            onEditModeStart={() => setEditMode('password')}
            onEditModeCancel={onEditModeCancel}
          />
        )}
        {menu.account.studentInfo.phoneNumber.open && (
          <PhoneNumber
            phoneNumber={phone.value}
            readOnly={!menu.account.studentInfo.phoneNumber.editable}
            isEditMode={editMode === 'phoneNumber'}
            onEditModeStart={() => setEditMode('phoneNumber')}
            onEditModeCancel={onEditModeCancel}
          />
        )}

        {menu.account.studentInfo.smsNotice.open && (
          <CheckSmsAgreement isSmsAgree={isSmsAgree || false} />
        )}

        {isOpenExtraOption && (
          <ExtraOptionLayoutStyle>
            {menu.account.studentInfo.strekSetting.open &&
              continuousViewType && (
                <ContinuousStudyView
                  continuousViewType={continuousViewType as '6' | '7'}
                />
              )}
            {menu.account.studentInfo.studyPause.open &&
              !suspendSettingDataLoading && (
                <SuspendSetting
                  studyState={studyState}
                  isStudyEnd={isStudyEnd || false}
                  suspendHistory={suspendSettingData?.history || []}
                  latestClassName={latestClassName}
                  onShowSuspendSettingModal={() => {
                    setShowSuspendSettingModal(true)
                  }}
                />
              )}
            {/*  회원탈퇴기능 숨김 처리(이용권, 계정 관련은 7차에서만..) */}
            {menu.account.studentInfo.withdraw.open && (
              <Withdraw
                studyEndDay={data?.student?.studyEndDay || 0}
                studentHistoryLength={studentHistory.data?.list.length || 0}
                latestClassName={latestClassName}
                onShowWithDrawModal={() => {
                  setShowWithDrawModal(true)
                }}
              />
            )}
          </ExtraOptionLayoutStyle>
        )}

        {/* POPUP MODAL */}
        {isShowSuspendSettingModal && (
          <SuspendSettingModal
            currentPause={studyState === 'PAUSED'}
            onClickClose={() => {
              setShowSuspendSettingModal(false)
            }}
          />
        )}
        {isShowWithDrawModal && (
          <WithDrawModal
            onClickClose={() => {
              setShowWithDrawModal(false)
            }}
          />
        )}
      </BoxStyle>
    </>
  )
}

function StudentName({
  isKorea,
  studentName,
  readOnly,
  isEditMode,
  onEditModeStart,
  onEditModeCancel,
}: {
  isKorea: boolean
  studentName: string
  readOnly: boolean
  isEditMode: boolean
  onEditModeStart: () => void
  onEditModeCancel: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const { mutate: changeStudentName } = useChangeStudentName({
    onSuccess: (data, variables) => {
      alert(t('t8th108'))
      onEditModeCancel()
    },
  })

  const onChangeStudentName = (name: string) => {
    if (name.length === 0) {
      alert(t('t8th105'))
      return
    }
    if (isKorea) {
      if (!isValidateStudentNameKr(name)) {
        alert(t('t8th106'))
        return
      }
    } else {
      if (!isValidateStudentName(name)) {
        alert(t('t8th106'))
        return
      }
    }
    changeStudentName({ studentName: name })
  }

  return (
    <StudentEditInputText
      value={studentName}
      label={t('t8th097')}
      isEdit={isEditMode}
      onEdit={onEditModeStart}
      readOnly={readOnly}
      onSave={onChangeStudentName}
      onCancel={onEditModeCancel}
    />
  )
}

function PhoneNumber({
  phoneNumber,
  readOnly,
  isEditMode,
  onEditModeStart,
  onEditModeCancel,
}: {
  phoneNumber: string
  readOnly: boolean
  isEditMode: boolean
  onEditModeStart: () => void
  onEditModeCancel: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const { mutate: registPhoneNumberRequest } = useRegistPhoneNumberRequest({
    onSuccess: (data, variables) => {
      if (data.success) {
        alert(t('t8th128'))
        setAuthCodeEnabled(true)
        reset()
      } else {
        alert(t('t8th129'))
      }
    },
  })
  const { mutate: registPhoneNumberCertificate } =
    useRegistPhoneNumberCertificate({
      onSuccess: (data, variables) => {
        if (data.success) {
          alert(t('t8th132'))
          onEditModeCancel()
        } else {
          alert(t('t8th131'))
        }
      },
    })

  const { timeText, reset, stop } = useCountDown({
    timeset: BASE_TIME, // 10 minutes
    autoStart: false,
  })

  const onChangePhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length === 0) {
      alert(t('t8th134'))
      return
    }
    registPhoneNumberRequest({ phoneNumber })
  }

  const onChangePhoneNumberCertificate = (
    phoneNumber: string,
    authCode: string,
  ) => {
    if (authCode.length === 0) {
      alert(t('t8th131'))
      return
    }
    if (phoneNumber.length === 0) {
      alert(t('t8th130'))
      return
    }
    registPhoneNumberCertificate({ phoneNumber, authCode })
  }

  const [isAuthCodeEnabled, setAuthCodeEnabled] = useState(false)

  return (
    <StudentEditInputPhoneNumber
      value={phoneNumber}
      label={t('t8th101')}
      readOnly={readOnly}
      isEdit={isEditMode}
      onEdit={onEditModeStart}
      isAuthCodeEnabled={isAuthCodeEnabled}
      authCodeTimeText={timeText}
      onRequestAuthCode={onChangePhoneNumber}
      onResetAuthCode={() => {
        setAuthCodeEnabled(false)
      }}
      onSaveAuthCode={onChangePhoneNumberCertificate}
      onCancel={onEditModeCancel}
    />
  )
}

function LoginPassword({
  isEditMode,
  onEditModeStart,
  onEditModeCancel,
}: {
  isEditMode: boolean
  onEditModeStart: () => void
  onEditModeCancel: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const { mutate: changePassword } = useChangePassword({
    onError: (error, variables) => {
      const code = (error as unknown as { code: number }).code
      if (code === 1000) {
        alert(t('t8th107'))
      }
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        alert(t('t8th114'))
        onEditModeCancel()
      } else {
        alert(t('t8th107'))
      }
    },
  })

  const onChangePassword = (password: string, newPassword: string) => {
    if (password.length === 0) {
      alert(t('t8th109'))
      return
    }
    if (newPassword.length === 0) {
      alert(t('t8th110'))
      return
    }
    if (password === newPassword) {
      alert(t('t8th111'))
      return
    }
    if (!isValidatePassword(newPassword)) {
      alert(t('t8th112', { num1: 8, num2: 20 }))
      return
    }
    changePassword({ oldPassword: password, newPassword })
  }

  return (
    <StudentEditInputPassword
      isEdit={isEditMode}
      onEdit={onEditModeStart}
      onSavePassword={onChangePassword}
      onCancel={onEditModeCancel}
    />
  )
}

function CheckSmsAgreement({ isSmsAgree }: { isSmsAgree: boolean }) {
  // @language 'common'
  const { t } = useTranslation()

  const { mutate: changeSmsAgree } = useChangeSmsAgree({
    onSuccess: (data, variables) => {
      if (variables.isReceive) {
        alert(t('t8th124'))
      } else {
        alert(t('t8th125'))
      }
    },
  })

  const onChangeSmsAgree = (isAgree: boolean) => {
    if (isSmsAgree === isAgree) {
      return
    }
    changeSmsAgree({ isReceive: isAgree })
  }
  return (
    <BoxStyle padding="10px">
      <CustomCheckbox
        id="checkbox-sms-receive"
        checked={isSmsAgree}
        onChange={onChangeSmsAgree}
        label={t('t8th104')}
      />
    </BoxStyle>
  )
}

function ContinuousStudyView({
  continuousViewType,
}: {
  continuousViewType: '6' | '7'
}) {
  // @language 'common'
  const { t } = useTranslation()

  const { mutate: changeContinuousStudyType } = useChangeContinuousStudyType()

  const onChangeContinuousStudyType = (isChecked: boolean) => {
    changeContinuousStudyType({ viewType: isChecked ? '7' : '6' })
  }

  return (
    <ExtraOptionLayoutItem title={t('t8th135')}>
      <CustomCheckbox
        id="streak-award-view"
        checked={continuousViewType === '7'}
        label={t('t8th136')}
        onChange={onChangeContinuousStudyType}
      />
      <TextStyle fontFamily="sans" fontSize="medium" fontWeight={400}>
        {t('t8th137')}
      </TextStyle>
    </ExtraOptionLayoutItem>
  )
}

function SuspendSetting({
  studyState,
  isStudyEnd,
  suspendHistory,
  latestClassName,
  onShowSuspendSettingModal,
}: {
  suspendHistory: { startDate: string; endDate: string }[]
  onShowSuspendSettingModal: () => void
  latestClassName?: string
  studyState?: string
  isStudyEnd?: boolean
}) {
  // @language 'common'
  const { t } = useTranslation()

  let isSuspendPauseActive = false
  let suspendTitle = t('t8th139') // 학습 일시중지를 이용할 수 없습니다.
  if (studyState === 'PAUSED') {
    suspendTitle = t('t8th140') // 현재 일시중지 상태입니다.
  } else if (!isStudyEnd && studyState !== 'END' && suspendHistory.length < 3) {
    suspendTitle = t('t8th141') // 학습 일시중지가 가능합니다.
    isSuspendPauseActive = true
  }

  // TODO: STUDENT HISTORY 추가 후 수정 필요
  if (isSuspendPauseActive && latestClassName) {
    const exceptionCaseClass = [
      '신규회원반',
      '도치맘형제반',
      '에듀팡체험반',
      '서포터즈반',
      '채터스마케터반',
      '쑥쑥체험반',
      '도치맘체험반',
      'GS체험반',
      'CJ체험반',
      '셰익스피어공구반',
      '명예의전당',
      '명예의전당_W',
      'TRIAL',
    ]
    if (exceptionCaseClass.includes(latestClassName)) {
      isSuspendPauseActive = false
      suspendTitle = t('t8th142') // 무료체험 기간에는 학습 일시중지를 이용할 수 없습니다.
    }
  }

  const onRequestSuspendSettingShowModal = () => {
    let showModal = true

    if (studyState === 'PAUSED' && suspendHistory) {
      const historyLength = suspendHistory.length
      if (historyLength > 0) {
        const latestPause = suspendHistory[historyLength - 1]
        const nowDateString = DateUtils.toStringDate(new Date())
        if (
          nowDateString ===
          DateUtils.toStringDate(DateUtils.createDate(latestPause.startDate))
        ) {
          alert(t('t8th143'))
          showModal = false
        }
      }
    }
    if (showModal) {
      if (onShowSuspendSettingModal) {
        onShowSuspendSettingModal()
      }
    }
  }

  const suspendToolTipTexts = t('t8th147').split('\n')

  return (
    <ExtraOptionLayoutItem title={t('t8th138')}>
      <TextStyle fontFamily="sans" fontWeight={'bold'} fontSize="medium">
        {suspendTitle}
      </TextStyle>
      {suspendHistory.length > 0 && (
        <BoxStyle>
          <TextStyle fontFamily="sans" fontSize="medium" fontWeight={600}>
            {t('t8th175', { num: suspendHistory.length })}
          </TextStyle>
          {suspendHistory.map((item, idx) => {
            return (
              <TextStyle
                key={`${item.startDate}-${item.endDate}`}
                fontFamily="sans"
                fontSize="medium"
                fontWeight={600}>
                {`• ${idx + 1}${idx + 1 === 1 ? 'Time' : 'Times'}: ${DateUtils.toStringDate(DateUtils.createDate(item.startDate))} ~ ${DateUtils.toStringDate(DateUtils.createDate(item.endDate))}`}
              </TextStyle>
            )
          })}
        </BoxStyle>
      )}
      <TextStyle fontFamily="sans" fontSize="medium" fontWeight={400}>
        {suspendToolTipTexts.map((text) => {
          return (
            <Fragment key={text}>
              {text}
              <br />
            </Fragment>
          )
        })}
      </TextStyle>
      {isSuspendPauseActive && (
        <TextStyle
          fontFamily="sans"
          fontSize="medium"
          fontWeight={'bold'}
          fontColor="lightBlue"
          onClick={() => {
            onRequestSuspendSettingShowModal()
          }}>
          {t('t8th149')}
        </TextStyle>
      )}
      {studyState === 'PAUSED' && (
        <TextStyle
          fontFamily="sans"
          fontSize="medium"
          fontWeight={'bold'}
          fontColor="lightBlue"
          onClick={() => {
            onRequestSuspendSettingShowModal()
          }}>
          {t('t8th150')}
        </TextStyle>
      )}
    </ExtraOptionLayoutItem>
  )
}

function Withdraw({
  studyEndDay,
  studentHistoryLength,
  latestClassName,
  onShowWithDrawModal,
}: {
  studyEndDay: number
  studentHistoryLength: number
  latestClassName?: string
  onShowWithDrawModal?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  let isWithdrawOn = studentHistoryLength === 0 && studyEndDay <= 0
  if (!isWithdrawOn) {
    if (
      studentHistoryLength === 1 &&
      latestClassName &&
      (latestClassName.startsWith('신규회원') ||
        latestClassName.startsWith('TRIAL'))
    ) {
      isWithdrawOn = true
    } else if (studyEndDay <= 0) {
      isWithdrawOn = true
    }
  }
  const onWithDraw = () => {
    if (isWithdrawOn) {
      if (onShowWithDrawModal) {
        onShowWithDrawModal()
      }
    } else {
      alert(t('t8th154')) // 잔여학습일이 남아있는 경우에는 회원탈퇴를 할 수 없습니다. 고객센터로 문의해주세요.
    }
  }

  return (
    <ExtraOptionLayoutItem title={t('t8th174')}>
      <TextStyle
        fontFamily="sans"
        fontWeight={'bold'}
        fontColor="secondary"
        fontSize="medium"
        onClick={onWithDraw}>
        {t('t8th155')}
      </TextStyle>
    </ExtraOptionLayoutItem>
  )
}
