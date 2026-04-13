'use client'

import RankCategory, {
  RankCategoryItem,
} from '@/8th/features/rank/ui/component/RankCategory'
import { hasOngoingReadingKingEvent } from '@/8th/features/readingking/model/event-period'
import { useReadingKingEventList } from '@/8th/features/readingking/service/readingking-query'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useMemo, useRef, useState } from 'react'
import RankingChallenge from './layout/RankingChallenge'
import RankingHallOfFame from './layout/RankingHallOfFame'
import RankingLevelMaster from './layout/RankingLevelMaster'
import RankingMonth from './layout/RankingMonth'

type TabType =
  | 'earned-points-rank'
  | 'reading-king'
  | 'level-master'
  | 'hall-of-fame'

export default function RankingRoot() {
  const { menu } = useCustomerConfiguration()

  // @Language 'common'
  const { t } = useTranslation()

  const eventListQuery = useReadingKingEventList({
    enabled: menu.rank.readingking.open,
  })

  const readingKingContestOngoing =
    menu.rank.readingking.open &&
    !eventListQuery.isLoading &&
    hasOngoingReadingKingEvent(eventListQuery.data?.list ?? [])

  const tabs: RankCategoryItem[] = useMemo(() => {
    const items: RankCategoryItem[] = []
    if (menu.rank.monthly.open) {
      items.push({ label: t('t8th225'), value: 'earned-points-rank' })
    }
    if (menu.rank.readingking.open) {
      items.push({ label: t('t8th226'), value: 'reading-king' })
    }
    if (menu.rank.levelMaster.open) {
      items.push({ label: t('t8th227'), value: 'level-master' })
    }
    if (menu.rank.hallOfFame.open) {
      items.push({ label: t('t8th228'), value: 'hall-of-fame' })
    }
    if (readingKingContestOngoing) {
      const rkIndex = items.findIndex((i) => i.value === 'reading-king')
      if (rkIndex > 0) {
        const rk = items[rkIndex]!
        return [rk, ...items.filter((_, j) => j !== rkIndex)]
      }
    }
    return items
  }, [
    menu.rank.hallOfFame.open,
    menu.rank.levelMaster.open,
    menu.rank.monthly.open,
    menu.rank.readingking.open,
    readingKingContestOngoing,
    t,
  ])

  const waitingReadingKingSchedule =
    menu.rank.readingking.open && eventListQuery.isLoading

  const [selectedTab, setSelectedTab] = useState<TabType | undefined>(undefined)
  const initialTabPicked = useRef(false)

  useEffect(() => {
    if (tabs.length === 0) return
    if (waitingReadingKingSchedule) return
    if (initialTabPicked.current) return
    initialTabPicked.current = true
    setSelectedTab(tabs[0]?.value as TabType)
  }, [tabs, waitingReadingKingSchedule])

  const header = (
    <SubPageNavHeader
      title={t('t8th270')}
      parentPath={SITE_PATH.NW82.ACTIVITY}
    />
  )

  if (tabs.length === 0) {
    return <>{header}</>
  }

  if (waitingReadingKingSchedule) {
    return <>{header}</>
  }

  return (
    <>
      {header}
      {!!selectedTab && (
        <RankCategory
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={(tab: string) => setSelectedTab(tab as TabType)}
        />
      )}
      {selectedTab === 'earned-points-rank' && <RankingMonth />}
      {selectedTab === 'reading-king' && <RankingChallenge />}
      {selectedTab === 'level-master' && <RankingLevelMaster />}
      {selectedTab === 'hall-of-fame' && <RankingHallOfFame />}
    </>
  )
}
