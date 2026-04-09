import {
  SearchWorkbookResponse,
  newSearchWorkbook,
} from '@/7th/_repository/client/library/search/search-workbook'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    level: string
    volume: number
    page: number
  }
  payload: SearchWorkbookResponse
}

type Action = {
  setWorkbook: (
    option?: { level: string; volume: number; page: number },
    payload?: SearchWorkbookResponse,
  ) => void
  updateAddTodoFlag: (levelRoundIds: string[], isAdd: boolean) => void
}

export type WorkbookState = {
  workbook: State & {
    action: Action
  }
}

export const createSliceWorkbookState: SliceStoreCreator<WorkbookState> = (
  set,
) => ({
  workbook: {
    option: {
      level: '',
      volume: 0,
      page: 1,
    },
    payload: newSearchWorkbook(),
    action: {
      setWorkbook: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.workbook.option = option
          }
          if (payload) {
            state.library.workbook.payload = payload
          }
        }),
      updateAddTodoFlag: (levelRoundIds, isAdd) =>
        set((state) => {
          const levelRoundIdsSet = new Set([...levelRoundIds])
          state.library.workbook.payload.book =
            state.library.workbook.payload.book.map((book) => {
              if (levelRoundIdsSet.has(book.levelRoundId)) {
                return { ...book, addYn: !isAdd }
              } else {
                return book
              }
            })
        }),
    },
  },
})
