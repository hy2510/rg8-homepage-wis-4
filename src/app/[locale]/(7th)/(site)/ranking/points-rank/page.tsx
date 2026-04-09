'use client'

import {
  useOnLoadPointRankingMonthly,
  useOnLoadPointRankingTotal,
} from '@/7th/_client/store/ranking/point/hook'
import { usePointRanking } from '@/7th/_client/store/ranking/point/selector'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import {
  Dropdown,
  DropdownItem,
  Modal,
} from '@/7th/_ui/common/common-components'
import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import LoadingScreen from '@/7th/_ui/modules/LoadingScreen'
import useTranslation from '@/localization/client/useTranslations'
import { VIETNAMESE } from '@/localization/localize-config'
import NumberUtils from '@/util/number-utils'
import Image from 'next/image'
import { ReactNode, useState } from 'react'

const STYLE_ID = 'page_points_rank'

export default function Page() {
  const { loading } = useOnLoadPointRankingMonthly()
  const { loading: loading2 } = useOnLoadPointRankingTotal()

  if (loading || loading2) {
    return <LoadingScreen />
  }
  return (
    <main>
      <PointRank />
    </main>
  )
}

function PointRank() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const [tab, setTab] = useState('monthly')

  const monthRank = usePointRanking().monthly.payload
  const totalRank = usePointRanking().total.payload

  const rank = tab === 'monthly' ? monthRank : totalRank
  const rankList = rank.list
  const rankUser = rank.user

  const SubTitle = ({
    children,
    message,
  }: {
    children?: ReactNode
    message?: string
  }) => {
    return (
      <div className={style.sub_title}>
        {children}
        <span>{message}</span>
      </div>
    )
  }

  const UserEngagementStatus = ({
    userAvatar,
    userRank,
    studentName = '',
    completed = 0,
    earnPoints = 0.0,
  }: {
    userAvatar: string
    userRank: number
    studentName?: string
    completed?: number
    earnPoints?: number
  }) => {
    const ColumnBox = ({
      label,
      contents,
    }: {
      label: string
      contents: string
    }) => {
      return (
        <div className={style.column_box}>
          <div className={style.label}>{label}</div>
          <div className={style.contents}>{contents}</div>
        </div>
      )
    }

    return (
      <div className={style.user_engagement_status}>
        {/* <div className={style.user_symbol}>
          {userRank >= 1 && userRank < 1000 && (
            <div className={style.user_rank}>
              <div className={style.txt_rank}>{userRank}</div>
            </div>
          )}
          <div className={style.user_avatar}>
            <Image alt="" src={userAvatar} width={100} height={100} />
          </div>
        </div> */}
        <ColumnBox
          label={t('t396')} // 순위
          contents={userRank == 0 ? '###' : userRank.toString()}
        />
        {/* <ColumnBox label={t('t289')} contents={studentName} /> */}
        <ColumnBox label={t('t160')} contents={earnPoints.toString()} />
        <ColumnBox label={t('t395')} contents={completed.toString()} />
      </div>
    )
  }

  const Leaderboard = () => {
    const TableRow = ({
      rank,
      studentAvatar,
      studentName,
      earnPoints,
      completed,
      gradeName,
    }: {
      rank?: number
      studentAvatar?: string
      studentName?: string
      earnPoints?: number
      completed?: number
      gradeName?: string
    }) => {
      return (
        <div
          className={`
          ${style.table_row} 
          ${rank && rank < 4 ? style.top_ranker : ''}`}>
          <div
            className={`
            ${style.rank} 
            ${
              rank == 3
                ? style.rank3
                : rank == 2
                  ? style.rank2
                  : rank == 1
                    ? style.rank1
                    : ''
            }`}>
            {rank}
          </div>
          <div
            className={`${style.student_name} ${
              rank == 3
                ? style.rank3
                : rank == 2
                  ? style.rank2
                  : rank == 1
                    ? style.rank1
                    : ''
            }`}>
            <Image alt="" src={studentAvatar || ''} width={60} height={60} />

            <div className={style.txt_student_name}>
              {studentName}
              {gradeName && <span>{gradeName}</span>}
            </div>
          </div>
          <div className={style.txt_earn_points}>
            {earnPoints && NumberUtils.toRgDecimalPoint(earnPoints)}
          </div>
          <div className={style.txt_completed}>{completed}</div>
        </div>
      )
    }

    const { target } = useSiteBlueprint()

    return (
      <div className={style.leaderboard}>
        <div className={style.table_header}>
          <div className={style.th_item}>{t('t396')}</div>
          <div className={style.th_item}>{t('t289')}</div>
          <div className={style.th_item}>{t('t160')}</div>
          <div className={style.th_item}>{t('t395')}</div>
        </div>
        {rankList.map((a) => {
          return (
            <TableRow
              key={`Rank_${a.no}`}
              rank={a.totalRank}
              studentAvatar={a.imgRankingList2}
              studentName={a.name}
              earnPoints={a.rgPoint}
              completed={a.bookCount}
              gradeName={target.school ? a.gradeName : undefined}
            />
          )
        })}
      </div>
    )
  }

  const [modalUrl, setModalUrl] = useState<string | undefined>(undefined)

  const isMobile = useScreenMode() === 'mobile'

  return (
    <main className={style.point_rank}>
      <div>
        <Dropdown
          title={
            tab === 'monthly'
              ? `${t('t402', { num: new Date().getMonth() + 1 })}`
              : `${t('t403')}`
          }>
          <DropdownItem onClick={() => setTab('monthly')}>
            {t('t404')}
          </DropdownItem>
          <DropdownItem onClick={() => setTab('total')}>
            {t('t403')}
          </DropdownItem>
        </Dropdown>
        <div style={{ color: '#b3b9c2', marginTop: '10px' }}>
          {/* 오늘 학습한 기록은 내일 오전 랭킹에 반영됩니다. */}
          {t('t746')}
        </div>
      </div>

      {rankUser && (
        <>
          <SubTitle>{t('t405')}</SubTitle>
          <UserEngagementStatus
            userAvatar={rankUser.imgRankingList2}
            userRank={rankUser.totalRank}
            studentName={rankUser.name}
            earnPoints={rankUser.rgPoint}
            completed={rankUser.bookCount}
          />
        </>
      )}
      <div className={style.group_sub_title}>
        <SubTitle
          message={false ? `${t('t399')} : 2023.05.23 화요일 오전 12:04` : ''}>
          {t('t400')}
        </SubTitle>
        <div
          className={style.txt_link}
          onClick={() => {
            const url = `/src/html/page-contents/${isMobile ? 'mobile' : 'pc'}/ranking/ranking_01_point_pop${language === VIETNAMESE ? `_${VIETNAMESE}` : ''}.html`
            setModalUrl(url)
          }}>
          {t('t406')}
        </div>
        {modalUrl && (
          <Modal
            compact
            header
            title={t('t407')}
            onClickDelete={() => {
              setModalUrl(undefined)
            }}
            onClickLightbox={() => {
              setModalUrl(undefined)
            }}>
            <iframe
              width={'100%'}
              frameBorder="0"
              scrolling="no"
              src={modalUrl}
              style={{
                height: isMobile ? '1065px' : '867px',
                backgroundColor: 'transparent',
                overflow: 'hidden',
              }}
            />
          </Modal>
        )}
      </div>
      <Leaderboard />
    </main>
  )
}
