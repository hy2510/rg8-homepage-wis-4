'use client'

import {
  Button,
  CheckBox,
  SelectBox,
  SelectBoxItem,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import { VIETNAMESE } from '@/localization/localize-config'
import { useState } from 'react'

const STYLE_ID = 'book_cover'

type TypeDefinition1Value = 'kor' | 'chi' | 'jap' | 'vtn' | 'ine'
export type VocabularyOption = {
  vocabulary: boolean
  definition1: boolean
  definition1Value?: TypeDefinition1Value
  definition2: boolean
  exampleSentence: boolean
  studentName: boolean
}

export default function VocaPrintOptions({
  visibleType = 'default',
  onClick,
  onCancel,
}: {
  visibleType?: 'default' | 'modal'
  onClick?: (option: VocabularyOption) => void
  onCancel?: () => void
}) {
  // @Language 'common'
  const { i18n } = useTranslation()

  let definition1DefaultValue: TypeDefinition1Value = 'kor'
  if (i18n.language === VIETNAMESE) {
    definition1DefaultValue = 'vtn'
  }

  const [vocabularyOption, setVocabularyOption] = useState<VocabularyOption>({
    vocabulary: true,
    definition1: true,
    definition1Value: definition1DefaultValue,
    definition2: true,
    exampleSentence: true,
    studentName: false,
  })

  const onClickEvent = () => {
    if (onClick) {
      onClick(vocabularyOption)
    }
  }

  const onCheckChanged = (id: string, value: boolean) => {
    const newVocabularyOption = { ...vocabularyOption }
    switch (id) {
      case 'vocabulary':
        newVocabularyOption.vocabulary = !value
        break
      case 'definition1':
        newVocabularyOption.definition1 = !value
        break
      case 'definition2':
        newVocabularyOption.definition2 = !value
        break
      case 'exampleSentence':
        newVocabularyOption.exampleSentence = !value
        break
      case 'studentName':
        newVocabularyOption.studentName = !value
        break
    }
    setVocabularyOption(newVocabularyOption)
  }

  const onDefinitionChanged = (value: TypeDefinition1Value) => {
    setVocabularyOption({ ...vocabularyOption, definition1Value: value })
  }

  if (visibleType === 'modal') {
    return (
      <StyleModalVocaPrintOptions
        vocabularyOption={vocabularyOption}
        onClickEvent={onClickEvent}
        onClickCancel={onCancel}
        onCheckChanged={onCheckChanged}
        onDefinitionChanged={onDefinitionChanged}
      />
    )
  }
  return (
    <StyleOverlayVocaPrintOptions
      vocabularyOption={vocabularyOption}
      onClickEvent={onClickEvent}
      onClickCancel={onCancel}
      onCheckChanged={onCheckChanged}
      onDefinitionChanged={onDefinitionChanged}
    />
  )
}

function StyleModalVocaPrintOptions({
  vocabularyOption,
  onClickEvent,
  onClickCancel,
  onCheckChanged,
  onDefinitionChanged,
}: {
  vocabularyOption: VocabularyOption
  onClickEvent: () => void
  onClickCancel?: () => void
  onCheckChanged: (id: string, value: boolean) => void
  onDefinitionChanged: (value: TypeDefinition1Value) => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.voca_print_options_modal_bg} onClick={onClickCancel}>
      <div
        className={style.voca_print_options_modal}
        onClick={(e) => e.stopPropagation()}>
        <div className={style.btn_delete} onClick={onClickCancel}></div>
        <div className={style.title}>Print Options</div>
        <CheckItem
          check={vocabularyOption.vocabulary}
          title={'Vocabulary'}
          onClick={(currentVal) => onCheckChanged('vocabulary', currentVal)}
        />
        <CheckItem
          check={vocabularyOption.definition1}
          title={'Definition-1'}
          onClick={(currentVal) => onCheckChanged('definition1', currentVal)}
        />
        {vocabularyOption.definition1 && (
          <SelectDefinition
            value={vocabularyOption.definition1Value}
            onDefinitionChanged={onDefinitionChanged}
          />
        )}
        <CheckItem
          check={vocabularyOption.definition2}
          title={'Definition-2 (English)'}
          onClick={(currentVal) => onCheckChanged('definition2', currentVal)}
        />
        <CheckItem
          check={vocabularyOption.exampleSentence}
          title={'Example Sentence (EB level 1)'}
          onClick={(currentVal) =>
            onCheckChanged('exampleSentence', currentVal)
          }
        />
        <CheckItem
          check={vocabularyOption.studentName}
          title={'Student Name'}
          onClick={(currentVal) => onCheckChanged('studentName', currentVal)}
        />
        <Button onClick={onClickEvent}>Print</Button>
      </div>
    </div>
  )
}

