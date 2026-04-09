'use client'

import { Assets } from '@/8th/assets/asset-library'
import { HistorySpeak } from '@/8th/features/review/model/history-speak'
import { useHistorySpeaking } from '@/8th/features/review/service/history-query'
import {
  ActionBarDropdownItem,
  ReviewActionBar,
} from '@/8th/features/review/ui/component/ReviewActionBar'
import ReviewSpeakItem from '@/8th/features/review/ui/component/ReviewSpeakItem'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import {
  BookListDateGroupStyle,
  ReviewListStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { GapStyle } from '@/8th/shared/styled/SharedStyled'
import { RoundedFullButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SpeakResultHistory({
  startDate,
  endDate,
}: {
  startDate?: string
  endDate?: string
}) {
  //@language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const onChangeDate = (startDate: string, endDate: string) => {
    router.replace(
      `${SITE_PATH.NW82.REVIEW_SPEAK}?startDate=${startDate}&endDate=${endDate}`,
    )
  }

  if (!startDate || !endDate) {
    return <div>Invalid parameters.</div>
  }

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th047')}`}
        parentPath={SITE_PATH.NW82.ACTIVITY}
      />
      <SpeakResultHistoryList
        startDate={startDate}
        endDate={endDate}
        onChangeDate={onChangeDate}
      />
    </>
  )
}

