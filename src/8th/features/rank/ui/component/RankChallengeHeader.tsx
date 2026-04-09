'use client'

import { BoxStyle, SelectBox, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'

/**
 * 영어독서왕 헤더
 */
export default function RankChallengeHeader({
  events,
  onChangeOption,
}: {
  events: {
    key: string
    title: string
    startDate: string
    endDate: string
    isActive: boolean
  }[]
  onChangeOption?: (key: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const selectedEvent = events.find((event) => event.isActive)
  let eventDate: string | undefined = undefined
  if (selectedEvent) {
    const eventStartDate = DateUtils.createDate(selectedEvent.startDate)
    const eventEndDate = DateUtils.createDate(selectedEvent.endDate)
    eventDate = `${t('t8th240')}: ${eventStartDate.getMonth() + 1}/${eventStartDate.getDate()} ~ ${eventEndDate.getMonth() + 1}/${eventEndDate.getDate()} `
  }

  return (
    <BoxStyle
      display="flex"
      flexDirection="column"
      gap={5}
      padding="0 0 0 10px">
      <BoxStyle display="flex" gap={10} alignItems="center">
        <SelectBox
          selectedValue={selectedEvent?.title || ''}
          onChange={(value) => {
            if (value) {
              if (onChangeOption) {
                onChangeOption(value.key)
              }
            }
          }}
          options={events.map((item) => ({
            key: item.key,
            label: item.title,
          }))}
        />
      </BoxStyle>
      {eventDate && (
        <TextStyle
          fontColor="secondary"
          fontFamily="sans"
          fontSize="small"
          fontWeight={500}>
          {eventDate}
        </TextStyle>
      )}
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
