import SearchLevelPreKBookList from '@/8th/features/library/ui/page/SearchLevelPreKBookList'

export default async function Page({
  params,
}: {
  params: Promise<{ activity: string }>
}) {
  const { activity } = await params

  return <SearchLevelPreKBookList activity={activity} />
}
