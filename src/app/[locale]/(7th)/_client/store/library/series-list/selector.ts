import { useRootCreateStore } from '../../store'

export const useLibrarySeriesListAction = () => {
  return useRootCreateStore((state) => state.library.seriesList.action)
}

export const useLibrarySeriesList = () => {
  return useRootCreateStore((state) => state.library.seriesList)
}
