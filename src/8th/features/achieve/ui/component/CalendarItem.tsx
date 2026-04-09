import { CalendarItemStyle } from '@/8th/shared/styled/FeaturesStyled'

interface CalendarItemProps {
  dayNumber: number
  isToday: boolean
  isSuccess: boolean
  isAttendance: boolean
  isCurrentMonth: boolean
  goalType: 'Points' | 'Books'
  earnedPoints?: number
  booksRead?: number
  onClick?: () => void
}

export default function CalendarItem({
  dayNumber,
  isToday,
  isSuccess,
  isCurrentMonth,
  goalType,
  earnedPoints,
  booksRead,
  isAttendance,
  onClick,
}: CalendarItemProps) {
  const isTypePoint = goalType === 'Points'
  const isTypeBooks = goalType === 'Books'
  const point = earnedPoints || 0
  const books = booksRead || 0
  const isClickable = point > 0 || books > 0

  return (
    <CalendarItemStyle
      className={`calendar-item ${!isCurrentMonth ? 'other-month' : ''} ${isSuccess ? 'daily-goal-achievement-bg' : ''}`}
      onClick={isClickable ? onClick : undefined}>
      <div
        className={`day-number ${isToday ? 'today' : ''} ${
          !isCurrentMonth ? 'other-month' : ''
        }`}>
        {dayNumber > 0 ? dayNumber : ''}
      </div>
      {point > 0 && books > 0 && (
        <div className="content">
          <div className={`books-read ${isTypeBooks ? 'active' : ''}`}>
            {booksRead}
          </div>
          <div className={`points ${isTypePoint ? 'active' : ''}`}>
            {earnedPoints}
            <span className="point-unit">P</span>
          </div>
        </div>
      )}
      {/* 목표 달성 표시 */}
      {isSuccess && <div className="daily-goal-achievement-line" />}

      {/* 출석 표시 */}
      {isAttendance && <div className="attendance-line" />}
    </CalendarItemStyle>
  )
}
