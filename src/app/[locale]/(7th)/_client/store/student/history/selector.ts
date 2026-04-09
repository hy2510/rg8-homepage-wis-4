import { useRootCreateStore } from '../../store'

export const useStudentHistoryAction = () => {
  return useRootCreateStore((state) => state.student.history.action)
}

export const useStudentHistory = () => {
  return useRootCreateStore((state) => state.student.history)
}

export const useLatestStudentHistoryId = () => {
  const history = useRootCreateStore((state) => state.student.history)
  const defaultHistoryId = history.defaultHistoryId
  const allList = history.payload
  const bookwizardList = allList.filter((item) => item.isBookWizard)

  let latestStudentHistoryId = ''
  if (defaultHistoryId && bookwizardList.length > 0) {
    const isContain =
      bookwizardList.filter(
        (item) => item.studentHistoryId === defaultHistoryId,
      ).length === 1
    if (isContain) {
      latestStudentHistoryId = defaultHistoryId
    }
  }
  if (!latestStudentHistoryId && bookwizardList.length > 0) {
    latestStudentHistoryId = bookwizardList[0].studentHistoryId
  }
  if (!latestStudentHistoryId && allList.length > 0) {
    latestStudentHistoryId = allList[0].studentHistoryId
  }
  return latestStudentHistoryId
}
