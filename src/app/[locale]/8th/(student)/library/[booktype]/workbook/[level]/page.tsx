import SearchWorkBookList from '@/8th/features/library/ui/page/SearchWorkBookList'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ booktype: string; level: string }>
  searchParams: Promise<{ volume: string }>
}) {
  const { booktype, level } = await params
  const { volume } = await searchParams

  return (
    <SearchWorkBookList
      booktype={booktype.toUpperCase()}
      level={level.toUpperCase()}
      volume={volume}
    />
  )
}
