'use client'

import {
  useExportBookList,
  useExportReport,
  useExportVocabulary,
  useExportWorksheet,
} from '@/8th/features/export/service/export-query'
import {
  useAddFavoriteList,
  useDeleteFavoriteList,
} from '@/8th/features/library/service/library-query'
import {
  useAddTodoList,
  useDeleteTodoList,
} from '@/8th/features/todo/service/todo-query'
import { useState } from 'react'

export type Definition1Value = 'kor' | 'vtn' | 'chi' | 'jap' | 'ine'
export type VocabularyOption = {
  vocabulary: boolean
  definition1: boolean
  definition1Value?: Definition1Value
  definition2: boolean
  exampleSentence: boolean
  studentName: boolean
}
type BaseSelectItem = {
  levelRoundId: string
  studyId?: string
  studentHistoryId?: string
  levelName?: string
}
type SearchSelectItem = BaseSelectItem & {
  isAddableYn: boolean
}
type TodoSelectItem = BaseSelectItem & {
  studyId: string
  studentHistoryId: string
  levelName: string
  isDeleteableYn: boolean
}
type ReportSelectItem = BaseSelectItem & {
  studyId: string
  studentHistoryId: string
  levelName: string
}
type SelectItem = SearchSelectItem | TodoSelectItem | ReportSelectItem
type SelectItemType = 'search' | 'todo' | 'favorite' | 'report'

function useExportPanel<T extends SelectItem>(selectItemType: SelectItemType) {
  const { mutate: addTodos, isPending: isAddingTodo } = useAddTodoList()
  const { mutate: deleteTodos, isPending: isDeletingTodo } = useDeleteTodoList()
  const { mutate: addFavorites, isPending: isAddingFavorite } =
    useAddFavoriteList()
  const { mutate: deleteFavorites, isPending: isDeletingFavorite } =
    useDeleteFavoriteList()
  const { mutate: exportBookList } = useExportBookList()
  const { mutate: exportVocabulary } = useExportVocabulary()
  const { mutate: exportReport } = useExportReport()
  const { mutate: exportWorksheets } = useExportWorksheet()

  const [selectedItems, setSelectedItems] = useState<Map<string, T>>(new Map())

  const setSelectItemChange = (key: string, item: T, isChecked: boolean) => {
    const newMap = new Map(selectedItems)
    if (isChecked) {
      newMap.set(key, { ...item })
    } else {
      newMap.delete(key)
    }
    setSelectedItems(newMap)
  }

  const getSelectedItems = (isUseFilter?: (item: T) => boolean): T[] => {
    const items: T[] = []
    selectedItems.forEach((item) => {
      if (!isUseFilter || isUseFilter(item)) {
        items.push(item)
      }
    })
    return items
  }

  const resetSelectedItem = () => {
    setSelectedItems(new Map())
  }

  const isSelectedItem = (key: string): boolean => {
    return selectedItems.has(key)
  }

  const onActionAddFavorite = (
    callback?: (success: boolean, error: unknown) => void,
  ) => {
    const items = getSelectedItems().map((item) => item.levelRoundId)
    if (items.length > 0) {
      if (isAddingFavorite) {
        return
      }
      addFavorites(
        {
          levelRoundIds: items,
        },
        {
          onSettled: (data, error, variables) => {
            if (!error) {
              callback?.(true, undefined)
            } else {
              callback?.(false, error)
            }
          },
        },
      )
    } else {
      callback?.(false, undefined)
    }
  }

  const onActionDeleteFavorite =
    selectItemType === 'favorite'
      ? (callback?: (success: boolean, error: unknown) => void) => {
          const items = getSelectedItems().map((item) => item.levelRoundId)
          if (items.length > 0) {
            if (isDeletingFavorite) {
              return
            }
            deleteFavorites(
              { levelRoundIds: items },
              {
                onSettled: (data, error, variables) => {
                  if (!error) {
                    callback?.(true, undefined)
                  } else {
                    callback?.(false, error)
                  }
                },
              },
            )
          } else {
            callback?.(false, undefined)
          }
        }
      : undefined

  const onActionBookList = (
    callback?: (success: boolean, url: string, error: unknown) => void,
  ) => {
    const items = getSelectedItems().map((item) => item.levelRoundId)
    if (items.length > 0) {
      exportBookList(
        { levelRoundIds: items },
        {
          onSettled: (data, error, variables) => {
            if (!error) {
              callback?.(!!data, data ?? '', undefined)
            } else {
              callback?.(false, '', error)
            }
          },
        },
      )
    } else {
      callback?.(false, '', undefined)
    }
  }

  const onActionVocabulary = (
    params: { studentHistoryId: string; vocabularyOption?: VocabularyOption },
    callback?: (success: boolean, url: string, error: unknown) => void,
  ) => {
    const items = getSelectedItems().map((item) => item.levelRoundId)

    if (items.length > 0) {
      exportVocabulary(
        {
          levelRoundIds: items,
          studentHistoryId: params.studentHistoryId,
          vocabularyOption: params.vocabularyOption ?? undefined,
        },
        {
          onSettled: (data, error, variables) => {
            if (!error) {
              callback?.(!!data, data ?? '', undefined)
            } else {
              callback?.(false, '', error)
            }
          },
        },
      )
    } else {
      callback?.(false, '', undefined)
    }
  }

  const onActionAddTodo =
    selectItemType === 'search' || selectItemType === 'favorite'
      ? (
          studentHistoryId: string,
          callback?: (success: boolean, error: unknown) => void,
        ) => {
          if (isAddingTodo) {
            return
          }
          const items = getSelectedItems(
            (item) => !!item && (item as SearchSelectItem).isAddableYn,
          ).map((item) => item.levelRoundId)
          if (items.length > 0) {
            addTodos(
              {
                levelRoundIds: items,
                studentHistoryId,
              },
              {
                onSettled: (data, error, variables) => {
                  if (!error) {
                    callback?.(true, undefined)
                  } else {
                    callback?.(false, error)
                  }
                },
              },
            )
          } else {
            callback?.(false, undefined)
          }
        }
      : undefined

  const onActionDeleteTodo =
    selectItemType === 'todo'
      ? (callback?: (success: boolean, error: unknown) => void) => {
          const items = getSelectedItems(
            (item) => !!item && (item as TodoSelectItem).isDeleteableYn,
          ).map((item) => (item as TodoSelectItem).studyId)
          if (items.length > 0) {
            if (isDeletingTodo) {
              return
            }
            deleteTodos(
              { studyIds: items },
              {
                onSettled: (data, error, variables) => {
                  if (!error) {
                    callback?.(true, undefined)
                  } else {
                    callback?.(false, error)
                  }
                },
              },
            )
          } else {
            callback?.(false, undefined)
          }
        }
      : undefined

  const onActionReport = (
    callback?: (success: boolean, url: string, error: unknown) => void,
  ) => {
    const items = getSelectedItems()
      .filter((item) => item.studyId && item.studentHistoryId)
      .map((item) => {
        return {
          studyId: item.studyId!,
          studentHistoryId: item.studentHistoryId!,
        }
      })
    if (items.length > 0) {
      exportReport(
        {
          studyIds: items.map((item) => item.studyId),
          studentHistoryIds: items.map((item) => item.studentHistoryId),
        },
        {
          onSettled: (data, error, variables) => {
            if (!error) {
              callback?.(!!data, data ?? '', undefined)
            } else {
              callback?.(false, '', error)
            }
          },
        },
      )
    } else {
      callback?.(false, '', undefined)
    }
  }

  const onActionWorksheets = (
    callback?: (success: boolean, url: string, error: unknown) => void,
  ) => {
    const items = getSelectedItems()
      .filter((item) => item.levelName)
      .map((item) => item.levelName!.replace(/-/g, '').toUpperCase())
    if (items.length > 0) {
      exportWorksheets(
        {
          levelNames: items,
        },
        {
          onSettled: (data, error, variables) => {
            if (!error) {
              callback?.(!!data, data ?? '', undefined)
            } else {
              callback?.(false, '', error)
            }
          },
        },
      )
    } else {
      callback?.(false, '', undefined)
    }
  }

  return {
    selectedItemCount: selectedItems.size,
    setSelectItemChange,
    resetSelectedItem,
    isSelectedItem,
    getSelectedItems,
    onActionAddFavorite,
    onActionDeleteFavorite,
    onActionBookList,
    onActionVocabulary,
    onActionAddTodo,
    onActionDeleteTodo,
    onActionReport,
    onActionWorksheets,
  }
}

