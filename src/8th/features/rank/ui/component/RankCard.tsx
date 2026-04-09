'use client'

import { Assets } from '@/8th/assets/asset-library'
import { RankCardStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

/**
 * 레벨마스터 카드(퍼포먼스)
 */

interface RankCardProps {
  rank: number
}

export default function RankCard({ rank }: RankCardProps) {
  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  return (
    <RankCardStyle>
      <BoxStyle className="title-link">
        <span>{t('t8th229')}</span>
        {/* <Image
          src={Assets.Icon.arrowUpRightBlack}
          alt="arrow-up-right-black"
          width={14}
          height={14}
        /> */}
      </BoxStyle>
      <BoxStyle
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={5}
        padding="20px 10px"
        onClick={() => router.push(SITE_PATH.NW82.RANKING)}>
        {0 < rank && rank < 1000 && <div className="rank">#{rank}</div>}
        {(rank === 0 || rank >= 1000) && (
          <div className="rank arrow-down">
            {`#1000`}
            <Image
              src={Assets.Icon.arrowDownGray}
              alt="arrow-down-gray"
              width={20}
              height={20}
            />
          </div>
        )}
        {rank < 0 && (
          <div
            className="rank arrow-down"
            style={{ color: 'var(--font-color-light-blue)' }}>{`Ranking`}</div>
        )}
      </BoxStyle>
    </RankCardStyle>
  )
}
