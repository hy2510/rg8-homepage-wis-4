import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {}

type Output = {
  before?: {
    classGroupId: string
    classGroupName: string
    classId: string
    className: string
  }
  current: {
    classGroupId: string
    classGroupName: string
    classId: string
    className: string
  }
  classList: { classId: string; className: string }[]
  changeable: boolean
  cancelable: boolean
  changeEndDate: string
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/change-group-class', {
    method: 'get',
  })
  return await execute(request, (json): Output => {
    const before = json.Before
      ? {
          classGroupId: json.Before.ClassGroupId,
          classGroupName: json.Before.ClassGroupName,
          classId: json.Before.ClassId,
          className: json.Before.ClassName,
        }
      : undefined
    const current = {
      classGroupId: json.Current.ClassGroupId,
      classGroupName: json.Current.ClassGroupName,
      classId: json.Current.ClassId,
      className: json.Current.ClassName,
    }
    const classList = json.ClassList.map((cls: any) => {
      return {
        classId: cls.ClassId,
        className: cls.ClassName,
      }
    })
    const changeable = json.ChangeClassDateYn
    const cancelable = json.CancelButtonYn
    const changeEndDate = json.ChangeEndDate
    return {
      before,
      current,
      classList,
      changeable,
      cancelable,
      changeEndDate,
    }
  })
}

export { action as getChangeableGroupClassInfo }
export type { Output as ChangeableGroupClassInfoResponse }
