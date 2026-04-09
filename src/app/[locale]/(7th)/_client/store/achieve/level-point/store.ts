import {
  LevelPointResponse,
  newLevelPoint,
} from '@/7th/_repository/client/achievement/level-point'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: LevelPointResponse
}

type Action = {
  setLevelPoint: (payload?: LevelPointResponse) => void
}

export type LevelPointState = {
  levelPoint: State & {
    action: Action
  }
}

export const createSliceLevelPointState: SliceStoreCreator<LevelPointState> = (
  set,
) => ({
  levelPoint: {
    payload: newLevelPoint(),
    action: {
      setLevelPoint: (payload) =>
        set((state) => {
          if (payload) {
            state.achieve.levelPoint.payload = payload
          }
        }),
    },
  },
})
