import DailyRGHome from '@/8th/features/daily/ui/page/DailyRGHome'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string }>
}) {
  const { stage } = await searchParams

  return <DailyRGHome stage={stage} />
}
