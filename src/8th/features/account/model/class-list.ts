import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export interface Class {
  classId: string
  name: string
  classGroupId: string
  limit: number
  feeTypeCode: string
  feeTypeName: string
  feeTypeNameEng: string
  fee: number
  endDateYn: boolean
  endDate: string
  memo: string
  classTypeCode: string
  classTypeName: string
  hiddenYn: boolean
  fullEasyYn: boolean
  viewFullEasyYn: boolean
  registStaffId: string
  registStaffName: string
  registDate: string
  modifyStaffId: string
  modifyStaffName: string
  modifyDate: string
}

export function makeClass(json?: any): Class {
  return {
    classId: RenewType.renewString(json?.ClassId),
    name: RenewType.renewString(json?.Name),
    classGroupId: RenewType.renewString(json?.ClassGroupId),
    limit: RenewType.renewNumber(json?.Limit),
    feeTypeCode: RenewType.renewString(json?.FeeTypeCode),
    feeTypeName: RenewType.renewString(json?.FeeTypeName),
    feeTypeNameEng: RenewType.renewString(json?.FeeTypeNameEng),
    fee: RenewType.renewNumber(json?.Fee),
    endDateYn: RenewType.renewBoolean(json?.EndDateYn),
    endDate: RenewType.renewString(json?.EndDate),
    memo: RenewType.renewString(json?.Memo),
    classTypeCode: RenewType.renewString(json?.ClassTypeCode),
    classTypeName: RenewType.renewString(json?.ClassTypeName),
    hiddenYn: RenewType.renewBoolean(json?.HiddenYn),
    fullEasyYn: RenewType.renewBoolean(json?.FullEasyYn),
    viewFullEasyYn: RenewType.renewBoolean(json?.ViewFullEasyYn),
    registStaffId: RenewType.renewString(json?.RegistStaffId),
    registStaffName: RenewType.renewString(json?.RegistStaffName),
    registDate: RenewType.renewString(json?.RegistDate),
    modifyStaffId: RenewType.renewString(json?.ModifyStaffId),
    modifyStaffName: RenewType.renewString(json?.ModifyStaffName),
    modifyDate: RenewType.renewString(json?.ModifyDate),
  }
}

function transform(json: any): ClassListResponse {
  return {
    list: json.Class.map((item: any) => {
      return makeClass(item)
    }),
  }
}

export type ClassListParams = {
  classGroupId: string
}

export type ClassListResponse = {
  list: Class[]
}

export async function getClassList(
  input?: ClassListParams,
): Promise<ClassListResponse> {
  const request = makeRequest(`api/account/class`, 'append-customer', {
    method: 'get',
    queryString: {
      classGroupId: input?.classGroupId,
    },
  })
  return await execute(request, transform)
}
