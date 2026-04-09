import {
  StudentEditCardButton,
  StudentEditCardButtonContainer,
  StudentEditCardStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useRef, useState } from 'react'
import { ReadOnlyTextField } from './StudentEditInputText'

export default function StudentEditInputPhoneNumber({
  value,
  label,
  readOnly,
  isEdit,
  isAuthCodeEnabled,
  authCodeTimeText,
  onEdit,
  onRequestAuthCode,
  onResetAuthCode,
  onSaveAuthCode,
  onCancel,
}: {
  value: string
  label?: string
  readOnly?: boolean
  isEdit?: boolean
  isAuthCodeEnabled?: boolean
  authCodeTimeText?: string
  onEdit?: () => void
  onRequestAuthCode?: (phoneNumber: string) => void
  onResetAuthCode?: () => void
  onSaveAuthCode?: (phoneNumber: string, authCode: string) => void
  onCancel?: () => void
}) {
  if (!isEdit) {
    return (
      <ReadOnlyTextField
        type={'tel'}
        value={value}
        label={label}
        onEdit={readOnly ? undefined : onEdit}
      />
    )
  }
  return (
    <PhoneNumberFieldEdit
      enableAuthCode={isAuthCodeEnabled}
      timeText={authCodeTimeText}
      onRequestAuthCode={onRequestAuthCode}
      onResetAuthCode={onResetAuthCode}
      onSaveAuthCode={onSaveAuthCode}
      onCancel={onCancel}
    />
  )
}

function PhoneNumberFieldEdit({
  timeText,
  enableAuthCode,
  onRequestAuthCode,
  onSaveAuthCode,
  onResetAuthCode,
  onCancel,
}: {
  enableAuthCode?: boolean
  timeText?: string
  onRequestAuthCode?: (phoneNumber: string) => void
  onResetAuthCode?: () => void
  onSaveAuthCode?: (phoneNumber: string, authCode: string) => void
  onCancel?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)
  const authCodeRef = useRef<HTMLInputElement>(null)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [requestPhoneNumber, setRequestPhoneNumber] = useState('')
  const [authCode, setAuthCode] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (enableAuthCode) {
      authCodeRef.current?.focus()
    } else {
      setRequestPhoneNumber('')
      setAuthCode('')
    }
  }, [enableAuthCode])

  const onRequestAuthCodeClick = () => {
    if (onRequestAuthCode) {
      onRequestAuthCode(phoneNumber)
    }
    setRequestPhoneNumber(requestPhoneNumber)
  }

  const onSaveAuthCodeClick = () => {
    if (onSaveAuthCode) {
      onSaveAuthCode(phoneNumber, authCode)
    }
  }

  const authCodeLabel = `${t('t8th127')} (${timeText})`

  return (
    <>
      <StudentEditCardStyle>
        <div className="label">{t('t8th133')}</div>
        <input
          ref={inputRef}
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value
            if (enableAuthCode) {
              if (onResetAuthCode) {
                onResetAuthCode()
              }
              setRequestPhoneNumber('')
            }
            setPhoneNumber(value)
          }}
          placeholder={t('t8th134')}
        />
        <StudentEditCardButtonContainer>
          <StudentEditCardButton
            className="save"
            onClick={onRequestAuthCodeClick}>
            {t('t8th126')}
          </StudentEditCardButton>
          <StudentEditCardButton className="cancel" onClick={onCancel}>
            {t('t8th078')}
          </StudentEditCardButton>
        </StudentEditCardButtonContainer>
      </StudentEditCardStyle>
      {enableAuthCode && (
        <>
          <TextStyle
            fontSize="medium"
            fontFamily="sans"
            fontColor="secondary"
            margin="0 10px">
            * {t('t8th128')}
          </TextStyle>
          <StudentEditCardStyle>
            {authCode && <div className="label">{authCodeLabel}</div>}
            <input
              ref={authCodeRef}
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder={authCodeLabel}
            />
            <StudentEditCardButtonContainer>
              <StudentEditCardButton
                className="save"
                onClick={onSaveAuthCodeClick}>
                {t('t8th091')}
              </StudentEditCardButton>
            </StudentEditCardButtonContainer>
          </StudentEditCardStyle>
        </>
      )}
    </>
  )
}
