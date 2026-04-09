import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): TodoDeleteResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type TodoDeleteParams = {
  studyIds: string[]
}

export type TodoDeleteResponse = {
  success: boolean
}

export async function deleteTodoDelete(
  input: TodoDeleteParams,
): Promise<TodoDeleteResponse> {
  const request = makeRequest(`api/library/todo`, {
    method: 'delete',
    queryString: {
      studyIds: input.studyIds.join('|'),
    },
  })
  return await execute(request, transform)
}