function SpeakResultHistoryList({
  startDate,
  endDate,
  onChangeDate,
}: {
  startDate: string
  endDate: string
  onChangeDate?: (startDate: string, endDate: string) => void
}) {
  const { menu } = useCustomerConfiguration()
  // FIXME: Site 개별 설정 적용 필요 (target, studyOpen)

  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const [status, setStatus] = useState<'All' | 'Passed' | 'Failed'>('All')

  const history = useHistorySpeaking({
    startDate: startDate,
    endDate: endDate,
    status: 'All',
  })

  if (history.isLoading) {
    return <div>Loading...</div>
  }
  if (!history.data) {
    return <div>No data</div>
  }

  const historyLength = history.data.history.length
  const passedCount = history.data.history.filter(
    (history) => history.speakPassYn,
  ).length
  const failedCount = historyLength - passedCount

  const dateOrderAllList: { date: string; list: HistorySpeak[] }[] = []
  if (!history.isFetching && !history.isLoading && history.data) {
    history.data.history
      .filter((history) => {
        if (status === 'All') {
          return true
        } else if (status === 'Passed') {
          return history.speakPassYn
        } else if (status === 'Failed') {
          return !history.speakPassYn
        }
      })
      .forEach((history, i) => {
        if (i === 0) {
          dateOrderAllList.push({ date: history.speakDate, list: [history] })
        } else if (
          dateOrderAllList[dateOrderAllList.length - 1].date ===
          history.speakDate
        ) {
          dateOrderAllList[dateOrderAllList.length - 1].list.push(history)
        } else {
          dateOrderAllList.push({ date: history.speakDate, list: [history] })
        }
      })
  }

  let searchTitle = ''
  if (startDate && endDate) {
    const dayDistance = DateUtils.dayDistance(
      DateUtils.createDate(startDate),
      DateUtils.createDate(endDate),
      true,
    )
    searchTitle = `${t('t8th049', { num: dayDistance })}`
  }

  const onDateSearch = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return

    setStatus('All')
    if (onChangeDate) {
      onChangeDate(startDate.replace(/-/g, ''), endDate.replace(/-/g, ''))
    }
  }

  const historyTypeText = t('t8th068')
  const historyTypeItems: ActionBarDropdownItem[] = []
  if (menu.activity.result.read.open) {
    historyTypeItems.push({
      key: 'HistoryTypeReading',
      label: t('t8th067'),
      isActive: false,
    })
  }
  if (menu.activity.result.speak.open) {
    historyTypeItems.push({
      key: 'HistoryTypeSpeaking',
      label: t('t8th068'),
      isActive: true,
    })
  }
  if (menu.activity.result.write.open) {
    historyTypeItems.push({
      key: 'HistoryTypeWriting',
      label: t('t8th069'),
      isActive: false,
    })
  }

  const onHistoryTypeItemClick = (item: ActionBarDropdownItem) => {
    let pStartDate = startDate?.replace(/-/g, '')
    let pEndDate = endDate?.replace(/-/g, '')
    if (!pStartDate || !pEndDate) {
      const today = new Date()
      const tmpDate = new Date()
      tmpDate.setDate(tmpDate.getDate() - 14)
      pStartDate = DateUtils.toStringDate(tmpDate, {
        divide: '',
        digitfix: true,
      })
      pEndDate = DateUtils.toStringDate(today, { divide: '', digitfix: true })
    }

    if (item.key === 'HistoryTypeReading') {
      router.replace(
        `${SITE_PATH.NW82.REVIEW}?startDate=${pStartDate}&endDate=${pEndDate}`,
      )
    } else if (item.key === 'HistoryTypeWriting') {
      router.replace(
        `${SITE_PATH.NW82.REVIEW_WRITE}?startDate=${pStartDate}&endDate=${pEndDate}`,
      )
    } else if (item.key === 'HistoryTypeSpeaking') {
    }
  }

  return (
    <>
      <ReviewListStyle>
        <ReviewActionBar
          title={searchTitle}
          startDate={startDate}
          endDate={endDate}
          searchOptionOpen={!history.isFetching && historyLength === 0}
          disableKeyword={true}
          onChangeDate={onDateSearch}
          dropdowns={[
            {
              title: historyTypeText,
              isTitleBlack: true,
              isActiveMakerVisible: true,
              items: historyTypeItems,
              onItemClick: onHistoryTypeItemClick,
            },
          ]}
        />
        {historyLength > 0 ? (
          <>
            <BoxStyle
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              width="fit-content"
              gap={10}>
              <RoundedFullButton
                viewSmall
                tabs
                active={status === 'All'}
                onClick={() => {
                  setStatus('All')
                }}>
                {t('t8th052', { num: historyLength })}
              </RoundedFullButton>
              <RoundedFullButton
                viewSmall
                tabs
                active={status === 'Passed'}
                onClick={() => {
                  setStatus('Passed')
                }}>
                {t('t8th073', { num1: passedCount })}
              </RoundedFullButton>
              <RoundedFullButton
                viewSmall
                tabs
                active={status === 'Failed'}
                onClick={() => {
                  setStatus('Failed')
                }}>
                {t('t8th054', { num: failedCount })}
              </RoundedFullButton>
            </BoxStyle>

            {dateOrderAllList.map((item) => {
              return (
                <BookListDateGroupStyle key={item.date}>
                  <TextStyle
                    fontSize="medium"
                    fontColor="secondary"
                    className="divider">
                    {DateUtils.toRgDateEnglishFormat(item.date)} (
                    {item.list.length})
                  </TextStyle>
                  <GapStyle size={5} />
                  <BoxStyle
                    display="grid"
                    gridTemplateColumns="repeat(1, 1fr)"
                    gap={20}>
                    {item.list.map((history) => {
                      return (
                        <ReviewSpeakItem
                          key={history.studyId}
                          title={history.title}
                          src={history.surfaceImagePath}
                          levelName={history.levelName}
                          isPassed={history.speakPassYn}
                          studyDate={DateUtils.toRgDateEnglishFormat(
                            history.speakDate,
                            'MD',
                          )}
                        />
                      )
                    })}
                  </BoxStyle>
                </BookListDateGroupStyle>
              )
            })}
          </>
        ) : (
          // 학습 기록이 없을 때
          <BoxStyle
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={20}
            minHeight="200px">
            <Image
              src={Assets.Image.emptyResults}
              alt="empty"
              width={120}
              height={120}
            />
            <TextStyle fontFamily="sans" fontSize="small" fontColor="secondary">
              {t('t8th061')}
            </TextStyle>
          </BoxStyle>
        )}
      </ReviewListStyle>
    </>
  )
}
