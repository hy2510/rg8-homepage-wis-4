import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  studentHistoryId: string
  newClassId: string
  workDate?: string
  registStaffId?: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/change-group-class', {
    method: 'post',
    body: {
      studentHistoryId: input.studentHistoryId,
      newClassId: input.newClassId,
      workDate: input.workDate,
      registStaffId: input.registStaffId,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as postChangeGroupClass }
export type { Output as ChangeGroupClassResponse }
