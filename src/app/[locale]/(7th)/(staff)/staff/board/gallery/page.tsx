'use client'

import { useOnLoadGalleryList } from '@/7th/_client/store/home/hook'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import GalleryBoardList from '@/7th/site/home/main/_cpnt/GalleryBoardList'
import { STAFF_PATH } from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CSSProperties, use } from 'react'

const ICON_WRITE =
  'data:image/png;base64,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'

const styleWriteContainer: CSSProperties = {
  height: '40px',
  display: 'flex',
  flexDirection: 'row-reverse',
  marginBottom: '10px',
}
const styleButton: CSSProperties = {
  display: 'flex',
  cursor: 'pointer',
  backgroundColor: 'var(--blue)',
  borderRadius: '8px',
  padding: '0 20px',
  alignItems: 'center',
}
const styleButtonImage: CSSProperties = {
  display: 'inline',
  width: '24px',
  height: '24px',
  alignItems: 'center',
  marginRight: '0.2em',
}
const styleButtonText: CSSProperties = {
  display: 'flex',
  color: 'white',
  fontSize: 'var(--text-l)',
}

export default function Page(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = use(props.searchParams)
  const page = searchParams.page ? Number(searchParams.page) : 1

  // @Language 'common'
  const { t } = useTranslation()

  const route = useRouter()

  const { payload, loading, error } = useOnLoadGalleryList({ page })
  const { custom } = useSiteBlueprint()

  const galleryList = payload
    ? [
        ...payload.board.map((board) => {
          return {
            title: board.title,
            image: board.imagePath || undefined,
            date: board.registDate.split('T')[0],
            link: `${STAFF_PATH.GALLERY.MAIN}/${board.boardId}`,
          }
        }),
      ]
    : []

  const onPageChange = (page: number) => {
    route.push(`${STAFF_PATH.GALLERY.MAIN}?page=${page}`)
  }

  const isWritable =
    payload.writable && (custom ? custom?.staff?.galleryWritable : true)

  return (
    <>
      {isWritable && (
        <div style={styleWriteContainer}>
          <Link href={STAFF_PATH.GALLERY.WRITE} style={styleButton}>
            <img style={styleButtonImage} src={ICON_WRITE} />
            <span style={styleButtonText}>{t('t925')}</span>
          </Link>
        </div>
      )}
      <GalleryBoardList
        list={galleryList}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </>
  )
}
