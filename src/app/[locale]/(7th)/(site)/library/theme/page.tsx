'use client'

import { useLibraryEbPbFilter } from '@/7th/_client/store/library/filter/selector'
import {
  useFetchLibraryTheme,
  useOnLoadLibraryTheme,
} from '@/7th/_client/store/library/theme/hook'
import { useLibraryTheme } from '@/7th/_client/store/library/theme/selector'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import useTranslation from '@/localization/client/useTranslations'
import { SearchThemeSeriesBookListTemplate } from '../_cpnt/SearchBookListTemplate'

const STYLE_ID = 'page_theme'

export default function Page() {
  const { option } = useLibraryTheme()
  const { loading, error } = useOnLoadLibraryTheme()

  if (!option || !option.keyword) {
    return <div>Not found theme.</div>
  }
  if (loading) {
    return <LoadingScreen />
  }
  return <ThemeLayout />
}

function ThemeLayout() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const BookType = 'EB'

  const { fetch } = useFetchLibraryTheme()
  const { option, payload: books } = useLibraryTheme()

  const mainClassName = style.theme
  const headerClassName = style.top

  const title = t('t393')
  const subject = option.title
  const filter = useLibraryEbPbFilter(BookType)

  const updateBook = (params: {
    level?: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  }) => {
    fetch({ ...params, page: params.page || 1 })
  }

  return (
    <SearchThemeSeriesBookListTemplate
      mainClassName={mainClassName}
      headerClassName={headerClassName}
      backLink={''}
      title={title}
      bookType={BookType}
      subject={subject}
      filter={filter}
      books={books}
      onSearchOptionChanged={updateBook}
    />
  )
}
