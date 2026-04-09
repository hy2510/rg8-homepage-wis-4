import SearchLevelBookList from '@/8th/features/library/ui/page/SearchLevelBookList'

export default async function Page({
  params,
}: {
  params: Promise<{ booktype: string; level: string }>
}) {
  const { booktype, level } = await params

  return (
    <SearchLevelBookList
      booktype={booktype.toUpperCase()}
      level={level.toUpperCase()}
    />
  )
}