function StyleOverlayVocaPrintOptions({
  vocabularyOption,
  onClickEvent,
  onClickCancel,
  onCheckChanged,
  onDefinitionChanged,
}: {
  vocabularyOption: VocabularyOption
  onClickEvent: () => void
  onClickCancel?: () => void
  onCheckChanged: (id: string, value: boolean) => void
  onDefinitionChanged: (value: TypeDefinition1Value) => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.voca_print_options}>
      <div className={style.btn_delete} onClick={onClickCancel}></div>
      <div className={style.title}>Print Options</div>
      <CheckItem
        check={vocabularyOption.vocabulary}
        title={'Vocabulary'}
        onClick={(currentVal) => onCheckChanged('vocabulary', currentVal)}
      />
      <CheckItem
        check={vocabularyOption.definition1}
        title={'Definition-1'}
        onClick={(currentVal) => onCheckChanged('definition1', currentVal)}
      />
      {vocabularyOption.definition1 && (
        <SelectDefinition
          value={vocabularyOption.definition1Value}
          onDefinitionChanged={onDefinitionChanged}
        />
      )}
      <CheckItem
        check={vocabularyOption.definition2}
        title={'Definition-2 (English)'}
        onClick={(currentVal) => onCheckChanged('definition2', currentVal)}
      />
      <CheckItem
        check={vocabularyOption.exampleSentence}
        title={'Example Sentence (EB level 1)'}
        onClick={(currentVal) => onCheckChanged('exampleSentence', currentVal)}
      />
      <CheckItem
        check={vocabularyOption.studentName}
        title={'Student Name'}
        onClick={(currentVal) => onCheckChanged('studentName', currentVal)}
      />
      <Button onClick={onClickEvent}>Print</Button>
    </div>
  )
}

function CheckItem({
  check,
  title,
  onClick,
}: {
  check: boolean
  title: string
  onClick?: (currentVal: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  const onCheckClick = () => {
    if (onClick) {
      onClick(check)
    }
  }

  return (
    <div className={style.check_item}>
      <CheckBox check={check} onClick={onCheckClick} />
      <div onClick={onCheckClick} style={{ cursor: 'pointer' }}>
        {title}
      </div>
    </div>
  )
}

function SelectDefinition({
  value,
  onDefinitionChanged,
}: {
  value?: string
  onDefinitionChanged?: (value: TypeDefinition1Value) => void
}) {
  return (
    <SelectBox
      value={value}
      onChange={(e) => {
        const definition1Value = e.target.value as TypeDefinition1Value
        if (onDefinitionChanged) {
          onDefinitionChanged(definition1Value)
        }
      }}>
      <SelectBoxItem value={'kor'}>한국어</SelectBoxItem>
      <SelectBoxItem value={'chi'}>中文</SelectBoxItem>
      <SelectBoxItem value={'vtn'}>Tiếng Việt</SelectBoxItem>
      <SelectBoxItem value={'jap'}>日本語</SelectBoxItem>
      <SelectBoxItem value={'ine'}>Bahasa Indonesia</SelectBoxItem>
    </SelectBox>
  )
}
