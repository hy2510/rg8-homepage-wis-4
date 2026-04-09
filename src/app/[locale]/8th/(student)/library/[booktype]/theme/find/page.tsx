import SearchThemeBookList from '@/8th/features/library/ui/page/SearchThemeBookList'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ booktype: string; name: string }>
  searchParams: Promise<{ code: string; name: string }>
}) {
  const { booktype } = await params
  const { code, name } = await searchParams

  return (
    <SearchThemeBookList
      booktype={booktype.toUpperCase()}
      code={code}
      name={name}
    />
  )
}
