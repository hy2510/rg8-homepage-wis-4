import SeriesList from '@/8th/features/library/ui/page/SeriesList'

export default async function Page({
  params,
}: {
  params: Promise<{ booktype: string }>
}) {
  const { booktype } = await params

  return <SeriesList booktype={booktype.toUpperCase()} />
}
