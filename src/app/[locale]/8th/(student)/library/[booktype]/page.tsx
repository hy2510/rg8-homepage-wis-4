import FinderBook from '@/8th/features/library/ui/page/FinderBook'

export default async function Page({
  params,
}: {
  params: Promise<{ booktype: string }>
}) {
  const { booktype } = await params

  return <FinderBook booktype={booktype as 'eb' | 'pb'} />
}