export function useExportPanelSearch() {
  const selectItemHook = useExportPanel<SearchSelectItem>('search')

  return {
    selectedItemCount: selectItemHook.selectedItemCount,
    setSelectItemChange: selectItemHook.setSelectItemChange,
    resetSelectedItem: selectItemHook.resetSelectedItem,
    isSelectedItem: selectItemHook.isSelectedItem,
    getSelectedItems: selectItemHook.getSelectedItems,
    onActionAddFavorite: selectItemHook.onActionAddFavorite,
    onActionBookList: selectItemHook.onActionBookList,
    onActionVocabulary: selectItemHook.onActionVocabulary,
    onActionAddTodo: selectItemHook.onActionAddTodo!,
  }
}

export function useExportPanelFavorite() {
  const selectItemHook = useExportPanel<SearchSelectItem>('favorite')

  return {
    selectedItemCount: selectItemHook.selectedItemCount,
    setSelectItemChange: selectItemHook.setSelectItemChange,
    resetSelectedItem: selectItemHook.resetSelectedItem,
    isSelectedItem: selectItemHook.isSelectedItem,
    onActionAddFavorite: selectItemHook.onActionAddFavorite,
    onActionBookList: selectItemHook.onActionBookList,
    onActionVocabulary: selectItemHook.onActionVocabulary,
    onActionAddTodo: selectItemHook.onActionAddTodo!,
    onActionDeleteFavorite: selectItemHook.onActionDeleteFavorite!,
  }
}

export function useExportPanelTodo() {
  const selectItemHook = useExportPanel<TodoSelectItem>('todo')

  return {
    selectedItemCount: selectItemHook.selectedItemCount,
    setSelectItemChange: selectItemHook.setSelectItemChange,
    resetSelectedItem: selectItemHook.resetSelectedItem,
    isSelectedItem: selectItemHook.isSelectedItem,
    onActionAddFavorite: selectItemHook.onActionAddFavorite,
    onActionBookList: selectItemHook.onActionBookList,
    onActionVocabulary: selectItemHook.onActionVocabulary,
    onActionDeleteTodo: selectItemHook.onActionDeleteTodo!,
  }
}

export function useExportPanelReport() {
  const selectItemHook = useExportPanel<ReportSelectItem>('report')

  return {
    selectedItemCount: selectItemHook.selectedItemCount,
    setSelectItemChange: selectItemHook.setSelectItemChange,
    resetSelectedItem: selectItemHook.resetSelectedItem,
    isSelectedItem: selectItemHook.isSelectedItem,
    onActionVocabulary: selectItemHook.onActionVocabulary,
    onActionReport: selectItemHook.onActionReport,
    onActionWorksheets: selectItemHook.onActionWorksheets,
  }
}
