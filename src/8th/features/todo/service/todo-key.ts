export const todoKeys = {
  root: () => ['todo'] as const,
  list: (params?: Record<string, unknown>) =>
    params ? (['todo', 'list', params] as const) : (['todo', 'list'] as const),
  bookInfoWithKey: (levelRoundId: string) =>
    ['todo', 'book-info', levelRoundId] as const,
  bookInfoWithStudyId: (levelRoundId: string, studyId: string | null = null) =>
    ['todo', 'book-info', levelRoundId, studyId] as const,
}
