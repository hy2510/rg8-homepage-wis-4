'use client'

import { useFetchReadkingkingGroupRanking } from '@/7th/_client/store/ranking/readingking-group/hook'
import { RankReadingkingGroup } from '@/7th/_repository/client/object/rank-readingking-group'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import { ReactNode, useEffect } from 'react'

const STYLE_ID = 'page_challenge_rank'

export default function ChallengeGroupRank({ eventId }: { eventId: string }) {
  // @Language 'common'
  const { t } = useTranslation()

  const { fetch, payload: rank } = useFetchReadkingkingGroupRanking()
  useEffect(() => {
    fetch({ eventId })
  }, [eventId])

  const rankList = rank.list
  const rankGroup = rank.me
  return (
    <>
      {rankGroup && (
        <>
          <SubTitle>{`학교 랭킹`}</SubTitle>
          <GroupEngagementStatus
            rank={rankGroup.totalRank}
            customerName={rankGroup.customerName}
            bookCount={rankGroup.bookCount}
            rgPoint={rankGroup.rgPoint}
            averageRgPoint={rankGroup.averageRgPoint}
          />
        </>
      )}
      <SubTitle
        message={false ? `${t('t399')}  : 2023.05.23 화요일 오전 12:04` : ''}>
        {t('t400')}
      </SubTitle>
      <GroupLeaderboard rankList={rankList} />
    </>
  )
}

const GroupEngagementStatus = ({
  rank = -1,
  customerName,
  bookCount,
  rgPoint,
  averageRgPoint,
}: {
  rank: number
  customerName: string
  bookCount: number
  rgPoint: number
  averageRgPoint: number
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.user_engagement_status}>
      <ColumnBox label={t('t396')} contents={rank <= 0 ? '###' : `${rank}`} />
      <ColumnBox label={'학교 이름'} contents={customerName} />
      <ColumnBox label={t('평균 포인트')} contents={`${averageRgPoint}`} />
      <ColumnBox label={t('t160')} contents={`${rgPoint}`} />
      <ColumnBox label={t('t395')} contents={`${bookCount}`} />
    </div>
  )
}

export const GroupLeaderboard = ({
  rankList,
}: {
  rankList: RankReadingkingGroup[]
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.leaderboard}>
      <div className={style.table_header}>
        <div className={style.th_item}>{t('t396')}</div>
        <div className={style.th_item}>{'학교 이름'}</div>
        <div className={style.th_item}>{'평균 포인트'}</div>
        <div className={style.th_item}>
          {`${t('t160')}`}
          <span>{` /  ${t('t395')} `}</span>
        </div>
      </div>
      {rankList.map((a) => {
        return (
          <TableRow
            key={`Rank_${a.num}_${a.customerId}`}
            rank={a.totalRank}
            schoolName={a.customerName}
            avgRgPoint={a.averageRgPoint}
            rgPoint={a.rgPoint}
            bookCount={a.bookCount}
          />
        )
      })}
    </div>
  )
}

const SubTitle = ({
  children,
  message,
}: {
  children?: ReactNode
  message?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.sub_title}>
      {children}
      <span>{message}</span>
    </div>
  )
}

const ColumnBox = ({ label, contents }: { label: string; contents: any }) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.column_box}>
      <div className={style.label}>{label}</div>
      <div className={style.contents}>{contents}</div>
    </div>
  )
}

const TableRow = ({
  rank = 0,
  schoolName,
  rgPoint,
  bookCount,
  avgRgPoint,
}: {
  rank?: number
  schoolName?: string
  rgPoint?: number
  bookCount?: number
  avgRgPoint?: number
}) => {
  const style = useStyle(STYLE_ID)
  return (
    <div
      className={`
        ${style.table_row} 
        ${rank >= 1 && rank < 4 ? style.top_ranker : ''}`}>
      <div className={`${style.rank}`}>{rank}</div>
      <div className={`${style.student_name} ${''}`}>
        <div className={style.txt_student_name}>{schoolName}</div>
      </div>
      <div className={style.txt_present}>{avgRgPoint}</div>
      <div className={style.txt_earn_points}>
        {rgPoint && NumberUtils.toRgDecimalPoint(rgPoint)} / {bookCount}
      </div>
    </div>
  )
}
