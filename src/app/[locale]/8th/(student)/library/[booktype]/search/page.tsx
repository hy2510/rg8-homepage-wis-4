import SearchBookList from '@/8th/features/library/ui/page/SearchKeywordBookList'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ booktype: string }>
  searchParams: Promise<{ keyword: string; type?: string }>
}) {
  const { booktype } = await params
  const { keyword, type } = await searchParams

  return (
    <SearchBookList
      booktype={booktype.toUpperCase()}
      keyword={keyword}
      type={type}
    />
  )
}
