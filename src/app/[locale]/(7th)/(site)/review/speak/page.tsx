'use client'

import { useOnLoadSpeakReport } from '@/7th/_client/store/history/speak/hook'
import { useHistorySpeak } from '@/7th/_client/store/history/speak/selector'
import {
  DateObject,
  toDateObject,
  toStringDate,
} from '@/7th/_client/store/history/study/hook'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import { ReportSearchBox } from '@/7th/_ui/modules/review-detail-view-search-box/review-detail-view-search-box'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SpeakingList from '../_cpnt/SpeakingList'

export const dynamic = 'force-dynamic'

export default function Page() {
  const router = useRouter()
  const params = useSearchParams()

  const startDate = params.get('startDate') || ''
  const endDate = params.get('endDate') || ''

  const { loading, redirect } = useOnLoadSpeakReport({
    baseUrl: SITE_PATH.REVIEW.SPEAK,
    startDate,
    endDate,
  })

  useEffect(() => {
    if (redirect) {
      router.replace(redirect)
    }
  }, [router, redirect])

  if (redirect) {
    return <LoadingScreen />
  }
  return <HistoryLayout initLoading={loading} />
}

function HistoryLayout({ initLoading }: { initLoading?: boolean }) {
  // @Language 'common'
  const { t } = useTranslation()

  const option = useHistorySpeak().option

  const [startDate, setStartDate] = useState<DateObject>(
    option.startDate ? { ...option.startDate } : toDateObject(''),
  )
  const sYear = option.startDate?.year || 0
  const sMonth = option.startDate?.month || 0
  const sDay = option.startDate?.day || 0
  useEffect(() => {
    if (sYear > 0) {
      setStartDate({
        year: sYear,
        month: sMonth,
        day: sDay,
      })
    }
  }, [sYear, sMonth, sDay])
  const [endDate, setEndDate] = useState<DateObject>(
    option.endDate ? { ...option.endDate } : toDateObject(''),
  )
  const eYear = option.endDate?.year || 0
  const eMonth = option.endDate?.month || 0
  const eDay = option.endDate?.day || 0
  useEffect(() => {
    if (eYear > 0) {
      setEndDate({
        year: eYear,
        month: eMonth,
        day: eDay,
      })
    }
  }, [eYear, eMonth, eDay])

  const [dateSyncKey, setDateSyncKey] = useState<number>(Date.now())

  const startDateText = toStringDate(startDate, true)
  const endDateText = toStringDate(endDate, true)

  const router = useRouter()
  const onSearch = (startDt: string, endDt: string, _: string) => {
    const startDateDeserial = toDateObject(startDt)
    const endDateDeserial = toDateObject(endDt)
    const isReverseDate =
      Number(
        startDt.substring(0, 4) +
          startDt.substring(5, 7) +
          startDt.substring(8, 10),
      ) >
      Number(
        endDt.substring(0, 4) + endDt.substring(5, 7) + endDt.substring(8, 10),
      )
    const pStartDate = isReverseDate ? endDateDeserial : startDateDeserial
    const pEndDate = isReverseDate ? startDateDeserial : endDateDeserial

    const isChangeDate =
      pStartDate.year !== startDate.year ||
      pStartDate.month !== startDate.month ||
      pStartDate.day !== startDate.day ||
      pEndDate.year !== endDate.year ||
      pEndDate.month !== endDate.month ||
      pEndDate.day !== endDate.day

    const dayDistance = DateUtils.dayDistance(
      DateUtils.createDate(toStringDate(pStartDate)),
      DateUtils.createDate(toStringDate(pEndDate)),
    )

    // 검색 기간 180일 제한,
    if (dayDistance > 180) {
      alert(t('t763')) // 180일을 초과하여 검색할 수 없습니다.
      setDateSyncKey(Date.now())
      return
    }

    if (isChangeDate) {
      const date = `${pStartDate.year}-${pStartDate.month < 10 ? '0' : ''}${pStartDate.month}-${pStartDate.day < 10 ? '0' : ''}${pStartDate.day}`
      const enddate = `${pEndDate.year}-${pEndDate.month < 10 ? '0' : ''}${pEndDate.month}-${pEndDate.day < 10 ? '0' : ''}${pEndDate.day}`
      router.push(
        `${SITE_PATH.REVIEW.SPEAK}?startDate=${date}&endDate=${enddate}`,
      )
    }
  }

  return (
    <>
      <ReportSearchBox
        key={dateSyncKey}
        recommendPeriod={[1, 7, 15, 30]}
        startDate={startDateText}
        endDate={endDateText}
        isHideKeyword={true}
        keyword={''}
        isSearching={initLoading}
        onClickSearch={onSearch}
      />
      {!initLoading && <SpeakingList isReportLoading={false} />}
    </>
  )
}
