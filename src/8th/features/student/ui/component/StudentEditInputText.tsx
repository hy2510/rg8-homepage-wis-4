import {
  StudentEditCardButton,
  StudentEditCardButtonContainer,
  StudentEditCardStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useRef, useState } from 'react'

export default function StudentEditInputText({
  value,
  label,
  readOnly,
  isEdit,
  onEdit,
  onSave,
  onCancel,
}: {
  value: string
  label?: string
  readOnly?: boolean
  isEdit?: boolean
  onEdit?: () => void
  onSave?: (value: string) => void
  onCancel?: () => void
}) {
  if (!isEdit) {
    return (
      <ReadOnlyTextField
        type={'text'}
        value={value}
        label={label}
        onEdit={readOnly ? undefined : onEdit}
      />
    )
  }
  return (
    <TextFieldEdit
      value={value}
      label={label}
      onSave={onSave}
      onCancel={onCancel}
    />
  )
}

export function ReadOnlyTextField({
  type,
  value,
  label,
  onEdit,
}: {
  type: 'text' | 'password' | 'tel' | 'email'
  value: string
  label?: string
  onEdit?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const isEditable = !!onEdit

  return (
    <StudentEditCardStyle>
      {value && <div className="label">{label}</div>}
      <input type={type} value={value} disabled={true} placeholder={label} />
      <StudentEditCardButtonContainer>
        {isEditable && (
          <StudentEditCardButton className="edit" onClick={onEdit}>
            {t('t8th096')}
          </StudentEditCardButton>
        )}
      </StudentEditCardButtonContainer>
    </StudentEditCardStyle>
  )
}

function TextFieldEdit({
  value,
  label,
  placeholder,
  onSave,
  onCancel,
}: {
  value: string
  label?: string
  placeholder?: string
  onSave?: (value: string) => void
  onCancel?: () => void
}) {
  // @language 'common'
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)

  const [text, setText] = useState(value)

  const onSaveClick = () => {
    if (onSave) {
      onSave(text)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <StudentEditCardStyle>
      <div className="label">{label}</div>
      <input
        ref={inputRef}
        value={text}
        placeholder={placeholder || label}
        onChange={(e) => setText(e.target.value)}
      />
      <StudentEditCardButtonContainer>
        <>
          {value !== text && (
            <StudentEditCardButton className="save" onClick={onSaveClick}>
              {t('t8th091')}
            </StudentEditCardButton>
          )}
          <StudentEditCardButton className="cancel" onClick={onCancel}>
            {t('t8th078')}
          </StudentEditCardButton>
        </>
      </StudentEditCardButtonContainer>
    </StudentEditCardStyle>
  )
}
