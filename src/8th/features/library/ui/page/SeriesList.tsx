'use client'

import { useCategorySeries } from '@/8th/features/library/service/library-query'
import SeriesItem from '@/8th/features/library/ui/component/LevelSectionSeriesItem'
import { findSeriesColor } from '@/8th/features/library/ui/levelSectionData'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'

export default function SeriesList({ booktype }: { booktype: string }) {
  //@language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  const categorySeries = useCategorySeries({
    bookType: booktype as 'EB' | 'PB',
  })

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th039')}`}
        parentPath={booktype === 'EB' ? SITE_PATH.NW82.EB : SITE_PATH.NW82.PB}
      />
      <BoxStyle
        display="grid"
        gridTemplateColumns={`repeat(${isPhone ? 2 : 3}, 1fr)`}
        gap={20}>
        {categorySeries?.isLoading ? (
          <div>Loading series...</div>
        ) : (
          categorySeries?.data?.category.map((series) => {
            const levelRange =
              series.bookLevelMin !== series.bookLevelMax
                ? `${series.bookLevelMin}~${series.bookLevelMax}`
                : series.bookLevelMin
            const color = findSeriesColor(series.color).color
            const href =
              booktype === 'EB'
                ? `${SITE_PATH.NW82.EB_SERIES_FIND}?name=${encodeURIComponent(series.name)}&level=${levelRange}`
                : `${SITE_PATH.NW82.PB_SERIES_FIND}?name=${encodeURIComponent(series.name)}&level=${levelRange}`
            return (
              <SeriesItem
                key={series.name}
                level={levelRange}
                title={series.name}
                imgSrc={series.imagePath}
                bgColor={color}
                href={href}
              />
            )
          })
        )}
      </BoxStyle>
    </>
  )
}
