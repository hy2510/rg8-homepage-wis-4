'use client'

import {
  ModalBodyStyle,
  ModalHeaderStyle,
} from '@/8th/shared/styled/SharedStyled'
import { ModalContainer } from '@/8th/shared/ui/Modal'
import useTranslation from '@/localization/client/useTranslations'

export default function HallOfFameInfoModal({
  onCloseModal,
}: {
  onCloseModal?: () => void
}) {
  // @Language 'common'
  const { t, i18n } = useTranslation()
  const language = i18n.language

  return (
    <ModalContainer>
      <ModalHeaderStyle>
        <div className="title">{t('t8th245')}</div>
        <div className="btn-close" onClick={onCloseModal} />
      </ModalHeaderStyle>
      <ModalBodyStyle style={{ padding: 0 }}>
        <iframe
          src={`/src/html/page-contents/mobile/ranking/ranking_03_scholarship_benefits_pop.html?lang=${language}`}
          width="100%"
          height="auto"
          style={{
            height: 'calc(100vh - 200px)',
            border: 'none',
          }}
        />
      </ModalBodyStyle>
    </ModalContainer>
  )
}
