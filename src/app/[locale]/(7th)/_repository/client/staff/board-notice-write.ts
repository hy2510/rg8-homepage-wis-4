import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  title: string
  content: string
  attachFileName?: string
  attachFileOriginName?: string
  imageFileName?: string
  imageFileOriginName?: string
}

type Output = {
  success: boolean
  notifyId: number
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/staff/board/notice/write', {
    method: 'post',
    body: {
      title: input.title,
      content: input.content,
      attachFileName: input.attachFileName || '',
      attachFileOriginName: input.attachFileOriginName || '',
      imageFileName: input.imageFileName || '',
      imageFileOriginName: input.imageFileOriginName || '',
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
      notifyId: json.notifyId,
    }
  })
}

export { action as postBoardNoticeWrite }
export type { Output as BoardNoticeWriteResponse }
