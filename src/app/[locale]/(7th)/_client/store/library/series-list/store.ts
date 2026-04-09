import {
  CategorySeriesResponse,
  newCategorySeries,
} from '@/7th/_repository/client/library/category/category-series'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    bookType: string
    level?: string
    isAll?: boolean
  }
  payload: CategorySeriesResponse
}

type Action = {
  setSeriesList: (
    option?: {
      bookType: string
      level?: string
      isAll?: boolean
    },
    payload?: CategorySeriesResponse,
  ) => void
}

export type SeriesListState = {
  seriesList: State & {
    action: Action
  }
}

export const createSliceSeriesListState: SliceStoreCreator<SeriesListState> = (
  set,
) => ({
  seriesList: {
    option: {
      bookType: '',
      level: undefined,
      isAll: undefined,
    },
    payload: newCategorySeries(),
    action: {
      setSeriesList: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.seriesList.option = option
          }
          if (payload) {
            state.library.seriesList.payload = payload
          }
        }),
    },
  },
})
