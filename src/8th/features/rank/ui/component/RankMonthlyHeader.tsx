'use client'

import { BoxStyle, SelectBox, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'

/**
 * 랭킹 월간 헤더
 */
export default function RankMonthlyHeader({
  period: period,
  grade: grade,
  onChangeOption,
}: {
  period: { key: string; label: string; isActive: boolean }[]
  grade?: { key: string; label: string; isActive: boolean }[]
  onChangeOption?: (period: string, grade?: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const selectedPeriod = period.find((item) => item.isActive)
  const selectedGrade = grade?.find((item) => item.isActive)

  return (
    <BoxStyle
      display="flex"
      flexDirection="column"
      gap={5}
      padding="0 0 0 10px">
      <BoxStyle display="flex" gap={10} alignItems="center">
        <SelectBox
          selectedValue={selectedPeriod?.label || ''}
          onChange={(value) => {
            if (value) {
              if (onChangeOption) {
                onChangeOption(
                  value.key,
                  selectedGrade !== undefined ? selectedGrade.key : undefined,
                )
              }
            }
          }}
          options={period}
        />
        {grade !== undefined && (
          <SelectBox
            selectedValue={selectedGrade?.label || ''}
            onChange={(value) => {
              if (value) {
                if (onChangeOption) {
                  onChangeOption(selectedPeriod!.key, value.key)
                }
              }
            }}
            options={grade}
          />
        )}
      </BoxStyle>
      <TextStyle
        fontColor="secondary"
        fontFamily="sans"
        fontSize="small"
        fontWeight={500}>
        {t('t8th239')}
      </TextStyle>
    </BoxStyle>
  )
}
