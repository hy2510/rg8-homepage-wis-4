import {
  StudentEditCardButton,
  StudentEditCardButtonContainer,
  StudentEditCardStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useRef, useState } from 'react'
import { ReadOnlyTextField } from './StudentEditInputText'

export default function StudentEditInputPassword({
  readOnly,
  isEdit,
  onEdit,
  onSavePassword,
  onCancel,
}: {
  readOnly?: boolean
  isEdit?: boolean
  onEdit?: () => void
  onSavePassword?: (password: string, confirmPassword: string) => void
  onCancel?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  if (!isEdit) {
    return (
      <ReadOnlyTextField
        type={'password'}
        value={'********'}
        label={t('t8th100')}
        onEdit={readOnly ? undefined : onEdit}
      />
    )
  }
  return (
    <PasswordFieldEdit onSavePassword={onSavePassword} onCancel={onCancel} />
  )
}

function PasswordFieldEdit({
  onSavePassword,
  onCancel,
}: {
  onSavePassword?: (password: string, confirmPassword: string) => void
  onCancel?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const onSavePasswordClick = () => {
    if (onSavePassword) {
      onSavePassword(password, newPassword)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <StudentEditCardStyle>
        <TextStyle fontSize="small" fontFamily="sans" fontColor="secondary">
          {t('t8th102')}
        </TextStyle>
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('t8th115')}
        />
      </StudentEditCardStyle>
      <StudentEditCardStyle>
        <TextStyle fontSize="small" fontFamily="sans" fontColor="secondary">
          {t('t8th103')}
        </TextStyle>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder={t('t8th116')}
        />
        <StudentEditCardButtonContainer>
          <StudentEditCardButton className="save" onClick={onSavePasswordClick}>
            {t('t8th091')}
          </StudentEditCardButton>
          <StudentEditCardButton className="cancel" onClick={onCancel}>
            {t('t8th078')}
          </StudentEditCardButton>
        </StudentEditCardButtonContainer>
      </StudentEditCardStyle>
    </>
  )
}
