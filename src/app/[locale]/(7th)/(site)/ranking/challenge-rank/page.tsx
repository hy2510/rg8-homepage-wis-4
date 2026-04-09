'use client'

import { useOnLoadReadkingkingRanking } from '@/7th/_client/store/ranking/readingking/hook'
import { useReadingkingRanking } from '@/7th/_client/store/ranking/readingking/selector'
import { useReadingkingEvent } from '@/7th/_client/store/readingking/event/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import {
  Dropdown,
  DropdownItem,
  PillItem,
  Pills,
} from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import { useState } from 'react'
import ChallengeGroupRank from './_cpnt/ChallengeGroupRank'
import ChallengeRank from './_cpnt/ChallengeRank'

const STYLE_ID = 'page_challenge_rank'

export default function Page() {
  const { loading, error } = useOnLoadReadkingkingRanking()

  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Unavailable Challenge.</div>
  }
  return (
    <main>
      <ChallengeRanking />
    </main>
  )
}

function ChallengeRanking() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const eventList = useReadingkingEvent().payload
  const { option: eventOption } = useReadingkingRanking()

  const [eventId, setEventId] = useState(eventOption.eventId)
  const [tab, setTab] = useState<'ReadingKing' | 'Group'>('ReadingKing')

  let eventTitle = ''
  let eventStartDate = ''
  let eventEndDate = ''
  let isEventIng = false
  if (eventList && eventList.length > 0 && eventOption.eventId) {
    const findEvent = eventList.filter((e) => e.eventId === eventOption.eventId)
    if (findEvent.length > 0) {
      eventTitle = findEvent[0].eventTitle
      const startDate = DateUtils.createDate(findEvent[0].startDate)
      const endDate = DateUtils.createDate(findEvent[0].endDate)
      endDate.setHours(23)
      endDate.setMinutes(59)
      endDate.setSeconds(59)
      eventStartDate = DateUtils.toStringDate(startDate, { divide: '. ' })
      eventEndDate = DateUtils.toStringDate(endDate, { divide: '. ' })
      isEventIng =
        startDate.getTime() <= Date.now() && Date.now() <= endDate.getTime()
    }
  }

  const { target } = useSiteBlueprint()
  const isSchool = target.school

  return (
    <main className={style.challenge_rank}>
      <div>
        <Dropdown title={eventTitle}>
          {eventList.map((evt, i) => {
            return (
              <DropdownItem
                key={`a_${evt.eventId}_${i}`}
                onClick={() => {
                  setEventId(evt.eventId)
                }}>
                {evt.eventTitle}
              </DropdownItem>
            )
          })}
        </Dropdown>

        {eventTitle && (
          <div style={{ marginTop: '10px' }}>
            {/* 대회 기간 */}
            <div
              style={{
                color: '#b3b9c2',
              }}>{`${t('t745')}: ${eventStartDate} ~ ${eventEndDate}`}</div>
            {isEventIng && (
              <div style={{ color: '#b3b9c2', marginTop: '10px' }}>
                {/* 오늘 학습한 기록은 내일 오전 랭킹에 반영됩니다. */}
                {t('t746')}
              </div>
            )}
            {isSchool && (
              <ChallengeGroupRankingTab
                currentTab={tab}
                onClick={(tab) => {
                  setTab(tab)
                }}
              />
            )}
          </div>
        )}
      </div>
      {tab === 'ReadingKing' && (
        <ChallengeRank eventId={eventId} school={isSchool} />
      )}
      {tab === 'Group' && <ChallengeGroupRank eventId={eventId} />}
    </main>
  )
}

const ChallengeGroupRankingTab = ({
  currentTab,
  onClick,
}: {
  currentTab: 'ReadingKing' | 'Group'
  onClick?: (item: 'ReadingKing' | 'Group') => void
}) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Pills>
        <PillItem
          active={currentTab === 'ReadingKing'}
          onClick={() => onClick && onClick('ReadingKing')}>
          학생 랭킹
        </PillItem>
        <PillItem
          active={currentTab === 'Group'}
          onClick={() => onClick && onClick('Group')}>
          학교 랭킹
        </PillItem>
      </Pills>
    </div>
  )
}
