'use client'

import CalendarModal from '@/8th/features/achieve/ui/modal/CalendarModal'
import DailyGoalModal from '@/8th/features/achieve/ui/modal/DailyGoalModal'
import ReadingUnitStoryModal from '@/8th/features/achieve/ui/modal/ReadingUnitStoryModal'
import StreakModal from '@/8th/features/achieve/ui/modal/StreakModal'
import LevelTestInfoModal from '@/8th/features/student/ui/modal/LevelTestInfoModal'
import SITE_PATH from '@/app/site-path'
import Link from 'next/link'
import { CSSProperties, useState } from 'react'

const linkStyle: CSSProperties = {
  display: 'inline-block',
  color: '#196ca9',
  margin: '4px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #196ca9',
  cursor: 'pointer',
}

const SITEMAP_LIB = [
  {
    title: 'Pre K',
    path: `${SITE_PATH.NW82.EB_PREK}/phonics`,
  },
  {
    title: 'DodoABC',
    path: `${SITE_PATH.NW82.EB_DODOABC}/phonics1`,
  },
  {
    title: '_BOOKTYPE_ Level',
    path: `${SITE_PATH.NW82.EB_LEVEL}/_LEVEL_`,
  },
  {
    title: '_BOOKTYPE_ Theme',
    path: `${SITE_PATH.NW82.EB_THEME}`,
  },
  {
    title: '_BOOKTYPE_ Series',
    path: `${SITE_PATH.NW82.EB_SERIES}`,
  },
  {
    title: '_BOOKTYPE_ New Book',
    path: `${SITE_PATH.NW82.EB_NEWBOOK}`,
  },
  {
    title: '_BOOKTYPE_ Search',
    path: `${SITE_PATH.NW82.EB_SEARCH}?keyword=al`,
  },
  {
    title: 'Movie',
    path: `${SITE_PATH.NW82.EB_MOVIE}/_LEVEL_`,
  },
  {
    title: 'Workbook',
    path: `${SITE_PATH.NW82.EB_WORKBOOK}/_LEVEL_`,
  },
]

const SITEMAP_ACTIVITY = [
  {
    title: 'ACTIVITY',
    path: SITE_PATH.NW82.ACTIVITY,
  },
  {
    title: 'To-Do',
    path: SITE_PATH.NW82.TODO,
  },
  {
    title: 'Try Again',
    path: SITE_PATH.NW82.TRYAGAIN,
  },
  {
    title: 'Favorite',
    path: SITE_PATH.NW82.FAVORITE,
  },
  {
    title: 'Result',
    path: `${SITE_PATH.NW82.REVIEW}?startDate=20250405&endDate=20251001`,
  },
  {
    title: 'Ranking',
    path: SITE_PATH.NW82.RANKING,
  },
]

const SITEMAP_OTHER = [
  {
    title: 'Account Info',
    path: SITE_PATH.NW82.ACCOUNTINFO,
  },
  {
    title: 'Edit Profile',
    path: SITE_PATH.NW82.ACCOUNTINFO_SETTING,
  },
]

const BUTTONS = [
  { title: 'Calendar', id: 'calendar' },
  { title: 'Reading Unit', id: 'readingunit' },
  { title: 'Level Test', id: 'leveltest' },
  { title: 'Daily Goal', id: 'dailygoal' },
  { title: 'Study Streak', id: 'studystreak' },
]

export default function Page() {
  const [tab, setTab] = useState<'EB' | 'PB'>('EB')
  const [modal, setModal] = useState<string | undefined>(undefined)

  return (
    <div>
      <Link
        key={`${SITE_PATH.NW82.DAILY_RG}`}
        href={`${SITE_PATH.NW82.DAILY_RG}`}
        style={linkStyle}>
        {'Daily RG'}
      </Link>
      <Link
        key={`${SITE_PATH.NW82.DAILY_RESULT}`}
        href={`${SITE_PATH.NW82.DAILY_RESULT}?stage=1&section=1`}
        style={linkStyle}>
        {'Daily Book List'}
      </Link>
      <hr></hr>
      <div>
        <button
          style={{
            ...linkStyle,
            margin: 0,
            backgroundColor: tab === 'EB' ? '#196ca9' : 'transparent',
            color: tab === 'EB' ? 'white' : '#196ca9',
          }}
          onClick={() => setTab('EB')}>
          EB
        </button>
        <button
          style={{
            ...linkStyle,
            margin: 0,
            backgroundColor: tab === 'PB' ? '#196ca9' : 'transparent',
            color: tab === 'PB' ? 'white' : '#196ca9',
          }}
          onClick={() => setTab('PB')}>
          PB
        </button>
      </div>
      <div>
        <Link key={'EB_HOME'} href={SITE_PATH.NW82.EB} style={linkStyle}>
          EB HOME
        </Link>
        <Link key={'PB_HOME'} href={SITE_PATH.NW82.PB} style={linkStyle}>
          PB HOME
        </Link>
      </div>
      {SITEMAP_LIB.map((link) => {
        return (
          <Link
            key={link.path}
            href={link.path
              .replace('library/eb/', `library/${tab.toLowerCase()}/`)
              .replace('_LEVEL_', '2c')}
            style={linkStyle}>
            {link.title.replace('_BOOKTYPE_', tab)}
          </Link>
        )
      })}
      <hr></hr>
      {SITEMAP_ACTIVITY.map((link) => {
        return (
          <Link key={link.path} href={link.path} style={linkStyle}>
            {link.title}
          </Link>
        )
      })}
      <hr></hr>
      {SITEMAP_OTHER.map((link) => {
        return (
          <Link key={link.path} href={link.path} style={linkStyle}>
            {link.title}
          </Link>
        )
      })}
      <hr />
      {BUTTONS.map((btn) => {
        return (
          <button
            key={btn.id}
            style={linkStyle}
            onClick={() => setModal(btn.id)}>
            {btn.title}
          </button>
        )
      })}

      {modal === 'calendar' && (
        <CalendarModal
          onCloseModal={() => {
            setModal(undefined)
          }}
        />
      )}
      {modal === 'readingunit' && (
        <ReadingUnitStoryModal onClose={() => setModal(undefined)} />
      )}
      {modal === 'leveltest' && (
        <LevelTestInfoModal onCloseModal={() => setModal(undefined)} />
      )}
      {modal === 'dailygoal' && (
        <DailyGoalModal onClose={() => setModal(undefined)} />
      )}
      {modal === 'studystreak' && (
        <StreakModal onClose={() => setModal(undefined)} />
      )}
    </div>
  )
}
