import repository from '@/7th/_repository/client'
import DateUtils from '@/util/date-utils'
import { useEffect, useState } from 'react'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { DateObject } from '../study/hook'
import { useHistoryStudy, useHistoryStudyAction } from '../study/selector'
import { useHistorySpeak, useHistorySpeakAction } from './selector'

export function useOnLoadSpeakReportQuick() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useHistorySpeakAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)

      const range = 30
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - range)
      const endDate = new Date()

      const startDateOption = {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }
      const endDateOption = {
        range,
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }
      const option = {
        startDate: `${startDateOption.year}${
          startDateOption.month > 9
            ? startDateOption.month
            : `0${startDateOption.month}`
        }${
          startDateOption.day > 9
            ? startDateOption.day
            : `0${startDateOption.day}`
        }`,
        endDate: `${endDateOption.year}${
          endDateOption.month > 9
            ? endDateOption.month
            : `0${endDateOption.month}`
        }${
          endDateOption.day > 9 ? endDateOption.day : `0${endDateOption.day}`
        }`,
        status: 'All',
      }
      const res = await fetcher.response(repository.getSpeakingReport(option))

      if (res.isSuccess) {
        action.setSpeakHistory(
          {
            range,
            startDate: startDateOption,
            endDate: endDateOption,
            status: option.status,
          },
          res.payload,
        )
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

export function useOnLoadSpeakReport({
  baseUrl,
  startDate: inStartDate,
  endDate: inEndDate,
}: {
  baseUrl: string
  startDate?: string
  endDate?: string
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const [redirect, setRedirect] = useState('')
  const action = useHistorySpeakAction()

  useEffect(() => {
    async function fetching(parameter: {
      startDate: DateObject
      pStartDate: string
      endDate: DateObject
      pEndDate: string
    }) {
      setLoading(true)

      const option = {
        startDate: parameter.pStartDate.replace(/-/g, ''),
        endDate: parameter.pEndDate.replace(/-/g, ''),
        status: 'All',
        page: 1,
      }
      const res = await fetcher.response(repository.getSpeakingReport(option))
      if (res.isSuccess) {
        action.setSpeakHistory(
          {
            range: 0,
            startDate: parameter.startDate,
            endDate: parameter.endDate,
            status: 'All',
          },
          res.payload,
        )
      } else {
        setError(res.error)
      }
      setLoading(false)
    }

    function defaultStartDate(startDate: Date): Date {
      startDate.setDate(startDate.getDate() - 15 + 1)
      return startDate
    }

    let searchType = 'redirect'
    let tStartDate: Date
    let tEndDate: Date

    if (!inStartDate) {
      tStartDate = new Date()
      tEndDate = new Date()

      tStartDate = defaultStartDate(tStartDate)
    } else if (inStartDate && inEndDate) {
      tStartDate = DateUtils.createDate(inStartDate)
      if (tStartDate.getFullYear() < 2000) {
        tStartDate = new Date()
        tEndDate = new Date()

        tStartDate = defaultStartDate(tStartDate)
      } else {
        searchType = 'date'
        const dayDistance = DateUtils.dayDistance(
          tStartDate,
          DateUtils.createDate(inEndDate),
        )
        if (dayDistance > 180) {
          tEndDate = DateUtils.createDate(inStartDate)
          tEndDate.setDate(tStartDate.getDate() + 180 - 1)
        } else if (dayDistance < 0) {
          tEndDate = DateUtils.createDate(inStartDate)
        } else {
          tEndDate = DateUtils.createDate(inEndDate)
        }
      }
    } else if (inStartDate) {
      searchType = 'date'
      tStartDate = DateUtils.createDate(inStartDate)
      tEndDate = DateUtils.createDate(inStartDate)
    } else {
      tStartDate = new Date()
      tEndDate = new Date()

      tStartDate = defaultStartDate(tStartDate)
    }

    if (searchType === 'date') {
      setRedirect('')
      fetching({
        startDate: {
          year: tStartDate.getFullYear(),
          month: tStartDate.getMonth() + 1,
          day: tStartDate.getDate(),
        },
        endDate: {
          year: tEndDate.getFullYear(),
          month: tEndDate.getMonth() + 1,
          day: tEndDate.getDate(),
        },
        pStartDate: DateUtils.toStringDate(tStartDate),
        pEndDate: DateUtils.toStringDate(tEndDate),
      })
    } else {
      // Redirect
      setLoading(false)
      setError('Invalid parameters.')
      setRedirect(
        `${baseUrl}?startDate=${DateUtils.toStringDate(tStartDate)}&endDate=${DateUtils.toStringDate(tEndDate)}`,
      )
    }
  }, [inStartDate, inEndDate, baseUrl])

  return {
    loading,
    error,
    redirect,
  }
}

export function useFetchSpeakReportRange() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useHistorySpeakAction()
  const { option } = useHistorySpeak()

  const fetch = ({ range, status }: { range: 7 | 14 | 30; status: string }) => {
    async function fetching() {
      setLoading(true)

      const startDate = new Date()
      startDate.setDate(startDate.getDate() - range)
      const endDate = new Date()

      const startDateOption = {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }
      const endDateOption = {
        range,
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }
      const newOption = {
        startDate: `${startDateOption.year}${
          startDateOption.month > 9
            ? startDateOption.month
            : `0${startDateOption.month}`
        }${
          startDateOption.day > 9
            ? startDateOption.day
            : `0${startDateOption.day}`
        }`,
        endDate: `${endDateOption.year}${
          endDateOption.month > 9
            ? endDateOption.month
            : `0${endDateOption.month}`
        }${
          endDateOption.day > 9 ? endDateOption.day : `0${endDateOption.day}`
        }`,
        status,
      }
      const res = await fetcher.response(
        repository.getSpeakingReport(newOption),
      )

      if (res.isSuccess) {
        action.setSpeakHistory(
          {
            range,
            startDate: startDateOption,
            endDate: endDateOption,
            status: newOption.status,
          },
          res.payload,
        )
      } else {
        action.setSpeakHistory(option)
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

export function useFetchSpeakReport() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useHistorySpeakAction()
  const { option } = useHistorySpeak()
  const studyAction = useHistoryStudyAction()
  const { option: studyOption } = useHistoryStudy().custom

  const fetch = ({
    startDate: inStartDate,
    endDate: inEndDate,
    status,
  }: {
    startDate: { year: number; month: number; day: number }
    endDate: { year: number; month: number; day: number }
    status: string
  }) => {
    async function fetching() {
      setLoading(true)

      const range = 0
      const startDate = new Date(
        inStartDate.year,
        inStartDate.month - 1,
        inStartDate.day,
      )
      const endDate = new Date(
        inEndDate.year,
        inEndDate.month - 1,
        inEndDate.day,
      )

      const startDateOption = {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }
      const endDateOption = {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }
      const newOption = {
        startDate: `${startDateOption.year}${
          startDateOption.month > 9
            ? startDateOption.month
            : `0${startDateOption.month}`
        }${
          startDateOption.day > 9
            ? startDateOption.day
            : `0${startDateOption.day}`
        }`,
        endDate: `${endDateOption.year}${
          endDateOption.month > 9
            ? endDateOption.month
            : `0${endDateOption.month}`
        }${
          endDateOption.day > 9 ? endDateOption.day : `0${endDateOption.day}`
        }`,
        range,
        status,
      }
      const res = await fetcher.response(
        repository.getSpeakingReport(newOption),
      )

      if (res.isSuccess) {
        action.setSpeakHistory(
          {
            range,
            startDate: startDateOption,
            endDate: endDateOption,
            status: newOption.status,
          },
          res.payload,
        )
      } else {
        action.setSpeakHistory(option)
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
