'use client'

import {
  useReadingKingGroupRank,
  useReadingKingRank,
} from '@/8th/features/rank/service/rank-query'
import RankChallengeGroupItem, {
  RankChallengeGroupItemHeader,
} from '@/8th/features/rank/ui/component/RankChallengeGroupItem'
import RankChallengeHeader from '@/8th/features/rank/ui/component/RankChallengeHeader'
import RankChallengeItem from '@/8th/features/rank/ui/component/RankChallengeItem'
import { useReadingKingEventList } from '@/8th/features/readingking/service/readingking-query'
import { useStudentAvatarList } from '@/8th/features/student/service/setting-query'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { RoundedFullButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import Pagenation from '@/8th/shared/ui/Pagenation'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'

const RECORD_PER_PAGE = 10
export default function RankingChallenge() {
  const { menu } = useCustomerConfiguration()

  const avatar = useStudentAvatarList()
  const eventList = useReadingKingEventList()

  if (eventList.isLoading || avatar.isLoading) {
    return <div></div>
  }

  const myAvatar =
    avatar.data?.list.find((item) => item.avatarId === avatar.data?.avatarId)
      ?.imageCircle || ''

  const events =
    eventList.data?.list.map((event, i) => ({
      key: event.eventId,
      title: event.eventTitle,
      startDate: event.startDate,
      endDate: event.endDate,
    })) || []

  return (
    <RankingChallengeList
      myAvatar={myAvatar}
      eventList={events}
      isOpenGroupRank={menu.rank.readingking.groupRank.open}
    />
  )
}

function RankingChallengeList({
  myAvatar,
  eventList,
  isOpenGroupRank,
}: {
  myAvatar: string
  eventList: {
    key: string
    title: string
    startDate: string
    endDate: string
  }[]
  isOpenGroupRank: boolean
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [view, setView] = useState<'Student' | 'Group'>('Student')
  const [selectedEvent, setSelectedEvent] = useState(eventList[0])
  const events = eventList.map((event) => ({
    key: event.key,
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    isActive: event.key === selectedEvent.key,
  }))

  const onChangeEvent = (key: string) => {
    setSelectedEvent(events.find((event) => event.key === key)!)
  }

  return (
    <>
      <RankChallengeHeader events={events} onChangeOption={onChangeEvent} />
      <BoxStyle
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        width="fit-content"
        gap={10}>
        {isOpenGroupRank && (
          <>
            <RoundedFullButton
              viewSmall
              tabs
              active={view === 'Student'}
              onClick={() => {
                setView('Student')
              }}>
              {t('t8th241')}
            </RoundedFullButton>
            <RoundedFullButton
              viewSmall
              tabs
              active={view === 'Group'}
              onClick={() => {
                setView('Group')
              }}>
              {t('t8th242')}
            </RoundedFullButton>
          </>
        )}
      </BoxStyle>
      {view === 'Student' && (
        <RankingStudentList myAvatar={myAvatar} eventId={selectedEvent.key} />
      )}
      {view === 'Group' && <RankingGroupList eventId={selectedEvent.key} />}
    </>
  )
}

function RankingStudentList({
  myAvatar,
  eventId,
}: {
  myAvatar: string
  eventId: string
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)

  const ranking = useReadingKingRank({ eventId })

  if (ranking.isLoading) {
    return <div></div>
  }

  const me = ranking.data?.user
    ? {
        rank: ranking.data.user.totalRank,
        avatar: myAvatar,
        name: ranking.data.user.studentName,
        book: ranking.data.user.bookCount,
        point: ranking.data.user.rgPoint,
        days: ranking.data.user.studyDay,
        schoolClass:
          ranking.data.user.customerName !== '개인회원'
            ? `(${ranking.data.user.customerName} ${ranking.data.user.gradeName})`
            : undefined,
      }
    : undefined
  const list =
    ranking.data?.list
      .filter(
        (_, index) =>
          index < currentPage * RECORD_PER_PAGE &&
          index >= (currentPage - 1) * RECORD_PER_PAGE,
      )
      .map((item) => ({
        rank: item.totalRank,
        avatar: item.imgAvatarRankingList,
        name: item.studentName,
        book: item.bookCount,
        point: item.rgPoint,
        days: item.studyDay,
        schoolClass:
          item.customerName !== '개인회원'
            ? `(${item.customerName} ${item.gradeName})`
            : undefined,
      })) || []

  const maxPage = Math.ceil((ranking.data?.list.length || 0) / RECORD_PER_PAGE)
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div>
        {/* <TextStyle
          fontFamily="sans"
          fontSize="small"
          fontColor="secondary"
          textAlign="right"
          margin="0 20px 10px auto">
          {`· ${t('t8th250')} · ${t('t8th247')} · ${t('t8th248')}`}
        </TextStyle> */}
        {me && (
          <RankChallengeItem
            rank={me.rank}
            avatar={me.avatar}
            name={me.name}
            studyDays={me.days}
            book={me.book}
            point={me.point}
            schoolClass={me.schoolClass}
            isMe
          />
        )}
        {list.map((item, i) => (
          <RankChallengeItem
            key={`${item.rank}-${item.name}-${i}`}
            rank={item.rank}
            avatar={item.avatar}
            name={item.name}
            studyDays={item.days}
            book={item.book}
            point={item.point}
            schoolClass={item.schoolClass}
          />
        ))}
      </div>
      <Pagenation
        maxPage={maxPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  )
}

function RankingGroupList({ eventId }: { eventId: string }) {
  const [currentPage, setCurrentPage] = useState(1)
  const ranking = useReadingKingGroupRank({ eventId })

  if (ranking.isLoading) {
    return <div></div>
  }

  const me = ranking.data?.me
    ? {
        rank: ranking.data.me.totalRank,
        name: ranking.data.me.customerName,
        averagePoint: ranking.data.me.averageRgPoint,
        book: ranking.data.me.bookCount,
        point: ranking.data.me.rgPoint,
      }
    : undefined
  const list =
    ranking.data?.list
      .filter(
        (_, index) =>
          index < currentPage * RECORD_PER_PAGE &&
          index >= (currentPage - 1) * RECORD_PER_PAGE,
      )
      .map((item) => ({
        name: item.customerName,
        rank: item.totalRank,
        averagePoint: item.averageRgPoint,
        point: item.rgPoint,
        book: item.bookCount,
      })) || []

  const maxPage = Math.ceil((ranking.data?.list.length || 0) / RECORD_PER_PAGE)
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div>
        {me ? (
          <RankChallengeGroupItem
            rank={me.rank}
            name={me.name}
            averagePoint={me.averagePoint}
            book={me.book}
            point={me.point}
            isMe
          />
        ) : (
          <RankChallengeGroupItemHeader />
        )}
        {list.map((item, i) => (
          <RankChallengeGroupItem
            key={`${item.rank}-${item.name}-${i}`}
            rank={item.rank}
            name={item.name}
            averagePoint={item.averagePoint}
            book={item.book}
            point={item.point}
          />
        ))}
      </div>
      <Pagenation
        maxPage={maxPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  )
}
