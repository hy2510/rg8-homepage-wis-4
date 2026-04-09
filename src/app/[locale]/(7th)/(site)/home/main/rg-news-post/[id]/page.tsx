import NoticeBoardDetail from '../../_cpnt/NoticeBoardDetail'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  return <NoticeBoardDetail id={params.id} />
}
