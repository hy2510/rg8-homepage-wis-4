import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

export type GroupClassInfo = {
  classGroupId: string
  classGroupName: string
  classId: string
  className: string
}

function makeClassInfo(json: any): GroupClassInfo {
  return {
    classGroupId: RenewType.renewString(json?.ClassGroupId),
    classGroupName: RenewType.renewString(json?.ClassGroupName),
    classId: RenewType.renewString(json?.ClassId),
    className: RenewType.renewString(json?.ClassName),
  }
}

function transform(json: any): ChangeableGroupClassInfoResponse {
  return {
    before: json.Before ? makeClassInfo(json.Before) : undefined,
    current: makeClassInfo(json.Current),
    classList: json.ClassList.map(
      (cls: any): { classId: string; className: string } => {
        return {
          classId: RenewType.renewString(cls?.ClassId),
          className: RenewType.renewString(cls?.ClassName),
        }
      },
    ),
    changeable: RenewType.renewBoolean(json?.ChangeClassDateYn),
    cancelable: RenewType.renewBoolean(json?.CancelButtonYn),
    changeEndDate: RenewType.renewString(json?.ChangeEndDate),
  }
}

export type ChangeableGroupClassInfoParams = {}

export type ChangeableGroupClassInfoResponse = {
  before?: GroupClassInfo
  current: GroupClassInfo
  classList: { classId: string; className: string }[]
  changeable: boolean
  cancelable: boolean
  changeEndDate: string
}

export async function getChangeableGroupClassInfo(
  input?: ChangeableGroupClassInfoParams,
): Promise<ChangeableGroupClassInfoResponse> {
  const request = makeRequest(`api/student/change-group-class`, {
    method: 'get',
  })
  return await execute(request, transform)
}
