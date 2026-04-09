'use client'

import { Assets } from '@/8th/assets/asset-library'
import {
  Definition1Value,
  VocabularyOption,
} from '@/8th/shared/hook/useExportPanel'
import { PrintVocabularyModalStyle } from '@/8th/shared/styled/FeaturesStyled'
import CustomCheckbox from '@/8th/shared/ui/CustomCheckbox'
import { SelectBox } from '@/8th/shared/ui/Misc'
import { MiniModalContainer } from '@/8th/shared/ui/Modal'
import useTranslation from '@/localization/client/useTranslations'
import { VIETNAMESE } from '@/localization/localize-config'
import Image from 'next/image'
import { useState } from 'react'

const LANGUAGE_OPTIONS: { key: Definition1Value; label: string }[] = [
  { key: 'kor', label: '한국어' },
  { key: 'vtn', label: 'Tiếng Việt' },
  { key: 'chi', label: '中文' },
  { key: 'jap', label: '日本語' },
  { key: 'ine', label: 'Bahasa Indonesia' },
]

export default function PrintVocabularyModal({
  onClickClose,
  onConfirm,
}: {
  onClickClose: () => void
  onConfirm: (option: VocabularyOption) => void
}) {
  // @Language 'common'
  const { i18n } = useTranslation()

  let definition1DefaultValue: Definition1Value = 'kor'
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

  const currentDefinition1Value =
    LANGUAGE_OPTIONS.find(
      (option) => option.key === vocabularyOption.definition1Value,
    ) || LANGUAGE_OPTIONS[0]

  return (
    <PrintVocabularyModalStyle>
      <MiniModalContainer>
        <div className="mini-modal-header">
          <div className="header-title">Vocabulary Printing Options</div>
          <div className="btn-close" onClick={onClickClose}>
            <Image
              src={Assets.Icon.deleteBlack}
              alt="close"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="mini-modal-body">
          <CustomCheckbox
            id="vocabulary"
            checked={vocabularyOption.vocabulary}
            onChange={(checked) => {
              setVocabularyOption({ ...vocabularyOption, vocabulary: checked })
            }}
            label="Vocabulary"
          />
          <CustomCheckbox
            id="definition-1"
            checked={vocabularyOption.definition1}
            onChange={(checked) => {
              setVocabularyOption({ ...vocabularyOption, definition1: checked })
            }}
            label="Definition-1"
          />
          {vocabularyOption.definition1 && (
            <div className="select-box-container">
              <div className="select-box-label">Language for Definitions</div>
              <SelectBox
                options={LANGUAGE_OPTIONS}
                onChange={(value) => {
                  const findDefinition1Value = value.key as Definition1Value
                  if (findDefinition1Value) {
                    setVocabularyOption({
                      ...vocabularyOption,
                      definition1Value: findDefinition1Value,
                    })
                  }
                }}
                selectedValue={currentDefinition1Value.label}
                smallFont={true}
              />
            </div>
          )}
          <CustomCheckbox
            id="definition-2"
            checked={vocabularyOption.definition2}
            onChange={(checked) => {
              setVocabularyOption({ ...vocabularyOption, definition2: checked })
            }}
            label="Definition-2"
          />
          <CustomCheckbox
            id="example-sentence"
            checked={vocabularyOption.exampleSentence}
            onChange={(checked) => {
              setVocabularyOption({
                ...vocabularyOption,
                exampleSentence: checked,
              })
            }}
            label="Example Sentence (EB level 1)"
          />
          <CustomCheckbox
            id="student-name"
            checked={vocabularyOption.studentName}
            onChange={(checked) => {
              setVocabularyOption({ ...vocabularyOption, studentName: checked })
            }}
            label="Student Name"
          />
        </div>
        <div className="btn-print" onClick={() => onConfirm(vocabularyOption)}>
          Print
        </div>
      </MiniModalContainer>
    </PrintVocabularyModalStyle>
  )
}
