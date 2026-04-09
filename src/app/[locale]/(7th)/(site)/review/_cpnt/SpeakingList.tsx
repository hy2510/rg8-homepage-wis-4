'use client'

import { useHistorySpeak } from '@/7th/_client/store/history/speak/selector'
import {
  EmptyMessage,
  PillItem,
  Pills,
} from '@/7th/_ui/common/common-components'
import {
  SpeakReportItem,
  SpeakReportsList,
} from '@/7th/_ui/modules/review-detail-view-reports/review-detail-view-reports'
import useTranslation from '@/localization/client/useTranslations'
import { useMemo, useState } from 'react'

export default function SpeakingList({
  isReportLoading,
}: {
  isReportLoading: boolean
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const history = useHistorySpeak().payload

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')
  const allCount = history.length
  const { passedCount } = useMemo(() => {
    let passedCount = 0
    history.forEach((item) => {
      if (item.speakPassYn) {
        passedCount++
      }
    })
    return {
      passedCount,
    }
  }, [history])
  const failedCount = allCount - passedCount

  const list = history.filter((item) => {
    if (tab === 'passed') {
      return item.speakPassYn
    } else if (tab === 'failed') {
      return !item.speakPassYn
    } else {
      return true
    }
  })

  const t415 = t('t415')

  return (
    <>
      <Pills>
        <PillItem active={tab === 'all'} onClick={() => setTab('all')}>
          {t('t412', { num: allCount })}
        </PillItem>
        <PillItem active={tab === 'passed'} onClick={() => setTab('passed')}>
          {t('t413', { num: passedCount })}
        </PillItem>
        <PillItem active={tab === 'failed'} onClick={() => setTab('failed')}>
          {t('t414', { num: failedCount })}
        </PillItem>
      </Pills>
      {!isReportLoading && list && list.length === 0 ? (
        <EmptyMessage>
          <div dangerouslySetInnerHTML={{ __html: t415 }}></div>
        </EmptyMessage>
      ) : (
        <>
          <SpeakReportsList>
            {list.map((a, i) => {
              return (
                <SpeakReportItem
                  key={`speak-item-${a.levelName}-${i}`}
                  imgSrc={a.surfaceImagePath}
                  bookCode={a.levelName}
                  title={a.title}
                  studyDate={a.speakDate}
                  totalScore={a.average}
                  isPassed={a.speakPassYn}
                  completedInfo={''}
                  earnPoints={a.rgPoint}
                />
              )
            })}
          </SpeakReportsList>
          {/* <Pagination>
          <PaginationItem active={true}>1</PaginationItem>
        </Pagination> */}
        </>
      )}
    </>
  )
}
