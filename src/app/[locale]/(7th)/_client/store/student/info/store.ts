import {
  StudentResponse,
  newStudent,
} from '@/7th/_repository/client/student/student'
import { SliceStoreCreator } from '../../store'

type StudentLoginStatus = 'unknown' | 'on' | 'off'
type StaffLoginStatus = 'unknown' | 'on' | 'off'

type State = {
  payload: StudentResponse
  studyState: {
    isStudyEnd: boolean
    studyEndMessage: string
    value?: 'END' | 'NEED_PAYMENT' | 'PAUSED' | 'NEED_CHANGE_CLASS'
  }
  login: StudentLoginStatus
  staff: StaffLoginStatus
}

type Action = {
  setInfo: (payload?: StudentResponse) => void
  studentLogOn: () => void
  staffLogOn: () => void
  studentLogOff: () => void
  staffLogOff: () => void
  clear: () => void
  overrideStudentInfoStudyStatus: () => void
  updateStudyStatus: (
    isStudyEnd: boolean,
    studyEndMessage: string,
    value?: 'END' | 'NEED_PAYMENT' | 'PAUSED' | 'NEED_CHANGE_CLASS',
  ) => void
  updateStudentName: (name: string) => void
  updatePhoneNumber: (phone: string) => void
  updateSmsAgree: (isAgree: boolean) => void
  updateStudySetting: (
    type:
      | 'EBKListenRepeat'
      | 'EB1ListenRepeat'
      | 'ViewStep3Hint'
      | 'ViewStep2Skip'
      | 'StudyReadingUnitId',
    value: boolean | string,
  ) => void
  updateStudyReadingUnit: (readingUnitId: string) => void
}

export type InfoState = {
  info: State & {
    action: Action
  }
}

export const createSliceInfoState: SliceStoreCreator<InfoState> = (set) => ({
  info: {
    payload: newStudent(),
    login: 'unknown',
    staff: 'unknown',
    studyState: {
      isStudyEnd: false,
      studyEndMessage: '',
      value: undefined,
    },
    action: {
      setInfo: (payload) =>
        set((state) => {
          if (payload) {
            state.student.info.payload = payload

            if (state.student.info.studyState.value !== 'NEED_CHANGE_CLASS') {
              state.student.info.studyState.isStudyEnd =
                payload.studyState.isStudyEnd
              state.student.info.studyState.studyEndMessage =
                payload.studyState.studyEndMessage
              state.student.info.studyState.value = payload.studyState.value
            }
          }
        }),
      studentLogOn: () =>
        set((state) => {
          state.student.info.login = 'on'
        }),
      studentLogOff: () =>
        set((state) => {
          state.student.info.login = 'off'
        }),
      staffLogOn: () =>
        set((state) => {
          state.student.info.staff = 'on'
        }),
      staffLogOff: () =>
        set((state) => {
          state.student.info.staff = 'off'
        }),
      clear: () =>
        set((state) => {
          state.student.info.payload = newStudent()
          state.student.info.login = 'off'
          state.student.info.staff = 'off'
          state.student.info.studyState.value = undefined
        }),
      updateStudentName: (name: string) =>
        set((state) => {
          state.student.info.payload.student.name = name
        }),
      updatePhoneNumber: (phone: string) =>
        set((state) => {
          state.student.info.payload.student.parentCellPhone = phone
        }),
      updateSmsAgree: (isAgree: boolean) =>
        set((state) => {
          state.student.info.payload.student.smsReceiveYN = isAgree
          state.student.info.payload.student.smsEventInfomationYn = isAgree
          state.student.info.payload.student.smsStudyReportYn = isAgree
        }),
      updateStudySetting: (type, value) =>
        set((state) => {
          if (type === 'EBKListenRepeat') {
            state.student.info.payload.student.eBKListenRepeat =
              value as boolean
          } else if (type === 'EB1ListenRepeat') {
            state.student.info.payload.student.eB1ListenRepeat =
              value as boolean
          } else if (type === 'ViewStep2Skip') {
            state.student.info.payload.student.viewStep2Skip = value as boolean
          } else if (type === 'ViewStep3Hint') {
            state.student.info.payload.student.viewStep3Hint = value as boolean
          } else if (type === 'StudyReadingUnitId') {
            state.student.info.payload.student.studyReadingUnitId =
              value as string
          }
        }),
      updateStudyReadingUnit: (readingUnitId) =>
        set((state) => {
          state.student.info.payload.student.studyReadingUnitId = readingUnitId
        }),
      overrideStudentInfoStudyStatus: () =>
        set((state) => {
          state.student.info.studyState.isStudyEnd =
            state.student.info.payload.studyState.isStudyEnd
          state.student.info.studyState.studyEndMessage =
            state.student.info.payload.studyState.studyEndMessage
          state.student.info.studyState.value =
            state.student.info.payload.studyState.value
        }),
      updateStudyStatus: (isStudyEnd, studyEndMessage, value) =>
        set((state) => {
          state.student.info.studyState.isStudyEnd = isStudyEnd
          state.student.info.studyState.studyEndMessage = studyEndMessage
          state.student.info.studyState.value = value
        }),
    },
  },
})
