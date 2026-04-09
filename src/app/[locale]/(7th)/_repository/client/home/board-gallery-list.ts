import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  BoardGalleryList,
  makeBoardGalleryList,
} from '../object/board-gallery-list'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  page: number
}

type Output = {
  board: BoardGalleryList[]
  writable?: boolean
}

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer('api/home/gallery', {
    method: 'get',
    queryString: {
      page: input.page,
    },
  })
  return await execute(request, (json): Output => {
    return {
      board: json.Board.map(
        (item: any): BoardGalleryList => makeBoardGalleryList(item),
      ),
      writable: json.Writable,
    }
  })
}
export type { Output as BoardGalleryListResponse }

function newInstance(): Output {
  return {
    board: [],
  }
}
export { action as getBoardGalleryList, newInstance as newBoarGalleryList }
