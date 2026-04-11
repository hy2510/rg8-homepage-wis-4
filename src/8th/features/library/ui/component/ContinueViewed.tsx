'use client'

import { Assets } from '@/8th/assets/asset-library'
import BookItem from '@/8th/features/library/ui/component/BookItem'
import TodoBookInfoModal from '@/8th/features/library/ui/modal/TodoBookInfoModal'
import { useStudent } from '@/8th/features/student/service/student-query'
import { TodoBook } from '@/8th/features/todo/model/todo-book'
import { useTodoList } from '@/8th/features/todo/service/todo-query'
import { useIsPhone } from '@/8th/shared/context/ScreenModeContext'
import {
  BookListEmptyStateStyle,
  BookListStyle,
  RecentlyViewedStyle,
} from '@/8th/shared/styled/FeaturesStyled'
import { RoundedFullButton } from '@/8th/shared/ui/Buttons'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { LevelSectionType } from '../levelSectionData'
import LevelItem from './LevelSectionLevelItem'
import SeriesItem from './LevelSectionSeriesItem'

const continueViewedTabStorageKey = (booktype: 'eb' | 'pb') =>
  `8th.library.continueViewedTab.${booktype}`

/**
 * Recently Viewed 메뉴
 */
export default function ContinueViewed({
  continueSection,
  booktype,
}: {
  continueSection: LevelSectionType
  booktype: 'eb' | 'pb'
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const isPhone = useIsPhone()
  const student = useStudent()
  const todoQuery = useTodoList({ sortColumn: 'RegistDate' })

  const [activeTab, setActiveTab] = useState<'level' | 'todo'>('level')
  const tabStorageKey = continueViewedTabStorageKey(booktype)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(tabStorageKey)
      if (raw === 'todo' || raw === 'level') {
        setActiveTab(raw)
      }
    } catch {
      /* storage unavailable */
    }
  }, [tabStorageKey])

  const setContinueTab = (tab: 'level' | 'todo') => {
    setActiveTab(tab)
    try {
      window.localStorage.setItem(tabStorageKey, tab)
    } catch {
      /* storage unavailable */
    }
  }

  const [bookInfo, setBookInfo] = useState<{
    levelRoundId: string
    surfaceImagePath: string
    title: string
    bookCode: string
    studentHistoryId: string
    studyId: string
  }>()

  const levelItems =
    continueSection.levels.length > 0
      ? continueSection.levels
          .filter((level) => level.items.length > 0)
          .flatMap((group) => group.items)
      : []

  const seriesItems =
    continueSection.series && continueSection.series.length > 0
      ? continueSection.series
          .filter((series) => series.items.length > 0)
          .flatMap((group) => group.items)
      : []

  const todoItems =
    continueSection.todos && continueSection.todos.length > 0
      ? continueSection.todos
          .filter((level) => level.items.length > 0)
          .flatMap((group) => group.items)
      : []

  const continueItems = [
    ...levelItems.map((item) => ({ type: 'level' as const, item })),
    ...seriesItems.map((item) => ({ type: 'series' as const, item })),
    ...todoItems.map((item) => ({ type: 'todo' as const, item })),
  ].slice(0, 3)

  const levelPrefix = booktype === 'eb' ? 'EB' : 'PB'
  const todoBooksFiltered = useMemo(() => {
    const all = todoQuery.data?.todo ?? []
    return all.filter((b) => b.levelName.startsWith(levelPrefix))
  }, [todoQuery.data?.todo, levelPrefix])
  const todoBooksSlice = useMemo(
    () => todoBooksFiltered.slice(0, 8),
    [todoBooksFiltered],
  )

  const isStudyEnd = student?.data?.studyState?.isStudyEnd || false
  const onStudyEndMessage = () => {
    const message = student?.data?.studyState?.studyEndMessage || ''
    if (message) {
      alert(message)
    }
  }

  const onTodoBookClick = (book: TodoBook) => {
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

  return (
    <RecentlyViewedStyle>
      <BoxStyle display="flex" gap={isPhone ? 5 : 10} alignItems="center">
        <TextStyle fontSize="large" fontColor="primary">
          · {t('t8th002')}
        </TextStyle>
      </BoxStyle>
      {/* <Gap size={isPhone ? 10 : 15} /> */}
      <BoxStyle className="section-tabs" display="flex" gap={10}>
        <button
          type="button"
          className={`section-tab ${activeTab === 'level' ? 'active' : ''}`}
          onClick={() => setContinueTab('level')}>
          My Reading
        </button>
        <button
          type="button"
          className={`section-tab ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setContinueTab('todo')}>
          My To-Do
        </button>
      </BoxStyle>
      {activeTab === 'level' && (
        <BoxStyle
          className={`list ${isPhone ? 'mobile-slider' : ''}`}
          display={isPhone ? 'flex' : 'grid'}
          gridTemplateColumns={isPhone ? undefined : 'repeat(3, 1fr)'}
          gap={10}>
          {continueItems.map((entry, index) => {
            if (entry.type === 'series') {
              const series = entry.item
              return (
                <div
                  key={`${entry.type}-${series.title}-${index}`}
                  className={isPhone ? 'slider-item' : ''}>
                  <SeriesItem
                    level={
                      series.minLevel === series.maxLevel
                        ? series.minLevel
                        : `${series.minLevel}~${series.maxLevel}`
                    }
                    title={series.title}
                    imgSrc={series.imgSrc}
                    bgColor={series.color}
                    href={series.href}
                  />
                </div>
              )
            }

            const level = entry.item
            return (
              <div
                key={`${entry.type}-${level.type}${level.level}-${level.title}-${index}`}
                className={isPhone ? 'slider-item' : ''}>
                <LevelItem
                  type={level.type}
                  level={level.level}
                  title={level.title}
                  bgColor={level.bgColor}
                  fontColor={level.fontColor}
                  completed={level.completed}
                  href={level.href}
                  imgSrc={level.imgSrc}
                  total={level.total}
                />
              </div>
            )
          })}
        </BoxStyle>
      )}
      {activeTab === 'todo' && (
        <>
          {!todoQuery.isPending && todoBooksSlice.length === 0 && (
            <BookListEmptyStateStyle>
              <p>{t('t8th009')}</p>
            </BookListEmptyStateStyle>
          )}
          {!todoQuery.isPending && todoBooksSlice.length > 0 && (
            <>
              {isPhone ? (
                <BoxStyle
                  className="list mobile-slider todo-books-slider"
                  display="flex"
                  gap={10}>
                  {todoBooksSlice.map((book) => {
                    const isInProgressInTodo = book.levelName.startsWith(
                      'EB-PK',
                    )
                      ? !book.deleteYn
                      : book.answerCount > 0
                    return (
                      <div key={book.studyId} className="slider-item">
                        <BookItem
                          title={book.title}
                          passCount={0}
                          addYn={!book.deleteYn}
                          movieYn={!!book.animationPath}
                          point={book.getableRgPoint}
                          src={book.surfaceImagePath}
                          levelName={book.levelName}
                          homeworkYn={book.homeworkYn}
                          recommendedAge={book.recommendedAge}
                          isCheckable={false}
                          isDisabled={false}
                          isChecked={false}
                          isInProgressInTodo={isInProgressInTodo}
                          onClick={() => onTodoBookClick(book)}
                        />
                      </div>
                    )
                  })}
                </BoxStyle>
              ) : (
                <BookListStyle>
                  {todoBooksSlice.map((book) => {
                    const isInProgressInTodo = book.levelName.startsWith(
                      'EB-PK',
                    )
                      ? !book.deleteYn
                      : book.answerCount > 0
                    return (
                      <BookItem
                        key={book.studyId}
                        title={book.title}
                        passCount={0}
                        addYn={!book.deleteYn}
                        movieYn={!!book.animationPath}
                        point={book.getableRgPoint}
                        src={book.surfaceImagePath}
                        levelName={book.levelName}
                        homeworkYn={book.homeworkYn}
                        recommendedAge={book.recommendedAge}
                        isCheckable={false}
                        isDisabled={false}
                        isChecked={false}
                        isInProgressInTodo={isInProgressInTodo}
                        onClick={() => onTodoBookClick(book)}
                      />
                    )
                  })}
                </BookListStyle>
              )}
              {todoBooksFiltered.length > 8 && (
                <Link href={SITE_PATH.NW82.TODO}>
                  <RoundedFullButton
                    onClick={undefined}
                    fontColor="var(--font-color-primary)">
                    <BoxStyle
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      gap={5}>
                      <TextStyle
                        fontSize="medium"
                        fontWeight="bolder"
                        fontFamily="sans">
                        {t('t8th327')}
                      </TextStyle>
                      <Image
                        src={Assets.Icon.arrowRightBlack}
                        alt="right-arrow"
                        width={14}
                        height={14}
                      />
                    </BoxStyle>
                  </RoundedFullButton>
                </Link>
              )}
            </>
          )}
        </>
      )}
      {bookInfo && (
        <TodoBookInfoModal
          onClickClose={() => setBookInfo(undefined)}
          title={bookInfo.title}
          bookCode={bookInfo.bookCode}
          imgSrc={bookInfo.surfaceImagePath}
          levelRoundId={bookInfo.levelRoundId}
          studentHistoryId={bookInfo.studentHistoryId}
          studyId={bookInfo.studyId}
        />
      )}
    </RecentlyViewedStyle>
  )
}
