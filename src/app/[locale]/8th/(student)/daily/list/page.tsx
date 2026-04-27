import DailyRGBookList from '@/8th/features/daily/ui/page/DailyRGBookList'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ stage: string; section: string; level?: string }>
}) {
  const { stage, section, level } = await searchParams
  return <DailyRGBookList stageId={stage} sectionId={section} level={level} />
}
