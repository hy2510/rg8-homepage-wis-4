'use client'

import { useLevelBooks } from '@/8th/features/achieve/service/achieve-query'
import {
  useCategoryContinue,
  useCategorySeries,
} from '@/8th/features/library/service/library-query'
import ChallengeBoard from '@/8th/features/library/ui/component/ChallengeBoard'
import Collections from '@/8th/features/library/ui/component/Collections'
import ContinueViewed from '@/8th/features/library/ui/component/ContinueViewed'
import LevelSectionContainer from '@/8th/features/library/ui/component/LevelSectionContainer'
import LibraryTabBar from '@/8th/features/library/ui/component/LibraryTabBar'
import SearchBar from '@/8th/features/library/ui/component/SearchBar'
import {
  LevelSectionType,
  SectionLevelDataType,
  makeLevelItem,
  makeLevelItemPK,
  makeLevelSectionSeries,
  makeLevelSectionSeriesItem,
  makeLevelSectionType,
  makeLevelSectionTypeDodoABC,
  makeLevelSectionTypePK,
} from '@/8th/features/library/ui/levelSectionData'
import {
  useReadingKingEventDetail,
  useReadingKingEventList,
  useReadingKingEventPrize,
  useReadingKingEventPrizeUpdate,
} from '@/8th/features/readingking/service/readingking-query'
import {
  useStudentDailyLearning,
  useTodayStudyLearning,
} from '@/8th/features/student/service/learning-query'
import {
  useStudentLocalConfig,
  useUpdateStudentLocalConfig,
} from '@/8th/features/student/service/setting-query'
import { useStudent } from '@/8th/features/student/service/student-query'
import { useTodoList } from '@/8th/features/todo/service/todo-query'
import {
  useCustomerConfiguration,
  useCustomerInfo,
} from '@/8th/shared/context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useTrack } from '@/external/marketing-tracker/component/MarketingTrackerContext'
import useTranslation from '@/localization/client/useTranslations'
import DateUtils from '@/util/date-utils'
import LevelUtils from '@/util/level-utils'
import { useEffect, useMemo, useState } from 'react'
import TodoBookInfoModal from '../modal/TodoBookInfoModal'

const TODO_BOOK_LIMIT = 8

