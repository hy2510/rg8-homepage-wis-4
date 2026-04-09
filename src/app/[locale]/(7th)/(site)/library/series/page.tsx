'use client'

import { useLibraryEbPbFilter } from '@/7th/_client/store/library/filter/selector'
import {
  useFetchLibrarySeries,
  useOnLoadLibrarySeries,
} from '@/7th/_client/store/library/series/hook'
import { useLibrarySeries } from '@/7th/_client/store/library/series/selector'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import useTranslation from '@/localization/client/useTranslations'
import { SearchThemeSeriesBookListTemplate } from '../_cpnt/SearchBookListTemplate'

const STYLE_ID = 'page_series'

export default function Page() {
  const { option } = useLibrarySeries()
  const { loading, error } = useOnLoadLibrarySeries()

  if (!option || !option.title) {
    return <div>Not found series.</div>
  }
  if (loading) {
    return <LoadingScreen />
  }
  return <SeriesLayout />
}

function SeriesLayout() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const { fetch } = useFetchLibrarySeries()
  const { option, payload: books } = useLibrarySeries()

  const BookType = option.bookType as 'EB' | 'PB'

  const mainClassName = style.series
  const headerClassName = style.top

  const title = t('t392')
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
