import SearchSeriesBookList from '@/8th/features/library/ui/page/SearchSeriesBookList'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ booktype: string }>
  searchParams: Promise<{ code: string; name: string; level?: string }>
}) {
  const { booktype } = await params
  const { name, level } = await searchParams

  return (
    <SearchSeriesBookList
      booktype={booktype.toUpperCase()}
      seriesName={name}
      level={level}
    />
  )
}
