import SpeakResultHistory from '@/8th/features/review/ui/page/SpeakResultHistory'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ startDate: string; endDate: string }>
}) {
  const { startDate, endDate } = await searchParams

  return <SpeakResultHistory startDate={startDate} endDate={endDate} />
}
