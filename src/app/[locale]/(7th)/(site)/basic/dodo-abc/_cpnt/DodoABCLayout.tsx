'use client'

import { useFetchLibraryLevelDodoAbc } from '@/7th/_client/store/library/dodo-abc/hook'
import { useLibraryDodoAbcLevel } from '@/7th/_client/store/library/dodo-abc/selector'
import { useStudentStudyable } from '@/7th/_client/store/student/info/selector'
import { openWindow } from '@/7th/_function/open-window'
import { useStyle } from '@/7th/_ui/context/StyleContext'
import { LibraryFilterOption } from '@/7th/_ui/modules/library-set-fliter/LibrarySearchFilter'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import StudentHistorySelectModal from '../../../library/_cpnt/StudentHistorySelectModal'
import useQuickStudyStart from '../../../library/_fn/use-quick-study-start'
import DodoABCCategory from './DodoABCCategory'
import { DodoABCType, StudyProgressInfo } from './DodoABCContainer'
import DodoABCList from './DodoABCList'

const STYLE_ID = 'page_kids_dodo_abc'

export default function DodoABCLayout({
  loading,
  studyType,
  progress,
  onChangeStudyType,
  onChangeActivity,
}: {
  loading: boolean
  studyType: DodoABCType
  startActivity: string
  progress: StudyProgressInfo[]
  onChangeStudyType: (studyType: DodoABCType) => void
  onChangeActivity: (activity: string) => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { fetch: updateBook } = useFetchLibraryLevelDodoAbc()
  const { option, payload: books } = useLibraryDodoAbcLevel()

  let currentActivity = ''
  for (let i = 0; i < progress.length; i++) {
    if (option.activity === progress[i].activityName) {
      currentActivity = progress[i].activityName
      break
    }
  }
  let bgStyle = ''
  switch (currentActivity) {
    case 'Study-Alphabet':
      bgStyle = style.alphabet
      break
    case 'Study-Phonics-1':
      bgStyle = style.phonics_1
      break
    case 'Study-Phonics-2':
      bgStyle = style.phonics_2
      break
    case 'Study-Sight-Words-1':
      bgStyle = style.sight_word_1
      break
    case 'Study-Sight-Words-2':
      bgStyle = style.sight_word_2
      break
    case 'Song-Alphabet-Chant':
      bgStyle = style.song_alphabet
      break
    case 'Song-Phonics-Chant':
      bgStyle = style.song_phonics
      break
    case 'Song-Nursery-Rhyme':
      bgStyle = style.song_nulsery
      break
    case 'Game-Alphabet':
      bgStyle = style.game_alphabet
      break
    case 'Game-Phonics':
      bgStyle = style.game_phonics
      break
    case 'Game-Sight-Words-1':
      bgStyle = style.game_sight_word_1
      break
    case 'Game-Sight-Words-2':
      bgStyle = style.game_sight_word_2
      break
  }

  const bookFilter = [
    {
      group: 'status',
      title: t('t344'),
      option: [
        { id: 'All', label: t('t345'), enabled: option.status === 'All' },
        {
          id: 'Before',
          label: t('t346'),
          enabled: option.status === 'Before',
        },
        {
          id: 'Complete',
          label: t('t347'),
          enabled: option.status === 'Complete',
        },
      ],
    },
  ]

  const onFilterChanged = (filterOption: LibraryFilterOption[]) => {
    const findOptionId = (group: LibraryFilterOption) => {
      let value: string | undefined = undefined
      const option = group.option.filter((opt) => opt.enabled)
      if (option.length > 0) {
        value = option[0].id
      }
      return value
    }
    let status: string | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
      }
    })
    updateBook({ status })
  }

  const onChangeFilterActivity = (activity: string) => {
    updateBook({ activity })
  }

  const currentPage = 0
  const maxPage = 0
  const onPageClick = (page: number) => {
    updateBook({ page })
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  const {
    studentHistoryId,
    studentHistoryList,
    selectLevelRoundId,
    setSelectLevelRoundId,
    startStudyIfAvail,
    startStudyImmediate,
  } = useQuickStudyStart()

  const { isStudyEnd, studyEndMessage } = useStudentStudyable()

  const onCategoryItemClick = (activity: string) => {
    onChangeActivity(activity)
  }

  const onClickVocabulary = (vocabularyPath: string) => {
    if (!isStudyEnd) {
      openWindow(vocabularyPath, {
        external: true,
        target: '_blank',
        feature: 'noopener, noreferrer',
      })
    } else {
      alert(studyEndMessage)
    }
  }

  return (
    <>
      <div className={`${style.kids_dodo_abc}${bgStyle ? ` ${bgStyle}` : ''}`}>
        <div className="container compact">
          <div className={style.logo}></div>

          {/* 학습 유형  */}
          <div className={`${style.nav} ${style.items_center}`}>
            <div
              className={`${style.nav_item}${studyType === 'Study' ? ` ${style.active}` : ''}`}
              onClick={() => {
                onChangeStudyType('Study')
              }}>
              Study
            </div>
            <div
              className={`${style.nav_item}${studyType === 'Song' ? ` ${style.active}` : ''}`}
              onClick={() => {
                onChangeStudyType('Song')
              }}>
              Song & Chant
            </div>
            <div
              className={`${style.nav_item}${studyType === 'Game' ? ` ${style.active}` : ''}`}
              onClick={() => {
                onChangeStudyType('Game')
              }}>
              Game
            </div>
          </div>

          {/* 랜드 별 카테고리 */}
          <DodoABCCategory
            type={studyType}
            active={currentActivity}
            progress={progress}
            onCategoryClick={onCategoryItemClick}
          />

          {!loading && (
            <DodoABCList
              studyType={studyType}
              onClickBook={(levelRoundId: string) => {
                if (!isStudyEnd) {
                  startStudyIfAvail(levelRoundId)
                } else {
                  alert(studyEndMessage)
                }
              }}
              onClickDownload={onClickVocabulary}
            />
          )}
        </div>
      </div>
      {selectLevelRoundId && (
        <StudentHistorySelectModal
          studentHistoryList={studentHistoryList}
          defaultStudentHistoryId={studentHistoryId}
          onCloseModal={() => setSelectLevelRoundId(undefined)}
          onSelectStudentHistoryId={startStudyImmediate}
        />
      )}
    </>
  )
}
