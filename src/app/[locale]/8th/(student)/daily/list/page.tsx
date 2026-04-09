import DailyRGBookList from '@/8th/features/daily/ui/page/DailyRGBookList'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ stage: string; section: string }>
}) {
  const { stage, section } = await searchParams
  return <DailyRGBookList stageId={stage} sectionId={section} />
}
