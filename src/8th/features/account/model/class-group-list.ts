import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export interface ClassGroup {
  classGroupId: string
  name: string
  feeTypeCode: string
  feeTypeName: string
  fee: number
  memo: string
  hiddenYn: boolean
  registStaffId: string
  registStaffName: string
  registDate: string
  modifyStaffId: string
  modifyStaffName: string
  modifyDate: string
}

function makeClassGroup(json?: any): ClassGroup {
  return {
    classGroupId: RenewType.renewString(json?.ClassGroupId),
    name: RenewType.renewString(json?.Name),
    feeTypeCode: RenewType.renewString(json?.FeeTypeCode),
    feeTypeName: RenewType.renewString(json?.FeeTypeName),
    fee: RenewType.renewNumber(json?.Fee),
    memo: RenewType.renewString(json?.memo),
    hiddenYn: RenewType.renewBoolean(json?.HiddenYn),
    registStaffId: RenewType.renewString(json?.RegistStaffId),
    registStaffName: RenewType.renewString(json?.RegistStaffName),
    registDate: RenewType.renewString(json?.RegistDate),
    modifyStaffId: RenewType.renewString(json?.ModifyStaffId),
    modifyStaffName: RenewType.renewString(json?.ModifyStaffName),
    modifyDate: RenewType.renewString(json?.ModifyDate),
  }
}

function transform(json: any): ClassGroupListResponse {
  return {
    list: json.ClassGroup.map((item: any) => {
      return makeClassGroup(item)
    }),
  }
}

export type ClassGroupListParams = {}

export type ClassGroupListResponse = {
  list: ClassGroup[]
}

export async function getClassGroupList(
  input?: ClassGroupListParams,
): Promise<ClassGroupListResponse> {
  const request = makeRequest(`api/account/class/group`, 'append-customer', {
    method: 'get',
  })
  return await execute(request, transform)
}
