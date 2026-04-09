import StudyResultHistory from '@/8th/features/review/ui/page/StudyResultHistory'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ startDate: string; endDate: string; keyword: string }>
}) {
  const { startDate, endDate, keyword } = await searchParams
  return (
    <StudyResultHistory
      startDate={startDate}
      endDate={endDate}
      keyword={keyword}
    />
  )
}
