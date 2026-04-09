import GalleryBoardDetail from '@/7th/site/home/main/_cpnt/GalleryBoardDetail'
import { STAFF_PATH } from '@/app/site-path'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  return (
    <GalleryBoardDetail
      id={params.id}
      backColorWhite={false}
      modifyLink={`${STAFF_PATH.GALLERY.WRITE}/${params.id}`}
    />
  )
}
