import SearchMovieBookList from '@/8th/features/library/ui/page/SearchMovieBookList'

export default async function Page({
  params,
}: {
  params: Promise<{ booktype: string; level: string }>
}) {
  const { booktype, level } = await params

  return (
    <SearchMovieBookList
      booktype={booktype.toUpperCase()}
      level={level.toUpperCase()}
    />
  )
}
