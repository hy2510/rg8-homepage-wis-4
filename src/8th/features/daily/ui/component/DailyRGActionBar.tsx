'use client'

import { DailyRgResultActionBarStyle } from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'

export type { ActionBarDropdownItem } from '@/8th/shared/ui/ActionBar'

export function DailyRgResultActionBar({
  title = '',
  bookCount = 0,
  totalCount = 0,
}: {
  title: string
  bookCount?: number
  totalCount?: number
}) {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <DailyRgResultActionBarStyle>
      <BoxStyle
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={5}>
        <TextStyle fontSize="xlarge">{title}</TextStyle>
        <TextStyle fontSize="medium" fontColor="secondary" padding="3px 0 0 0">
          {bookCount}/{totalCount} {t('t8th247')}
        </TextStyle>
      </BoxStyle>
    </DailyRgResultActionBarStyle>
  )
}
