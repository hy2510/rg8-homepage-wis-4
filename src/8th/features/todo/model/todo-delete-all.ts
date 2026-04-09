import { execute, makeRequest } from '@/8th/shared/http'
import RenewType from '@/util/string-utils'

function transform(json: any): TodoDeleteAllResponse {
  return {
    success: RenewType.renewBoolean(json.success),
  }
}

export type TodoDeleteAllParams = {}

export type TodoDeleteAllResponse = {
  success: boolean
}

export async function deleteTodoDeleteAll(
  input?: TodoDeleteAllParams,
): Promise<TodoDeleteAllResponse> {
  const request = makeRequest(`api/library/todo`, {
    method: 'delete',
    queryString: {
      isAll: 'Y',
    },
  })
  return await execute(request, transform)
}
