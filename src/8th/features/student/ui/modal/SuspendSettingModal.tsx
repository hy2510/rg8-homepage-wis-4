'use client'

import { useAdjustChange } from '@/8th/features/payment/service/payment-query'
import { BookInfoModalStyle } from '@/8th/shared/styled/FeaturesStyled'
import {
  ModalBodyStyle,
  ModalContainerStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import useTranslation from '@/localization/client/useTranslations'

export default function SuspendSettingModal({
  currentPause,
  onClickClose,
}: {
  currentPause: boolean
  onClickClose?: () => void
}) {
  if (currentPause) {
    return <SuspendDoRelease onCancel={onClickClose} />
  } else {
    return <SuspendDoPause onCancel={onClickClose} />
  }
}

function SuspendDoPause({ onCancel }: { onCancel?: () => void }) {
  // @language 'common'
  const { t } = useTranslation()

  const { mutate: adjustChange, isPending: isAdjustPending } = useAdjustChange({
    onSuccess: (data, variables) => {
      if (data.success) {
        alert(t('t8th144'))
        if (onCancel) {
          onCancel()
        }
      }
    },
  })

  const onChangeAdjust = () => {
    if (isAdjustPending) {
      return
    }
    adjustChange({
      command: 'pause',
    })
  }

  return (
    <BookInfoModalStyle>
      <ModalContainerStyle>
        <ModalHeaderStyle>
          <div className="title">{t('t8th151')}</div>
          <div className="btn-close" onClick={onCancel} />
        </ModalHeaderStyle>
        <ModalBodyStyle>
          <BoxStyle display="flex" flexWrap="wrap" gap={4}>
            <TextStyle
              type="span"
              fontSize="medium"
              fontColor="primary"
              fontFamily="sans">
              {t('t8th153')}
            </TextStyle>
          </BoxStyle>

          <BoxStyle display="flex" flexWrap="wrap" gap={20} margin="40px 0 0 0">
            <div
              style={{
                color: 'var(--font-color-light-blue)',
                cursor: 'pointer',
              }}
              onClick={onChangeAdjust}>
              ok
            </div>
            <div
              style={{
                color: 'var(--font-color-secondary)',
                cursor: 'pointer',
              }}
              onClick={onCancel}>
              cancel
            </div>
          </BoxStyle>
        </ModalBodyStyle>
      </ModalContainerStyle>
    </BookInfoModalStyle>
  )
}

function SuspendDoRelease({ onCancel }: { onCancel?: () => void }) {
  // @language 'common'
  const { t } = useTranslation()

  const { mutate: adjustChange, isPending: isAdjustPending } = useAdjustChange({
    onSuccess: (data, variables) => {
      if (data.success) {
        alert(t('t8th145'))
        if (onCancel) {
          onCancel()
        }
      }
    },
  })

  const onChangeAdjust = () => {
    if (isAdjustPending) {
      return
    }
    adjustChange({
      command: 'release',
    })
  }

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">{t('t8th150')}</div>
        <div className="btn-close" onClick={onCancel} />
      </ModalHeaderStyle>
      <ModalBodyStyle>
        <BoxStyle display="flex" flexWrap="wrap" gap={4}>
          <TextStyle
            type="span"
            fontSize="medium"
            fontColor="primary"
            fontFamily="sans">
            {t('t8th152')}
          </TextStyle>
        </BoxStyle>

        <BoxStyle display="flex" flexWrap="wrap" gap={20} margin="40px 0 0 0">
          <div
            style={{
              color: 'var(--font-color-light-blue)',
              cursor: 'pointer',
            }}
            onClick={onChangeAdjust}>
            ok
          </div>
          <div
            style={{
              color: 'var(--font-color-secondary)',
              cursor: 'pointer',
            }}
            onClick={onCancel}>
            cancel
          </div>
        </BoxStyle>
      </ModalBodyStyle>
    </ModalContainer>
  )
}
