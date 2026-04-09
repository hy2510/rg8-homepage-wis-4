import { SliceStoreCreator } from '../store'
import {
  DodoAbcBookState,
  createSliceLevelDodoAbcState,
} from './dodo-abc/store'
import { FavoriteState, createSliceFavoriteState } from './favorites/store'
import { FilterState, createSliceFilterState } from './filter/store'
import { HomeState, createSliceHomeState } from './home/store'
import { LevelBookState, createSliceLevelBookState } from './level/store'
import { MovieBookState, createSliceMovieBookState } from './movie/store'
import { NewBookState, createSliceNewBookState } from './new-book/store'
import { PreKBookState, createSliceLevelPreKState } from './pre-k/store'
import { SearchBookState, createSliceSearchBookState } from './search/store'
import {
  SeriesListState,
  createSliceSeriesListState,
} from './series-list/store'
import { SeriesState, createSliceSeriesState } from './series/store'
import { ThemeListState, createSliceThemeListState } from './theme-list/store'
import { ThemeState, createSliceThemeState } from './theme/store'
import { TodoState, createSliceTodo } from './todos/store'
import { TryAgainState, createSliceTryAgainState } from './try-again/store'
import { WorkbookState, createSliceWorkbookState } from './workbook/store'

export type LibraryState = {
  library: FilterState &
    HomeState &
    FavoriteState &
    SearchBookState &
    TryAgainState &
    TodoState &
    ThemeState &
    SeriesState &
    NewBookState &
    LevelBookState &
    MovieBookState &
    PreKBookState &
    DodoAbcBookState &
    WorkbookState &
    SeriesListState &
    ThemeListState
}

export const createLibraryStore: SliceStoreCreator<LibraryState> = (...a) => {
  return {
    library: {
      ...createSliceHomeState(...a),
      ...createSliceFavoriteState(...a),
      ...createSliceTodo(...a),
      ...createSliceTryAgainState(...a),
      ...createSliceNewBookState(...a),
      ...createSliceSearchBookState(...a),
      ...createSliceLevelBookState(...a),
      ...createSliceMovieBookState(...a),
      ...createSliceSeriesState(...a),
      ...createSliceThemeState(...a),
      ...createSliceLevelPreKState(...a),
      ...createSliceLevelDodoAbcState(...a),
      ...createSliceFilterState(...a),
      ...createSliceWorkbookState(...a),
      ...createSliceSeriesListState(...a),
      ...createSliceThemeListState(...a),
    },
  }
}
