import DateUtils from '@/util/date-utils'

/** 7th challenge-rank 페이지와 동일: 종료일 당일 23:59:59까지 진행 중으로 본다 */
export function isReadingKingEventOngoing(
  startDateStr: string,
  endDateStr: string,
  nowMs: number = Date.now(),
): boolean {
  if (!startDateStr?.trim() || !endDateStr?.trim()) return false
  const startDate = DateUtils.createDate(startDateStr)
  const endDate = DateUtils.createDate(endDateStr)
  endDate.setHours(23, 59, 59, 999)
  return startDate.getTime() <= nowMs && nowMs <= endDate.getTime()
}

export function hasOngoingReadingKingEvent(
  events: { startDate: string; endDate: string }[],
): boolean {
  return events.some((e) => isReadingKingEventOngoing(e.startDate, e.endDate))
}
