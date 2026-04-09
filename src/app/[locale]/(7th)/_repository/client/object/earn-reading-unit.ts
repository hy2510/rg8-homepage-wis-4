import RenewType from '@/util/string-utils'

export interface EarnReadingUnit {
  id: string
  readingUnitId: string
  name: string
  image: string
}
export function makeEarnReadingUnit(json?: any): EarnReadingUnit {
  return {
    id: RenewType.renewString(json?.id),
    readingUnitId: RenewType.renewString(json?.ReadingUnitId),
    name: RenewType.renewString(json?.Name),
    image: RenewType.renewString(json?.Image),
  }
}
