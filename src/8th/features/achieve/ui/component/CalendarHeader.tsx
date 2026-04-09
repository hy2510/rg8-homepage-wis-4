import { CalendarHeaderStyle } from '@/8th/shared/styled/FeaturesStyled'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'

interface CalendarHeaderProps {
  goalType: 'Books' | 'Points'
  onGoalTypeChange: (type: 'Books' | 'Points') => void
  totalPoints: number
  totalBooks: number
  dailyGoalAchievements: number
  dailyGoalType: 'Points' | 'Books'
  totalAttendance: number
}

/**
 * 캘린더 요약 정보 및 목표 타입 토글
 */
export default function CalendarHeader({
  goalType,
  onGoalTypeChange,
  totalPoints,
  totalBooks,
  dailyGoalAchievements,
  dailyGoalType,
  totalAttendance,
}: CalendarHeaderProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const isTypePoint = goalType === 'Points'
  const isTypeBooks = goalType === 'Books'

  return (
    <CalendarHeaderStyle>
      <div className="left-group">
        <div className="goal-toggle">
          <button
            className={`toggle-button ${isTypeBooks ? 'active' : ''}`}
            onClick={() => onGoalTypeChange('Books')}>
            R
          </button>
          <button
            className={`toggle-button ${isTypePoint ? 'active' : ''}`}
            onClick={() => onGoalTypeChange('Points')}>
            P
          </button>
        </div>
        {isTypePoint ? (
          <div className="comment">
            <span className="title">{t('t8th182')}</span>
            <span className="value">
              {NumberUtils.toRgDecimalPoint(totalPoints)}P
            </span>
          </div>
        ) : (
          <div className="comment">
            <span className="title">{t('t8th183')}</span>
            <span className="value">{totalBooks}</span>
          </div>
        )}
      </div>
      <div className="right-group">
        {dailyGoalType === goalType && (
          <div className="comment">
            <span className="icon blue" />
            <span className="title">{t('t8th184')}</span>
            <span className="value black">{dailyGoalAchievements}</span>
          </div>
        )}
        <div className="comment">
          <span className="icon yellow" />
          <span className="title">{t('t8th185')}</span>
          <span className="value black">{totalAttendance}</span>
        </div>
      </div>
    </CalendarHeaderStyle>
  )
}
