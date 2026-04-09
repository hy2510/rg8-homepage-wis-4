'use client'

import { SettingHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'

/**
 * Main screen header with saved status
 */

interface SettingHeaderProps {
  title?: string
  isChanged?: boolean
  isSaved?: boolean
  onSave?: () => void
  onCancel?: () => void
}

export default function SettingHeader({
  title = '',
  isChanged,
  isSaved,
  onSave,
  onCancel,
}: SettingHeaderProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const handleSave = () => {
    if (onSave) {
      onSave()
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <SettingHeaderStyle>
      <div className="title">{title}</div>
      <BoxStyle display="flex" gap={10}>
        {isChanged && !isSaved && (
          <>
            <div className="btn save" onClick={handleSave}>
              {t('t8th091')}
            </div>
            <div className="btn cancel" onClick={handleCancel}>
              {t('t8th078')}
            </div>
          </>
        )}
        {isSaved && <div className="btn saved">saved</div>}
      </BoxStyle>
    </SettingHeaderStyle>
  )
}
