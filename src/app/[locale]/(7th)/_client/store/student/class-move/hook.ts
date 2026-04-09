import repository from '@/7th/_repository/client'
import { ChangeableGroupClassInfoResponse } from '@/7th/_repository/client/student/changeable-group-class-info'
import { useEffect, useState } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentHistoryAction } from '../history/selector'
import { useStudentInfoAction } from '../info/selector'

export function useOnLoadChangeableClassInfo() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [payload, setPayload] = useState<ChangeableGroupClassInfoResponse>()
  const { updateStudyStatus } = useStudentInfoAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.getChangeableGroupClassInfo(),
      )

      if (res.isSuccess && res.payload) {
        setPayload(res.payload)
        if (res.payload.changeable && !res.payload.cancelable) {
          updateStudyStatus(
            true,
            '반 정보를 변경해야 이용 가능합니다.',
            'NEED_CHANGE_CLASS',
          )
        }
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
    payload,
  }
}

export function useFetchClassMove() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const { setInfo, overrideStudentInfoStudyStatus } = useStudentInfoAction()
  const { setHistory } = useStudentHistoryAction()

  const fetch = ({
    studentHistoryId,
    classId,
    callback,
  }: {
    studentHistoryId: string
    classId: string
    callback: (isSuccess: boolean, error?: any) => void
  }) => {
    async function fetching() {
      setLoading(true)
      const res = await fetcher.response(
        repository.postChangeGroupClass({
          studentHistoryId,
          newClassId: classId,
        }),
      )

      if (res.isSuccess) {
        const res = await Promise.all([
          fetcher.response(repository.getStudent()),
          fetcher.response(repository.getStudentHistoryList()),
        ])
        if (res[0].isSuccess && res[1].isSuccess) {
          setInfo(res[0].payload)
          setHistory(res[1].payload)
          overrideStudentInfoStudyStatus()
          callback && callback(true)
        } else {
          setError(res[0].error || res[1].error)
          callback && callback(false, error)
        }
      } else {
        setError(res.error)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    loading,
    fetch,
  }
}
