'use client'

import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'

/**
 * 레벨마스터 헤더
 */
export default function RankLevelMasterHeader() {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <BoxStyle
      display="flex"
      flexDirection="column"
      gap={5}
      padding="0 0 0 10px">
      <TextStyle
        fontColor="secondary"
        fontFamily="sans"
        fontSize="small"
        fontWeight={500}>
        {`${t('t8th243')} ${t('t8th239')}`}
      </TextStyle>
    </BoxStyle>
  )
}
