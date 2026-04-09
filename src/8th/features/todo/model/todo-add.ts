import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): TodoAddResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type TodoAddParams = {
  sortColumn?: string
  levelRoundIds: string[]
  studentHistoryId: string
}

export type TodoAddResponse = {
  success: boolean
}

export async function postTodoAdd(
  input: TodoAddParams,
): Promise<TodoAddResponse> {
  const request = makeRequest(`api/library/todo`, {
    method: 'post',
    body: {
      levelRoundIds: input.levelRoundIds.join('|'),
      studentHistoryId: input.studentHistoryId,
    },
  })
  return await execute(request, transform)
}
