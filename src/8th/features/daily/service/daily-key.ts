export const dailyKeys = {
  root: () => ['daily'] as const,
  stageList: () => ['daily', 'stage-list'] as const,
  sectionList: () => ['daily', 'section-list'] as const,
  sectionListWithParam: (params?: Record<string, unknown>) =>
    ['daily', 'section-list', params] as const,
  bookList: () => ['daily', 'book-list'] as const,
  bookListWithParam: (params?: Record<string, unknown>) =>
    ['daily', 'book-list', params] as const,
}
