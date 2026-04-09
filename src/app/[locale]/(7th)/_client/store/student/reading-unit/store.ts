import {
  EarnReadingUnitResponse,
  newStudentEarnReadingUnit,
} from '@/7th/_repository/client/student/student-earn-reading-unit'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: EarnReadingUnitResponse
}

type Action = {
  setEarnReadingUnit: (payload?: EarnReadingUnitResponse) => void
}

export type ReadingUnitState = {
  readingunit: State & {
    action: Action
  }
}

export const createSliceReadingUnitState: SliceStoreCreator<
  ReadingUnitState
> = (set) => ({
  readingunit: {
    payload: newStudentEarnReadingUnit(),
    action: {
      setEarnReadingUnit: (payload) =>
        set((state) => {
          if (payload) {
            state.student.readingunit.payload = payload
          }
        }),
    },
  },
})
