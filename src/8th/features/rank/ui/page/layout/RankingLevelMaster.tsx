'use client'

import { useLevelMasterRank } from '@/8th/features/rank/service/rank-query'
import RankLevelMasterHeader from '@/8th/features/rank/ui/component/RankLevelMasterHeader'
import RankLevelMasterItem from '@/8th/features/rank/ui/component/RankLevelMasterItem'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { TextStyle } from '@/8th/shared/ui/Misc'
import Pagenation from '@/8th/shared/ui/Pagenation'
import useTranslation from '@/localization/client/useTranslations'
import LevelUtils from '@/util/level-utils'
import { useState } from 'react'

const RECORD_PER_PAGE = 10

export default function RankingLevelMaster() {
  const { menu } = useCustomerConfiguration()

  // @language 'common'
  const { t } = useTranslation()

  const levelMaster = useLevelMasterRank()

  const [currentPage, setCurrentPage] = useState(1)

  if (levelMaster.isLoading) {
    return <div></div>
  }

  const originList =
    levelMaster.data?.list.map((item) => ({
      number: item.no,
      level: LevelUtils.previousLevel(item.levelName) || '',
      avatar: item.imgRankingList2,
      name: item.studentName2,
      date: item.levelDate,
      gradeName: item.gradeName,
      schoolClass: item.className,
    })) || []

  if (originList.length === 0) {
    return (
      <>
        <RankLevelMasterHeader />
        <TextStyle
          margin="10px"
          fontColor="primary"
          fontFamily="sans"
          fontSize="large"
          fontWeight={500}>
          {t('t8th252')}
        </TextStyle>
      </>
    )
  }

  const maxPage = Math.ceil((originList.length || 0) / RECORD_PER_PAGE)
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const list = originList.filter(
    (_, index) =>
      index < currentPage * RECORD_PER_PAGE &&
      index >= (currentPage - 1) * RECORD_PER_PAGE,
  )

  return (
    <>
      <RankLevelMasterHeader />
      <div>
        <TextStyle
          fontFamily="sans"
          fontSize="small"
          fontColor="secondary"
          textAlign="right"
          margin="0 20px 10px auto">
          {`· ${t('t8th286')} · ${t('t8th246')}`}
        </TextStyle>
        {list.map((item, i) => (
          <RankLevelMasterItem
            key={`level-master-${item.number}_${i}`}
            number={item.number}
            level={menu.rank.levelMaster.isMaskingLevel ? '**' : item.level}
            avatar={item.avatar}
            name={item.name}
            date={item.date}
            schoolClass={
              menu.rank.levelMaster.isShowClassName ? item.gradeName : undefined
            }
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
