import SITE_PATH from '@/app/site-path'
import React from 'react'
import StaticBoardProvider from '../_cpnt/StaticBoardContext'

const STATIC_HOME_PAGE_RESOURCE = process.env.STATIC_HOME_PAGE_RESOURCE
async function getData() {
  const DATA_URL = `${STATIC_HOME_PAGE_RESOURCE}/contents/json/new-books.json`
  const CONTENTS_URL = SITE_PATH.HOME.NEW_CONTENTS

  const postRes = await fetch(DATA_URL, {
    next: { revalidate: 3600, tags: ['data:cdn', `board:new-contents`] },
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

export default async function Layout(props: {
  children?: React.ReactNode
  params?: Promise<{ locale: string }>
}) {
  const params = await props.params

  const { children } = props

  const post = await getData()
  const wrapPost = post.map((item) => {
    if (params?.locale === 'ko') {
      return item
    }
    const year = Number(item.id.substring(0, 4))
    const month = Number(item.id.substring(4, 6))
    return {
      ...item,
      title: `New Content for ${month}/${year}`,
    }
  })
  return <StaticBoardProvider boards={wrapPost}>{children}</StaticBoardProvider>
}
