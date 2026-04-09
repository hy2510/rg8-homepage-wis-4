import {
  StudyReportResponse,
  newStudyReport,
} from '@/7th/_repository/client/history/study-report'
import { SliceStoreCreator } from '../../store'

type State = {
  range: {
    option: {
      range: 1 | 7 | 14 | 30 | 0
      status: string
      page: number
    }
    payload: StudyReportResponse
  }
  custom: {
    option: {
      startDate?: { year: number; month: number; day: number }
      endDate?: { year: number; month: number; day: number }
      keyword?: string
      status: string
      page: number
    }
    payload: StudyReportResponse
  }
}

type Action = {
  setStudyHistoryRange: (
    option?: {
      range: 1 | 7 | 14 | 30 | 0
      status: string
      page: number
    },
    payload?: StudyReportResponse,
  ) => void
  setStudyHistoryCustom: (
    option?: {
      startDate?: { year: number; month: number; day: number }
      endDate?: { year: number; month: number; day: number }
      keyword?: string
      status: string
      page: number
    },
    payload?: StudyReportResponse,
  ) => void
  clearStudyHistoryCustom: () => void
}

export type StudyHistoryState = {
  study: State & {
    action: Action
  }
}

export const createSliceStudyHistoryState: SliceStoreCreator<
  StudyHistoryState
> = (set) => ({
  study: {
    range: {
      option: {
        range: 0,
        status: 'All',
        page: 0,
      },
      payload: newStudyReport(),
    },
    custom: {
      option: {
        status: 'All',
        page: 0,
      },
      payload: newStudyReport(),
    },
    action: {
      setStudyHistoryRange: (option, payload) =>
        set((state) => {
          if (option) {
            state.history.study.range.option = option
          }
          if (payload) {
            if (option?.page && option.page > 1) {
              state.history.study.range.payload.history = [
                ...state.history.study.range.payload.history,
                ...payload.history,
              ]
              state.history.study.range.payload.page.page = option.page
            } else {
              state.history.study.range.payload = payload
            }
          }
        }),
      setStudyHistoryCustom: (option, payload) =>
        set((state) => {
          if (option) {
            state.history.study.custom.option = option
          }
          if (payload) {
            if (option?.page && option.page > 1) {
              state.history.study.custom.payload.history = [
                ...state.history.study.custom.payload.history,
                ...payload.history,
              ]
              state.history.study.custom.payload.page.page = option.page
            } else {
              state.history.study.custom.payload = payload
            }
          }
        }),
      clearStudyHistoryCustom: () =>
        set((state) => {
          state.history.study.custom = {
            option: {
              status: 'All',
              page: 0,
            },
            payload: newStudyReport(),
          }
        }),
    },
  },
})
