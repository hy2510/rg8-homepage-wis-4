import { useRootCreateStore } from '../../store'

export const useStudentReadingUnitAction = () => {
  return useRootCreateStore((state) => state.student.readingunit.action)
}

export const useStudentReadingUnit = () => {
  const earnReadingUnit = useRootCreateStore(
    (state) => state.student.readingunit,
  ).payload
  const userReadingUnitId = useRootCreateStore(
    (state) => state.student.info.payload.student.studyReadingUnitId,
  )
  const filteredReadingUnit = earnReadingUnit.filter(
    (item) => item.readingUnitId === userReadingUnitId,
  )
  let userReadingUnit: {
    name: string
    readingUnitId: string
    id: string
    image: string
  }
  if (filteredReadingUnit.length > 0) {
    userReadingUnit = { ...filteredReadingUnit[0] }
  } else {
    userReadingUnit = { ...earnReadingUnit[0] }
  }

  const readingUnit = {
    userReadingUnit,
    earnReadingUnit,
  }
  return readingUnit
}
