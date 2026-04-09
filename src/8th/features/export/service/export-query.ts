import { OverrideMutationOptions } from '@/8th/shared/react-query/types'
import { useMutation } from '@tanstack/react-query'
import { getExportBookList } from '../model/export-book-list'
import { getExportReport } from '../model/export-report'
import { getExportVocabulary } from '../model/export-vocabulary'
import { getExportWorkSheet } from '../model/export-worksheet'

export function useExportBookList(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (params: { levelRoundIds: string[] }) =>
      getExportBookList(params),
  })
}

export function useExportVocabulary(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: async (params: {
      levelRoundIds: string[]
      studentHistoryId: string
      vocabularyOption?: {
        vocabulary: boolean
        definition1: boolean
        definition1Value?: 'kor' | 'chi' | 'jap' | 'vtn' | 'ine'
        definition2: boolean
        exampleSentence: boolean
        studentName: boolean
      }
    }) => {
      const response = await getExportVocabulary({
        levelRoundIds: params.levelRoundIds,
        studentHistoryId: params.studentHistoryId,
      })
      let url = response
      if (!!params.vocabularyOption) {
        const option = params.vocabularyOption

        const urlObj = new URL(response)
        const urlParams = new URLSearchParams(urlObj.search)

        const paramsMap = new Map()
        urlParams.forEach((value, key) => {
          paramsMap.set(key, value)
        })
        paramsMap.set('args4', option.vocabulary ? 'Y' : 'N')
        if (option.definition1) {
          paramsMap.set('args5', option.definition1Value)
        } else {
          paramsMap.set('args5', 'N')
        }
        paramsMap.set('args6', option.definition2 ? 'Y' : 'N')
        paramsMap.set('args7', option.exampleSentence ? 'Y' : 'N')
        paramsMap.set('args8', option.studentName ? 'Y' : 'N')
        const searchParams = new URLSearchParams()
        paramsMap.forEach((value, key) => {
          searchParams.append(key, value)
        })
        const queryString = searchParams.toString()

        url = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}?${queryString}`
      }

      return url
    },
  })
}

export function useExportReport(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (params: { studyIds: string[]; studentHistoryIds: string[] }) =>
      getExportReport(params),
  })
}

export function useExportWorksheet(options?: OverrideMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: (params: { levelNames: string[] }) =>
      getExportWorkSheet(params),
  })
}
