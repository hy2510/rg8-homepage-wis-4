import RenewType from '@/util/string-utils'

export interface UnpaidBalance {
  requestId: string
  requestTypeCode: string
  requestTypeName: string
  classId: string
  className: string
  startDate: string
  fee: number
}

export function makeUnpaidBalance(json?: any): UnpaidBalance {
  return {
    requestId: RenewType.renewString(json?.RequestId),
    requestTypeCode: RenewType.renewString(json?.RequestTypeCode),
    requestTypeName: RenewType.renewString(json?.RequestTypeName),
    classId: RenewType.renewString(json?.ClassId),
    className: RenewType.renewString(json?.ClassName),
    startDate: RenewType.renewString(json?.StartDate),
    fee: RenewType.renewNumber(json?.Fee),
  }
}
