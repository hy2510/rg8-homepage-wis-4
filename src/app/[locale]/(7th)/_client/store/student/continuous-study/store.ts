import {
  ContinuousStudyResponse,
  newContinuousStudy,
} from '@/7th/_repository/client/student/continuous-study'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: ContinuousStudyResponse
}

type Action = {
  setContinuousStudy: (payload?: ContinuousStudyResponse) => void
  setContinuousStudyViewType: (viewType: '6' | '7') => void
}

export type ContinuousStudyState = {
  continuous: State & {
    action: Action
  }
}

export const createSliceContinuousStudyState: SliceStoreCreator<
  ContinuousStudyState
> = (set) => ({
  continuous: {
    payload: newContinuousStudy(),
    action: {
      setContinuousStudy: (payload) =>
        set((state) => {
          if (payload) {
            state.student.continuous.payload = payload
          }
        }),
      setContinuousStudyViewType: (viewType) =>
        set((state) => {
          state.student.continuous.payload.continuousViewType = viewType
        }),
    },
  },
})
