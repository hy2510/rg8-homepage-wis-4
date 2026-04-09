'use client'

import { useLevelBooks } from '@/8th/features/achieve/service/achieve-query'
import {
  useCategoryContinue,
  useCategorySeries,
} from '@/8th/features/library/service/library-query'
import ChallengeBoard from '@/8th/features/library/ui/component/ChallengeBoard'
import Collections from '@/8th/features/library/ui/component/Collections'
import ContinueViewed from '@/8th/features/library/ui/component/ContinueViewed'
import LevelSection from '@/8th/features/library/ui/component/LevelSection'
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
import { useTodoList } from '@/8th/features/todo/service/todo-query'
import { useCustomerConfiguration } from '@/8th/shared/context/CustomerContext'
import DateUtils from '@/util/date-utils'
import LevelUtils from '@/util/level-utils'
import { useMemo } from 'react'

export default function FinderBook({ booktype }: { booktype: 'eb' | 'pb' }) {
  const { menu, setting } = useCustomerConfiguration()

  // TODO: 독서왕 자동으로 펼침 기능 주석처리, 협의 필요
  // const student = useStudent()
  // const customerId = useCustomerInfo()?.customerId || ''
  // const studentId = student.data?.student?.studentId || ''
  // const userConfig = useStudentLocalConfig({ customerId, studentId })
  // const updateUserConfig = useUpdateStudentLocalConfig()

  const userSetting = useStudentDailyLearning()
  const todayLearning = useTodayStudyLearning()
  const levels = useLevelBooks()
  const seriesCategory = useCategorySeries({
    bookType: booktype.toUpperCase() as 'EB' | 'PB',
  })
  const continueCategory = useCategoryContinue()
  const todo = useTodoList()

  const readingKingEvent = useReadingKingEventList()
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
      const dodoAbcData = isOpenDodoAbc
        ? makeLevelSectionTypeDodoABC(levels.data?.dodoABC || [])
        : undefined
      const pkData = isOpenPreKClassic
        ? makeLevelSectionTypePK(levels.data?.preK || [])
        : undefined
      if (pkData) {
        lSectionData.push(pkData)
      }
      if (dodoAbcData) {
        lSectionData.push(dodoAbcData)
      }
      if (userLevel === 'PK') {
        if (dodoAbcData) {
          containLevelGroup = dodoAbcData.section
        } else if (pkData) {
          containLevelGroup = pkData.section
        }
      }

      const ebData = levels.data?.eb || []

      const lvKTo1Data = makeLevelSectionType('Kto1', 'eb', ebData)
      if (lvKTo1Data) {
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
        if (LevelUtils.isContainLevel(userLevel, 'KA', '1C')) {
          containLevelGroup = lvKTo1Data.section
        }
      }
      const lv2To3Data = makeLevelSectionType('2to3', 'eb', ebData)
      if (lv2To3Data) {
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
        if (LevelUtils.isContainLevel(userLevel, '2A', '3C')) {
          containLevelGroup = lv2To3Data.section
        }
      }
      const lv4To6Data = makeLevelSectionType('4to6', 'eb', ebData)
      if (lv4To6Data) {
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
        if (LevelUtils.isContainLevel(userLevel, '4A', '6C')) {
          containLevelGroup = lv4To6Data.section
        }
      }

      const continueLevelData = continueCategory.data?.continue?.eb?.level
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

      const lvKTo1Data = makeLevelSectionType('Kto1', 'pb', pbData)
      if (lvKTo1Data) {
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
        if (LevelUtils.isContainLevel(userLevel, 'KC', '1C')) {
          containLevelGroup = lvKTo1Data.section
        }
      }
      const lv2To3Data = makeLevelSectionType('2to3', 'pb', pbData)
      if (lv2To3Data) {
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
        if (LevelUtils.isContainLevel(userLevel, '2A', '3C')) {
          containLevelGroup = lv2To3Data.section
        }
      }
      const lv4To6Data = makeLevelSectionType('4to6', 'pb', pbData)
      if (lv4To6Data) {
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
        if (LevelUtils.isContainLevel(userLevel, '4A', '6C')) {
          containLevelGroup = lv4To6Data.section
        }
      }

      const continueLevelData = continueCategory.data?.continue?.pb?.level
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
    }

    const continueSectionResult: LevelSectionType | undefined =
      !!continueLevel || !!continueSeries || continueTodoLevelData.length > 0
        ? {
            section: 'Continue',
            levels: [{ items: continueLevel ? [continueLevel] : [] }],
            series: [{ items: continueSeries ? [continueSeries] : [] }],
            todos:
              continueTodoLevelData.length > 0
                ? [{ items: continueTodoLevelData }]
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
  ])

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
          // onExpendChange={(isExpend) => {
          //   updateUserConfig({
          //     customerId,
          //     studentId,
          //     mode: isExpend ? 'challenge' : 'level',
          //   })
          // }}
          // isDefaultExpend={userConfig.mode === 'challenge'}
        />
      )}
      {menu[booktype].search.open && <SearchBar booktype={booktype} />}
      {menu[booktype].continue.open && findBookData.continueSection && (
        <ContinueViewed continueSection={findBookData.continueSection} />
      )}
      {menu[booktype].readingLevel.open && (
        <LevelSection
          levelSection={findBookData.sectionData}
          defaultLevel={findBookData.defaultOpenSection}
        />
      )}
      {menu[booktype].collections.open && (
        <Collections bookType={booktype} list={collectionsList} />
      )}
    </>
  )
}
