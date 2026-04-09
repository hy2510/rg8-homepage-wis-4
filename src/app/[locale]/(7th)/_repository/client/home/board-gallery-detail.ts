import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import { BoardGallery, makeBoardGallery } from '../object/board-gallery'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  boardId: string
}

type Output = BoardGallery

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/home/gallery/' + `${input.boardId}`,
    {
      method: 'get',
    },
  )
  return await execute(request, (json): Output => {
    return makeBoardGallery(json)
  })
}
export type { Output as BoardGalleryResponse }

function newInstance(): Output {
  return makeBoardGallery()
}
export { action as getBoardGallery, newInstance as newBoardGallery }
