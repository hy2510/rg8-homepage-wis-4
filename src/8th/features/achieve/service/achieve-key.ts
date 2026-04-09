export const achieveKeys = {
  root: () => ['achieve'] as const,
  levelBooks: () => ['achieve', 'level-books'] as const,
  levelMasters: () => ['achieve', 'level-masters'] as const,
  levelPoints: () => ['achieve', 'level-points'] as const,
  levelTest: () => ['achieve', 'level-test'] as const,
  readingKingTrophy: () => ['achieve', 'reading-king-trophy'] as const,
  successiveDailyGoals: () => ['achieve', 'successive-daily-goals'] as const,
  successiveStudy: () => ['achieve', 'successive-study'] as const,
  calendarAttend: (params: { year: number; month: number }) =>
    ['achieve', 'calendar-attend', params] as const,
  calendarStudy: (params: { year: number; month: number }) =>
    ['achieve', 'calendar-study', params] as const,
}
