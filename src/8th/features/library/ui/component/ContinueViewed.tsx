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

  const levelItems =
    continueSection.levels.length > 0
      ? continueSection.levels
          .filter((level) => level.items.length > 0)
          .flatMap((group) => group.items)
      : []

  const seriesItems =
    continueSection.series && continueSection.series.length > 0
      ? continueSection.series
          .filter((series) => series.items.length > 0)
          .flatMap((group) => group.items)
      : []

  const todoItems =
    continueSection.todos && continueSection.todos.length > 0
      ? continueSection.todos
          .filter((level) => level.items.length > 0)
          .flatMap((group) => group.items)
      : []

  const continueItems = [
    ...levelItems.map((item) => ({ type: 'level' as const, item })),
    ...seriesItems.map((item) => ({ type: 'series' as const, item })),
    ...todoItems.map((item) => ({ type: 'todo' as const, item })),
  ].slice(0, 3)

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
        className={`list ${isPhone ? 'mobile-slider' : ''}`}
        display={isPhone ? 'flex' : 'grid'}
        gridTemplateColumns={isPhone ? undefined : 'repeat(3, 1fr)'}
        gap={10}>
        {continueItems.map((entry, index) => {
          if (entry.type === 'series') {
            const series = entry.item
            return (
              <div
                key={`${entry.type}-${series.title}-${index}`}
                className={isPhone ? 'slider-item' : ''}>
                <SeriesItem
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
              </div>
            )
          }

          const level = entry.item
          return (
            <div
              key={`${entry.type}-${level.type}${level.level}-${level.title}-${index}`}
              className={isPhone ? 'slider-item' : ''}>
              <LevelItem
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
            </div>
          )
        })}
      </BoxStyle>
    </RecentlyViewedStyle>
  )
}
