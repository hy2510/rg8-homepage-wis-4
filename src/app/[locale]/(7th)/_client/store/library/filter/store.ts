import { SliceStoreCreator } from '../../store'

type State = {
  EB: {
    sort: string
    status: string
    genre: string
    mode?: string
  }
  PB: {
    sort: string
    status: string
    genre: string
    mode?: string
  }
  PK: {
    activity: string
  }
  Dodo: {
    activity: string
  }
}

type Action = {
  setEbPbFilter: (
    type: string,
    option: { sort: string; status: string; genre: string; mode?: string },
  ) => void
  setPkFilter: (option: { activity: string }) => void
  setDodoFilter: (option: { activity: string }) => void
}

export type FilterState = {
  filter: State & {
    action: Action
  }
}

export const createSliceFilterState: SliceStoreCreator<FilterState> = (
  set,
) => ({
  filter: {
    EB: {
      sort: 'Preference',
      status: 'All',
      genre: 'All',
      mode: undefined,
    },
    PB: {
      sort: 'Preference',
      status: 'All',
      genre: 'All',
      mode: undefined,
    },
    PK: {
      activity: 'All',
    },
    Dodo: {
      activity: 'Study-Alphabet',
    },
    action: {
      setEbPbFilter: (type, option) =>
        set((state) => {
          if (type === 'EB') {
            state.library.filter.EB = option
          } else {
            state.library.filter.PB = option
          }
        }),
      setPkFilter: (option) =>
        set((state) => {
          state.library.filter.PK = option
        }),
      setDodoFilter: (option) =>
        set((state) => {
          state.library.filter.Dodo = option
        }),
    },
  },
})
