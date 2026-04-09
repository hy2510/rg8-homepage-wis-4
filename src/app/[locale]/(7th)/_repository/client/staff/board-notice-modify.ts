import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { makeRequest } from '../utils'

type Input = {
  notifyId: string
  title: string
  content: string
  attachFileName?: string
  attachFileOriginName?: string
  imageFileName?: string
  imageFileOriginName?: string
  isDeleteFile?: boolean
  isDeleteImage?: boolean
  registStaffId: string
}

type Output = {
  success: boolean
  notifyId: number
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/staff/board/notice/modify', {
    method: 'post',
    body: {
      notifyId: input.notifyId,
      title: input.title,
      content: input.content,
      attachFileName: input.attachFileName || '',
      attachFileOriginName: input.attachFileOriginName || '',
      imageFileName: input.imageFileName || '',
      imageFileOriginName: input.imageFileOriginName || '',
      deleteFile: input.isDeleteFile ? 'Y' : 'N',
      deleteImage: input.isDeleteImage ? 'Y' : 'N',
      registStaffId: input.registStaffId,
    },
  })
  return await execute(request, (json): Output => {
    return {
      success: json.success,
      notifyId: json.notifyId,
    }
  })
}

export { action as postBoardNoticeModify }
export type { Output as BoardNoticeModifyResponse }
