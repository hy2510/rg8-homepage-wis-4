import RenewType from '@/util/string-utils'

export interface RankReadingkingGroup {
  num: number
  customerName: string
  customerId: string
  rgPoint: number
  bookCount: number
  averageRgPoint: number
  totalRank: number
}

export function makeRankReadingkingGroup(json?: any): RankReadingkingGroup {
  return {
    num: RenewType.renewNumber(json?.Num),
    customerName: RenewType.renewString(json?.CustomerName),
    customerId: RenewType.renewString(json?.CustomerId),
    rgPoint: RenewType.renewNumber(json?.RgPoint),
    bookCount: RenewType.renewNumber(json?.BookCount),
    averageRgPoint: RenewType.renewNumber(json?.AverageRgPoint),
    totalRank: RenewType.renewNumber(json?.TotalRank),
  }
}
