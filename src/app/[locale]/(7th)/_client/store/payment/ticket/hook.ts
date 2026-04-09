import Repository from '@/7th/_repository/client'
import { RegistTicket } from '@/7th/_repository/client/object/regist-ticket'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentHistoryAction } from '../../student/history/selector'
import { useStudentInfoAction } from '../../student/info/selector'

export function useFetchRegistTicket() {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const { setInfo } = useStudentInfoAction()
  const { setHistory } = useStudentHistoryAction()

  const fetch = ({
    tickets,
    callback,
  }: {
    tickets: string[]
    callback?: (isSuccess: boolean, result?: RegistTicket) => void
  }) => {
    async function fetching() {
      setLoading(true)

      const res = await fetcher.response(
        Repository.putRegistTicket({
          tickets,
        }),
      )

      if (res.error) {
        setError(res.error)
        callback && callback(false)
      } else {
        let success = false
        let partialSuccess = false
        if (res.payload) {
          success = res.payload.final
          if (success) {
            partialSuccess = true
          } else {
            res.payload.result.forEach((item) => {
              if (!partialSuccess) {
                partialSuccess = item.code === 0
              }
            })
          }
        }
        if (partialSuccess) {
          const studyRes = await Promise.all([
            fetcher.response(Repository.getStudent()),
            fetcher.response(Repository.getStudentHistoryList()),
          ])
          if (studyRes[0].isSuccess && studyRes[1].isSuccess) {
            setInfo(studyRes[0].payload)
            setHistory(studyRes[1].payload)
          } else {
            success = false
          }
        }

        callback && callback(success, res.payload)
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
