import {
  CategoryThemeResponse,
  newCategoryTheme,
} from '@/7th/_repository/client/library/category/category-theme'
import { SliceStoreCreator } from '../../store'

type State = {
  option: {
    bookType: string
    level?: string
    isAll?: boolean
  }
  payload: CategoryThemeResponse
}

type Action = {
  setThemeList: (
    option?: {
      bookType: string
      level?: string
      isAll?: boolean
    },
    payload?: CategoryThemeResponse,
  ) => void
}

export type ThemeListState = {
  themeList: State & {
    action: Action
  }
}

export const createSliceThemeListState: SliceStoreCreator<ThemeListState> = (
  set,
) => ({
  themeList: {
    option: {
      bookType: '',
      level: undefined,
      isAll: undefined,
    },
    payload: newCategoryTheme(),
    action: {
      setThemeList: (option, payload) =>
        set((state) => {
          if (option) {
            state.library.themeList.option = option
          }
          if (payload) {
            state.library.themeList.payload = payload
          }
        }),
    },
  },
})
