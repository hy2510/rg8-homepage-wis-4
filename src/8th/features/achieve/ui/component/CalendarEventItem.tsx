'use client'

import { CalendarEventItemStyle } from '@/8th/shared/styled/FeaturesStyled'
import useTranslation from '@/localization/client/useTranslations'

/**
 * 이벤트 변경 이력
 */
type EventType =
  | 'setGoalChangeBooks'
  | 'setGoalChangePoint'
  | 'achieveLevelMaster'
  | 'achieveExtensiveReading'

interface CalendarEventItemProps {
  day: number
  eventType: EventType
  eventValue: number | string
}

export default function CalendarEventItem({
  day,
  eventType,
  eventValue,
}: CalendarEventItemProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const getEventMessage = () => {
    switch (eventType) {
      case 'setGoalChangeBooks':
        return t('t8th186', { eventValue: eventValue })
      case 'setGoalChangePoint':
        return t('t8th187', { eventValue: eventValue })
      case 'achieveLevelMaster':
        return t('t8th188', { eventValue: eventValue })
      case 'achieveExtensiveReading':
        return t('t8th189', { eventValue: eventValue })
    }
  }

  return (
    <CalendarEventItemStyle>
      <div className="event-day">• {t('t8th190', { day: day })}</div>
      <div className="event-message">{getEventMessage()}</div>
    </CalendarEventItemStyle>
  )
}
