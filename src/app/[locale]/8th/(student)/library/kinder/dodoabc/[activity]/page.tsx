import SearchLevelDodoAbcBookList from '@/8th/features/library/ui/page/SearchLevelDodoAbcBookList'

export default async function Page({
  params,
}: {
  params: Promise<{ activity: string }>
}) {
  const { activity } = await params

  return <SearchLevelDodoAbcBookList activity={activity} />
}
