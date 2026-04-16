'use client'

import { usePointRank } from '@/8th/features/rank/service/rank-query'
import RankMonthlyHeader from '@/8th/features/rank/ui/component/RankMonthlyHeader'
import RankMonthlyItem from '@/8th/features/rank/ui/component/RankMonthlyItem'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { TextStyle } from '@/8th/shared/ui/Misc'
import Pagenation from '@/8th/shared/ui/Pagenation'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'

const RECORD_PER_PAGE = 10

export default function RankingMonth() {
  // @Language 'common'
  const { t } = useTranslation()
  const { menu } = useCustomerConfiguration()

  const [period, setPeriod] = useState<'monthly' | 'total'>('monthly')
  const [grade, setGrade] = useState<number>(0)

  const rankTypes = [
    {
      key: 'monthly',
      label: t('t8th231', { txt: `${new Date().getMonth() + 1}` }),
      isActive: period === 'monthly',
    },
    {
      key: 'total',
      label: t('t8th230'),
      isActive: period === 'total',
    },
  ]
  const grades = [
    { key: '0', label: t('t8th232'), isActive: grade === 0 },
    { key: '1', label: t('t8th233'), isActive: grade === 1 },
    { key: '2', label: t('t8th234'), isActive: grade === 2 },
    { key: '3', label: t('t8th235'), isActive: grade === 3 },
    { key: '4', label: t('t8th236'), isActive: grade === 4 },
    { key: '5', label: t('t8th237'), isActive: grade === 5 },
    { key: '6', label: t('t8th238'), isActive: grade === 6 },
  ]

  const ranking = usePointRank({
    type: period === 'total' ? 'total' : 'monthly',
  })

  const [currentPage, setCurrentPage] = useState(1)

  const onPeriodRankingOptionChange = (period: string, grade?: string) => {
    if (ranking.isLoading) {
      return
    }
    setPeriod(period as 'monthly' | 'total')

    if (grade !== undefined) {
      const gradeNum = parseInt(grade)
      if (gradeNum > 0 && gradeNum < 7) {
        setGrade(gradeNum)
      }
    }
  }

  if (ranking.isLoading) {
    return (
      <>
        <RankMonthlyHeader
          period={rankTypes}
          // grade={grades}
          onChangeOption={onPeriodRankingOptionChange}
        />
      </>
    )
  }

  const isShowClassName = menu.rank.monthly.isShowClassName

  const me = ranking.data?.user
    ? {
        rank: ranking.data.user.totalRank,
        avatar: ranking.data.user.imgRankingList2,
        name: ranking.data.user.name,
        book: ranking.data.user.bookCount,
        point: ranking.data.user.rgPoint,
        gradeName: undefined,
        schoolClass: undefined, // ranking.data.user.className,
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
        avatar: item.imgRankingList2,
        name: item.name,
        book: item.bookCount,
        point: item.rgPoint,
        gradeName: isShowClassName ? item.gradeName : undefined,
        schoolClass: isShowClassName ? item.className : undefined,
      })) || []

  const maxPage = Math.ceil((ranking.data?.list.length || 0) / RECORD_PER_PAGE)
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <RankMonthlyHeader
        period={rankTypes}
        // grade={grades}
        onChangeOption={onPeriodRankingOptionChange}
      />
      <div>
        {/* <TextStyle
          fontFamily="sans"
          fontSize="small"
          fontColor="secondary"
          textAlign="right"
          margin="0 20px 10px auto">
          {`· ${t('t8th247')} · ${t('t8th248')}`}
        </TextStyle> */}
        {me && (
          <RankMonthlyItem
            rank={me.rank}
            avatar={me.avatar}
            name={me.name}
            book={me.book}
            point={me.point}
            schoolClass={me.gradeName}
            isMe
          />
        )}
        {list.map((item, i) => (
          <RankMonthlyItem
            key={`${item.rank}-${item.name}-${i}`}
            rank={item.rank}
            avatar={item.avatar}
            name={item.name}
            book={item.book}
            point={item.point}
            schoolClass={item.gradeName}
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
