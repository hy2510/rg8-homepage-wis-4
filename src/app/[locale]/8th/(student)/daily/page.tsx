import DailyRGHome from '@/8th/features/daily/ui/page/DailyRGHome'
import RGTrackHomeLevel from '@/8th/features/daily/ui/page/DailyRGHomeLevel'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string; level?: string }>
}) {
  const { stage, level } = await searchParams

  // MEMO: 1 + 1 === 4 는 기존 레거시 DailyRG 보기 위한 장치
  if (1 + 1 === 4) return <DailyRGHome stage={stage} />
  return <RGTrackHomeLevel level={level} />
}
