import NoticeBoardDetail from '@/7th/site/home/main/_cpnt/NoticeBoardDetail'
import { STAFF_PATH } from '@/app/site-path'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  return (
    <NoticeBoardDetail
      id={params.id}
      backColorWhite={false}
      modifyLink={`${STAFF_PATH.NOTICE.WRITE}/${params.id}`}
    />
  )
}
