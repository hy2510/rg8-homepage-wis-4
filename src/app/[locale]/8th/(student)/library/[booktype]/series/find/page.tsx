import SearchSeriesBookList from '@/8th/features/library/ui/page/SearchSeriesBookList'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ booktype: string }>
  searchParams: Promise<{
    code: string
    name: string
    level?: string
    call?: string
  }>
}) {
  const { booktype } = await params
  const { name, level, call } = await searchParams

  return (
    <SearchSeriesBookList
      booktype={booktype.toUpperCase()}
      seriesName={name}
      level={level}
      referrer={call}
    />
  )
}
