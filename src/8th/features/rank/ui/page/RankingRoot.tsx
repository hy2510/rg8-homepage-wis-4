'use client'

import RankCategory, {
  RankCategoryItem,
} from '@/8th/features/rank/ui/component/RankCategory'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
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

  const tabs: RankCategoryItem[] = []
  if (menu.rank.monthly.open) {
    tabs.push({ label: t('t8th225'), value: 'earned-points-rank' })
  }
  if (menu.rank.readingking.open) {
    tabs.push({ label: t('t8th226'), value: 'reading-king' })
  }
  if (menu.rank.levelMaster.open) {
    tabs.push({ label: t('t8th227'), value: 'level-master' })
  }
  if (menu.rank.hallOfFame.open) {
    tabs.push({ label: t('t8th228'), value: 'hall-of-fame' })
  }

  const [selectedTab, setSelectedTab] = useState<TabType | undefined>(
    tabs.length > 0 ? (tabs[0]?.value as TabType) : undefined,
  )

  return (
    <>
      <SubPageNavHeader
        title={t('t8th270')}
        parentPath={SITE_PATH.NW82.ACTIVITY}
      />
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
