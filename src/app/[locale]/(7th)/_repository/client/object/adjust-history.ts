import RenewType from '@/util/string-utils'
export interface AdjustHistory { 
  startDate: string
  endDate: string
}

export function makeAdjustHistory(json?: any): AdjustHistory { 
  return { 
    startDate: RenewType.renewString(json?.StartDate), 
    endDate: RenewType.renewString(json?.EndDate), 
  }
}
