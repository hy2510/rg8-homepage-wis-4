import repository from '@/7th/_repository/client'
import {
  RankingReadingkingGroupResponse,
  newRankingReadingkingGroup,
} from '@/7th/_repository/client/ranking/readingking-group'
import { useEffect, useState } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useReadingkingEvent } from '../../readingking/event/selector'
import { useStudentIsLogin } from '../../student/info/selector'

export function useOnLoadReadkingkingGroupRanking() {
  const isLogin = useStudentIsLogin()
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [payload, setPayload] = useState<RankingReadingkingGroupResponse>(
    newRankingReadingkingGroup(),
  )

  const events = useReadingkingEvent().payload
  const eventId = events && events.length > 0 ? events[0].eventId : ''
  useEffect(() => {
    if (eventId) {
      const fetching = async () => {
        setLoading(true)
        const option = {
          eventId,
        }
        const res = await fetcher.response(
          repository.getRankingReadingkingGroup({
            ...option,
            isLogin,
          }),
        )

        if (res.isSuccess && res.payload) {
          setPayload(res.payload)
        } else {
          setError(res.error)
        }

        setLoading(false)
      }
      fetching()
    }
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  return {
    loading,
    payload,
    error,
  }
}

export function useFetchReadkingkingGroupRanking() {
  const isLogin = useStudentIsLogin()

  const { loading, setLoading, error, setError } = useFetchBasicState()
  const [payload, setPayload] = useState<RankingReadingkingGroupResponse>(
    newRankingReadingkingGroup(),
  )

  const fetch = ({ eventId: inEventId }: { eventId: string }) => {
    async function fetching() {
      setLoading(true)

      const newOption = {
        eventId: inEventId,
      }
      const res = await fetcher.response(
        repository.getRankingReadingkingGroup({
          ...newOption,
          isLogin,
        }),
      )

      if (res.isSuccess && res.payload) {
        setPayload(res.payload)
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
    payload,
    error,
  }
}
