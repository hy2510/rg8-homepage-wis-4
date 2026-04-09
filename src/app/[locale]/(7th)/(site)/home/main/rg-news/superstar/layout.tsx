import SITE_PATH from '@/app/site-path'
import React from 'react'
import StaticBoardProvider from '../_cpnt/StaticBoardContext'

const STATIC_HOME_PAGE_RESOURCE = process.env.STATIC_HOME_PAGE_RESOURCE
async function getData() {
  const DATA_URL = `${STATIC_HOME_PAGE_RESOURCE}/contents/json/superstar.json`
  const CONTENTS_URL = SITE_PATH.HOME.EVENT_SUPERSTAR

  const postRes = await fetch(DATA_URL, {
    next: { revalidate: 3600, tags: ['data:cdn', `board:superstar`] },
  })
  const post = (await postRes.json()) as {
    id: string
    title: string
    url: string
  }[]
  return post.map((item) => {
    return {
      ...item,
      originUrl: item.url,
      url: `${CONTENTS_URL}/${item.id}`,
    }
  })
}

export default async function Layout({
  children,
}: {
  children?: React.ReactNode
}) {
  const post = await getData()

  return <StaticBoardProvider boards={post}>{children}</StaticBoardProvider>
}
