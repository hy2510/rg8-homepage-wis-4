import { useRootCreateStore } from '../../store'

export const useLibraryThemeListAction = () => {
  return useRootCreateStore((state) => state.library.themeList.action)
}

export const useLibraryThemeList = () => {
  return useRootCreateStore((state) => state.library.themeList)
}
