import { useRootCreateStore } from '../../store'

export const useLibraryWorkbookAction = () => {
  return useRootCreateStore((state) => state.library.workbook.action)
}

export const useLibraryWorkbook = () => {
  return useRootCreateStore((state) => state.library.workbook)
}
