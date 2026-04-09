import {
  default as Repository,
  default as repository,
} from '@/7th/_repository/client'
import { useEffect } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useLibraryFilterAction } from '../../library/filter/selector'
import { useStudentAvatarAction } from '../avatar/selector'
import { useStudentHistoryAction } from '../history/selector'
import { useStudentInfoAction } from './selector'

export function useOnLoadStudentInfo() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const { setInfo } = useStudentInfoAction()
  const { setEbPbFilter, setPkFilter } = useLibraryFilterAction()

  useEffect(() => {
    function convertEBPBFilter(status: string, genre: string, sort: string) {
      let cvStatus = status.length > 6 ? status.substring(6) : 'All'
      if (cvStatus.includes('Complete')) {
        cvStatus = 'Complete'
      } else if (cvStatus !== 'Before') {
        cvStatus = 'All'
      }
      let cvGenre = genre.length > 5 ? genre.substring(5) : 'All'
      if (cvGenre === 'NonFiction') {
        cvGenre = 'Nonfiction'
      } else if (cvGenre !== 'Fiction') {
        cvGenre = 'All'
      }

      return {
        status: cvStatus,
        genre: cvGenre,
        sort,
      }
    }

    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(repository.getStudent())

      if (res.isSuccess && res.payload) {
        const data = res.payload
        const student = data.student
        setInfo(data)

        const ebFilter = convertEBPBFilter(
          student.libraryStatusName,
          student.libraryGenreName,
          student.libraryFindSortName,
        )
        setEbPbFilter('EB', ebFilter)
        const pbFilter = convertEBPBFilter(
          student.libraryPBStatusName,
          student.libraryPBGenreName,
          student.libraryPBFindSortName,
        )
        setEbPbFilter('PB', pbFilter)
        let pkActivity =
          student.libraryCourseName.length > 6
            ? student.libraryCourseName.substring(6)
            : 'All'
        if (
          pkActivity !== 'Alphabet' &&
          pkActivity !== 'Phonics' &&
          pkActivity !== 'Word' &&
          pkActivity !== 'Story'
        ) {
          pkActivity = 'All'
        }
        setPkFilter({ activity: pkActivity })
      } else {
        setError(res.error)
      }

      setLoading(false)
    }
    fetching()
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
  }
}

export function useUpdateStudentLogOn() {
  const { studentLogOn } = useStudentInfoAction()
  return studentLogOn
}

export function useUpdateStaffLogOn() {
  const { staffLogOn } = useStudentInfoAction()
  return staffLogOn
}

export function useFetchStudentInfo() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setInfo } = useStudentInfoAction()

  const fetch = () => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(repository.getStudent())

      if (res.isSuccess) {
        setInfo(res.payload)
      } else {
        setError(res.error)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchUpdateStudentName() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { updateStudentName } = useStudentInfoAction()

  const fetch = ({
    studentName,
    callback,
  }: {
    studentName: string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.putChangeStudentName({ studentName }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false
        callback && callback(success)
        updateStudentName(studentName)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchUpdatePhoneNumberRequest() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    phone,
    callback,
  }: {
    phone: string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        Repository.postStudentPhoneRequest({ phoneNumber: phone }),
      )

      if (res.isSuccess && res.payload && res.payload.success) {
        callback && callback(true)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchUpdatePhoneNumberCert() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { updatePhoneNumber } = useStudentInfoAction()

  const fetch = ({
    phone,
    authCode,
    callback,
  }: {
    phone: string
    authCode: string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        Repository.postStudentPhoneCert({
          phoneNumber: phone,
          authCode,
          update: true,
        }),
      )

      if (res.isSuccess && res.payload && res.payload.success) {
        ///

        updatePhoneNumber(phone)
        callback && callback(true)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchChnagePassword() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    newPassword,
    oldPassword,
    callback,
  }: {
    newPassword: string
    oldPassword: string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postChangePassword({ newPassword, oldPassword }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false
        callback && callback(success)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchModifySmsReceive() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { updateSmsAgree } = useStudentInfoAction()

  const fetch = ({
    isReceive,
    callback,
  }: {
    isReceive: boolean
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        repository.postChangeSmsAgree({ isReceive }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false
        updateSmsAgree(isReceive)
        callback && callback(success)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchChangeStudySetting() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const fetch = ({
    type,
    value,
    callback,
  }: {
    type:
      | 'EBKListenRepeat'
      | 'EB1ListenRepeat'
      | 'ViewStep3Hint'
      | 'ViewStep2Skip'
      | 'StudyReadingUnitId'
    value: boolean | string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      let isEbkListenRepeat: boolean | undefined = undefined
      let isEb1ListenRepeat: boolean | undefined = undefined
      let isViewStep3Hint: boolean | undefined = undefined
      let isViewStep2Skip: boolean | undefined = undefined
      let studyReadingUnitId: string | undefined = undefined
      if (type === 'EBKListenRepeat') {
        isEbkListenRepeat = value as boolean
      } else if (type === 'EB1ListenRepeat') {
        isEb1ListenRepeat = value as boolean
      } else if (type === 'ViewStep2Skip') {
        isViewStep2Skip = value as boolean
      } else if (type === 'ViewStep3Hint') {
        isViewStep3Hint = value as boolean
      } else if (type === 'StudyReadingUnitId') {
        studyReadingUnitId = value as string
      }
      const res = await fetcher.response(
        repository.postChangeStudySetting({
          type,
          isEbkListenRepeat,
          isEb1ListenRepeat,
          isViewStep3Hint,
          isViewStep2Skip,
          studyReadingUnitId,
        }),
      )

      if (res.isSuccess) {
        const success = res.payload ? res.payload.success : false
        callback && callback(success)
      } else {
        setError(res.error)
        callback && callback(false)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchSetStudentAvatarAndReadingUnit() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { changeAvatar } = useStudentAvatarAction()
  const { updateStudyReadingUnit } = useStudentInfoAction()

  const fetch = ({
    avatarId,
    readingUnitId,
    callback,
  }: {
    avatarId: string
    readingUnitId: string
    callback?: (isSuccess: boolean) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const resPromise = await Promise.all([
        fetcher.response(repository.putStudentAvatarUpdate({ avatarId })),
        fetcher.response(
          repository.postChangeStudySetting({
            type: 'StudyReadingUnitId',
            studyReadingUnitId: readingUnitId,
          }),
        ),
      ])

      if (
        resPromise[0].isSuccess &&
        !!resPromise[0].payload &&
        resPromise[1].isSuccess &&
        !!resPromise[1].payload
      ) {
        const success =
          resPromise[0].payload.success && resPromise[1].payload.success
        if (success) {
          changeAvatar(avatarId)
          updateStudyReadingUnit(readingUnitId)
        }
        callback && callback(success)
      } else {
        if (resPromise[0].error) {
          setError(resPromise[0].error)
        } else if (resPromise[1].error) {
          setError(resPromise[1].error)
        }
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchReloadStudentStudyState() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setInfo } = useStudentInfoAction()
  const { setHistory } = useStudentHistoryAction()

  const fetch = ({
    callback,
  }: {
    callback?: (isSuccess: boolean, error?: any) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await Promise.all([
        fetcher.response(repository.getStudent()),
        fetcher.response(repository.getStudentHistoryList()),
      ])

      if (res[0].isSuccess && res[1].isSuccess) {
        setInfo(res[0].payload)
        setHistory(res[1].payload)
        callback && callback(true)
      } else {
        setError(res[0].error || res[1].error)
        callback && callback(false, error)
      }

      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}
