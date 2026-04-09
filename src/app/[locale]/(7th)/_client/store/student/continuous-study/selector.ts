import { useRootCreateStore } from '../../store'

export const useStudentContinuousStudyAction = () => {
  return useRootCreateStore((state) => state.student.continuous.action)
}

export const useStudentContinuousStudy = () => {
  const continuousStudy = useRootCreateStore(
    (state) => state.student.continuous.payload,
  )
  const isViewModeNewType = continuousStudy.continuousViewType !== '6'
  return {
    isViewModeNewType,
    continuous: isViewModeNewType
      ? continuousStudy.continuous
      : continuousStudy.continuous6th,
    isTodayActive: continuousStudy.todayStudyYn,
  }
}

export const useStudentContinuousStudyNewType = () => {
  const continuousStudy = useRootCreateStore(
    (state) => state.student.continuous.payload,
  )
  return {
    continuous: continuousStudy.continuous,
    isTodayActive: continuousStudy.todayStudyYn,
  }
}
