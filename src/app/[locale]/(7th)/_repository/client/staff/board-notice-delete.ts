import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  notifyId: string
  registStaffId: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/staff/board/notice/modify', {
    method: 'delete',
    queryString: {
      notifyId: input.notifyId,
      registStaffId: input.registStaffId,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as deleteBoardNoticeDelete }
