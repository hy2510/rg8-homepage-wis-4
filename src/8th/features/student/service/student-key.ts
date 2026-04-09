export const studentKeys = {
  root: () => ['student'] as const,
  info: () => ['student', 'info'] as const,
  historyList: () => ['student', 'history-list'] as const,
  levelTestInfo: () => ['student', 'level-test-info'] as const,
  continuousStudy: () => ['student', 'continuous-study'] as const,
  dailyLearning: () => ['student', 'daily-learning'] as const,
  dailyLearningToday: () => ['student', 'daily-learning', 'today'] as const,
  dailyLearningSetting: () => ['student', 'daily-learning', 'setting'] as const,
  dailyLearningHistory: () => ['student', 'daily-learning', 'history'] as const,
  studentEarnReadingUnit: () =>
    ['student', 'student-earn-reading-unit'] as const,
  studentAvatarList: () => ['student', 'student-avatar-list'] as const,
  changeableGroupClassInfo: () =>
    ['student', 'changeable-group-class-info'] as const,
}
