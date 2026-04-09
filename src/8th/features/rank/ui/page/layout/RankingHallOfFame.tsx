'use client'

import { useHallOfFameRank } from '@/8th/features/rank/service/rank-query'
import RankHallOfFameHeader from '@/8th/features/rank/ui/component/RankHallOfFameHeader'
import RankHallOfFameItem from '@/8th/features/rank/ui/component/RankHallOfFameItem'
import { TextStyle } from '@/8th/shared/ui/Misc'
import Pagenation from '@/8th/shared/ui/Pagenation'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'

const RECORD_PER_PAGE = 10

export default function RankingHallOfFame() {
  // @Language 'common'
  const { t } = useTranslation()

  const hallOfFame = useHallOfFameRank()

  const [currentPage, setCurrentPage] = useState(1)

  if (hallOfFame.isLoading) {
    return <div></div>
  }

  const me = hallOfFame.data?.user
    ? {
        rank: hallOfFame.data.user.no,
        medal: hallOfFame.data.user.hallOfFameGrade.toLowerCase() as
          | 'titanium'
          | 'platinum'
          | 'gold'
          | 'silver'
          | 'bronze',
        name: hallOfFame.data.user.studentName,
        book: hallOfFame.data.user.bookCount,
        point: hallOfFame.data.user.rgPoint,
        date: hallOfFame.data.user.registDate.substring(0, 10),
      }
    : undefined
  const list =
    hallOfFame.data?.list
      .filter(
        (_, index) =>
          index < currentPage * RECORD_PER_PAGE &&
          index >= (currentPage - 1) * RECORD_PER_PAGE,
      )
      .map((item) => ({
        rank: item.no,
        medal: item.hallOfFameGrade.toLowerCase() as
          | 'titanium'
          | 'platinum'
          | 'gold'
          | 'silver'
          | 'bronze',
        name: item.studentName,
        book: item.bookCount,
        point: item.rgPoint,
        date: item.registDate.substring(0, 10),
      })) || []

  const maxPage = Math.ceil(
    (hallOfFame.data?.list.length || 0) / RECORD_PER_PAGE,
  )
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <RankHallOfFameHeader />
      <div>
        <TextStyle
          fontFamily="sans"
          fontSize="small"
          fontColor="secondary"
          textAlign="right"
          margin="0 20px 10px auto">
          {`· ${t('t8th247')} · ${t('t8th248')} · ${t('t8th246')}`}
        </TextStyle>
        {me && (
          <RankHallOfFameItem
            rank={me.rank}
            medal={me.medal}
            name={me.name}
            book={me.book}
            point={me.point}
            date={me.date}
            isMe
          />
        )}
        {list.map((item) => (
          <RankHallOfFameItem
            key={item.rank}
            rank={item.rank}
            medal={item.medal}
            name={item.name}
            book={item.book}
            point={item.point}
            date={item.date}
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
