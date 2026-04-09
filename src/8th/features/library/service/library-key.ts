type SearchTypes =
  | 'keyword'
  | 'movie'
  | 'series'
  | 'theme'
  | 'level'
  | 'prek'
  | 'dodoabc'
  | 'favorite'
  | 'workbook'
  | 'newbook'
  | 'tryagain'

type CategoryTypes = 'series' | 'theme' | 'continue'

export const libraryKeys = {
  root: () => ['library'] as const,
  search: () => ['library', 'search'] as const,
  searchWithType: (type: SearchTypes, params?: Record<string, unknown>) =>
    params
      ? (['library', 'search', type, params] as const)
      : (['library', 'search', type] as const),
  category: (type: CategoryTypes, params?: Record<string, unknown>) =>
    params
      ? (['library', 'category', type, params] as const)
      : (['library', 'category', type] as const),
  bookInfo: () => ['library', 'book-info'] as const,
  bookInfoWithKey: (levelRoundId: string) =>
    ['library', 'book-info', levelRoundId] as const,
  continueSection: (type: 'EB' | 'PB') =>
    ['library', 'continue-section', type] as const,
}
