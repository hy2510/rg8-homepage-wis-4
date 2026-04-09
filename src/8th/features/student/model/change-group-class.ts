import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): ChangeGroupClassResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type ChangeGroupClassParams = {
  studentHistoryId: string
  newClassId: string
  workDate?: string
  registStaffId?: string
}

export type ChangeGroupClassResponse = {
  success: boolean
}

export async function postChangeGroupClass(
  input: ChangeGroupClassParams,
): Promise<ChangeGroupClassResponse> {
  const request = makeRequest(`api/student/change-group-class`, {
    method: 'post',
    body: {
      studentHistoryId: input.studentHistoryId,
      newClassId: input.newClassId,
      workDate: input.workDate,
      registStaffId: input.registStaffId,
    },
  })
  return await execute(request, transform)
}
