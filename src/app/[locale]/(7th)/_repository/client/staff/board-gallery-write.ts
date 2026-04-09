import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  title: string
  content: string
  imageFileName: string
  imageFileOriginName: string
}

type Output = {
  success: boolean
  boardId: string
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/staff/board/gallery/write', {
    method: 'post',
    body: {
      title: input.title,
      content: input.content,
      imageFileName: input.imageFileName,
      imageFileOriginName: input.imageFileOriginName,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
      boardId: json.boardId,
    }
  })
}

export { action as postBoardGalleryWrite }
export type { Output as BoardGalleryWriteResponse }