export default function FinderBook({ booktype }: { booktype: 'eb' | 'pb' }) {
  const maketingEventTracker = useTrack()
  useEffect(() => {
    maketingEventTracker.eventAction('도서 섹션 탭 클릭', {
      version: '8th',
      section_name: 'Library',
      book_type: booktype === 'eb' ? 'eBook' : 'p Book Quiz',
    })
  }, [maketingEventTracker, booktype])

  // @Language 'common'
  const { t } = useTranslation()

  const { menu, setting } = useCustomerConfiguration()

  const student = useStudent()
  const customerId = useCustomerInfo()?.customerId || ''
  const studentId = student.data?.student?.studentId || ''
  const userConfig = useStudentLocalConfig({ customerId, studentId })
  const updateUserConfig = useUpdateStudentLocalConfig()

  const userSetting = useStudentDailyLearning()
  const todayLearning = useTodayStudyLearning()
  const levels = useLevelBooks()
  const seriesCategory = useCategorySeries({
    bookType: booktype.toUpperCase() as 'EB' | 'PB',
  })
  const continueCategory = useCategoryContinue()
  const todo = useTodoList()

  const readingKingEvent = useReadingKingEventList({
    enabled: setting.showReadingking,
  })
  const { mutate: changeEventPrize } = useReadingKingEventPrizeUpdate()

  let targetEventId = undefined
  if (readingKingEvent.data && readingKingEvent.data.list.length > 0) {
    const latestEvent = readingKingEvent.data.list[0]
    const dateRange = DateUtils.rangeDayCheck(
      DateUtils.createDate(latestEvent.startDate),
      DateUtils.createDate(latestEvent.endDate),
      new Date(),
    )
    if (-2 < dateRange && dateRange < 2) {
      targetEventId = latestEvent.eventId
    }
  }
  const userReadingking = useReadingKingEventDetail(
    {
      eventId: targetEventId!,
    },
    { enabled: !!targetEventId },
  )
  const eventPrizeList = useReadingKingEventPrize(
    {
      eventId: targetEventId!,
    },
    { enabled: !!targetEventId },
  )

  const isOpenLevel = menu[booktype].readingLevel.level.open
  const isOpenSeries = menu[booktype].readingLevel.series.open
  const isOpenPreKClassic =
    booktype === 'eb' ? menu.eb.readingLevel.level.prekClassic.open : undefined
  const isOpenDodoAbc =
    booktype === 'eb' ? menu.eb.readingLevel.level.dodoAbc.open : undefined
  const findBookData: {
    sectionData: LevelSectionType[]
    continueSection?: LevelSectionType
    defaultOpenSection?: string
  } = useMemo(() => {
    if (
      !booktype ||
      !levels.data ||
      !seriesCategory.data ||
      !userSetting.data ||
      !continueCategory.data
    ) {
      return {
        sectionData: [],
      }
    }
    const userLevel = userSetting.data?.settingLevelName

    let containLevelGroup = undefined
    const lSectionData: LevelSectionType[] = []
    let continueLevel = undefined
    let continueSeries = undefined

    if (booktype === 'eb') {
      let tmpUserLevel = userLevel
      if (tmpUserLevel === '6C') {
        tmpUserLevel = '6B'
      }
      const ebUserLevel = tmpUserLevel

      const dodoAbcData = isOpenDodoAbc
        ? makeLevelSectionTypeDodoABC(levels.data?.dodoABC || [])
        : undefined
      const pkData = isOpenPreKClassic
        ? makeLevelSectionTypePK(levels.data?.preK || [])
        : undefined
      if (pkData) {
        pkData.section = t('t8th329')
        lSectionData.push(pkData)
      }
      if (dodoAbcData) {
        dodoAbcData.section = t('t8th329')
        lSectionData.push(dodoAbcData)
      }
      if (ebUserLevel === 'PK') {
        if (dodoAbcData) {
          containLevelGroup = dodoAbcData.section
        } else if (pkData) {
          containLevelGroup = pkData.section
        }
      }

      const ebData = levels.data?.eb || []

      const lvKTo1Data = makeLevelSectionType('Kto1', 'eb', ebData)
      if (lvKTo1Data) {
        lvKTo1Data.section = t('t8th330')
        const seriesData = makeLevelSectionSeries(
          'eb',
          'KA',
          '1C',
          seriesCategory.data.category,
        )
        if (seriesData.length > 0) {
          lvKTo1Data.series = [{ items: seriesData }]
        }
        lSectionData.push(lvKTo1Data)
        if (LevelUtils.isContainLevel(ebUserLevel, 'KA', '1C')) {
          containLevelGroup = lvKTo1Data.section
        }
      }
      const lv2To3Data = makeLevelSectionType('2to3', 'eb', ebData)
      if (lv2To3Data) {
        lv2To3Data.section = t('t8th331')
        const seriesData = makeLevelSectionSeries(
          'eb',
          '2A',
          '3C',
          seriesCategory.data.category,
        )
        if (seriesData.length > 0) {
          lv2To3Data.series = [{ items: seriesData }]
        }
        lSectionData.push(lv2To3Data)
        if (LevelUtils.isContainLevel(ebUserLevel, '2A', '3C')) {
          containLevelGroup = lv2To3Data.section
        }
      }
      const lv4To6Data = makeLevelSectionType('4to6', 'eb', ebData)
      if (lv4To6Data) {
        lv4To6Data.section = t('t8th332')
        const seriesData = makeLevelSectionSeries(
          'eb',
          '4A',
          '6C',
          seriesCategory.data.category,
        )
        if (seriesData.length > 0) {
          lv4To6Data.series = [{ items: seriesData }]
        }
        lSectionData.push(lv4To6Data)
        if (LevelUtils.isContainLevel(ebUserLevel, '4A', '6C')) {
          containLevelGroup = lv4To6Data.section
        }
      }

      // MEMO: Continue 레벨 기준을 서버에서 마지막학습 레벨 기준으로 하는 대신, 학습자 레벨로 고정
      // const continueLevelData = continueCategory.data?.continue?.eb?.level
      const continueLevelData = ebUserLevel
      const continueSeriesData = continueCategory.data?.continue?.eb?.series

      if (continueLevelData) {
        if (continueLevelData.startsWith('PK')) {
          let findContinueLevel = undefined
          findContinueLevel = levels.data?.dodoABC?.find(
            (level) => level.levelName === continueLevelData,
          )
          if (findContinueLevel) {
            continueLevel = makeLevelItemPK('dodoabc', findContinueLevel)
          } else {
            findContinueLevel = levels.data?.preK?.find(
              (level) => level.levelName === continueLevelData,
            )
            if (findContinueLevel) {
              continueLevel = makeLevelItemPK('pk', findContinueLevel)
            }
          }
        } else {
          const findContinueLevel = levels.data?.eb?.find(
            (level) => level.levelName === continueLevelData,
          )
          if (!!findContinueLevel) {
            continueLevel = makeLevelItem('eb', findContinueLevel)
          }
        }
      }
      if (!!continueSeriesData) {
        const findContinueSeries = continueSeriesData
          ? seriesCategory.data?.category?.find(
              (series) => series.name === continueSeriesData,
            )
          : undefined
        if (!!findContinueSeries) {
          continueSeries = makeLevelSectionSeriesItem('eb', findContinueSeries)
        }
      }
    } else if (booktype === 'pb') {
      const pbData = levels.data?.pb || []
      let tmpUserLevel = userLevel
      if (
        LevelUtils.getLevelIndex('KB') >= LevelUtils.getLevelIndex(tmpUserLevel)
      ) {
        tmpUserLevel = 'KC'
      }
      const pbUserLevel = tmpUserLevel

      const lvKTo1Data = makeLevelSectionType('Kto1', 'pb', pbData)
      if (lvKTo1Data) {
        lvKTo1Data.section = t('t8th330')
        const seriesData = makeLevelSectionSeries(
          'pb',
          'KC',
          '1C',
          seriesCategory.data.category,
        )
        if (seriesData.length > 0) {
          lvKTo1Data.series = [{ items: seriesData }]
        }
        lSectionData.push(lvKTo1Data)
        if (LevelUtils.isContainLevel(pbUserLevel, 'KC', '1C')) {
          containLevelGroup = lvKTo1Data.section
        }
      }
      const lv2To3Data = makeLevelSectionType('2to3', 'pb', pbData)
      if (lv2To3Data) {
        lv2To3Data.section = t('t8th331')
        const seriesData = makeLevelSectionSeries(
          'pb',
          '2A',
          '3C',
          seriesCategory.data.category,
        )
        if (seriesData.length > 0) {
          lv2To3Data.series = [{ items: seriesData }]
        }
        lSectionData.push(lv2To3Data)
        if (LevelUtils.isContainLevel(pbUserLevel, '2A', '3C')) {
          containLevelGroup = lv2To3Data.section
        }
      }
      const lv4To6Data = makeLevelSectionType('4to6', 'pb', pbData)
      if (lv4To6Data) {
        lv4To6Data.section = t('t8th332')
        const seriesData = makeLevelSectionSeries(
          'pb',
          '4A',
          '6C',
          seriesCategory.data.category,
        )
        if (seriesData.length > 0) {
          lv4To6Data.series = [{ items: seriesData }]
        }
        lSectionData.push(lv4To6Data)
        if (LevelUtils.isContainLevel(pbUserLevel, '4A', '6C')) {
          containLevelGroup = lv4To6Data.section
        }
      }

      // MEMO: Continue 레벨 기준을 서버에서 마지막학습 레벨 기준으로 하는 대신, 학습자 레벨로 고정
      // const continueLevelData = continueCategory.data?.continue?.pb?.level
      const continueLevelData = pbUserLevel
      const continueSeriesData = continueCategory.data?.continue?.pb?.series

      if (continueLevelData) {
        const findContinueLevel = levels.data?.pb?.find(
          (level) => level.levelName === continueLevelData,
        )
        if (!!findContinueLevel) {
          continueLevel = makeLevelItem('pb', findContinueLevel)
        }
      }
      if (!!continueSeriesData) {
        const findContinueSeries = continueSeriesData
          ? seriesCategory.data?.category?.find(
              (series) => series.name === continueSeriesData,
            )
          : undefined
        if (!!findContinueSeries) {
          continueSeries = makeLevelSectionSeriesItem('pb', findContinueSeries)
        }
      }
    }

    const continueTodoFilter = todo.data?.todo
      ? new Set(
          todo.data?.todo
            ?.filter(
              (todo) =>
                todo.levelName.startsWith(booktype === 'eb' ? 'EB' : 'PB') &&
                todo.levelName.substring(5, 3) !== (continueLevel?.level || ''),
            )
            .map((todo) => todo.levelName.substring(5, 3)),
        )
      : undefined
    const continueTodoLevelList: string[] = []
    const continueTodoLevelData: SectionLevelDataType[] = []
    if (continueTodoFilter) {
      continueTodoFilter.forEach(function (value) {
        continueTodoLevelList.push(value)
      })
      continueTodoLevelList.sort((a, b) => {
        const aFirst = a.substring(0, 1)
        const bFirst = b.substring(0, 1)
        if (aFirst !== bFirst) {
          if (aFirst === 'P') {
            return -1
          } else if (bFirst === 'P') {
            return 1
          } else if (aFirst === 'K') {
            return -1
          } else if (bFirst === 'K') {
            return 1
          } else {
            return aFirst.charCodeAt(0) - bFirst.charCodeAt(0)
          }
        }
        return a.substring(1, 2).charCodeAt(0) - b.substring(1, 2).charCodeAt(0)
      })

      /*
       * MEMO::  2026-04-10 컨티뉴 목록에서 To-Do 레벨 카테고리 추가하는 기능 제거 (최근 레벨과 시리즈 2건만 나오도록 함)
       * 
      if (booktype === 'eb') {
        continueTodoLevelData.push(
          ...continueTodoLevelList
            .filter((todoLevel) => {
              const levelData = levels.data?.eb?.find(
                (level) => level.levelName === todoLevel,
              )
              return !!levelData
            })
            .map((todoLevel) => {
              return makeLevelItem(
                'eb',
                levels.data!.eb!.find(
                  (level) => level.levelName === todoLevel,
                )!,
              )
            }),
        )
      } else {
        continueTodoLevelData.push(
          ...continueTodoLevelList
            .filter((todoLevel) => {
              const levelData = levels.data?.pb?.find(
                (level) => level.levelName === todoLevel,
              )
              return !!levelData
            })
            .map((todoLevel) => {
              return makeLevelItem(
                'pb',
                levels.data!.pb!.find(
                  (level) => level.levelName === todoLevel,
                )!,
              )
            }),
        )
      }
        */
    }

    const continueSectionResult: LevelSectionType | undefined =
      !!continueLevel || !!continueSeries || continueTodoLevelData.length > 0
        ? {
            section: 'Continue',
            levels: [{ items: continueLevel ? [continueLevel] : [] }],
            series: [{ items: continueSeries ? [continueSeries] : [] }],
            todos:
              continueTodoLevelData.length > 0
                ? [
                    {
                      // MEMO: 최대 3건만 나오도록 함
                      items: continueTodoLevelData.filter(
                        (_, idx) =>
                          idx <
                          3 -
                            (continueLevel ? 1 : 0) -
                            (continueSeries ? 1 : 0),
                      ),
                    },
                  ]
                : undefined,
          }
        : undefined

    if (!isOpenLevel) {
      lSectionData.forEach((section) => {
        section.levels = []
      })
    }
    if (!isOpenSeries) {
      lSectionData.forEach((section) => {
        section.series = []
      })
    }

    return {
      sectionData: lSectionData.filter(
        (section) => section.levels.length + (section.series?.length || 0) > 0,
      ),
      continueSection: continueSectionResult,
      defaultOpenSection: containLevelGroup,
    }
  }, [
    booktype,
    levels.data,
    seriesCategory.data,
    userSetting.data,
    continueCategory.data,
    todo.data,
    isOpenLevel,
    isOpenSeries,
    isOpenPreKClassic,
    isOpenDodoAbc,
    t,
  ])

  const [bookInfo, setBookInfo] = useState<
    | {
        levelRoundId: string
        surfaceImagePath: string
        title: string
        bookCode: string
        studentHistoryId: string
        studyId: string
      }
    | undefined
  >(undefined)

  if (levels.isLoading || seriesCategory.isLoading || userSetting.isLoading) {
    return <div />
  }
  if (
    readingKingEvent.isLoading ||
    userReadingking.isLoading ||
    eventPrizeList.isLoading ||
    todayLearning.isLoading
  ) {
    return <div />
  }
  const isTodayStudy = todayLearning.data
    ? todayLearning.data.books > 0 || todayLearning.data.point > 0
    : false

  const onReadingKingPrizeChange = (prizeId: string) => {
    changeEventPrize({ eventId: targetEventId!, eventPrizeId: prizeId })
  }

  const libraryTabBarItems: React.ComponentProps<
    typeof LibraryTabBar
  >['items'] = []
  if (menu.eb.open) {
    libraryTabBarItems.push({
      href: SITE_PATH.NW82.EB,
      active: booktype === 'eb',
      label: t('t8th325'),
    })
  }
  if (menu.pb.open) {
    libraryTabBarItems.push({
      href: SITE_PATH.NW82.PB,
      active: booktype === 'pb',
      label: t('t8th326'),
    })
  }
  const collectionsList: React.ComponentProps<typeof Collections>['list'] = []
  if (menu[booktype].collections.newBooks.open) {
    collectionsList.push('NewBooks')
  }
  if (menu[booktype].collections.themes.open) {
    collectionsList.push('Theme')
  }
  if (menu[booktype].collections.series.open) {
    collectionsList.push('Series')
  }
  if (booktype === 'eb' ? menu.eb.collections.movies.open : undefined) {
    collectionsList.push('Movie')
  }
  if (booktype === 'eb' ? menu.eb.collections.workbooks.open : undefined) {
    collectionsList.push('Workbook')
  }
  if (booktype === 'eb' ? menu.eb.collections.schoolSubjects.open : undefined) {
    collectionsList.push('SchoolSubjects')
  }

  const todos =
    todo.data?.todo?.filter((todo) =>
      todo.levelName.startsWith(booktype === 'eb' ? 'EB' : 'PB'),
    ) ?? []
  const isTodoMore = todos.length > TODO_BOOK_LIMIT

  const onTodoBookClick = (studyId: string) => {
    const book = todos.find((book) => book.studyId === studyId)
    if (!book) {
      return
    }

    if (isStudyEnd) {
      onStudyEndMessage()
      return
    }

    setBookInfo({
      levelRoundId: book.levelRoundId,
      surfaceImagePath: book.surfaceImagePath,
      title: book.title,
      bookCode: book.levelName,
      studentHistoryId: book.studentHistoryId,
      studyId: book.studyId,
    })
  }

  // TODO: 학습이 가능한 경우에만 열리도록 하는 기능이 필요.
  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  let continueDefaultTab: 'todo' | 'level' = 'todo'
  if (userConfig.continueDefaultTab) {
    continueDefaultTab = userConfig.continueDefaultTab
  }
  if (
    continueDefaultTab === 'level' &&
    !findBookData.continueSection &&
    todos.length > 0
  ) {
    continueDefaultTab = 'todo'
  } else if (
    continueDefaultTab === 'todo' &&
    !!findBookData.continueSection &&
    todos.length === 0
  ) {
    continueDefaultTab = 'level'
  }

  return (
    <>
      {setting.showReadingking && !!targetEventId && userReadingking.data && (
        <ChallengeBoard
          title={userReadingking.data.eventTitle}
          startDate={userReadingking.data.startDate}
          endDate={userReadingking.data.endDate}
          prize={userReadingking.data.eventPrizeId}
          point={userReadingking.data.totalPoint}
          learningDays={userReadingking.data.totalReadingDays}
          isTodayStudy={isTodayStudy}
          prizeList={eventPrizeList.data?.list || []}
          onPrizeChange={onReadingKingPrizeChange}
          onExpendChange={(isExpend) => {
            updateUserConfig({
              customerId,
              studentId,
              mode: isExpend ? 'challenge' : 'level',
            })
          }}
          isDefaultExpend={userConfig.mode === 'challenge'}
        />
      )}
      {libraryTabBarItems.length > 0 && (
        <LibraryTabBar items={libraryTabBarItems} />
      )}
      {menu[booktype].search.open && <SearchBar booktype={booktype} />}
      {menu[booktype].continue.open &&
        (!!findBookData.continueSection || todos.length > 0) && (
          <ContinueViewed
            defaultTab={continueDefaultTab}
            onChangeTab={(tab) => {
              updateUserConfig({
                customerId,
                studentId,
                continueDefaultTab: tab,
              })
            }}
            continueSection={findBookData.continueSection}
            todos={todos.filter((_, idx) => idx < TODO_BOOK_LIMIT)}
            moreTodo={isTodoMore}
            onClickBook={onTodoBookClick}
          />
        )}
      {menu[booktype].readingLevel.open && (
        <LevelSectionContainer
          levelSection={findBookData.sectionData}
          defaultLevel={findBookData.defaultOpenSection}
        />
      )}
      {menu[booktype].collections.open && (
        <Collections bookType={booktype} list={collectionsList} />
      )}
      {bookInfo && (
        <TodoBookInfoModal
          onClickClose={() => {
            setBookInfo(undefined)
          }}
          title={bookInfo.title}
          bookCode={bookInfo.bookCode}
          imgSrc={bookInfo.surfaceImagePath}
          levelRoundId={bookInfo.levelRoundId}
          studentHistoryId={bookInfo.studentHistoryId}
          studyId={bookInfo.studyId}
        />
      )}
    </>
  )
}
