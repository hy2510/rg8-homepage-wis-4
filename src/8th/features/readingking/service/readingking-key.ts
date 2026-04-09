export const readingkingKeys = {
  root: () => ['readkingking'] as const,
  eventList: () => ['readkingking', 'event'] as const,
  eventPrizeList: (eventId: string) =>
    ['readkingking', 'event', 'prize', eventId] as const,
  eventPrizeSet: (eventId: string, eventPrizeId: string) =>
    ['readkingking', 'event', 'prize', eventId, eventPrizeId] as const,
  eventDetail: (eventId: string) =>
    ['readkingking', 'event', 'detail', eventId] as const,
}
