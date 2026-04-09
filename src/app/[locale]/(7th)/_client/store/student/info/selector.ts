import { useRootCreateStore } from '../../store'

export const useStudentInfoAction = () => {
  return useRootCreateStore((state) => state.student.info.action)
}

export const useStudentInfo = () => {
  return useRootCreateStore((state) => state.student.info).payload.student
}

export const useStudentInfoMainPhone = () => {
  const { studentCellPhone, parentCellPhone } = useRootCreateStore(
    (state) => state.student.info,
  ).payload.student

  let userPhone = ''
  if (parentCellPhone) {
    userPhone = parentCellPhone
  } else if (studentCellPhone) {
    userPhone = studentCellPhone
  }
  return userPhone
}

export const useStudentInfoFlagLogin = () => {
  return useRootCreateStore((state) => state.student.info).login
}

export const useStaffInfoFlagLogin = () => {
  return useRootCreateStore((state) => state.student.info).staff
}

export const useStudentIsLogin = () => {
  return !!useRootCreateStore((state) => state.student.info).payload.student
    .studentId
}

export const useStudentStudyable = () => {
  return useRootCreateStore((state) => state.student.info).studyState
}
