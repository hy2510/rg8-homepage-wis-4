'use client'

import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { RankingNavBar } from '@/7th/_ui/modules/ranking-nav-bar/ranking-nav-bar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children?: ReactNode }) {
  const {
    isChallengeMenu: isOpenChallenge,
    isShowLevelMasterRanking: isOpenLevelMaster,
    custom,
    country,
  } = useSiteBlueprint()

  const isOpenHallOfFame =
    !country.vietnam && custom?.menu?.ranking?.hideHallOfFame !== true

  return (
    <div className="container compact">
      <RankingNavBar
        isOpenChallenge={isOpenChallenge}
        isOpenLevelMaster={isOpenLevelMaster}
        isOpenHallOfFame={isOpenHallOfFame}
      />
      {children}
    </div>
  )
}
