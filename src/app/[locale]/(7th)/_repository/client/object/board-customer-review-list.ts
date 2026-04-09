import RenewType from '@/util/string-utils'

export interface BoardCustomerReviewList {
  id: string
  rowNum: number
  writer: string
  school: string
  grade: string
  level: string
  hallOfFame: string
  hallOfFameId: string
  parentYn: boolean
  title: string
  regDate: string
  visit: number
  searchText: string
  topYn: boolean
  prevID: string
  nextID: string
}

export function makeBoardCustomerReviewList(
  json?: any,
): BoardCustomerReviewList {
  return {
    id: RenewType.renewString(json?.Id),
    rowNum: RenewType.renewNumber(json?.RowNum),
    writer: RenewType.renewString(json?.Writer),
    school: RenewType.renewString(json?.School),
    grade: RenewType.renewString(json?.Grade),
    level: RenewType.renewString(json?.Level),
    hallOfFame: RenewType.renewString(json?.HallOfFame),
    hallOfFameId: RenewType.renewString(json?.HallOfFameId),
    parentYn: RenewType.renewBoolean(json?.ParentYn),
    title: RenewType.renewString(json?.Title),
    regDate: RenewType.renewString(json?.RegDate),
    visit: RenewType.renewNumber(json?.Visit),
    searchText: RenewType.renewString(json?.SearchText),
    topYn: RenewType.renewBoolean(json?.TopYn),
    prevID: RenewType.renewString(json?.PrevID),
    nextID: RenewType.renewString(json?.NextID),
  }
}
