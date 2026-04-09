export const historyKeys = {
  root: () => ['history'] as const,
  reading: (params?: Record<string, unknown>) =>
    params
      ? (['history', 'reading', params] as const)
      : (['history', 'reading'] as const),
  speaking: (params?: Record<string, unknown>) =>
    params
      ? (['history', 'speaking', params] as const)
      : (['history', 'speaking'] as const),
  writing: (params?: Record<string, unknown>) =>
    params
      ? (['history', 'writing', params] as const)
      : (['history', 'writing'] as const),
  bookInfo: (studyId: string) => ['history', 'book-info', studyId] as const,
}
