export const rankKeys = {
  root: () => ['rank'] as const,
  point: (type: string) => ['rank', 'point', type] as const,
  levelMaster: () => ['rank', 'level-master'] as const,
  hallOfFame: () => ['rank', 'hall-of-fame'] as const,
  readingKing: (eventId: string) => ['rank', 'reading-king', eventId] as const,
  readingKingGroup: (eventId: string) =>
    ['rank', 'reading-king-group', eventId] as const,
}
