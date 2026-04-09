'use client'

import { Assets } from '@/8th/assets/asset-library'
import { BookInfoModalStyle } from '@/8th/shared/styled/FeaturesStyled'
import CustomCheckbox from '@/8th/shared/ui/CustomCheckbox'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { MiniModalContainer } from '@/8th/shared/ui/Modal'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'

interface LevelGuidanceModalProps {
  title: string
  subtitle: string
  message: string
  isCheckableDoNotShowAgain?: boolean
  onCloseModal: (isDoNotShowAgain?: boolean) => void
  onConfirm?: (isDoNotShowAgain?: boolean) => void
  onCancel?: (isDoNotShowAgain?: boolean) => void
}

/**
 * 레벨 가이던스 안내 작업 팝업
 */
export default function LevelGuidanceModal({
  title,
  subtitle,
  message,
  isCheckableDoNotShowAgain,
  onCloseModal,
  onConfirm,
  onCancel,
}: LevelGuidanceModalProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const [dontShowAgain, setDontShowAgain] = useState(false)

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(dontShowAgain)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel(dontShowAgain)
    }
  }

  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal(dontShowAgain)
    }
  }

  return (
    <BookInfoModalStyle>
      <MiniModalContainer>
        <div className="mini-modal-header">
          <div className="header-title">{title}</div>
          <div className="btn-close" onClick={handleCloseModal}>
            <Image
              src={Assets.Icon.deleteBlack}
              alt="close"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="mini-modal-body" style={{ minHeight: '200px' }}>
          <BoxStyle display="flex" flexDirection="column" gap={15}>
            <TextStyle
              fontFamily="sans"
              fontSize="medium"
              fontColor="secondary">
              {subtitle}
            </TextStyle>
            <TextStyle fontFamily="sans" fontSize="large" fontColor="primary">
              {message}
            </TextStyle>
          </BoxStyle>

          <BoxStyle
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={10}>
            <div />
            <BoxStyle display="flex" gap={10}>
              <TextStyle
                onClick={handleCancel}
                fontFamily="sans"
                fontSize="large"
                fontWeight="bold"
                fontColor="var(--line-color-light-blue)"
                margin="0 10px 0 0">
                {t('t8th300')}
              </TextStyle>
              <TextStyle
                onClick={handleConfirm}
                fontFamily="sans"
                fontSize="large"
                fontWeight="bold"
                fontColor="var(--color-gray-strong)"
                margin="0 10px 0 0">
                {t('t8th299')}
              </TextStyle>
            </BoxStyle>
          </BoxStyle>
        </div>
        {isCheckableDoNotShowAgain && (
          <BoxStyle
            padding="15px 20px"
            borderTop="1px solid var(--line-color-primary)"
            backgroundColor="#fff">
            <CustomCheckbox
              id="dont-show-again"
              checked={dontShowAgain}
              onChange={(checked) => setDontShowAgain(checked)}
              label={t('t8th301')}
            />
          </BoxStyle>
        )}
      </MiniModalContainer>
    </BookInfoModalStyle>
  )
}
