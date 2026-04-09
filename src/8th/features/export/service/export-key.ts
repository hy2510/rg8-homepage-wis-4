export const exportKeys = {
  root: () => ['export'] as const,
  bookList: (params?: Record<string, unknown>) =>
    params
      ? (['export', 'book-list', params] as const)
      : (['export', 'book-list'] as const),
  worksheet: (params?: Record<string, unknown>) =>
    params
      ? (['export', 'worksheet', params] as const)
      : (['export', 'worksheet'] as const),
  report: (params?: Record<string, unknown>) =>
    params
      ? (['export', 'report', params] as const)
      : (['export', 'report'] as const),
  vocabulary: (params?: Record<string, unknown>) =>
    params
      ? (['export', 'vocabulary', params] as const)
      : (['export', 'vocabulary'] as const),
}
