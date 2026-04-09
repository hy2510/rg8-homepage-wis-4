'use client'

import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import { ForwardedRef, forwardRef, useRef, useState } from 'react'

const CODE_PATTERN = /^[0-9a-zA-Z]{16}$/

export default function TicketInput({
  STYLE_ID,
  defaultValue,
  onChange,
}: {
  STYLE_ID: string
  defaultValue?: string[]
  onChange?: (values: string[]) => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(4).fill(null))
  const [code, setCode] = useState<string[]>(
    defaultValue && defaultValue.length >= 4
      ? defaultValue.filter((_, idx) => idx < 4)
      : new Array(4).fill(''),
  )

  const onKeyBackspace = (idx: number, text: string) => {
    if (idx > 0 && text === '') {
      inputRefs.current[idx - 1]?.focus()
    }
  }

  const onCodeRectify = (idx: number, text: string) => {
    const inText = text
      .trim()
      .toUpperCase()
      .replace(/[^0-9a-zA-Z]/g, '')

    const newCode: string[] = []
    let currentCodeSize = 0
    code.forEach((c) => {
      currentCodeSize += c.length
    })
    if (currentCodeSize === 0 && CODE_PATTERN.test(inText)) {
      if (inText.length === 16) {
        for (let i = 0; i < 4; i++) {
          newCode.push(inText.substring(i * 4, i * 4 + 4))
        }
      } else {
        newCode.push(...inText.split('-'))
      }
      inputRefs.current[idx]?.blur()
    } else {
      newCode.push(...code)
      newCode[idx] = inText.length > 4 ? inText.substring(0, 4) : inText

      if (newCode[idx].length === 4) {
        let nextId = -1
        for (let i = 0; i < code.length; i++) {
          if (i !== idx && newCode[i].length < 4) {
            nextId = i
            break
          }
        }
        if (nextId >= 0 && nextId < inputRefs.current.length) {
          inputRefs.current[nextId]?.focus()
        }
      }
    }
    setCode(newCode)
    onChange && onChange(newCode)
  }

  return (
    <div className={style.blanks}>
      {code.map((code, idx) => {
        return (
          <TicketTextField
            STYLE_ID={STYLE_ID}
            key={`input_${idx}`}
            ref={(ref) => {
              inputRefs.current[idx] = ref
            }}
            onChange={(text) => {
              onCodeRectify(idx, text)
            }}
            onKeyDown={(key) => {
              if (key.length === 1) {
                const pp = /[^0-9a-zA-Z]/
                if (pp.test(key)) {
                  alert(t('t729')) // 알파벳과 숫자만 입력 가능합니다.
                  return
                }
              }
              if (key === 'Backspace') {
                onKeyBackspace(idx, code)
              }
            }}
            value={code}
          />
        )
      })}
    </div>
  )
}

const TicketTextField = forwardRef(function (
  {
    STYLE_ID,
    value,
    onChange,
    onKeyDown,
  }: {
    STYLE_ID: string
    value?: string
    onChange?: (text: string) => void
    onKeyDown?: (key: string) => void
  },
  ref: ForwardedRef<HTMLInputElement | null>,
) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={`${style.text_field}`}>
      <input
        ref={ref}
        type="text"
        placeholder={``}
        onKeyDown={(e) => {
          onKeyDown && onKeyDown(e.key)
        }}
        onChange={(e) => {
          onChange && onChange(e.target.value)
        }}
        value={value}
      />
    </div>
  )
})
TicketTextField.displayName = 'TicketTextField'
