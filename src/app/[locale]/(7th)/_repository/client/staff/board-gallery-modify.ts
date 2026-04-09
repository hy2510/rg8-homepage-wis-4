import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  boardId: string
  title: string
  content: string
  imageFileName?: string
  imageFileOriginName?: string
  isDeleteImage?: boolean
  registStaffId: string
}

type Output = {
  success: boolean
  boardId: string
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/staff/board/gallery/modify', {
    method: 'post',
    body: {
      boardId: input.boardId,
      title: input.title,
      content: input.content,
      imageFileName: input.imageFileName || '',
      imageFileOriginName: input.imageFileOriginName || '',
      deleteImage: input.isDeleteImage ? 'Y' : 'N',
      registStaffId: input.registStaffId,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
      boardId: json.boardId,
    }
  })
}

export { action as postBoardGalleryModify }
export type { Output as BoardGalleryModifyResponse }
