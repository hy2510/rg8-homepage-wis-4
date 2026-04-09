import NewBookList from '@/8th/features/library/ui/page/NewBookList'

export default async function Page({
  params,
}: {
  params: Promise<{ booktype: string }>
}) {
  const { booktype } = await params

  return <NewBookList booktype={booktype.toUpperCase()} />
}
