'use client'

import { useOnLoadLevelMasterBoard } from '@/7th/_client/store/ranking/level-master-board/hook'
import { useSiteBlueprint } from '@/7th/_context/CustomerContext'
import { LevelMasterBoardResponse } from '@/7th/_repository/client/ranking/level-master'
import { Button } from '@/7th/_ui/common/common-components'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import LevelUtils from '@/util/level-utils'
import { useState } from 'react'

const STYLE_ID = 'page_level_master_board'

const RECORD_SIZE = 50

export default function Page() {
  const { payload, loading, error } = useOnLoadLevelMasterBoard()

  if (loading) {
    return <div></div>
  }

  return <LevelMasterLayout data={payload} />
}

type LevelMasterListItem = {
  no: number
  avatar: string
  beforeLevelName: string
  currentLevelName: string
  studentName: string
  grade?: string
  date: string
}

const LevelMasterLayout = ({ data }: { data: LevelMasterBoardResponse }) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { target } = useSiteBlueprint()

  const [page, setPage] = useState(0)
  const boardList: LevelMasterListItem[] = data.list
    .filter((_, idx) => idx < RECORD_SIZE * (page + 1))
    .map((item) => {
      return {
        no: item.no,
        avatar: item.imgAvatarList,
        beforeLevelName: target.school
          ? '**'
          : LevelUtils.previousLevel(item.levelName) || '',
        currentLevelName: target.school ? '**' : item.levelName,
        studentName: item.studentName2,
        grade: target.school ? item.gradeName : undefined,
        date: item.levelDate,
      }
    })
  const hasMore = boardList.length < data.list.length

  return (
    <main className={style.level_master_layout}>
      <div style={{ color: '#b3b9c2', marginTop: '10px' }}>
        {/* 최근 30일간 레벨 마스터를 획득한 학생입니다. 오늘 학습한 기록은 내일 오전 랭킹에 반영됩니다. */}
        {t('t754')}
      </div>
      <LevelMasterBoard list={boardList} />
      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            width="150px"
            color="dark"
            roundFull
            onClick={() => setPage(page + 1)}>
            more
          </Button>
        </div>
      )}
    </main>
  )
}

const LevelMasterBoard = ({ list }: { list: LevelMasterListItem[] }) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.level_master_board}>
      <div className={style.header}>
        <span>
          {/* 번호 */}
          {t('t755')}
        </span>
        <span>
          {/* 학생 이름 */}
          {t('t289')}
        </span>
        <span>
          {/* 레벨 마스터 */}
          {t('t041')}
        </span>
        <span>
          {/* 날짜 */}
          {t('t452')}
        </span>
      </div>
      {list.length > 0 && (
        <div className={style.table}>
          {list.map((item) => {
            return (
              <LevelMasterBoardTableRow
                key={`level-master-${item.no}`}
                no={item.no}
                avatar={item.avatar}
                beforeLevelName={item.beforeLevelName}
                currentLevelName={item.currentLevelName}
                studentName={item.studentName}
                grade={item.grade}
                date={item.date}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const LevelMasterBoardTableRow = ({
  no,
  avatar,
  beforeLevelName,
  currentLevelName,
  studentName,
  grade,
  date,
}: LevelMasterListItem) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.level_master_board_table_row}>
      <div className={style.txt_xl}>{no}</div>
      <div className={style.student}>
        <div
          className={style.avatar}
          style={{ backgroundImage: `url(${avatar})` }}></div>
        <div className={style.student_name}>
          {studentName}
          {grade && <span>{grade}</span>}
        </div>
      </div>
      <div className={style.txt_xl}>{beforeLevelName}</div>
      {/* <div className={`${style.txt_gray} ${style.txt_l}`}>{currentLevelName}</div> */}
      <div className={style.txt_gray}>{date}</div>
    </div>
  )
}
