import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  boardId: string
  registStaffId: string
}

type Output = {
  success: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/staff/board/gallery/modify', {
    method: 'delete',
    queryString: {
      boardId: input.boardId,
      registStaffId: input.registStaffId,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
    }
  })
}

export { action as deleteBoardGalleryDelete }
