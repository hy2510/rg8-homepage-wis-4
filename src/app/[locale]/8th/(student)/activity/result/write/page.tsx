import WriteResultHistory from '@/8th/features/review/ui/page/WriteResultHistory'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ startDate: string; endDate: string; keyword: string }>
}) {
  const { startDate, endDate, keyword } = await searchParams
  return (
    <WriteResultHistory
      startDate={startDate}
      endDate={endDate}
      keyword={keyword}
    />
  )
}
