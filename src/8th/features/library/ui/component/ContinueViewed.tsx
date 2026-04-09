'use client'

import { Assets } from '@/8th/assets/asset-library'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { RecentlyViewedStyle } from '@/8th/shared/styled/FeaturesStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { LevelSectionType } from '../levelSectionData'
import LevelItem from './LevelSectionLevelItem'
import SeriesItem from './LevelSectionSeriesItem'

/**
 * Recently Viewed 메뉴
 */
export default function ContinueViewed({
  continueSection,
}: {
  continueSection: LevelSectionType
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  return (
    <RecentlyViewedStyle>
      <BoxStyle display="flex" gap={isPhone ? 5 : 10} alignItems="center">
        <Image
          src={Assets.Icon.Study.recentlyViewed}
          alt="recently-viewed"
          width={28}
          height={28}
        />
        <TextStyle fontSize="large" fontColor="primary">
          {t('t8th002')}
        </TextStyle>
      </BoxStyle>
      <BoxStyle
        className="list"
        display="grid"
        gridTemplateColumns={isPhone ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
        gap={10}>
        {continueSection.levels.length > 0 &&
          continueSection.levels
            .filter((level) => level.items.length > 0)
            .map((group) => {
              return group.items.map((level) => {
                return (
                  <LevelItem
                    key={`${level.type}${level.level}-${level.title}`}
                    type={level.type}
                    level={level.level}
                    title={level.title}
                    bgColor={level.bgColor}
                    fontColor={level.fontColor}
                    completed={level.completed}
                    href={level.href}
                    imgSrc={level.imgSrc}
                    total={level.total}
                  />
                )
              })
            })}
        {continueSection.series &&
          continueSection.series.length > 0 &&
          continueSection.series
            .filter((series) => series.items.length > 0)
            .map((group) => {
              return group.items.map((series) => {
                return (
                  <SeriesItem
                    key={series.title}
                    level={
                      series.minLevel === series.maxLevel
                        ? series.minLevel
                        : `${series.minLevel}~${series.maxLevel}`
                    }
                    title={series.title}
                    imgSrc={series.imgSrc}
                    bgColor={series.color}
                    href={series.href}
                  />
                )
              })
            })}
        {continueSection.todos &&
          continueSection.todos.length > 0 &&
          continueSection.todos
            .filter((level) => level.items.length > 0)
            .map((group) => {
              return group.items.map((level) => {
                return (
                  <LevelItem
                    key={`${level.type}${level.level}-${level.title}`}
                    type={level.type}
                    level={level.level}
                    title={level.title}
                    bgColor={level.bgColor}
                    fontColor={level.fontColor}
                    completed={level.completed}
                    href={level.href}
                    imgSrc={level.imgSrc}
                    total={level.total}
                  />
                )
              })
            })}
      </BoxStyle>
    </RecentlyViewedStyle>
  )
}
