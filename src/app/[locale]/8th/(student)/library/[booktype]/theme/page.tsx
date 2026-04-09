import ThemeList from '@/8th/features/library/ui/page/ThemeList'

export default async function Page({
  params,
}: {
  params: Promise<{ booktype: string }>
}) {
  const { booktype } = await params

  return <ThemeList booktype={booktype.toUpperCase()} />
}
