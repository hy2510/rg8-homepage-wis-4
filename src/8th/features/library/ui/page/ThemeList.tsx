'use client'

import { useCategoryTheme } from '@/8th/features/library/service/library-query'
import ThemeItem from '@/8th/features/library/ui/component/ThemeItem'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import { BoxStyle } from '@/8th/shared/ui/Misc'
import { SubPageNavHeader } from '@/8th/shared/ui/SubPageNavHeader'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'

export default function ThemeList({ booktype }: { booktype: string }) {
  //@language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()

  const router = useRouter()

  const categoryTheme = useCategoryTheme({
    bookType: booktype as 'EB' | 'PB',
  })

  return (
    <>
      <SubPageNavHeader
        title={`${t('t8th008')}`}
        parentPath={booktype === 'EB' ? SITE_PATH.NW82.EB : SITE_PATH.NW82.PB}
      />
      <BoxStyle
        display="grid"
        gridTemplateColumns={isPhone ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)'}
        gap={10}>
        {categoryTheme?.isLoading ? (
          <div></div>
        ) : (
          categoryTheme?.data?.category.map((theme) => (
            <ThemeItem
              key={theme.code}
              themeImgSrc={theme.imagePath}
              title={theme.name}
              onClick={() => {
                router.push(
                  `${booktype === 'EB' ? SITE_PATH.NW82.EB_THEME_FIND : SITE_PATH.NW82.PB_THEME_FIND}?code=${theme.code}&name=${theme.name}`,
                )
              }}
            />
          ))
        )}
      </BoxStyle>
    </>
  )
}
